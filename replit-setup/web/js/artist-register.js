// Artist Registration functionality for InnArt
class ArtistRegistrationApp {
    constructor() {
        this.web3Handler = null;
        this.currentStep = 1;
        this.registrationData = {};
        this.init();
    }

    async init() {
        this.web3Handler = Web3Handler.getInstance();
        this.setupEventListeners();
        await this.checkWalletConnection();
    }

    setupEventListeners() {
        // Connect wallet button in navbar
        const connectBtn = document.getElementById('connectWallet');
        if (connectBtn) {
            connectBtn.addEventListener('click', () => this.connectWallet());
        }

        // Registration connect button
        const registerConnectBtn = document.getElementById('registerConnectBtn');
        if (registerConnectBtn) {
            registerConnectBtn.addEventListener('click', () => this.connectWalletForRegistration());
        }

        // Payment button
        const paymentBtn = document.getElementById('payRegistrationBtn');
        if (paymentBtn) {
            paymentBtn.addEventListener('click', () => this.handlePayment());
        }

        // Profile form
        const profileForm = document.getElementById('artistProfileForm');
        if (profileForm) {
            profileForm.addEventListener('submit', (e) => this.handleProfileSubmit(e));
        }
    }

    async checkWalletConnection() {
        try {
            const account = await this.web3Handler.getAccount();
            if (account) {
                this.updateWalletUI(account);
                // If wallet is connected, show step 2
                if (this.currentStep === 1) {
                    this.goToStep(2);
                }
            }
        } catch (error) {
            console.log('No wallet connected');
        }
    }

    async connectWallet() {
        try {
            const connectBtn = document.getElementById('connectWallet');
            if (connectBtn) {
                connectBtn.textContent = 'Connecting...';
                connectBtn.disabled = true;
            }

            if (!window.ethereum) {
                this.showMessage('MetaMask is not installed. Please install MetaMask to connect your wallet.', 'error');
                return;
            }

            await this.web3Handler.connectWallet();
            const account = await this.web3Handler.getAccount();
            
            if (account) {
                this.updateWalletUI(account);
                this.showMessage('Wallet connected successfully!', 'success');
            }
        } catch (error) {
            console.error('Failed to connect wallet:', error);
            this.showMessage('Failed to connect wallet. Please try again.', 'error');
        } finally {
            const connectBtn = document.getElementById('connectWallet');
            if (connectBtn) {
                connectBtn.textContent = 'Connect Wallet';
                connectBtn.disabled = false;
            }
        }
    }

    async connectWalletForRegistration() {
        try {
            const registerBtn = document.getElementById('registerConnectBtn');
            if (registerBtn) {
                registerBtn.textContent = 'Connecting...';
                registerBtn.disabled = true;
            }

            if (!window.ethereum) {
                this.showMessage('MetaMask is not installed. Please install MetaMask to continue.', 'error');
                return;
            }

            await this.web3Handler.connectWallet();
            const account = await this.web3Handler.getAccount();
            
            if (account) {
                this.registrationData.walletAddress = account;
                this.updateWalletUI(account);
                this.showMessage('Wallet connected! Proceeding to payment step.', 'success');
                this.goToStep(2);
            }
        } catch (error) {
            console.error('Failed to connect wallet:', error);
            this.showMessage('Failed to connect wallet. Please try again.', 'error');
        } finally {
            const registerBtn = document.getElementById('registerConnectBtn');
            if (registerBtn) {
                registerBtn.textContent = 'Connect MetaMask Wallet';
                registerBtn.disabled = false;
            }
        }
    }

    updateWalletUI(account) {
        const connectBtn = document.getElementById('connectWallet');
        if (connectBtn) {
            connectBtn.textContent = this.web3Handler.formatAddress(account);
            connectBtn.style.background = 'var(--success-color)';
        }
    }

    async handlePayment() {
        try {
            const paymentBtn = document.getElementById('payRegistrationBtn');
            if (paymentBtn) {
                paymentBtn.textContent = 'Processing Payment...';
                paymentBtn.disabled = true;
            }

            // Simulate payment process (in real app, you'd interact with smart contract)
            await this.simulatePayment();

            this.registrationData.paymentCompleted = true;
            this.showMessage('Registration fee paid successfully!', 'success');
            this.goToStep(3);

        } catch (error) {
            console.error('Payment failed:', error);
            this.showMessage('Payment failed. Please try again.', 'error');
        } finally {
            const paymentBtn = document.getElementById('payRegistrationBtn');
            if (paymentBtn) {
                paymentBtn.textContent = 'Pay Registration Fee';
                paymentBtn.disabled = false;
            }
        }
    }

    async simulatePayment() {
        // Simulate payment processing time
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // In a real app, you would:
        // 1. Call smart contract registration function
        // 2. Send 0.01 ETH as registration fee
        // 3. Wait for transaction confirmation
        
        return true;
    }

    async handleProfileSubmit(event) {
        event.preventDefault();

        try {
            const submitBtn = event.target.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.textContent = 'Completing Registration...';
                submitBtn.disabled = true;
            }

            // Get form data
            const formData = new FormData(event.target);
            const profileData = {
                name: document.getElementById('artistName').value,
                bio: document.getElementById('artistBio').value,
                social: document.getElementById('artistSocial').value,
                avatar: document.getElementById('artistAvatar').files[0]
            };

            // Validate required fields
            if (!profileData.name || !profileData.bio) {
                this.showMessage('Please fill in all required fields.', 'error');
                return;
            }

            // Save registration data
            this.registrationData = { ...this.registrationData, ...profileData };

            // Simulate profile creation (in real app, you'd upload to IPFS and save to contract)
            await this.simulateProfileCreation();

            this.showMessage('Registration completed successfully!', 'success');
            this.goToStep(4); // Success step

        } catch (error) {
            console.error('Profile submission failed:', error);
            this.showMessage('Failed to complete registration. Please try again.', 'error');
        } finally {
            const submitBtn = event.target.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.textContent = 'Complete Registration 🎉';
                submitBtn.disabled = false;
            }
        }
    }

    async simulateProfileCreation() {
        // Simulate profile creation time
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // In a real app, you would:
        // 1. Upload avatar to IPFS
        // 2. Create metadata JSON
        // 3. Store profile data in smart contract
        // 4. Emit artist registration event
        
        return true;
    }

    goToStep(stepNumber) {
        this.currentStep = stepNumber;

        // Hide all steps
        document.querySelectorAll('.form-step').forEach(step => {
            step.style.display = 'none';
        });

        // Update step indicators
        document.querySelectorAll('.step').forEach((step, index) => {
            step.classList.remove('active', 'completed');
            if (index + 1 < stepNumber) {
                step.classList.add('completed');
            } else if (index + 1 === stepNumber) {
                step.classList.add('active');
            }
        });

        // Show current step
        switch (stepNumber) {
            case 1:
                document.getElementById('walletConnectStep').style.display = 'block';
                break;
            case 2:
                document.getElementById('paymentStep').style.display = 'block';
                break;
            case 3:
                document.getElementById('profileStep').style.display = 'block';
                break;
            case 4:
                document.getElementById('successStep').style.display = 'block';
                // Mark all steps as completed
                document.querySelectorAll('.step').forEach(step => {
                    step.classList.add('completed');
                });
                break;
        }
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

// Initialize artist registration when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ArtistRegistrationApp();
});
