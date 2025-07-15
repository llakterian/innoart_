// Upload page with working wallet connection
class UploadApp {
    constructor() {
        this.walletConnection = window.walletConnection;
        this.init();
    }

    async init() {
        this.setupEventListeners();
        await this.checkWalletConnection();
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

        // File upload
        const fileInput = document.getElementById('artworkFile');
        const uploadBtn = document.getElementById('uploadBtn');
        const mintBtn = document.getElementById('mintNFT');

        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                this.handleFileSelect(e);
            });
        }

        if (uploadBtn) {
            uploadBtn.addEventListener('click', () => {
                fileInput?.click();
            });
        }

        if (mintBtn) {
            mintBtn.addEventListener('click', () => {
                this.handleMintNFT();
            });
        }
    }

    async checkWalletConnection() {
        console.log('Upload: checkWalletConnection called');
        
        // Check using direct wallet connection system
        if (!(window.walletState && window.walletState.isConnected)) {
            this.showConnectWalletPrompt();
        }
    }

    async handleWalletConnection() {
        console.log('Upload: handleWalletConnection called');
        
        // Use the direct wallet connection system
        if (window.walletState && window.walletState.isConnected) {
            // Already connected, disconnect
            if (window.disconnectWalletDirect) {
                window.disconnectWalletDirect();
            }
            this.showConnectWalletPrompt();
        } else {
            // Not connected, try to connect
            if (window.connectWalletDirect) {
                try {
                    await window.connectWalletDirect();
                    // Check if connection was successful
                    if (window.walletState && window.walletState.isConnected) {
                        this.hideConnectWalletPrompt();
                    }
                } catch (error) {
                    console.error('Upload: Wallet connection failed', error);
                }
            } else {
                console.error('Upload: Direct wallet connection not available');
            }
        }
    }

    showConnectWalletPrompt() {
        const uploadForm = document.getElementById('uploadForm');
        const connectPrompt = document.getElementById('connectWalletPrompt');
        
        if (uploadForm) uploadForm.style.display = 'none';
        if (connectPrompt) connectPrompt.style.display = 'block';
    }

    hideConnectWalletPrompt() {
        const uploadForm = document.getElementById('uploadForm');
        const connectPrompt = document.getElementById('connectWalletPrompt');
        
        if (uploadForm) uploadForm.style.display = 'block';
        if (connectPrompt) connectPrompt.style.display = 'none';
    }

    handleFileSelect(event) {
        const file = event.target.files[0];
        if (!file) return;

        const preview = document.getElementById('previewImage');
        const uploadArea = document.querySelector('.upload-area');
        
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (preview) {
                    preview.src = e.target.result;
                    preview.style.display = 'block';
                }
                if (uploadArea) {
                    uploadArea.classList.add('has-file');
                }
            };
            reader.readAsDataURL(file);
        } else {
            this.walletConnection.showMessage('Please select an image file.', 'error');
        }
    }

    async handleMintNFT() {
        if (!this.walletConnection.getConnectionStatus()) {
            this.walletConnection.showMessage('Please connect your wallet first.', 'error');
            return;
        }

        const walletAddress = this.walletConnection.getWalletAddress();
        const title = document.getElementById('nftTitle')?.value;
        const description = document.getElementById('nftDescription')?.value;
        const price = document.getElementById('nftPrice')?.value;
        const fileInput = document.getElementById('artworkFile');

        if (!title || !description || !price || !fileInput?.files[0]) {
            this.walletConnection.showMessage('Please fill in all fields and select an image.', 'error');
            return;
        }

        // Check if user is registered as artist
        if (!window.userStore.isArtistRegistered(walletAddress)) {
            this.walletConnection.showMessage('You must be a registered artist to mint NFTs.', 'error');
            setTimeout(() => {
                window.location.href = 'artist-register.html';
            }, 2000);
            return;
        }

        // Show loading state
        const mintBtn = document.getElementById('mintNFT');
        const originalText = mintBtn?.textContent;
        if (mintBtn) {
            mintBtn.textContent = 'Minting NFT...';
            mintBtn.disabled = true;
        }

        try {
            // Process image upload
            const imageResult = await window.imageHandler.processImage(fileInput.files[0]);
            
            // Create NFT data
            const nftData = {
                name: title,
                description: description,
                price: price,
                creator: walletAddress,
                image: imageResult.imageId,
                category: 'art' // Default category
            };

            // Create NFT in storage
            const newNFT = window.userStore.createNFT(nftData);
            
            // Simulate blockchain minting delay
            setTimeout(() => {
                this.walletConnection.showMessage(`NFT "${title}" minted successfully!`, 'success');
                this.resetForm();
                
                if (mintBtn) {
                    mintBtn.textContent = originalText;
                    mintBtn.disabled = false;
                }
                
                // Redirect to profile to view the new NFT
                setTimeout(() => {
                    window.location.href = 'profile.html';
                }, 2000);
            }, 2000);
            
        } catch (error) {
            console.error('Minting error:', error);
            this.walletConnection.showMessage('Failed to mint NFT: ' + error.message, 'error');
            
            if (mintBtn) {
                mintBtn.textContent = originalText;
                mintBtn.disabled = false;
            }
        }
    }

    resetForm() {
        const form = document.getElementById('uploadForm');
        if (form) {
            form.reset();
        }
        
        const preview = document.getElementById('previewImage');
        const uploadArea = document.querySelector('.upload-area');
        
        if (preview) {
            preview.style.display = 'none';
            preview.src = '';
        }
        
        if (uploadArea) {
            uploadArea.classList.remove('has-file');
        }
    }
}

// Initialize upload app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new UploadApp();
});
