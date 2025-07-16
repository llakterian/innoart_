class EditProfilePage {
    constructor() {
        this.authManager = window.authManager;
        this.userService = window.userService;
        this.uiManager = window.uiManager;
        this.init();
    }

    async init() {
        this.authManager.loadSession();
        this.addEventListeners();
        this.loadProfile();
    }

    addEventListeners() {
        document.getElementById('saveProfileBtn')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.saveProfile();
        });
    }

    async loadProfile() {
        const authState = this.authManager.getAuthState();
        if (!authState.isAuthenticated) {
            window.location.href = 'profile.html';
            return;
        }

        try {
            const profile = await this.userService.getProfile(authState.walletAddress);
            this.renderProfile(profile);
        } catch (error) {
            this.uiManager.showNotification('Failed to load profile.', 'error');
        }
    }

    renderProfile(profile) {
        document.getElementById('artistName').value = profile.name;
        document.getElementById('artistBio').value = profile.bio;
        document.getElementById('artistWebsite').value = profile.social;
    }

    async saveProfile() {
        const walletAddress = this.authManager.getAuthState().walletAddress;
        const profileData = {
            name: document.getElementById('artistName').value,
            bio: document.getElementById('artistBio').value,
            social: document.getElementById('artistWebsite').value,
        };

        try {
            await this.userService.updateProfile(walletAddress, profileData);
            this.uiManager.showNotification('Profile updated successfully!', 'success');
            window.location.href = 'profile.html';
        } catch (error) {
            this.uiManager.showNotification('Failed to update profile.', 'error');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('edit-profile.html')) {
        new EditProfilePage();
    }
});