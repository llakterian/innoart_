// Simple, working wallet connection implementation
class WalletConnection {
    constructor() {
        this.isConnected = false;
        this.walletAddress = null;
        this.web3 = null;
        this.provider = null;
        
        this.init();
    }
    
    async init() {
        console.log('Initializing wallet connection...');
        console.log('MetaMask detected:', this.isMetaMaskInstalled());
        console.log('Window.ethereum:', typeof window.ethereum);
        
        // Check if already connected
        if (this.isMetaMaskInstalled()) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                console.log('Existing accounts:', accounts);
                if (accounts.length > 0) {
                    this.walletAddress = accounts[0];
                    this.isConnected = true;
                    console.log('Wallet already connected:', this.walletAddress);
                    
                    // Update UI immediately and after a delay to ensure DOM is ready
                    this.updateUI();
                    setTimeout(() => this.updateUI(), 100);
                }
            } catch (error) {
                console.log('Not connected yet:', error);
            }
        } else {
            console.log('MetaMask not installed');
        }
        
        this.setupEventListeners();
        
        // Ensure UI is updated after DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.updateUI();
            });
        } else {
            this.updateUI();
        }
    }
    
    setupEventListeners() {
        // Setup event listeners for account changes
        if (this.isMetaMaskInstalled()) {
            window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length === 0) {
                    this.disconnect();
                } else {
                    this.walletAddress = accounts[0];
                    this.isConnected = true;
                    this.updateUI();
                }
            });
            
            window.ethereum.on('chainChanged', () => {
                window.location.reload();
            });
        }
    }
    
    isMetaMaskInstalled() {
        // Check multiple ways to detect MetaMask
        if (typeof window.ethereum !== 'undefined') {
            // Check for MetaMask specifically
            if (window.ethereum.isMetaMask) {
                return true;
            }
            
            // Check for MetaMask in providers array (newer versions)
            if (window.ethereum.providers) {
                return window.ethereum.providers.some(provider => provider.isMetaMask);
            }
            
            // Fallback check for generic ethereum provider
            return true;
        }
        
        return false;
    }
    
    async connectWallet() {
        if (!this.isMetaMaskInstalled()) {
            this.showWalletModal();
            return false;
        }
        
        try {
            // Show connecting state
            this.updateUIConnecting();
            
            // Request account access with timeout
            const accounts = await Promise.race([
                window.ethereum.request({ 
                    method: 'eth_requestAccounts' 
                }),
                new Promise((_, reject) => 
                    setTimeout(() => reject(new Error('Connection timeout')), 10000)
                )
            ]);
            
            if (accounts.length > 0) {
                this.walletAddress = accounts[0];
                
                // Request signature for authentication
                const signatureRequired = !sessionStorage.getItem('wallet_signature') || 
                    sessionStorage.getItem('wallet_address') !== this.walletAddress;
                
                if (signatureRequired) {
                    const signatureSuccess = await this.requestSignature();
                    if (!signatureSuccess) {
                        this.showMessage('Signature required for authentication. Please try again.', 'error');
                        this.updateUI();
                        return false;
                    }
                }
                
                this.isConnected = true;
                
                // Check if we're on the correct network (optional)
                await this.checkNetwork();
                
                // Update UI immediately and after a delay
                this.updateUI();
                setTimeout(() => this.updateUI(), 100);
                setTimeout(() => this.updateUI(), 500);
                
                this.showMessage('Wallet connected successfully!', 'success');
                return true;
            }
        } catch (error) {
            console.error('Connection error:', error);
            
            if (error.code === 4001) {
                this.showMessage('Connection request was rejected. Please try again.', 'error');
            } else if (error.code === -32002) {
                this.showMessage('Connection request already pending. Please check MetaMask.', 'error');
            } else if (error.message === 'Connection timeout') {
                this.showMessage('Connection timed out. Please try again.', 'error');
            } else {
                this.showMessage('Failed to connect wallet. Please try again.', 'error');
            }
            
            // Reset UI state
            this.updateUI();
            return false;
        }
    }

    // Request signature for authentication
    async requestSignature() {
        try {
            const message = `Welcome to InnArt!\n\nSign this message to authenticate your wallet.\n\nTimestamp: ${new Date().toISOString()}\nAddress: ${this.walletAddress}`;
            
            const signature = await window.ethereum.request({
                method: 'personal_sign',
                params: [message, this.walletAddress]
            });

            console.log('Signature received:', signature);
            
            // Store signature for session
            sessionStorage.setItem('wallet_signature', signature);
            sessionStorage.setItem('wallet_address', this.walletAddress);
            sessionStorage.setItem('wallet_auth_timestamp', Date.now().toString());
            
            return true;
        } catch (error) {
            console.error('Signature request failed:', error);
            if (error.code === 4001) {
                this.showMessage('Signature rejected. Please sign to continue.', 'error');
            }
            return false;
        }
    }

    updateUIConnecting() {
        const connectButtons = document.querySelectorAll('#connectWallet');
        
        connectButtons.forEach(button => {
            button.textContent = 'Connecting...';
            button.classList.add('btn-connecting');
            button.disabled = true;
        });
    }

    async checkNetwork() {
        try {
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            const chainIdDecimal = parseInt(chainId, 16);
            
            // For demo purposes, we'll accept any network
            // In production, you might want to enforce specific networks
            console.log('Connected to chain:', chainIdDecimal);
            
            // Optionally switch to a specific network
            // await this.switchToNetwork('0x1'); // Mainnet
            
        } catch (error) {
            console.error('Network check error:', error);
        }
    }

    async switchToNetwork(chainId) {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: chainId }],
            });
        } catch (error) {
            console.error('Network switch error:', error);
        }
    }
    
    disconnect() {
        this.isConnected = false;
        this.walletAddress = null;
        this.web3 = null;
        this.provider = null;
        
        // Clear authentication data
        sessionStorage.removeItem('wallet_signature');
        sessionStorage.removeItem('wallet_address');
        sessionStorage.removeItem('wallet_auth_timestamp');
        
        this.updateUI();
        this.showMessage('Wallet disconnected', 'success');
    }
    
    // Global wallet connection handler
    async handleWalletConnection() {
        const connectButton = document.getElementById('connectWallet');
        
        if (this.isConnected) {
            // Already connected, disconnect
            this.disconnect();
        } else {
            // Not connected, try to connect
            if (connectButton) {
                connectButton.textContent = 'Connecting...';
                connectButton.classList.add('btn-connecting');
                connectButton.disabled = true;
            }
            
            try {
                const success = await this.connectWallet();
                
                if (!success) {
                    // Reset button state if connection failed
                    if (connectButton) {
                        connectButton.textContent = 'Connect Wallet';
                        connectButton.classList.remove('btn-connecting');
                        connectButton.disabled = false;
                    }
                }
            } catch (error) {
                console.error('Wallet connection error:', error);
                if (connectButton) {
                    connectButton.textContent = 'Connect Wallet';
                    connectButton.classList.remove('btn-connecting');
                    connectButton.disabled = false;
                }
                this.showMessage('Failed to connect wallet. Please try again.', 'error');
            }
        }
    }
    
    updateUI() {
        // Find all connect wallet buttons - try multiple selectors
        const connectButtons = [
            ...document.querySelectorAll('#connectWallet'),
            ...document.querySelectorAll('.connect-wallet-btn'),
            ...document.querySelectorAll('[data-wallet-connect]')
        ];
        
        connectButtons.forEach(button => {
            if (!button) return;
            
            try {
                if (this.isConnected && this.walletAddress) {
                    // Connected state
                    const shortAddress = `${this.walletAddress.slice(0, 6)}...${this.walletAddress.slice(-4)}`;
                    button.textContent = shortAddress;
                    button.classList.add('btn-connected');
                    button.classList.remove('btn-connecting');
                    button.disabled = false;
                    button.title = `Connected: ${this.walletAddress}`;
                } else {
                    // Disconnected state
                    button.textContent = 'Connect Wallet';
                    button.classList.remove('btn-connected', 'btn-connecting');
                    button.disabled = false;
                    button.title = 'Click to connect your wallet';
                }
            } catch (error) {
                console.error('Error updating button:', error);
            }
        });
        
        // Also update any wallet address displays
        const walletAddressDisplays = document.querySelectorAll('.wallet-address');
        walletAddressDisplays.forEach(display => {
            try {
                if (this.isConnected && this.walletAddress) {
                    display.textContent = `${this.walletAddress.slice(0, 6)}...${this.walletAddress.slice(-4)}`;
                } else {
                    display.textContent = 'Not connected';
                }
            } catch (error) {
                console.error('Error updating address display:', error);
            }
        });
        
        console.log('UI updated. Connected:', this.isConnected, 'Address:', this.walletAddress, 'Buttons found:', connectButtons.length);
    }
    
    showWalletModal() {
        // Create modal HTML
        const modal = document.createElement('div');
        modal.className = 'wallet-modal-overlay';
        modal.innerHTML = `
            <div class="wallet-modal">
                <div class="wallet-modal-header">
                    <h3>Connect Your Wallet</h3>
                    <button class="close-btn" onclick="this.parentElement.parentElement.parentElement.remove()">&times;</button>
                </div>
                <div class="wallet-modal-content">
                    <div class="wallet-option" id="connectMetaMask">
                        <div class="wallet-icon">🦊</div>
                        <div class="wallet-info">
                            <h4>MetaMask</h4>
                            <p>Connect using browser extension</p>
                        </div>
                        <div class="wallet-status">${this.isMetaMaskInstalled() ? 'Connect' : 'Install'}</div>
                    </div>
                    <div class="wallet-option" onclick="window.open('https://walletconnect.com/', '_blank')">
                        <div class="wallet-icon">📱</div>
                        <div class="wallet-info">
                            <h4>WalletConnect</h4>
                            <p>Connect using mobile wallet</p>
                        </div>
                        <div class="wallet-status">Coming Soon</div>
                    </div>
                    <div class="wallet-option" onclick="window.open('https://www.coinbase.com/wallet', '_blank')">
                        <div class="wallet-icon">🔵</div>
                        <div class="wallet-info">
                            <h4>Coinbase Wallet</h4>
                            <p>Connect using Coinbase</p>
                        </div>
                        <div class="wallet-status">Coming Soon</div>
                    </div>
                </div>
            </div>
        `;
        
        // Add styles
        if (!document.getElementById('wallet-modal-styles')) {
            const styles = document.createElement('style');
            styles.id = 'wallet-modal-styles';
            styles.textContent = `
                .wallet-modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.8);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    animation: fadeIn 0.3s ease;
                }
                
                .wallet-modal {
                    background: var(--card-background);
                    border-radius: 16px;
                    border: 1px solid var(--border-color);
                    width: 100%;
                    max-width: 400px;
                    margin: 1rem;
                    overflow: hidden;
                }
                
                .wallet-modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1.5rem;
                    border-bottom: 1px solid var(--border-color);
                }
                
                .wallet-modal-header h3 {
                    margin: 0;
                    color: var(--text-light);
                }
                
                .close-btn {
                    background: none;
                    border: none;
                    color: var(--text-dark);
                    font-size: 1.5rem;
                    cursor: pointer;
                    padding: 0;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .close-btn:hover {
                    color: var(--text-light);
                }
                
                .wallet-modal-content {
                    padding: 1.5rem;
                }
                
                .wallet-option {
                    display: flex;
                    align-items: center;
                    padding: 1rem;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    margin-bottom: 0.5rem;
                    border: 1px solid var(--border-color);
                }
                
                .wallet-option:hover {
                    background: rgba(99, 102, 241, 0.1);
                    border-color: var(--primary-color);
                }
                
                .wallet-icon {
                    font-size: 2rem;
                    margin-right: 1rem;
                }
                
                .wallet-info {
                    flex: 1;
                }
                
                .wallet-info h4 {
                    margin: 0 0 0.25rem 0;
                    color: var(--text-light);
                }
                
                .wallet-info p {
                    margin: 0;
                    color: var(--text-dark);
                    font-size: 0.9rem;
                }
                
                .wallet-status {
                    color: var(--primary-color);
                    font-size: 0.9rem;
                    font-weight: 500;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `;
            document.head.appendChild(styles);
        }
        
        document.body.appendChild(modal);
        
        // Add event listener for MetaMask connection
        const connectMetaMask = modal.querySelector('#connectMetaMask');
        if (connectMetaMask) {
            connectMetaMask.addEventListener('click', () => {
                this.tryConnectMetaMask();
            });
        }
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
    
    showMessage(message, type = 'info') {
        const messageEl = document.createElement('div');
        messageEl.className = `message ${type}`;
        messageEl.textContent = message;
        
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            font-weight: 500;
            z-index: 10001;
            max-width: 300px;
            animation: slideIn 0.3s ease;
            ${type === 'success' ? 'background: var(--success-color); color: white;' : 
              type === 'error' ? 'background: var(--error-color); color: white;' : 
              'background: var(--primary-color); color: white;'}
        `;
        
        document.body.appendChild(messageEl);
        
        setTimeout(() => {
            messageEl.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => messageEl.remove(), 300);
        }, 3000);
    }
    
    // Utility method to get current wallet address
    getWalletAddress() {
        return this.walletAddress;
    }
    
    // Utility method to check connection status
    getConnectionStatus() {
        return this.isConnected;
    }

    async tryConnectMetaMask() {
        // Close modal first
        const modal = document.querySelector('.wallet-modal-overlay');
        if (modal) {
            modal.remove();
        }
        
        if (this.isMetaMaskInstalled()) {
            await this.connectWallet();
        } else {
            // Open MetaMask installation page
            window.open('https://metamask.io/', '_blank');
        }
    }
}

// Add animation styles
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .btn-connecting {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;
document.head.appendChild(animationStyles);

// Make it globally available
window.WalletConnection = WalletConnection;

// Initialize wallet connection when DOM is ready
function initializeWalletConnection() {
    if (!window.walletConnection) {
        window.walletConnection = new WalletConnection();
    }
    
    // Set up global click handlers for all connect wallet buttons
    document.addEventListener('click', (e) => {
        if (e.target.id === 'connectWallet' || 
            e.target.classList.contains('connect-wallet-btn') || 
            e.target.hasAttribute('data-wallet-connect')) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Wallet connect button clicked');
            window.walletConnection.handleWalletConnection();
        }
    });
    
    // Also handle any existing specific button event listeners
    const connectButtons = document.querySelectorAll('#connectWallet');
    connectButtons.forEach(button => {
        if (button && !button.hasAttribute('data-wallet-initialized')) {
            button.setAttribute('data-wallet-initialized', 'true');
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Direct wallet button clicked');
                window.walletConnection.handleWalletConnection();
            });
        }
    });
    
    // Update UI immediately and periodically
    if (window.walletConnection) {
        window.walletConnection.updateUI();
        
        // Check connection status every 3 seconds
        setInterval(() => {
            if (window.walletConnection) {
                window.walletConnection.updateUI();
            }
        }, 3000);
        
        // Also update UI when visibility changes (user switches tabs)
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && window.walletConnection) {
                setTimeout(() => window.walletConnection.updateUI(), 100);
            }
        });
    }
    
    console.log('Wallet connection initialized');
}

// Initialize immediately if DOM is ready, otherwise wait
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeWalletConnection);
} else {
    initializeWalletConnection();
}

// Also initialize on window load as a fallback
window.addEventListener('load', initializeWalletConnection);
