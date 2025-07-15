// Profile page main functionality
class ProfileManager {
    constructor() {
        this.isEditing = false;
        this.userProfile = null;
        this.init();
    }

    async init() {
        try {
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.initializeProfile());
            } else {
                this.initializeProfile();
            }
        } catch (error) {
            console.error('Error initializing profile:', error);
            // Don't redirect on error, just show error state
            this.showErrorState();
        }
    }

    async initializeProfile() {
        try {
            // Set up event listeners first
            this.setupEventListeners();
            
            // Check wallet connection without forcing redirect
            const isConnected = await this.checkWalletConnection();
            
            if (isConnected) {
                await this.loadUserProfile();
                this.showProfileContent();
            } else {
                this.showWelcomeSection();
            }
        } catch (error) {
            console.error('Error in initializeProfile:', error);
            this.showErrorState();
        }
    }

    async checkWalletConnection() {
        try {
            // Check if wallet is connected without throwing errors
            if (typeof window.ethereum !== 'undefined') {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                return accounts && accounts.length > 0;
            }
            return false;
        } catch (error) {
            console.log('Wallet check failed:', error);
            return false;
        }
    }

    setupEventListeners() {
        // Edit profile button
        const editBtn = document.getElementById('editProfileBtn');
        if (editBtn) {
            editBtn.addEventListener('click', () => this.toggleEditMode());
        }

        // Save profile button
        const saveBtn = document.getElementById('saveProfileBtn');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.saveProfile());
        }

        // Mobile menu toggle
        const mobileToggle = document.getElementById('mobileMenuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileToggle && mobileMenu) {
            mobileToggle.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
            });
        }

        // Wallet connection listener
        if (typeof window.ethereum !== 'undefined') {
            window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length > 0) {
                    this.loadUserProfile();
                    this.showProfileContent();
                } else {
                    this.showWelcomeSection();
                }
            });
        }
    }

    async loadUserProfile() {
        try {
            if (typeof window.ethereum !== 'undefined') {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts && accounts.length > 0) {
                    const address = accounts[0];
                    this.updateUserDisplay(address);
                    
                    // Load saved profile data
                    const savedProfile = localStorage.getItem(`profile_${address}`);
                    if (savedProfile) {
                        this.userProfile = JSON.parse(savedProfile);
                        this.populateProfileForm();
                    }
                }
            }
        } catch (error) {
            console.error('Error loading user profile:', error);
        }
    }

    updateUserDisplay(address) {
        // Update user address display
        const userAddress = document.getElementById('userAddress');
        const userAddressDisplay = document.getElementById('userAddressDisplay');
        const userInitials = document.getElementById('userInitials');
        const walletStatus = document.getElementById('walletStatus');

        if (userAddress) {
            userAddress.textContent = this.userProfile?.artistName || `${address.slice(0, 6)}...${address.slice(-4)}`;
        }
        
        if (userAddressDisplay) {
            userAddressDisplay.textContent = address;
        }
        
        if (userInitials) {
            userInitials.textContent = this.userProfile?.artistName ? 
                this.userProfile.artistName.charAt(0).toUpperCase() : 
                address.charAt(2).toUpperCase();
        }

        if (walletStatus) {
            walletStatus.innerHTML = `<span>✓ ${address.slice(0, 6)}...${address.slice(-4)}</span>`;
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
        if (profileContent) profileContent.style.display = 'block';
    }

    showErrorState() {
        // Show a basic error state without redirecting
        const container = document.querySelector('.container');
        if (container) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-state';
            errorDiv.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: var(--text-light);">
                    <h2>Unable to load profile</h2>
                    <p>Please try refreshing the page or connecting your wallet.</p>
                    <button class="btn btn-primary" onclick="window.location.reload()">Refresh Page</button>
                </div>
            `;
            container.appendChild(errorDiv);
        }
    }

    toggleEditMode() {
        this.isEditing = !this.isEditing;
        const form = document.getElementById('artistProfileForm');
        const editBtn = document.getElementById('editProfileBtn');
        const saveBtn = document.getElementById('saveProfileBtn');

        if (form) {
            form.style.display = this.isEditing ? 'block' : 'none';
        }
        
        if (editBtn) {
            editBtn.style.display = this.isEditing ? 'none' : 'inline-block';
        }
        
        if (saveBtn) {
            saveBtn.style.display = this.isEditing ? 'inline-block' : 'none';
        }
    }

    populateProfileForm() {
        if (!this.userProfile) return;

        const fields = ['artistName', 'artistBio', 'artistWebsite', 'artistSocial', 'artistEmail', 'artistLocation'];
        fields.forEach(field => {
            const element = document.getElementById(field);
            if (element && this.userProfile[field]) {
                element.value = this.userProfile[field];
            }
        });
    }

    async saveProfile() {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            if (!accounts || accounts.length === 0) {
                alert('Please connect your wallet first');
                return;
            }

            const address = accounts[0];
            const formData = {
                artistName: document.getElementById('artistName')?.value || '',
                artistBio: document.getElementById('artistBio')?.value || '',
                artistWebsite: document.getElementById('artistWebsite')?.value || '',
                artistSocial: document.getElementById('artistSocial')?.value || '',
                artistEmail: document.getElementById('artistEmail')?.value || '',
                artistLocation: document.getElementById('artistLocation')?.value || '',
                lastUpdated: new Date().toISOString()
            };

            // Validate required fields
            if (!formData.artistName.trim()) {
                alert('Artist name is required');
                return;
            }

            if (!formData.artistBio.trim()) {
                alert('Artist bio is required');
                return;
            }

            // Save to localStorage
            localStorage.setItem(`profile_${address}`, JSON.stringify(formData));
            this.userProfile = formData;

            // Update display
            this.updateUserDisplay(address);
            
            // Exit edit mode
            this.toggleEditMode();
            
            alert('Profile saved successfully!');
        } catch (error) {
            console.error('Error saving profile:', error);
            alert('Error saving profile. Please try again.');
        }
    }
}

// Initialize profile manager when script loads
let profileManager;

// Ensure we don't initialize multiple times
if (!window.profileManagerInitialized) {
    window.profileManagerInitialized = true;
    profileManager = new ProfileManager();
}
