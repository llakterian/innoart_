// Enhanced Multi-Wallet Connection System for InnArt
class MultiWalletConnector {
    constructor() {
        this.supportedWallets = {
            metamask: {
                name: 'MetaMask',
                icon: '🦊',
                provider: 'ethereum',
                downloadUrl: 'https://metamask.io/download/',
                mobile: true
            },
            walletconnect: {
                name: 'WalletConnect',
                icon: '🔗',
                provider: 'walletconnect',
                downloadUrl: 'https://walletconnect.com/',
                mobile: true
            },
            coinbase: {
                name: 'Coinbase Wallet',
                icon: '🔵',
                provider: 'coinbaseWallet',
                downloadUrl: 'https://www.coinbase.com/wallet',
                mobile: true
            },
            trust: {
                name: 'Trust Wallet',
                icon: '🛡️',
                provider: 'trustwallet',
                downloadUrl: 'https://trustwallet.com/',
                mobile: true
            },
            rainbow: {
                name: 'Rainbow',
                icon: '🌈',
                provider: 'rainbow',
                downloadUrl: 'https://rainbow.me/',
                mobile: true
            }
        };

        this.state = {
            isConnected: false,
            isConnecting: false,
            walletAddress: null,
            walletType: null,
            chainId: null,
            provider: null
        };

        this.init();
    }

    async init() {
        console.log('🔗 Initializing Multi-Wallet Connector...');

        // Check for existing connections
        await this.checkExistingConnections();

        // Set up event listeners
        this.setupEventListeners();

        // Update UI
        this.updateUI();

        console.log('✅ Multi-Wallet Connector initialized');
    }

