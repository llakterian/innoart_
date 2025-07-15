// Session Management for Wallet Connection Security
class SessionManager {
    constructor() {
        this.TIMEOUT_DURATION = 2 * 60 * 1000; // 2 minutes in milliseconds
        this.lastActivity = Date.now();
        this.timeoutId = null;
        this.isActive = false;
        
        this.init();
    }
    
    init() {
        this.setupActivityListeners();
        this.startSessionTimer();
    }
    
    setupActivityListeners() {
        // Track user activity
        const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];
        
        events.forEach(event => {
            document.addEventListener(event, () => {
                this.updateActivity();
            }, true);
        });
    }
    
    updateActivity() {
        this.lastActivity = Date.now();
        
        if (!this.isActive) {
            this.isActive = true;
            this.startSessionTimer();
        }
    }
    
    startSessionTimer() {
        // Clear existing timeout
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        
        // Set new timeout
        this.timeoutId = setTimeout(() => {
            this.handleSessionTimeout();
        }, this.TIMEOUT_DURATION);
    }
    
    handleSessionTimeout() {
        if (window.walletConnection && window.walletConnection.getConnectionStatus()) {
            // Show warning before logout
            this.showTimeoutWarning();
        }
    }
    
    showTimeoutWarning() {
        const modal = document.createElement('div');
        modal.className = 'session-timeout-modal';
        modal.innerHTML = `
            <div class="session-timeout-overlay">
                <div class="session-timeout-content">
                    <h3>⚠️ Session Timeout</h3>
                    <p>For security reasons, your wallet session will expire in 30 seconds due to inactivity.</p>
                    <div class="session-timeout-actions">
                        <button id="extendSession" class="btn btn-primary">Stay Connected</button>
                        <button id="logoutNow" class="btn btn-secondary">Logout Now</button>
                    </div>
                    <div class="countdown" id="countdown">30</div>
                </div>
            </div>
        `;
        
        // Add styles
        const styles = document.createElement('style');
        styles.textContent = `
            .session-timeout-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            
            .session-timeout-content {
                background: var(--card-background);
                border: 1px solid var(--border-color);
                border-radius: 16px;
                padding: 2rem;
                max-width: 400px;
                text-align: center;
                animation: slideIn 0.3s ease;
            }
            
            .session-timeout-content h3 {
                color: var(--error-color);
                margin-bottom: 1rem;
            }
            
            .session-timeout-content p {
                color: var(--text-light);
                margin-bottom: 1.5rem;
            }
            
            .session-timeout-actions {
                display: flex;
                gap: 1rem;
                justify-content: center;
                margin-bottom: 1rem;
            }
            
            .countdown {
                font-size: 2rem;
                font-weight: bold;
                color: var(--error-color);
                animation: pulse 1s infinite;
            }
            
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideIn {
                from { transform: translateY(-20px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        
        document.head.appendChild(styles);
        document.body.appendChild(modal);
        
        // Countdown timer
        let countdown = 30;
        const countdownElement = document.getElementById('countdown');
        
        const countdownInterval = setInterval(() => {
            countdown--;
            countdownElement.textContent = countdown;
            
            if (countdown <= 0) {
                clearInterval(countdownInterval);
                this.forceLogout();
                modal.remove();
            }
        }, 1000);
        
        // Event listeners
        document.getElementById('extendSession').addEventListener('click', () => {
            clearInterval(countdownInterval);
            modal.remove();
            this.updateActivity();
            this.startSessionTimer();
        });
        
        document.getElementById('logoutNow').addEventListener('click', () => {
            clearInterval(countdownInterval);
            modal.remove();
            this.forceLogout();
        });
    }
    
    forceLogout() {
        if (window.walletConnection) {
            // Properly disconnect the wallet
            window.walletConnection.disconnect();
            
            // Clear any stored session data
            sessionStorage.clear();
            
            // Update UI to disconnected state
            window.walletConnection.updateUI();
            
            // Show logout message
            window.walletConnection.showMessage('Session expired for security. Please reconnect your wallet.', 'error');
        }
        
        // Reset session state
        this.isActive = false;
        this.lastActivity = null;
        
        // Redirect to home page if not already there
        if (window.location.pathname !== '/index.html' && window.location.pathname !== '/' && !window.location.pathname.includes('index.html')) {
            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
        }
    }
    
    resetSession() {
        this.updateActivity();
        this.startSessionTimer();
    }
}

// Initialize session manager
window.sessionManager = new SessionManager();
