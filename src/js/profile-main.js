class ProfileManager {
    constructor() {
        this.isEditing = false;
        this.userProfile = {};
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.setupEventListeners();
            this.checkWalletConnection();
        });
    }

    setupEventListeners() {
        document.getElementById('editProfileBtn').addEventListener('click', () => this.toggleEditMode());
        document.getElementById('saveProfileBtn').addEventListener('click', () => this.saveProfile());

        if (typeof window.ethereum !== 'undefined') {
            window.ethereum.on('accountsChanged', (accounts) => {
                this.handleAccountsChanged(accounts);
            });
        }
    }

    async checkWalletConnection() {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                this.handleAccountsChanged(accounts);
            } catch (error) {
                console.error('Error checking wallet connection:', error);
                this.showWelcomeSection();
            }
        } else {
            this.showWelcomeSection();
        }
    }

    handleAccountsChanged(accounts) {
        if (accounts.length > 0) {
            this.loadUserProfile(accounts[0]);
            this.showProfileContent();
        } else {
            this.showWelcomeSection();
        }
    }

    loadUserProfile(address) {
        this.updateUserDisplay(address);
        const savedProfile = localStorage.getItem(`profile_${address}`);
        if (savedProfile) {
            this.userProfile = JSON.parse(savedProfile);
            this.populateProfileForm();
        }
    }

    updateUserDisplay(address) {
        document.getElementById('userAddress').textContent = this.userProfile.artistName || `${address.slice(0, 6)}...${address.slice(-4)}`;
        document.getElementById('userAddressDisplay').textContent = address;
        document.getElementById('userInitials').textContent = this.userProfile.artistName ? this.userProfile.artistName.charAt(0).toUpperCase() : address.charAt(2).toUpperCase();
    }

    showWelcomeSection() {
        document.getElementById('welcomeSection').style.display = 'block';
        document.getElementById('profileContent').style.display = 'none';
    }

    showProfileContent() {
        document.getElementById('welcomeSection').style.display = 'none';
        document.getElementById('profileContent').style.display = 'grid';
    }

    toggleEditMode() {
        this.isEditing = !this.isEditing;
        const form = document.getElementById('artistProfileForm');
        const editBtn = document.getElementById('editProfileBtn');
        const saveBtn = document.getElementById('saveProfileBtn');

        form.style.display = this.isEditing ? 'block' : 'none';
        editBtn.style.display = this.isEditing ? 'none' : 'block';
        saveBtn.style.display = this.isEditing ? 'block' : 'none';
    }

    populateProfileForm() {
        for (const key in this.userProfile) {
            const element = document.getElementById(key);
            if (element) {
                element.value = this.userProfile[key];
            }
        }
    }

    sanitizeInput(input) {
        const temp = document.createElement('div');
        temp.textContent = input;
        return temp.innerHTML;
    }

    async saveProfile() {
        const address = window.walletState.walletAddress;
        if (!address) {
            alert('Please connect your wallet first.');
            return;
        }

        const formData = {
            artistName: this.sanitizeInput(document.getElementById('artistName').value),
            artistBio: this.sanitizeInput(document.getElementById('artistBio').value),
            artistWebsite: this.sanitizeInput(document.getElementById('artistWebsite').value),
            artistSocial: this.sanitizeInput(document.getElementById('artistSocial').value),
            artistEmail: this.sanitizeInput(document.getElementById('artistEmail').value),
            artistLocation: this.sanitizeInput(document.getElementById('artistLocation').value),
        };

        // Basic validation
        if (!formData.artistName.trim()) {
            alert('Artist name is required.');
            return;
        }

        localStorage.setItem(`profile_${address}`, JSON.stringify(formData));
        this.userProfile = formData;
        this.updateUserDisplay(address);
        this.toggleEditMode();
        alert('Profile saved successfully!');
    }
}

new ProfileManager();
