// Artist registration page with 3-step process
class ArtistRegisterApp {
    constructor() {
        this.walletConnection = window.walletConnection;
        this.currentStep = 1;
        this.init();
    }

    async init() {
        this.setupEventListeners();
        await this.checkWalletConnection();
        this.loadFeaturedArtists();
        
        // Ensure wallet connection UI is up to date
        if (this.walletConnection) {
            this.walletConnection.updateUI();
        }
    }

    setupEventListeners() {
        // Connect wallet button
        document.addEventListener('click', (e) => {
            if (e.target.id === 'connectWallet') {
                this.handleWalletConnection();
            }
        });

        // Mobile menu toggle
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        
        if (mobileMenuToggle && mobileMenu) {
            mobileMenuToggle.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
            });
            
            document.addEventListener('click', (e) => {
                if (!mobileMenuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                    mobileMenu.classList.remove('active');
                }
            });
        }

        // Registration step buttons
        const registerConnectBtn = document.getElementById('registerConnectBtn');
        const payRegistrationBtn = document.getElementById('payRegistrationBtn');
        const artistProfileForm = document.getElementById('artistProfileForm');

        if (registerConnectBtn) {
            registerConnectBtn.addEventListener('click', () => {
                this.handleStep1WalletConnection();
            });
        }

        if (payRegistrationBtn) {
            payRegistrationBtn.addEventListener('click', () => {
                this.handleStep2Payment();
            });
        }

        if (artistProfileForm) {
            artistProfileForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleStep3ProfileSetup();
            });
        }
    }

    async checkWalletConnection() {
        console.log('Artist Register: checkWalletConnection called');
        
        // Check using direct wallet connection system
        if (window.walletState && window.walletState.isConnected) {
            // Already connected, go to step 2
            this.goToStep(2);
        } else {
            // Not connected, stay on step 1
            this.goToStep(1);
        }
        
        // Update wallet UI if available
        if (window.walletConnection && window.walletConnection.updateUI) {
            window.walletConnection.updateUI();
        }
    }

    async handleWalletConnection() {
        console.log('Artist Register: handleWalletConnection called');
        
        // Use the direct wallet connection system
        if (window.walletState && window.walletState.isConnected) {
            // Already connected, disconnect
            if (window.disconnectWalletDirect) {
                window.disconnectWalletDirect();
            }
            this.goToStep(1);
        } else {
            // Not connected, try to connect
            if (window.connectWalletDirect) {
                try {
                    await window.connectWalletDirect();
                    // Check if connection was successful
                    if (window.walletState && window.walletState.isConnected) {
                        this.goToStep(2);
                    }
                } catch (error) {
                    console.error('Artist Register: Wallet connection failed', error);
                }
            } else {
                console.error('Artist Register: Direct wallet connection not available');
            }
        }
    }

    async handleStep1WalletConnection() {
        console.log('Artist Register: handleStep1WalletConnection called');
        
        // Use the direct wallet connection system
        if (window.connectWalletDirect) {
            try {
                await window.connectWalletDirect();
                const success = window.walletState && window.walletState.isConnected;
        
                if (success) {
                    this.goToStep(2);
                } else {
                    console.error('Artist Register: Connection failed');
                    if (window.walletConnection && window.walletConnection.showMessage) {
                        window.walletConnection.showMessage('Failed to connect wallet. Please try again.', 'error');
                    }
                }
            } catch (error) {
                console.error('Artist Register: Wallet connection error', error);
                if (window.walletConnection && window.walletConnection.showMessage) {
                    window.walletConnection.showMessage('Failed to connect wallet. Please try again.', 'error');
                }
            }
        } else {
            console.error('Artist Register: Direct wallet connection not available');
        }
    }

    async handleStep2Payment() {
        const payButton = document.getElementById('payRegistrationBtn');
        
        if (payButton) {
            payButton.textContent = 'Processing Payment...';
            payButton.disabled = true;
        }

        try {
            // Get blockchain service
            const blockchainService = window.blockchainService;
            if (!blockchainService) {
                throw new Error('Blockchain service not available');
            }

            // Check if on correct network (Sepolia for testing)
            const network = blockchainService.getCurrentNetwork();
            if (network.chainId !== '0xaa36a7') {
                const switched = await blockchainService.switchToSepolia();
                if (!switched) {
                    throw new Error('Please switch to Sepolia testnet');
                }
            }

            // Get wallet address
            const walletAddress = this.walletConnection.getWalletAddress();
            if (!walletAddress) {
                throw new Error('Wallet not connected');
            }

            // Check balance
            const balance = await blockchainService.getBalance(walletAddress);
            if (parseFloat(balance) < 0.01) {
                throw new Error(`Insufficient balance. Required: 0.01 ETH, Available: ${parseFloat(balance).toFixed(4)} ETH`);
            }

            // Pay registration fee
            const result = await blockchainService.payRegistrationFee(walletAddress);
            
            if (result.success) {
                this.walletConnection.showMessage(
                    `Registration fee paid successfully! Transaction: ${result.transactionHash}`, 
                    'success'
                );
                
                // Store transaction hash for reference
                sessionStorage.setItem('registration_tx_hash', result.transactionHash);
                
                this.goToStep(3);
            } else {
                throw new Error(result.error || 'Payment failed');
            }
            
        } catch (error) {
            console.error('Payment error:', error);
            this.walletConnection.showMessage(`Payment failed: ${error.message}`, 'error');
        } finally {
            if (payButton) {
                payButton.textContent = 'Pay Registration Fee';
                payButton.disabled = false;
            }
        }
    }

    async handleStep3ProfileSetup() {
        const walletAddress = this.walletConnection.getWalletAddress();
        const artistName = document.getElementById('artistName')?.value;
        const artistBio = document.getElementById('artistBio')?.value;
        const artistSocial = document.getElementById('artistSocial')?.value;
        const artistAvatar = document.getElementById('artistAvatar')?.files[0];

        if (!artistName || !artistBio) {
            this.walletConnection.showMessage('Please fill in all required fields.', 'error');
            return;
        }

        const submitButton = document.querySelector('#artistProfileForm button[type="submit"]');
        if (submitButton) {
            submitButton.textContent = 'Processing Registration...';
            submitButton.disabled = true;
        }

        // Handle avatar upload if provided
        let avatarUrl = null;
        if (artistAvatar) {
            try {
                avatarUrl = await this.handleAvatarUpload(artistAvatar);
            } catch (error) {
                console.error('Avatar upload failed:', error);
            }
        }

        // Simulate blockchain transaction delay
        setTimeout(() => {
            try {
                // Register artist with user store
                const artistData = {
                    name: artistName,
                    bio: artistBio,
                    social: artistSocial,
                    avatar: avatarUrl
                };
                
                window.userStore.registerArtist(walletAddress, artistData);
                
                // Show success step
                this.goToStep(4);
                
            } catch (error) {
                this.walletConnection.showMessage('Registration failed. Please try again.', 'error');
                if (submitButton) {
                    submitButton.textContent = 'Complete Registration 🎉';
                    submitButton.disabled = false;
                }
            }
        }, 2000);
    }

    async handleAvatarUpload(file) {
        // Use the existing image handler
        if (window.imageHandler) {
            return await window.imageHandler.handleImageUpload(file);
        } else {
            // Fallback to base64 if imageHandler not available
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.readAsDataURL(file);
            });
        }
    }

    goToStep(step) {
        this.currentStep = step;
        
        // Hide all steps
        const steps = ['walletConnectStep', 'paymentStep', 'profileStep', 'successStep'];
        steps.forEach(stepId => {
            const element = document.getElementById(stepId);
            if (element) element.style.display = 'none';
        });
        
        // Show current step
        const currentStepElement = document.getElementById(steps[step - 1]);
        if (currentStepElement) {
            currentStepElement.style.display = 'block';
        }
        
        // Update step indicators
        this.updateStepIndicators();
    }

    updateStepIndicators() {
        for (let i = 1; i <= 3; i++) {
            const indicator = document.getElementById(`step${i}`);
            if (indicator) {
                indicator.classList.remove('active', 'completed');
                if (i < this.currentStep) {
                    indicator.classList.add('completed');
                } else if (i === this.currentStep) {
                    indicator.classList.add('active');
                }
            }
        }
    }

    loadFeaturedArtists() {
        try {
            const artists = window.userStore.getArtists();
            const featuredArtists = artists
                .filter(artist => artist.totalSales > 0)
                .sort((a, b) => (b.totalSales || 0) - (a.totalSales || 0))
                .slice(0, 4);

            const featuredGrid = document.getElementById('featuredArtistsGrid');
            if (featuredGrid && featuredArtists.length > 0) {
                featuredGrid.innerHTML = featuredArtists.map(artist => {
                    const avatar = artist.avatar ? 
                        `<img src="${artist.avatar}" alt="${artist.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">` : 
                        artist.name.substring(0, 2).toUpperCase();
                    
                    return `
                        <div class="artist-card" style="cursor: pointer;" onclick="window.location.href='member-artists.html'">
                            <div class="artist-avatar">${avatar}</div>
                            <div class="artist-name">@${artist.name}</div>
                            <div class="artist-sales">${artist.totalSales || 0} NFTs sold</div>
                        </div>
                    `;
                }).join('');
            }
        } catch (error) {
            console.error('Error loading featured artists:', error);
        }
    }
}

// Initialize artist register app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ArtistRegisterApp();
});
