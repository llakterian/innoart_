// Enhanced Profile page functionality
class ProfileApp {
    constructor() {
        this.walletConnection = window.walletConnection;
        this.userStore = window.userStore;
        this.currentUser = null;
        this.isEditing = false;
        this.userProfile = null;
        this.init();
    }

    async init() {
        console.log('Initializing Enhanced Profile App...');
        this.setupEventListeners();
        this.checkWalletConnection();
        console.log('Enhanced Profile App initialized');
    }

    setupEventListeners() {
        // Listen for wallet connection events
        window.addEventListener('walletConnected', (event) => {
            console.log('Wallet connected in profile:', event.detail.address);
            this.handleWalletConnected(event.detail.address);
        });

        window.addEventListener('walletDisconnected', () => {
            console.log('Wallet disconnected in profile');
            this.handleWalletDisconnected();
        });

        // Mobile menu toggle
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        
        if (mobileMenuToggle && mobileMenu) {
            mobileMenuToggle.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
            });
        }

        // Profile editing buttons
        const editBtn = document.getElementById('editProfileBtn');
        const saveBtn = document.getElementById('saveProfileBtn');
        const cancelBtn = document.getElementById('cancelEditBtn');
        
        if (editBtn) {
            editBtn.addEventListener('click', () => this.startEditing());
        }
        
        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.saveProfile());
        }
        
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => this.cancelEditing());
        }

        // Tab switching
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('tab-btn')) {
                this.switchTab(e.target.dataset.tab);
            }
        });

        // Profile form submission
        const profileForm = document.getElementById('profileForm');
        if (profileForm) {
            profileForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveProfile();
            });
        }
    }

    checkWalletConnection() {
        if (this.walletConnection && this.walletConnection.getConnectionStatus()) {
            const address = this.walletConnection.getWalletAddress();
            this.handleWalletConnected(address);
        } else {
            this.showWelcomeSection();
        }
    }

    showWelcomeSection() {
        const welcomeSection = document.getElementById('welcomeSection');
        const profileContent = document.getElementById('profileContent');
        
        if (welcomeSection) welcomeSection.style.display = 'block';
        if (profileContent) profileContent.style.display = 'none';
    }

    handleWalletConnected(address) {
        console.log('Handling wallet connection for:', address);
        
        this.currentUser = address;
        this.showProfileContent();
        this.loadUserProfile(address);
        this.loadUserNFTs(address);
        this.checkArtistStatus(address);
    }

    handleWalletDisconnected() {
        this.currentUser = null;
        this.userProfile = null;
        this.showWelcomeSection();
    }

    showProfileContent() {
        const welcomeSection = document.getElementById('welcomeSection');
        const profileContent = document.getElementById('profileContent');
        
        if (welcomeSection) welcomeSection.style.display = 'none';
        if (profileContent) profileContent.style.display = 'block';
        
        // Update address display
        this.updateAddressDisplay();
    }

    updateAddressDisplay() {
        const userAddress = document.getElementById('userAddress');
        const userAddressDisplay = document.getElementById('userAddressDisplay');
        const userInitials = document.getElementById('userInitials');
        
        if (this.currentUser) {
            const shortAddress = this.formatAddress(this.currentUser);
            
            if (userAddress) {
                userAddress.textContent = this.userProfile?.profileName || shortAddress;
            }
            if (userAddressDisplay) userAddressDisplay.textContent = this.currentUser;
            if (userInitials) {
                const initials = this.userProfile?.profileName 
                    ? this.userProfile.profileName.substring(0, 2).toUpperCase()
                    : this.currentUser.substring(2, 4).toUpperCase();
                userInitials.textContent = initials;
            }
        }
    }

    loadUserProfile(address) {
        // Load user profile from storage
        this.userProfile = this.userStore.getUserProfile(address) || {};
        
        // Display profile information
        this.displayProfileInfo();
        
        // Populate edit form with current data
        this.populateEditForm();
    }

    displayProfileInfo() {
        const fields = {
            displayName: this.userProfile.profileName || 'Not set',
            displayBio: this.userProfile.profileBio || 'No bio provided',
            displayWebsite: this.userProfile.profileWebsite || 'Not provided',
            displaySocial: this.userProfile.profileSocial || 'Not provided',
            displayEmail: this.userProfile.profileEmail || 'Not provided',
            displayLocation: this.userProfile.profileLocation || 'Not provided'
        };

        Object.entries(fields).forEach(([elementId, value]) => {
            const element = document.getElementById(elementId);
            if (element) {
                if (elementId === 'displayWebsite' && value !== 'Not provided') {
                    element.innerHTML = `<a href="${value}" target="_blank" rel="noopener">${value}</a>`;
                } else if (elementId === 'displaySocial' && value !== 'Not provided') {
                    const isUrl = value.startsWith('http');
                    element.innerHTML = isUrl 
                        ? `<a href="${value}" target="_blank" rel="noopener">${value}</a>`
                        : value;
                } else {
                    element.textContent = value;
                }
            }
        });
    }

    populateEditForm() {
        const fields = {
            profileName: this.userProfile.profileName || '',
            profileBio: this.userProfile.profileBio || '',
            profileWebsite: this.userProfile.profileWebsite || '',
            profileSocial: this.userProfile.profileSocial || '',
            profileEmail: this.userProfile.profileEmail || '',
            profileLocation: this.userProfile.profileLocation || ''
        };

        Object.entries(fields).forEach(([fieldId, value]) => {
            const element = document.getElementById(fieldId);
            if (element) {
                element.value = value;
            }
        });
    }

    checkArtistStatus(address) {
        const isArtist = this.userStore.isArtistRegistered(address);
        const artistStatus = document.getElementById('artistStatus');
        const nonArtistStatus = document.getElementById('nonArtistStatus');
        const artistInfo = document.getElementById('artistInfo');
        const createdTab = document.getElementById('createdTab');
        
        if (isArtist) {
            if (artistStatus) artistStatus.style.display = 'block';
            if (nonArtistStatus) nonArtistStatus.style.display = 'none';
            if (artistInfo) artistInfo.style.display = 'block';
            if (createdTab) createdTab.style.display = 'block';
            
            this.loadArtistStats(address);
            this.loadCreatedNFTs(address);
        } else {
            if (artistStatus) artistStatus.style.display = 'none';
            if (nonArtistStatus) nonArtistStatus.style.display = 'block';
            if (artistInfo) artistInfo.style.display = 'none';
            if (createdTab) createdTab.style.display = 'none';
        }
    }

    loadArtistStats(address) {
        const artist = this.userStore.getArtist(address);
        const userNFTs = this.userStore.getUserNFTs(address);
        
        if (artist) {
            const totalNFTs = document.getElementById('totalNFTsCreated');
            const totalSales = document.getElementById('totalSales');
            const totalEarnings = document.getElementById('totalEarnings');
            const registrationDate = document.getElementById('registrationDate');
            
            if (totalNFTs) totalNFTs.textContent = userNFTs.length;
            if (totalSales) totalSales.textContent = artist.totalSales || 0;
            if (totalEarnings) totalEarnings.textContent = `${artist.totalEarnings || '0'} ETH`;
            if (registrationDate && artist.registrationDate) {
                const date = new Date(artist.registrationDate);
                registrationDate.textContent = date.toLocaleDateString();
            }
        }
    }

    startEditing() {
        this.isEditing = true;
        
        const editBtn = document.getElementById('editProfileBtn');
        const saveBtn = document.getElementById('saveProfileBtn');
        const cancelBtn = document.getElementById('cancelEditBtn');
        const profileDisplay = document.getElementById('profileDisplay');
        const profileEditForm = document.getElementById('profileEditForm');
        
        if (editBtn) editBtn.style.display = 'none';
        if (saveBtn) saveBtn.style.display = 'inline-block';
        if (cancelBtn) cancelBtn.style.display = 'inline-block';
        if (profileDisplay) profileDisplay.style.display = 'none';
        if (profileEditForm) profileEditForm.style.display = 'block';
    }

    cancelEditing() {
        this.isEditing = false;
        
        const editBtn = document.getElementById('editProfileBtn');
        const saveBtn = document.getElementById('saveProfileBtn');
        const cancelBtn = document.getElementById('cancelEditBtn');
        const profileDisplay = document.getElementById('profileDisplay');
        const profileEditForm = document.getElementById('profileEditForm');
        
        if (editBtn) editBtn.style.display = 'inline-block';
        if (saveBtn) saveBtn.style.display = 'none';
        if (cancelBtn) cancelBtn.style.display = 'none';
        if (profileDisplay) profileDisplay.style.display = 'block';
        if (profileEditForm) profileEditForm.style.display = 'none';
        
        // Reset form to original values
        this.populateEditForm();
    }

    saveProfile() {
        if (!this.currentUser) return;
        
        // Get form data
        const profileData = {
            profileName: document.getElementById('profileName')?.value.trim() || '',
            profileBio: document.getElementById('profileBio')?.value.trim() || '',
            profileWebsite: document.getElementById('profileWebsite')?.value.trim() || '',
            profileSocial: document.getElementById('profileSocial')?.value.trim() || '',
            profileEmail: document.getElementById('profileEmail')?.value.trim() || '',
            profileLocation: document.getElementById('profileLocation')?.value.trim() || ''
        };
        
        // Validate required fields
        if (!profileData.profileName) {
            this.showMessage('Display name is required', 'error');
            return;
        }
        
        // Validate website URL if provided
        if (profileData.profileWebsite && !this.isValidUrl(profileData.profileWebsite)) {
            this.showMessage('Please enter a valid website URL', 'error');
            return;
        }
        
        // Validate email if provided
        if (profileData.profileEmail && !this.isValidEmail(profileData.profileEmail)) {
            this.showMessage('Please enter a valid email address', 'error');
            return;
        }
        
        // Save to user store
        this.userStore.saveUserProfile(this.currentUser, profileData);
        this.userProfile = { ...this.userProfile, ...profileData };
        
        // Update displays
        this.displayProfileInfo();
        this.updateAddressDisplay();
        
        // Show success message
        this.showMessage('Profile saved successfully!', 'success');
        
        // Exit edit mode
        this.cancelEditing();
    }

    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        
        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
            content.style.display = 'none';
        });
        
        const activeContent = document.getElementById(`${tabName}NFTs`);
        if (activeContent) {
            activeContent.classList.add('active');
            activeContent.style.display = 'block';
        }
    }

    loadUserNFTs(address) {
        // Load owned NFTs (purchased by user)
        const allNFTs = this.userStore.getNFTs();
        const ownedNFTs = allNFTs.filter(nft => nft.owner === address);
        
        this.renderNFTGrid('userNFTGrid', ownedNFTs, 'owned');
    }

    loadCreatedNFTs(address) {
        // Load created NFTs (created by user)
        const createdNFTs = this.userStore.getUserNFTs(address);
        this.renderNFTGrid('artistNFTGrid', createdNFTs, 'created');
    }

    renderNFTGrid(gridId, nfts, type) {
        const nftGrid = document.getElementById(gridId);
        if (!nftGrid) return;
        
        if (nfts.length === 0) {
            const emptyMessage = type === 'owned' 
                ? 'You don\'t own any NFTs yet. Explore the gallery to start your collection!'
                : 'You haven\'t created any NFTs yet. Start your artistic journey!';
            
            const emptyLink = type === 'owned' 
                ? '<a href="gallery.html" class="btn btn-primary">Browse Gallery</a>'
                : '<a href="upload.html" class="btn btn-primary">Create NFT</a>';
            
            nftGrid.innerHTML = `
                <div class="empty-state">
                    <h4>No NFTs ${type === 'owned' ? 'Owned' : 'Created'}</h4>
                    <p>${emptyMessage}</p>
                    ${emptyLink}
                </div>
            `;
            return;
        }
        
        nftGrid.innerHTML = nfts.map(nft => `
            <div class="nft-item">
                <img src="${this.getNFTImage(nft)}" alt="${nft.name}" loading="lazy">
                <div class="nft-item-info">
                    <div class="nft-item-title">${nft.name}</div>
                    <div class="nft-item-price">${nft.price} ETH</div>
                    <div class="nft-item-status ${this.getNFTStatusClass(nft)}">
                        ${this.getNFTStatusText(nft)}
                    </div>
                    ${type === 'created' ? this.getCreatorActions(nft) : ''}
                </div>
            </div>
        `).join('');
    }

    getNFTStatusClass(nft) {
        if (nft.sold) return 'sold';
        if (nft.forSale) return 'for-sale';
        return 'not-for-sale';
    }

    getNFTStatusText(nft) {
        if (nft.sold) return 'Sold';
        if (nft.forSale) return 'For Sale';
        return 'Not for Sale';
    }

    getCreatorActions(nft) {
        if (nft.sold) return '';
        
        const toggleText = nft.forSale ? 'Remove from Sale' : 'Put on Sale';
        return `
            <div class="action-buttons">
                <button class="btn-toggle" onclick="profileApp.toggleNFTSale('${nft.id}')">
                    ${toggleText}
                </button>
            </div>
        `;
    }

    toggleNFTSale(nftId) {
        if (!this.currentUser) return;
        
        const updatedNFT = this.userStore.toggleNFTSale(nftId, this.currentUser);
        if (updatedNFT) {
            const message = updatedNFT.forSale 
                ? 'NFT is now available for sale'
                : 'NFT removed from sale';
            this.showMessage(message, 'success');
            
            // Refresh the created NFTs display
            this.loadCreatedNFTs(this.currentUser);
        } else {
            this.showMessage('Failed to update NFT status', 'error');
        }
    }

    getNFTImage(nft) {
        if (nft.image && window.imageHandler) {
            const imageData = window.imageHandler.getImage(nft.image);
            if (imageData) {
                return imageData.data;
            }
        }
        
        // Fallback to generated image
        return this.generateNFTImage(nft.id, nft.name);
    }

    generateNFTImage(id, title) {
        const canvas = document.createElement('canvas');
        canvas.width = 300;
        canvas.height = 300;
        const ctx = canvas.getContext('2d');

        // Create gradient background
        const gradient = ctx.createLinearGradient(0, 0, 300, 300);
        gradient.addColorStop(0, '#6366f1');
        gradient.addColorStop(1, '#ec4899');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 300, 300);

        // Add text
        ctx.fillStyle = 'white';
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('🎨', 150, 130);

        ctx.font = '16px Arial';
        ctx.fillText(title || 'NFT', 150, 160);

        ctx.font = '12px Arial';
        ctx.fillText(`ID: ${id}`, 150, 180);

        return canvas.toDataURL();
    }

    isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    formatAddress(address) {
        if (!address) return '';
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    }

    showMessage(message, type = 'info') {
        if (this.walletConnection && this.walletConnection.showMessage) {
            this.walletConnection.showMessage(message, type);
        } else {
            console.log(`[${type.toUpperCase()}] ${message}`);
        }
    }
}

// Initialize profile app
document.addEventListener('DOMContentLoaded', () => {
    window.profileApp = new ProfileApp();
});

// Export for global access
window.ProfileApp = ProfileApp;