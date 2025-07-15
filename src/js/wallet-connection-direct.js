// Direct wallet connection implementation for production deployment
(function() {
    'use strict';
    
    // Global wallet connection state
    window.walletState = {
        isConnected: false,
        walletAddress: null,
        isConnecting: false
    };
    
    // Direct wallet connection function
    window.connectWalletDirect = async function() {
        console.log('Direct wallet connection initiated');
        
        if (window.walletState.isConnecting) {
            console.log('Connection already in progress');
            return;
        }
        
        window.walletState.isConnecting = true;
        
        // Update button state
        updateAllButtons('Connecting...', true);
        
        try {
            // Check if MetaMask is installed
            if (typeof window.ethereum === 'undefined') {
                throw new Error('MetaMask not installed');
            }
            
            // Request account access
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });
            
            if (accounts.length > 0) {
                window.walletState.isConnected = true;
                window.walletState.walletAddress = accounts[0];
                
                // Request signature
                try {
                    const message = `Welcome to InnArt!\n\nSign this message to authenticate your wallet.\n\nTimestamp: ${new Date().toISOString()}\nAddress: ${accounts[0]}`;
                    
                    const signature = await window.ethereum.request({
                        method: 'personal_sign',
                        params: [message, accounts[0]]
                    });
                    
                    // Store signature
                    sessionStorage.setItem('wallet_signature', signature);
                    sessionStorage.setItem('wallet_address', accounts[0]);
                    sessionStorage.setItem('wallet_auth_timestamp', Date.now().toString());
                    
                    console.log('Wallet connected successfully:', accounts[0]);
                    showMessage('Wallet connected successfully!', 'success');
                    
                } catch (signError) {
                    console.log('Signature declined, but wallet connected');
                    showMessage('Wallet connected (signature declined)', 'warning');
                }
                
                updateAllButtons();
                
            } else {
                throw new Error('No accounts found');
            }
            
        } catch (error) {
            console.error('Connection error:', error);
            
            let errorMessage = 'Failed to connect wallet';
            if (error.code === 4001) {
                errorMessage = 'Connection rejected by user';
            } else if (error.code === -32002) {
                errorMessage = 'Connection request pending in MetaMask';
            } else if (error.message.includes('not installed')) {
                errorMessage = 'MetaMask not installed';
            }
            
            showMessage(errorMessage, 'error');
            updateAllButtons();
            
        } finally {
            window.walletState.isConnecting = false;
        }
    };
    
    // Direct disconnect function
    window.disconnectWalletDirect = function() {
        console.log('Disconnecting wallet');
        
        window.walletState.isConnected = false;
        window.walletState.walletAddress = null;
        
        // Clear session storage
        sessionStorage.removeItem('wallet_signature');
        sessionStorage.removeItem('wallet_address');
        sessionStorage.removeItem('wallet_auth_timestamp');
        
        updateAllButtons();
        showMessage('Wallet disconnected', 'success');
    };
    
    // Toggle wallet connection
    window.toggleWalletConnection = function() {
        if (window.walletState.isConnected) {
            window.disconnectWalletDirect();
        } else {
            window.connectWalletDirect();
        }
    };
    
    // Update all connect buttons
    function updateAllButtons(text = null, disabled = false) {
        const selectors = [
            '#connectWallet',
            '#connectWalletBtn',
            '.connect-wallet-btn',
            '[data-wallet-connect]',
            'button[onclick*="connectWallet"]'
        ];
        
        selectors.forEach(selector => {
            const buttons = document.querySelectorAll(selector);
            buttons.forEach(button => {
                if (!button) return;
                
                try {
                    if (text) {
                        button.textContent = text;
                    } else if (window.walletState.isConnected && window.walletState.walletAddress) {
                        const shortAddress = `${window.walletState.walletAddress.slice(0, 6)}...${window.walletState.walletAddress.slice(-4)}`;
                        button.textContent = shortAddress;
                        button.classList.add('btn-connected');
                        button.title = `Connected: ${window.walletState.walletAddress}`;
                    } else {
                        button.textContent = 'Connect Wallet';
                        button.classList.remove('btn-connected');
                        button.title = 'Click to connect your wallet';
                    }
                    
                    button.disabled = disabled;
                    
                    // Ensure the button has the correct onclick handler
                    if (!button.hasAttribute('data-wallet-handler-added')) {
                        button.setAttribute('data-wallet-handler-added', 'true');
                        button.onclick = function(e) {
                            e.preventDefault();
                            window.toggleWalletConnection();
                        };
                    }
                    
                } catch (error) {
                    console.error('Error updating button:', error);
                }
            });
        });
        
        console.log('Updated wallet buttons, connected:', window.walletState.isConnected);
    }
    
    // Show message function
    function showMessage(message, type = 'info') {
        console.log(`[${type.toUpperCase()}] ${message}`);
        
        // Remove existing message
        const existingMessage = document.querySelector('.wallet-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `wallet-message wallet-message-${type}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 8px;
            font-weight: 500;
            z-index: 10000;
            max-width: 300px;
            word-wrap: break-word;
            ${type === 'success' ? 'background: #10b981; color: white;' : ''}
            ${type === 'error' ? 'background: #ef4444; color: white;' : ''}
            ${type === 'warning' ? 'background: #f59e0b; color: white;' : ''}
            ${type === 'info' ? 'background: #3b82f6; color: white;' : ''}
        `;
        
        document.body.appendChild(messageDiv);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }
    
    // Check for existing connection
    async function checkExistingConnection() {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    window.walletState.isConnected = true;
                    window.walletState.walletAddress = accounts[0];
                    console.log('Existing wallet connection found:', accounts[0]);
                    updateAllButtons();
                }
            } catch (error) {
                console.log('No existing connection');
            }
        }
    }
    
    // Initialize when DOM is ready
    function initializeWalletConnection() {
        console.log('Initializing direct wallet connection');
        
        checkExistingConnection();
        updateAllButtons();
        
        // Set up MetaMask event listeners
        if (typeof window.ethereum !== 'undefined') {
            window.ethereum.on('accountsChanged', function(accounts) {
                if (accounts.length === 0) {
                    window.disconnectWalletDirect();
                } else {
                    window.walletState.isConnected = true;
                    window.walletState.walletAddress = accounts[0];
                    updateAllButtons();
                }
            });
            
            window.ethereum.on('chainChanged', function(chainId) {
                console.log('Chain changed to:', chainId);
                // Optionally handle chain changes
            });
        }
        
        // Add global click listener to catch all wallet connection attempts
        document.addEventListener('click', function(event) {
            const target = event.target;
            
            // Check if clicked element is a wallet connection button
            if (target.id === 'connectWallet' || 
                target.id === 'connectWalletBtn' || 
                target.classList.contains('connect-wallet-btn') ||
                target.hasAttribute('data-wallet-connect')) {
                
                console.log('Direct wallet connection: Button clicked', target.id || target.className);
                event.preventDefault();
                event.stopPropagation();
                window.toggleWalletConnection();
            }
        }, true); // Use capture phase to catch events before other handlers
        
        // Update buttons every 2 seconds as fallback
        setInterval(updateAllButtons, 2000);
        
        console.log('Direct wallet connection initialized');
    }
    
    // Initialize immediately or when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeWalletConnection);
    } else {
        initializeWalletConnection();
    }
    
    // Also initialize on window load
    window.addEventListener('load', initializeWalletConnection);
    
    // Expose functions globally for compatibility
    window.walletConnection = {
        connectWallet: window.connectWalletDirect,
        disconnect: window.disconnectWalletDirect,
        getConnectionStatus: () => window.walletState.isConnected,
        getWalletAddress: () => window.walletState.walletAddress,
        showMessage: showMessage,
        updateUI: updateAllButtons
    };
    
})();
