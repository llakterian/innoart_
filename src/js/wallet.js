const wallet = {
    state: {
        isConnected: false,
        isConnecting: false,
        address: null,
    },

    async connect() {
        if (this.state.isConnecting) return;

        this.state.isConnecting = true;
        this.updateButtons('connecting');

        try {
            if (typeof window.ethereum === 'undefined') {
                throw new Error('MetaMask not installed');
            }

            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            this.handleAccountsChanged(accounts);
        } catch (error) {
            this.handleError(error);
        } finally {
            this.state.isConnecting = false;
        }
    },

    disconnect() {
        this.state.isConnected = false;
        this.state.address = null;
        this.updateButtons('disconnected');
        this.showMessage('Wallet disconnected', 'success');
    },

    handleAccountsChanged(accounts) {
        if (accounts.length === 0) {
            this.disconnect();
        } else {
            const address = accounts[0];
            this.state.isConnected = true;
            this.state.address = address;
            this.updateButtons('connected', address);
            this.showMessage('Wallet connected successfully!', 'success');
        }
    },

    handleError(error) {
        let message = 'Failed to connect wallet';
        if (error.code === 4001) message = 'Connection rejected by user';
        else if (error.code === -32002) message = 'Connection request pending in MetaMask';
        else if (error.message.includes('not installed')) message = 'MetaMask not installed';

        this.updateButtons('disconnected');
        this.showMessage(message, 'error');
    },

    updateButtons(state, address = null) {
        const buttons = document.querySelectorAll('[data-wallet-connect]');
        buttons.forEach(button => {
            switch (state) {
                case 'connecting':
                    button.textContent = 'Connecting...';
                    button.disabled = true;
                    break;
                case 'connected':
                    const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;
                    button.textContent = shortAddress;
                    button.disabled = false;
                    break;
                case 'disconnected':
                    button.textContent = 'Connect Wallet';
                    button.disabled = false;
                    break;
            }
        });
    },

    showMessage(message, type, duration = 5000) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `wallet-message wallet-message-${type}`;
        messageDiv.textContent = message;
        // Basic styling, assuming CSS handles the rest
        document.body.appendChild(messageDiv);

        setTimeout(() => {
            messageDiv.remove();
        }, duration);
    },

    init() {
        if (typeof window.ethereum !== 'undefined') {
            window.ethereum.on('accountsChanged', (accounts) => this.handleAccountsChanged(accounts));
        }

        document.addEventListener('click', (event) => {
            const target = event.target.closest('[data-wallet-connect]');
            if (target) {
                event.preventDefault();
                if (this.state.isConnected) {
                    this.disconnect();
                } else {
                    this.connect();
                }
            }
        });

        // Initial check
        if (typeof window.ethereum !== 'undefined') {
            window.ethereum.request({ method: 'eth_accounts' })
                .then(accounts => this.handleAccountsChanged(accounts))
                .catch(err => console.error(err));
        }
    }
};

wallet.init();
window.wallet = wallet;
