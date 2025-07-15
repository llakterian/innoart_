// Main application with working wallet connection
class InnArtApp {
    constructor() {
        this.walletConnection = window.walletConnection;
        this.initWithRetry();
    }
    
    initWithRetry() {
        // Retry initialization if wallet connection isn't ready
        if (!window.walletConnection || !window.connectWalletDirect) {
            console.log('App Main: Waiting for wallet connection system...');
            setTimeout(() => this.initWithRetry(), 100);
            return;
        }
        
        console.log('App Main: Initializing with wallet connection system ready');
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupAnimations();
    }
    
    setupEventListeners() {
        // Connect wallet button
        document.addEventListener('click', (e) => {
            if (e.target.id === 'connectWallet') {
                this.handleWalletConnection();
            }
        });
        
        // Mobile menu toggle
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        
        if (mobileMenuToggle && mobileMenu) {
            mobileMenuToggle.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
            });
            
            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                    mobileMenu.classList.remove('active');
                }
            });
        }
        
        // Profile navigation
        document.addEventListener('click', (e) => {
            if (e.target.id === 'profileLink' || e.target.id === 'profileLinkMobile') {
                e.preventDefault();
                this.goToProfile();
            }
        });
        
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
    
    async handleWalletConnection() {
        console.log('App Main: handleWalletConnection called');
        
        // Use the direct wallet connection system
        if (window.walletState && window.walletState.isConnected) {
            // Already connected, disconnect
            if (window.disconnectWalletDirect) {
                window.disconnectWalletDirect();
            }
        } else {
            // Not connected, try to connect
            if (window.connectWalletDirect) {
                try {
                    await window.connectWalletDirect();
                } catch (error) {
                    console.error('App Main: Wallet connection failed', error);
                }
            } else {
                console.error('App Main: Direct wallet connection not available');
            }
        }
    }
    
    goToProfile() {
        if (window.walletState && window.walletState.isConnected) {
            window.location.href = 'src/pages/profile.html';
        } else {
            if (window.walletConnection && window.walletConnection.showMessage) {
                window.walletConnection.showMessage('Please connect your wallet first to access your profile.', 'error');
            } else {
                console.log('Please connect your wallet first to access your profile.');
            }
        }
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
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new InnArtApp();
});
