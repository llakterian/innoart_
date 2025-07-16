// Main Application Logic
class App {
    constructor() {
        this.authManager = window.authManager;
        this.apiClient = window.apiClient;
        this.uiManager = window.uiManager;
        this.transactionService = window.transactionService;
        this.nftService = window.nftService;
        this.artistService = window.artistService;
        this.userService = window.userService;
        this.init();
    }

    async init() {
        this.setupEventListeners();
        this.authManager.loadSession(); // Load session on every page
        this.updateWalletUI();
        this.listenForAuthChanges();
    }

    setupEventListeners() {
        document.addEventListener('click', async (event) => {
            const target = event.target.closest('[data-wallet-connect]');
            if (target) {
                event.preventDefault();
                if (this.authManager.getAuthState().isAuthenticated) {
                    this.authManager.logout();
                    this.updateWalletUI();
                } else {
                    this.uiManager.renderWalletState('connecting');
                    try {
                        await this.authManager.login();
                    } catch (error) {
                        this.uiManager.showNotification(error.message, 'error');
                    } finally {
                        this.updateWalletUI();
                    }
                }
            }
        });
    }

    updateWalletUI() {
        const authState = this.authManager.getAuthState();
        if (authState.isAuthenticated) {
            this.uiManager.renderWalletState('connected', authState.walletAddress);
        } else {
            this.uiManager.renderWalletState('disconnected');
        }
    }

    listenForAuthChanges() {
        this.authManager.channel.onmessage = (event) => {
            if (event.data.type === 'login' || event.data.type === 'logout') {
                this.updateWalletUI();
                // Reload the page to reflect the new state
                window.location.reload();
            }
        };
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new App();
});