    async checkExistingConnections() {
        // Check MetaMask
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    this.state.isConnected = true;
                    this.state.walletAddress = accounts[0];
                    this.state.walletType = 'metamask';
                    this.state.provider = window.ethereum;
                    this.state.chainId = await window.ethereum.request({ method: 'eth_chainId' });

                    console.log('🦊 Existing MetaMask connection found:', accounts[0]);
                    this.setupProviderListeners();
                }
            } catch (error) {
                console.log('No existing MetaMask connection');
            }
        }

        // Check for other wallet connections from localStorage
        const savedConnection = localStorage.getItem('wallet_connection');
        if (savedConnection && !this.state.isConnected) {
            try {
                const connectionData = JSON.parse(savedConnection);
                if (connectionData.address && connectionData.type) {
                    // Attempt to reconnect
                    await this.reconnectWallet(connectionData.type);
                }
            } catch (error) {
                console.log('Failed to restore saved connection:', error);
                localStorage.removeItem('wallet_connection');
            }
        }
    }

    async reconnectWallet(walletType) {
        try {
            switch (walletType) {
                case 'metamask':
                    if (typeof window.ethereum !== 'undefined') {
                        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                        if (accounts.length > 0) {
                            await this.handleConnection('metamask', window.ethereum, accounts[0]);
                        }
                    }
                    break;
                // Add other wallet reconnection logic here
                default:
                    console.log('Reconnection not implemented for:', walletType);
            }
        } catch (error) {
            console.error('Reconnection failed:', error);
        }
    }

    setupEventListeners() {
        // Global click handler for wallet connection buttons
        document.addEventListener('click', (event) => {
            const target = event.target;

            if (this.isWalletButton(target)) {
                event.preventDefault();
                event.stopPropagation();

                if (this.state.isConnected) {
                    this.showDisconnectModal();
                } else {
                    this.showWalletModal();
                }
            }
        });
    }

    setupProviderListeners() {
        if (this.state.provider && this.state.walletType === 'metamask') {
            // Account changes
            this.state.provider.on('accountsChanged', (accounts) => {
                console.log('Accounts changed:', accounts);
                if (accounts.length === 0) {
                    this.disconnect();
                } else {
                    this.state.walletAddress = accounts[0];
                    this.saveConnection();
                    this.updateUI();
                    this.showMessage('Account switched successfully', 'success');
                }
            });

            // Chain changes
            this.state.provider.on('chainChanged', (chainId) => {
                console.log('Chain changed:', chainId);
                this.state.chainId = chainId;
                this.updateUI();
            });

            // Disconnect events
            this.state.provider.on('disconnect', (error) => {
                console.log('Provider disconnected:', error);
                this.disconnect();
            });
        }
    }

    isWalletButton(element) {
        return (
            element.id === 'connectWallet' ||
            element.id === 'connectWalletBtn' ||
            element.id === 'registerConnectBtn' ||
            element.classList.contains('connect-wallet-btn') ||
            element.hasAttribute('data-wallet-connect')
        );
    }

    showWalletModal() {
        const modal = document.createElement('div');
        modal.className = 'wallet-modal-overlay';
        modal.innerHTML = `
            <div class="wallet-modal">
                <div class="wallet-modal-header">
                    <h3>Connect Your Wallet</h3>
                    <button class="close-btn" onclick="this.parentElement.parentElement.parentElement.remove()">&times;</button>
                </div>
                <div class="wallet-modal-content">
                    <p class="wallet-modal-description">
                        Choose your preferred wallet to connect to InnArt. All Ethereum-compatible wallets are supported.
                    </p>
                    <div class="wallet-options">
                        ${this.generateWalletOptions()}
                    </div>
                    <div class="wallet-modal-footer">
                        <p class="wallet-help">
                            Don't have a wallet? <a href="https://ethereum.org/en/wallets/" target="_blank">Learn more</a>
                        </p>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.addWalletModalStyles();

        // Add click handlers for wallet options
        modal.querySelectorAll('.wallet-option').forEach(option => {
            option.addEventListener('click', () => {
                const walletType = option.dataset.wallet;
                modal.remove();
                this.connectWallet(walletType);
            });
        });
    }

    generateWalletOptions() {
        return Object.entries(this.supportedWallets).map(([key, wallet]) => {
            const isAvailable = this.isWalletAvailable(key);
            const statusClass = isAvailable ? 'available' : 'unavailable';
            const statusText = isAvailable ? 'Available' : 'Install';

            return `
                <div class="wallet-option ${statusClass}" data-wallet="${key}">
                    <div class="wallet-icon">${wallet.icon}</div>
                    <div class="wallet-info">
                        <div class="wallet-name">${wallet.name}</div>
                        <div class="wallet-status">${statusText}</div>
                    </div>
                    <div class="wallet-arrow">→</div>
                </div>
            `;
        }).join('');
    }

    isWalletAvailable(walletType) {
        switch (walletType) {
            case 'metamask':
                return typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask;
            case 'coinbase':
                return typeof window.ethereum !== 'undefined' && window.ethereum.isCoinbaseWallet;
            case 'trust':
                return typeof window.ethereum !== 'undefined' && window.ethereum.isTrust;
            default:
                return typeof window.ethereum !== 'undefined';
        }
    }

    async connectWallet(walletType) {
        if (this.state.isConnecting) {
            this.showMessage('Connection already in progress', 'info');
            return;
        }

        this.state.isConnecting = true;
        this.updateUI();

        try {
            switch (walletType) {
                case 'metamask':
                    await this.connectMetaMask();
                    break;
                case 'walletconnect':
                    await this.connectWalletConnect();
                    break;
                case 'coinbase':
                    await this.connectCoinbase();
                    break;
                default:
                    await this.connectGenericWallet(walletType);
            }
        } catch (error) {
            console.error('Connection error:', error);
            this.handleConnectionError(error);
        } finally {
            this.state.isConnecting = false;
            this.updateUI();
        }
    }

    async connectMetaMask() {
        if (typeof window.ethereum === 'undefined') {
            throw new Error('MetaMask not installed');
        }

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });

        await this.handleConnection('metamask', window.ethereum, accounts[0], chainId);
    }

    async connectWalletConnect() {
        // WalletConnect implementation would go here
        // For now, fall back to generic connection
        await this.connectGenericWallet('walletconnect');
    }

    async connectCoinbase() {
        if (typeof window.ethereum !== 'undefined' && window.ethereum.isCoinbaseWallet) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });

            await this.handleConnection('coinbase', window.ethereum, accounts[0], chainId);
        } else {
            throw new Error('Coinbase Wallet not available');
        }
    }

    async connectGenericWallet(walletType) {
        if (typeof window.ethereum === 'undefined') {
            const wallet = this.supportedWallets[walletType];
            window.open(wallet.downloadUrl, '_blank');
            throw new Error(`${wallet.name} not installed`);
        }

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });

        await this.handleConnection(walletType, window.ethereum, accounts[0], chainId);
    }

    async handleConnection(walletType, provider, address, chainId) {
        this.state.isConnected = true;
        this.state.walletAddress = address;
        this.state.walletType = walletType;
        this.state.provider = provider;
        this.state.chainId = chainId;

        // Request signature for authentication
        try {
            const message = `Welcome to InnArt!\n\nSign this message to authenticate your wallet.\n\nTimestamp: ${new Date().toISOString()}\nAddress: ${address}`;

            const signature = await provider.request({
                method: 'personal_sign',
                params: [message, address]
            });

            // Store authentication data
            sessionStorage.setItem('wallet_signature', signature);
            sessionStorage.setItem('wallet_address', address);
            sessionStorage.setItem('wallet_auth_timestamp', Date.now().toString());

            this.showMessage(`${this.supportedWallets[walletType].name} connected and authenticated!`, 'success');
        } catch (signError) {
            console.warn('Signature declined:', signError);
            this.showMessage(`${this.supportedWallets[walletType].name} connected (authentication signature declined)`, 'warning');
        }

        // Save connection
        this.saveConnection();

        // Set up provider listeners
        this.setupProviderListeners();

        // Update UI
        this.updateUI();

        // Trigger custom event
        window.dispatchEvent(new CustomEvent('walletConnected', {
            detail: {
                address,
                chainId,
                walletType,
                provider: walletType
            }
        }));
    }

    saveConnection() {
        const connectionData = {
            address: this.state.walletAddress,
            type: this.state.walletType,
            chainId: this.state.chainId,
            timestamp: Date.now()
        };

        localStorage.setItem('wallet_connection', JSON.stringify(connectionData));
    }

    showDisconnectModal() {
        const modal = document.createElement('div');
        modal.className = 'wallet-modal-overlay';
        modal.innerHTML = `
            <div class="wallet-modal">
                <div class="wallet-modal-header">
                    <h3>Disconnect Wallet</h3>
                    <button class="close-btn" onclick="this.parentElement.parentElement.parentElement.remove()">&times;</button>
                </div>
                <div class="wallet-modal-content">
                    <div class="disconnect-info">
                        <div class="wallet-icon">${this.supportedWallets[this.state.walletType].icon}</div>
                        <div class="wallet-details">
                            <div class="wallet-name">${this.supportedWallets[this.state.walletType].name}</div>
                            <div class="wallet-address">${this.formatAddress(this.state.walletAddress)}</div>
                        </div>
                    </div>
                    <p>Are you sure you want to disconnect your wallet?</p>
                    <div class="disconnect-actions">
                        <button class="btn btn-secondary" onclick="this.parentElement.parentElement.parentElement.parentElement.remove()">Cancel</button>
                        <button class="btn btn-primary" onclick="multiWalletConnector.disconnect(); this.parentElement.parentElement.parentElement.parentElement.remove();">Disconnect</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.addWalletModalStyles();
    }

    disconnect() {
        console.log('Disconnecting wallet...');

        // Clear state
        this.state.isConnected = false;
        this.state.walletAddress = null;
        this.state.walletType = null;
        this.state.provider = null;
        this.state.chainId = null;

        // Clear storage
        localStorage.removeItem('wallet_connection');
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
                    const walletIcon = this.supportedWallets[this.state.walletType]?.icon || '🔗';
                    const shortAddress = this.formatAddress(this.state.walletAddress);
                    button.innerHTML = `${walletIcon} ${shortAddress}`;
                    button.disabled = false;
                    button.classList.add('btn-connected');
                    button.title = `Connected with ${this.supportedWallets[this.state.walletType]?.name || 'Wallet'}: ${this.state.walletAddress}\nClick to disconnect`;
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
            '#registerConnectBtn',
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

    handleConnectionError(error) {
        let errorMessage = 'Failed to connect wallet';

        if (error.code === 4001) {
            errorMessage = 'Connection rejected by user';
        } else if (error.code === -32002) {
            errorMessage = 'Connection request pending in wallet';
        } else if (error.message.includes('not installed')) {
            errorMessage = error.message;
        }

        this.showMessage(errorMessage, 'error');
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
            zIndex: '10001',
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

    addWalletModalStyles() {
        if (document.getElementById('wallet-modal-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'wallet-modal-styles';
        styles.textContent = `
            .wallet-modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            
            .wallet-modal {
                background: var(--card-background);
                border: 1px solid var(--border-color);
                border-radius: 20px;
                width: 100%;
                max-width: 480px;
                margin: 1rem;
                overflow: hidden;
                box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
            }
            
            .wallet-modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem;
                border-bottom: 1px solid var(--border-color);
                background: var(--background-light);
            }
            
            .wallet-modal-header h3 {
                margin: 0;
                color: var(--text-light);
                font-size: 1.3rem;
                font-weight: 600;
            }
            
            .close-btn {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: var(--text-dark);
                padding: 0.5rem;
                border-radius: 50%;
                transition: all 0.3s ease;
            }
            
            .close-btn:hover {
                background: var(--border-color);
                color: var(--text-light);
            }
            
            .wallet-modal-content {
                padding: 1.5rem;
            }
            
            .wallet-modal-description {
                color: var(--text-dark);
                margin-bottom: 1.5rem;
                text-align: center;
                line-height: 1.5;
            }
            
            .wallet-options {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
                margin-bottom: 1.5rem;
            }
            
            .wallet-option {
                display: flex;
                align-items: center;
                padding: 1rem;
                border: 1px solid var(--border-color);
                border-radius: 12px;
                cursor: pointer;
                transition: all 0.3s ease;
                background: var(--background-light);
            }
            
            .wallet-option:hover {
                border-color: var(--primary-color);
                background: rgba(99, 102, 241, 0.05);
                transform: translateY(-2px);
            }
            
            .wallet-option.unavailable {
                opacity: 0.6;
            }
            
            .wallet-icon {
                font-size: 1.5rem;
                margin-right: 1rem;
                width: 24px;
                text-align: center;
            }
            
            .wallet-info {
                flex: 1;
            }
            
            .wallet-name {
                font-weight: 600;
                color: var(--text-light);
                margin-bottom: 0.25rem;
            }
            
            .wallet-status {
                font-size: 0.8rem;
                color: var(--text-dark);
            }
            
            .wallet-arrow {
                color: var(--text-dark);
                font-size: 1.2rem;
            }
            
            .wallet-modal-footer {
                text-align: center;
                padding-top: 1rem;
                border-top: 1px solid var(--border-color);
            }
            
            .wallet-help {
                font-size: 0.9rem;
                color: var(--text-dark);
                margin: 0;
            }
            
            .wallet-help a {
                color: var(--primary-color);
                text-decoration: none;
            }
            
            .wallet-help a:hover {
                text-decoration: underline;
            }
            
            .disconnect-info {
                display: flex;
                align-items: center;
                gap: 1rem;
                margin-bottom: 1.5rem;
                padding: 1rem;
                background: var(--background-light);
                border-radius: 12px;
            }
            
            .disconnect-info .wallet-icon {
                font-size: 2rem;
                margin: 0;
            }
            
            .wallet-details .wallet-name {
                font-size: 1.1rem;
                margin-bottom: 0.25rem;
            }
            
            .wallet-address {
                font-family: 'Courier New', monospace;
                font-size: 0.9rem;
                color: var(--text-dark);
            }
            
            .disconnect-actions {
                display: flex;
                gap: 1rem;
                justify-content: flex-end;
                margin-top: 1.5rem;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @media (max-width: 768px) {
                .wallet-modal {
                    margin: 0.5rem;
                    max-width: calc(100% - 1rem);
                }
                
                .disconnect-actions {
                    flex-direction: column;
                }
            }
        `;

        document.head.appendChild(styles);
    }

    // Public API methods
    getConnectionStatus() {
        return this.state.isConnected;
    }

    getWalletAddress() {
        return this.state.walletAddress;
    }

    getWalletType() {
        return this.state.walletType;
    }

    getChainId() {
        return this.state.chainId;
    }

    getProvider() {
        return this.state.provider;
    }

    isConnecting() {
        return this.state.isConnecting;
    }
}

// Initialize multi-wallet connector
const multiWalletConnector = new MultiWalletConnector();

// Export for global access
window.multiWalletConnector = multiWalletConnector;

// Legacy compatibility
window.walletConnection = multiWalletConnector;
window.connectWallet = () => multiWalletConnector.showWalletModal();
window.disconnectWallet = () => multiWalletConnector.disconnect();

export default multiWalletConnector;