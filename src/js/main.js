// InnArt - Main JavaScript
import { Web3Handler } from './web3.js';

class InnArtApp {
    constructor() {
        this.web3Handler = Web3Handler.getInstance();
        this.init();
    }

    async init() {
        this.setupEventListeners();
        this.setupAnimations();
        await this.checkWalletConnection();
    }

    setupEventListeners() {
        // Connect wallet button
        const connectBtn = document.getElementById('connectWalletBtn');
        if (connectBtn) {
            connectBtn.addEventListener('click', () => this.connectWallet());
        }

        // Profile link
        const profileLink = document.getElementById('profileLink');
        if (profileLink) {
            profileLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.goToProfile();
            });
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    setupAnimations() {
        // Animate elements on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe stat cards
        document.querySelectorAll('.stat-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });

        // Observe feature cards
        document.querySelectorAll('.feature-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }

    async checkWalletConnection() {
        try {
            const account = await this.web3Handler.getAccount();
            if (account) {
                this.updateWalletUI(account);
            }
        } catch (error) {
            console.log('No wallet connected');
        }
    }

    async connectWallet() {
        try {
            const connectBtn = document.getElementById('connectWalletBtn');
            if (connectBtn) {
                connectBtn.textContent = 'Connecting...';
                connectBtn.disabled = true;
            }

            await this.web3Handler.connectWallet();
            const account = await this.web3Handler.getAccount();
            
            if (account) {
                this.updateWalletUI(account);
                this.showSuccessMessage('Wallet connected successfully!');
            }
        } catch (error) {
            console.error('Failed to connect wallet:', error);
            this.showErrorMessage('Failed to connect wallet. Please try again.');
        } finally {
            const connectBtn = document.getElementById('connectWalletBtn');
            if (connectBtn) {
                connectBtn.textContent = 'Connect Wallet';
                connectBtn.disabled = false;
            }
        }
    }

    updateWalletUI(account) {
        const connectBtn = document.getElementById('connectWalletBtn');
        if (connectBtn) {
            connectBtn.textContent = `${account.substring(0, 6)}...${account.substring(account.length - 4)}`;
            connectBtn.style.background = 'var(--success-color)';
        }
    }

    goToProfile() {
        // Check if wallet is connected
        this.web3Handler.getAccount().then(account => {
            if (account) {
                window.location.href = 'src/pages/profile.html';
            } else {
                this.showErrorMessage('Please connect your wallet first');
            }
        }).catch(() => {
            this.showErrorMessage('Please connect your wallet first');
        });
    }

    showSuccessMessage(message) {
        this.showMessage(message, 'success');
    }

    showErrorMessage(message) {
        this.showMessage(message, 'error');
    }

    showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `${type}-message`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            font-weight: 500;
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
        `;

        document.body.appendChild(messageDiv);

        setTimeout(() => {
            messageDiv.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => messageDiv.remove(), 300);
        }, 3000);
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new InnArtApp();
});
