// UI Management and Component Rendering
class UIManager {
    constructor() {
        this.init();
    }

    init() {
        // Initial UI setup can go here
    }

    // Sanitization function to prevent XSS
    sanitize(text) {
        const element = document.createElement('div');
        element.innerText = text;
        return element.innerHTML;
    }

    // Render Wallet Connection State
    renderWalletState(state, walletAddress = null) {
        const buttons = document.querySelectorAll('[data-wallet-connect]');
        buttons.forEach(button => {
            button.classList.remove('btn-connecting', 'btn-connected');
            switch (state) {
                case 'connecting':
                    button.textContent = 'Connecting...';
                    button.disabled = true;
                    button.classList.add('btn-connecting');
                    break;
                case 'connected':
                    const shortAddress = `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;
                    button.textContent = this.sanitize(shortAddress);
                    button.title = `Connected: ${this.sanitize(walletAddress)}`;
                    button.disabled = false;
                    button.classList.add('btn-connected');
                    break;
                case 'disconnected':
                    button.textContent = 'Connect Wallet';
                    button.title = 'Click to connect your wallet';
                    button.disabled = false;
                    break;
            }
        });
    }

    // Show Notifications
    showNotification(message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = this.sanitize(message);
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, duration);
    }

    // Show Modal
    showModal(title, content) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>${this.sanitize(title)}</h2>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        ${content}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.remove();
        });

        modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                modal.remove();
            }
        });
    }
}

window.uiManager = new UIManager();