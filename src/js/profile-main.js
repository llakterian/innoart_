class ProfileManager {
    constructor(wallet) {
        this.wallet = wallet;
        this.isEditing = false;
        this.userProfile = {};
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.setupEventListeners();
            this.checkInitialWalletState();
        });

        // Listen for wallet state changes
        if (typeof window.ethereum !== 'undefined') {
            window.ethereum.on('accountsChanged', (accounts) => {
                this.handleAccountsChanged(accounts);
            });
        }
    }

    checkInitialWalletState() {
        // Check if wallet is already connected
        if (this.wallet && this.wallet.state.isConnected && this.wallet.state.address) {
            this.handleAccountsChanged([this.wallet.state.address]);
        } else {
            // Check MetaMask directly
            if (typeof window.ethereum !== 'undefined') {
                window.ethereum.request({ method: 'eth_accounts' })
                    .then(accounts => this.handleAccountsChanged(accounts))
                    .catch(error => {
                        console.error('Error checking wallet connection:', error);
                        this.showWelcomeSection();
                    });
            } else {
                this.showWelcomeSection();
            }
        }
    }

    setupEventListeners() {
        // Profile editing buttons
        const editBtn = document.getElementById('editProfileBtn');
        const saveBtn = document.getElementById('saveProfileBtn');
        const cancelBtn = document.getElementById('cancelEditBtn');

        if (editBtn) editBtn.addEventListener('click', () => this.toggleEditMode());
        if (saveBtn) saveBtn.addEventListener('click', () => this.saveProfile());
        if (cancelBtn) cancelBtn.addEventListener('click', () => this.cancelEdit());

        // Mobile menu toggle
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mobileMenu = document.getElementById('mobileMenu');

        if (mobileMenuToggle && mobileMenu) {
            mobileMenuToggle.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
            });
        }
    }

    handleAccountsChanged(accounts) {
        if (accounts.length > 0) {
            this.loadUserProfile(accounts[0]);
            this.showProfileContent();
            this.loadUserNFTs(accounts[0]);
            this.loadUserActivity(accounts[0]);
        } else {
            this.showWelcomeSection();
        }
    }

    loadUserProfile(address) {
        this.updateUserDisplay(address);
        const savedProfile = localStorage.getItem(`profile_${address}`);
        if (savedProfile) {
            try {
                this.userProfile = JSON.parse(savedProfile);
                this.populateProfileForm();
            } catch (error) {
                console.error('Error parsing saved profile:', error);
                this.userProfile = {};
            }
        } else {
            this.userProfile = {};
        }
    }

    updateUserDisplay(address) {
        const userName = document.getElementById('userName');
        const userAddressDisplay = document.getElementById('userAddressDisplay');
        const userInitials = document.getElementById('userInitials');

        if (userName) {
            userName.textContent = this.userProfile.artistName || `${address.slice(0, 6)}...${address.slice(-4)}`;
        }
        
        if (userAddressDisplay) {
            userAddressDisplay.textContent = address;
        }
        
        if (userInitials) {
            userInitials.textContent = this.userProfile.artistName 
                ? this.userProfile.artistName.charAt(0).toUpperCase() 
                : address.charAt(2).toUpperCase();
        }
    }

    showWelcomeSection() {
        const welcomeSection = document.getElementById('welcomeSection');
        const profileContent = document.getElementById('profileContent');
        
        if (welcomeSection) welcomeSection.style.display = 'block';
        if (profileContent) profileContent.style.display = 'none';
    }

    showProfileContent() {
        const welcomeSection = document.getElementById('welcomeSection');
        const profileContent = document.getElementById('profileContent');
        
        if (welcomeSection) welcomeSection.style.display = 'none';
        if (profileContent) profileContent.style.display = 'grid';
    }

    toggleEditMode() {
        this.isEditing = !this.isEditing;
        const form = document.getElementById('artistProfileForm');
        const editBtn = document.getElementById('editProfileBtn');
        const saveBtn = document.getElementById('saveProfileBtn');
        const cancelBtn = document.getElementById('cancelEditBtn');

        if (form) form.style.display = this.isEditing ? 'block' : 'none';
        if (editBtn) editBtn.style.display = this.isEditing ? 'none' : 'block';
        if (saveBtn) saveBtn.style.display = this.isEditing ? 'block' : 'none';
        if (cancelBtn) cancelBtn.style.display = this.isEditing ? 'block' : 'none';

        if (this.isEditing) {
            this.populateProfileForm();
        }
    }

    cancelEdit() {
        this.isEditing = false;
        const form = document.getElementById('artistProfileForm');
        const editBtn = document.getElementById('editProfileBtn');
        const saveBtn = document.getElementById('saveProfileBtn');
        const cancelBtn = document.getElementById('cancelEditBtn');

        if (form) form.style.display = 'none';
        if (editBtn) editBtn.style.display = 'block';
        if (saveBtn) saveBtn.style.display = 'none';
        if (cancelBtn) cancelBtn.style.display = 'none';

        // Reset form to original values
        this.populateProfileForm();
    }

    populateProfileForm() {
        const fields = ['artistName', 'artistBio', 'artistWebsite', 'artistSocial', 'artistEmail', 'artistLocation'];
        
        fields.forEach(field => {
            const element = document.getElementById(field);
            if (element) {
                element.value = this.userProfile[field] || '';
            }
        });
    }

    sanitizeInput(input) {
        if (!input) return '';
        const temp = document.createElement('div');
        temp.textContent = input;
        return temp.innerHTML;
    }

    saveProfile() {
        const address = this.wallet?.state?.address;
        if (!address) {
            this.showMessage('Please connect your wallet first.', 'error');
            return;
        }

        const formData = {
            artistName: this.sanitizeInput(document.getElementById('artistName')?.value),
            artistBio: this.sanitizeInput(document.getElementById('artistBio')?.value),
            artistWebsite: this.sanitizeInput(document.getElementById('artistWebsite')?.value),
            artistSocial: this.sanitizeInput(document.getElementById('artistSocial')?.value),
            artistEmail: this.sanitizeInput(document.getElementById('artistEmail')?.value),
            artistLocation: this.sanitizeInput(document.getElementById('artistLocation')?.value),
        };

        // Basic validation
        if (!formData.artistName.trim()) {
            this.showMessage('Artist name is required.', 'error');
            return;
        }

        // Email validation if provided
        if (formData.artistEmail && !this.isValidEmail(formData.artistEmail)) {
            this.showMessage('Please enter a valid email address.', 'error');
            return;
        }

        // URL validation if provided
        if (formData.artistWebsite && !this.isValidURL(formData.artistWebsite)) {
            this.showMessage('Please enter a valid website URL.', 'error');
            return;
        }

        try {
            localStorage.setItem(`profile_${address}`, JSON.stringify(formData));
            this.userProfile = formData;
            this.updateUserDisplay(address);
            this.toggleEditMode();
            this.showMessage('Profile saved successfully!', 'success');
        } catch (error) {
            console.error('Error saving profile:', error);
            this.showMessage('Error saving profile. Please try again.', 'error');
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidURL(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    loadUserNFTs(address) {
        // Load NFTs from localStorage (in a real app, this would be from blockchain)
        const nfts = JSON.parse(localStorage.getItem('userNFTs') || '[]');
        const userNFTs = nfts.filter(nft => nft.owner === address);
        
        this.displayNFTs(userNFTs);
        this.updateStats(address, userNFTs);
    }

    displayNFTs(nfts) {
        const nftGrid = document.getElementById('userNFTGrid');
        if (!nftGrid) return;

        if (nfts.length === 0) {
            nftGrid.innerHTML = `
                <div class="empty-state">
                    <h3>No NFTs Found</h3>
                    <p>You don't own any NFTs yet. Explore the gallery to start your collection!</p>
                    <a href="gallery.html" class="btn btn-primary">Browse Gallery</a>
                </div>
            `;
            return;
        }

        nftGrid.innerHTML = nfts.map(nft => `
            <div class="nft-card" onclick="this.viewNFT('${nft.id}')">
                <div class="nft-image">
                    ${nft.image ? `<img src="${nft.image}" alt="${nft.title}" style="width: 100%; height: 100%; object-fit: cover;">` : '🎨'}
                </div>
                <div class="nft-info">
                    <div class="nft-name">${nft.title}</div>
                    <div class="nft-price">${nft.price} ETH</div>
                </div>
            </div>
        `).join('');
    }

    updateStats(address, userNFTs) {
        // Update NFT count
        const nftCount = document.getElementById('nftCount');
        if (nftCount) nftCount.textContent = userNFTs.length;

        // Load created NFTs count
        const createdNFTs = JSON.parse(localStorage.getItem('createdNFTs') || '[]');
        const userCreated = createdNFTs.filter(nft => nft.creator === address);
        const createdCount = document.getElementById('createdCount');
        if (createdCount) createdCount.textContent = userCreated.length;

        // Load sold count and earnings (placeholder logic)
        const soldCount = document.getElementById('soldCount');
        const totalEarnings = document.getElementById('totalEarnings');
        
        if (soldCount) soldCount.textContent = '0'; // Placeholder
        if (totalEarnings) totalEarnings.textContent = '0.0'; // Placeholder
    }

    loadUserActivity(address) {
        // Load user activity from localStorage (placeholder)
        const activityList = document.getElementById('activityList');
        if (!activityList) return;

        // For now, show empty state
        activityList.innerHTML = `
            <div class="empty-state">
                <h3>No Activity Yet</h3>
                <p>Your recent transactions and activities will appear here.</p>
            </div>
        `;
    }

    showMessage(message, type = 'info', duration = 5000) {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.profile-message');
        existingMessages.forEach(msg => msg.remove());

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;
        
        document.body.appendChild(messageDiv);

        setTimeout(() => {
            messageDiv.remove();
        }, duration);
    }

    viewNFT(nftId) {
        // Navigate to NFT detail view (placeholder)
        console.log('Viewing NFT:', nftId);
    }
}

// Initialize ProfileManager when wallet is available
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        // Wait for wallet to be initialized
        const initProfile = () => {
            if (window.wallet) {
                new ProfileManager(window.wallet);
            } else {
                setTimeout(initProfile, 100);
            }
        };
        initProfile();
    });
}
