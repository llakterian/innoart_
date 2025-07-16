// Secure Authentication and Session Management
class AuthManager {
    constructor() {
        this.sessionKey = 'innoart_session';
        this.state = {
            isAuthenticated: false,
            walletAddress: null,
            token: null,
        };
        this.channel = new BroadcastChannel('auth');
        this.init();
    }

    init() {
        this.loadSession();
        this.setupEventListeners();
    }

    loadSession() {
        const session = JSON.parse(localStorage.getItem(this.sessionKey));
        if (session && session.token && session.walletAddress) {
            this.state.isAuthenticated = true;
            this.state.walletAddress = session.walletAddress;
            this.state.token = session.token;
        }
    }

    saveSession() {
        localStorage.setItem(this.sessionKey, JSON.stringify(this.state));
    }

    clearSession() {
        localStorage.removeItem(this.sessionKey);
        this.state.isAuthenticated = false;
        this.state.walletAddress = null;
        this.state.token = null;
    }

    async login() {
        if (typeof window.ethereum === 'undefined') {
            throw new Error('MetaMask not installed');
        }

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const walletAddress = accounts[0];

        // In a real application, you would send the walletAddress to the backend,
        // receive a challenge, sign it with MetaMask, and send the signature back
        // for verification. The backend would then issue a JWT.
        // For this example, we'll simulate a token.
        const token = `simulated_jwt_${walletAddress}_${Date.now()}`;

        this.state.isAuthenticated = true;
        this.state.walletAddress = walletAddress;
        this.state.token = token;
        this.saveSession();
        this.channel.postMessage({ type: 'login', ...this.state });
    }

    logout() {
        this.clearSession();
        this.channel.postMessage({ type: 'logout' });
    }

    getAuthState() {
        return this.state;
    }

    setupEventListeners() {
        // Listen for account changes in MetaMask
        if (typeof window.ethereum !== 'undefined') {
            window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length === 0) {
                    this.logout();
                } else if (accounts[0] !== this.state.walletAddress) {
                    this.logout();
                    this.login();
                }
            });
        }
    }
}

window.authManager = new AuthManager();