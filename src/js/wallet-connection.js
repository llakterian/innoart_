// Unified Wallet Connection System for InnArt
class WalletConnection {
    constructor() {
        this.state = {
            isConnected: false,
            isConnecting: false,
            walletAddress: null,
            chainId: null
        };

        this.init();
    }

    async init() {
        console.log('Initializing wallet connection system...');

        // Check for existing connection
        await this.checkExistingConnection();

        // Set up event listeners
        this.setupEventListeners();

        // Set up MetaMask event listeners
        this.setupMetaMaskListeners();

        // Initial UI update
        this.updateUI();

        console.log('Wallet connection system initialized');
    }

    async checkExistingConnection() {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    this.state.isConnected = true;
                    this.state.walletAddress = accounts[0];

                    // Get chain ID
                    this.state.chainId = await window.ethereum.request({ method: 'eth_chainId' });

                    console.log('Existing wallet connection found:', accounts[0]);
                }
            } catch (error) {
                console.error('Error checking existing connection:', error);
            }
        }
    }

    setupEventListeners() {
        // Global click handler for wallet connection buttons
        document.addEventListener('click', (event) => {
            const target = event.target;

            // Check if clicked element is a wallet connection button
            if (this.isWalletButton(target)) {
                event.preventDefault();
                event.stopPropagation();
                this.toggleConnection();
            }
        });

        // Update UI periodically as fallback
        setInterval(() => {
            this.updateUI();
        }, 3000);
    }

    isWalletButton(element) {
        return (
            element.id === 'connectWallet' ||
            element.id === 'connectWalletBtn' ||
            element.classList.contains('connect-wallet-btn') ||
            element.hasAttribute('data-wallet-connect') ||
            (element.onclick && element.onclick.toString().includes('connectWallet'))
        );
    }

    setupMetaMaskListeners() {
        if (typeof window.ethereum !== 'undefined') {
            // Account changes
            window.ethereum.on('accountsChanged', (accounts) => {
                console.log('Accounts changed:', accounts);
                if (accounts.length === 0) {
                    this.disconnect();
                } else {
                    this.state.isConnected = true;
                    this.state.walletAddress = accounts[0];
                    this.updateUI();
                    this.showMessage('Account switched successfully', 'success');
                }
            });

            // Chain changes
            window.ethereum.on('chainChanged', (chainId) => {
                console.log('Chain changed:', chainId);
                this.state.chainId = chainId;
                this.updateUI();
            });

            // Connection events
            window.ethereum.on('connect', (connectInfo) => {
                console.log('MetaMask connected:', connectInfo);
            });

            window.ethereum.on('disconnect', (error) => {
                console.log('MetaMask disconnected:', error);
                this.disconnect();
            });
        }
    }

    async toggleConnection() {
        if (this.state.isConnected) {
            this.disconnect();
        } else {
            await this.connect();
        }
    }

    async connect() {
        if (this.state.isConnecting) {
            this.showMessage('Connection already in progress', 'info');
            return;
        }

        this.state.isConnecting = true;
        this.updateUI();

        try {
            // Check if MetaMask is installed
            if (typeof window.ethereum === 'undefined') {
                throw new Error('MetaMask not installed. Please install MetaMask to continue.');
            }

            // Request account access
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });

            if (accounts.length === 0) {
                throw new Error('No accounts found');
            }

            // Get chain ID
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });

            // Update state
            this.state.isConnected = true;
            this.state.walletAddress = accounts[0];
            this.state.chainId = chainId;

            // Request signature for authentication
            try {
                const message = `Welcome to InnArt!\n\nSign this message to authenticate your wallet.\n\nTimestamp: ${new Date().toISOString()}\nAddress: ${accounts[0]}`;

                const signature = await window.ethereum.request({
                    method: 'personal_sign',
                    params: [message, accounts[0]]
                });

                // Store authentication data
                sessionStorage.setItem('wallet_signature', signature);
                sessionStorage.setItem('wallet_address', accounts[0]);
                sessionStorage.setItem('wallet_auth_timestamp', Date.now().toString());

                this.showMessage('Wallet connected and authenticated successfully!', 'success');
            } catch (signError) {
                console.warn('Signature declined:', signError);
                this.showMessage('Wallet connected (authentication signature declined)', 'warning');
            }

            // Update UI
            this.updateUI();

            // Trigger custom event
            window.dispatchEvent(new CustomEvent('walletConnected', {
                detail: { address: accounts[0], chainId }
            }));

        } catch (error) {
            console.error('Connection error:', error);

            let errorMessage = 'Failed to connect wallet';
            if (error.code === 4001) {
                errorMessage = 'Connection rejected by user';
            } else if (error.code === -32002) {
                errorMessage = 'Connection request pending in MetaMask';
            } else if (error.message.includes('not installed')) {
                errorMessage = 'MetaMask not installed. Please install MetaMask extension.';
            }

            this.showMessage(errorMessage, 'error');
        } finally {
            this.state.isConnecting = false;
            this.updateUI();
        }
    }

    disconnect() {
        console.log('Disconnecting wallet...');

        // Clear state
        this.state.isConnected = false;
        this.state.walletAddress = null;
        this.state.chainId = null;

        // Clear session storage
        sessionStorage.removeItem('wallet_signature');
        sessionStorage.removeItem('wallet_address');
        sessionStorage.removeItem('wallet_auth_timestamp');

        // Update UI
        this.updateUI();

        // Show message
        this.showMessage('Wallet disconnected', 'success');

        // Trigger custom event
        window.dispatchEvent(new CustomEvent('walletDisconnected'));
    }

    updateUI() {
        const buttons = this.getAllWalletButtons();

        buttons.forEach(button => {
            if (!button) return;

            try {
                // Remove all state classes
                button.classList.remove('btn-connected', 'btn-connecting');

                if (this.state.isConnecting) {
                    button.textContent = 'Connecting...';
                    button.disabled = true;
                    button.classList.add('btn-connecting');
                    button.title = 'Connecting to wallet...';
                } else if (this.state.isConnected && this.state.walletAddress) {
                    const shortAddress = this.formatAddress(this.state.walletAddress);
                    button.textContent = shortAddress;
                    button.disabled = false;
                    button.classList.add('btn-connected');
                    button.title = `Connected: ${this.state.walletAddress}\nClick to disconnect`;
                } else {
                    button.textContent = 'Connect Wallet';
                    button.disabled = false;
                    button.title = 'Click to connect your wallet';
                }
            } catch (error) {
                console.error('Error updating button:', error);
            }
        });
    }

    getAllWalletButtons() {
        const selectors = [
            '#connectWallet',
            '#connectWalletBtn',
            '.connect-wallet-btn',
            '[data-wallet-connect]'
        ];

        const buttons = [];
        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => buttons.push(el));
        });

        return buttons;
    }

    formatAddress(address) {
        if (!address) return '';
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    }

    showMessage(message, type = 'info', duration = 5000) {
        console.log(`[${type.toUpperCase()}] ${message}`);

        // Remove existing messages
        const existingMessages = document.querySelectorAll('.wallet-message');
        existingMessages.forEach(msg => msg.remove());

        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `wallet-message wallet-message-${type}`;
        messageDiv.textContent = message;

        // Apply styles
        Object.assign(messageDiv.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 20px',
            borderRadius: '8px',
            fontWeight: '500',
            zIndex: '10000',
            maxWidth: '350px',
            wordWrap: 'break-word',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            transition: 'opacity 0.3s ease-in-out',
            opacity: '0'
        });

        // Type-specific styles
        const typeStyles = {
            success: { background: '#10b981', color: 'white' },
            error: { background: '#ef4444', color: 'white' },
            warning: { background: '#f59e0b', color: 'white' },
            info: { background: '#3b82f6', color: 'white' }
        };

        Object.assign(messageDiv.style, typeStyles[type] || typeStyles.info);

        document.body.appendChild(messageDiv);

        // Fade in
        setTimeout(() => {
            messageDiv.style.opacity = '1';
        }, 100);

        // Auto remove
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 300);
        }, duration);
    }

    // Public API methods
    getConnectionStatus() {
        return this.state.isConnected;
    }

    getWalletAddress() {
        return this.state.walletAddress;
    }

    getChainId() {
        return this.state.chainId;
    }

    isConnecting() {
        return this.state.isConnecting;
    }
}

// Initialize wallet connection system
const walletConnection = new WalletConnection();

// Export for global access
window.walletConnection = walletConnection;

// Legacy compatibility
window.connectWallet = () => walletConnection.connect();
window.disconnectWallet = () => walletConnection.disconnect();

export default walletConnection;