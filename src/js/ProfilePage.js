class ProfilePage {
    constructor() {
        this.authManager = window.authManager;
        this.userService = window.userService;
        this.uiManager = window.uiManager;
        this.init();
    }

    async init() {
        this.addEventListeners();
        this.checkAuthState();
    }

    addEventListeners() {
        document.getElementById('editProfileBtn')?.addEventListener('click', () => this.toggleEditMode(true));
        document.getElementById('saveProfileBtn')?.addEventListener('click', () => this.saveProfile());
        document.getElementById('cancelEditBtn')?.addEventListener('click', () => this.toggleEditMode(false));
    }

    checkAuthState() {
        const authState = this.authManager.getAuthState();
        if (authState.isAuthenticated) {
            this.loadProfile(authState.walletAddress);
            document.getElementById('profileContent').style.display = 'grid';
            document.getElementById('welcomeSection').style.display = 'none';
        } else {
            document.getElementById('profileContent').style.display = 'none';
            document.getElementById('welcomeSection').style.display = 'block';
        }
    }

    async loadProfile(walletAddress) {
        try {
            const profile = await this.userService.getProfile(walletAddress);
            this.renderProfile(profile);
        } catch (error) {
            this.uiManager.showNotification('Failed to load profile.', 'error');
        }
    }

    renderProfile(profile) {
        document.getElementById('userName').textContent = this.uiManager.sanitize(profile.name);
        document.getElementById('userAddressDisplay').textContent = this.uiManager.sanitize(profile.walletAddress);
        document.getElementById('userInitials').textContent = this.uiManager.sanitize(profile.name.charAt(0));

        // Populate form fields
        document.getElementById('artistName').value = profile.name;
        document.getElementById('artistBio').value = profile.bio;
        document.getElementById('artistWebsite').value = profile.social;
    }

    toggleEditMode(isEditing) {
        const form = document.getElementById('artistProfileForm');
        const editBtn = document.getElementById('editProfileBtn');
        const saveBtn = document.getElementById('saveProfileBtn');
        const cancelBtn = document.getElementById('cancelEditBtn');

        if (isEditing) {
            form.style.display = 'block';
            editBtn.style.display = 'none';
            saveBtn.style.display = 'block';
            cancelBtn.style.display = 'block';
        } else {
            form.style.display = 'none';
            editBtn.style.display = 'block';
            saveBtn.style.display = 'none';
            cancelBtn.style.display = 'none';
        }
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
            this.toggleEditMode(false);
            this.renderProfile({ ...profileData, walletAddress });
        } catch (error) {
            this.uiManager.showNotification('Failed to update profile.', 'error');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('profile.html')) {
        new ProfilePage();
    }
});