class ArtistRegistration {
    constructor() {
        this.currentStep = 1;
        this.loadingStates = {};
        this.steps = {
            walletConnect: document.getElementById('walletConnectStep'),
            payment: document.getElementById('paymentStep'),
            profile: document.getElementById('profileStep')
        };
        this.initEventListeners();
    }
    initEventListeners() {
        document.getElementById('registerConnectBtn')?.addEventListener('click', this.connectWallet.bind(this));
        document.getElementById('payRegistrationBtn')?.addEventListener('click', this.payRegistration.bind(this));
        document.getElementById('artistProfileForm')?.addEventListener('submit', this.completeProfile.bind(this));
    }
    async connectWallet() {
        if (this.loadingStates.walletConnect)
            return;
        try {
            this.setLoading('walletConnect', true);
            const success = await connectWallet();
            if (success && this.steps.walletConnect && this.steps.payment) {
                this.steps.walletConnect.style.display = 'none';
                this.steps.payment.style.display = 'block';
                this.updateRegistrationSteps(2);
            }
        }
        catch (error) {
            showErrorToUser(error);
        }
        finally {
            this.setLoading('walletConnect', false);
        }
    }
    async payRegistration() {
        if (this.loadingStates.payment)
            return;
        try {
            this.setLoading('payment', true);
            const contract = await getContract();
            const fee = await contract.methods.registrationFee().call();
            await contract.methods.registerArtist().send({
                from: account,
                value: fee
            });
            if (this.steps.payment && this.steps.profile) {
                this.steps.payment.style.display = 'none';
                this.steps.profile.style.display = 'block';
                this.updateRegistrationSteps(3);
            }
        }
        catch (error) {
            showErrorToUser(error);
        }
        finally {
            this.setLoading('payment', false);
        }
    }
    async completeProfile(event) {
        event.preventDefault();
        if (this.loadingStates.profile)
            return;
        try {
            this.setLoading('profile', true);
            const formData = new FormData(event.target);
            const validation = this.validateProfileForm(formData);
            if (!validation.valid) {
                throw new Error(validation.message);
            }
            // Save profile logic here
            showSuccessMessage('Registration complete! You can now create and sell NFTs.');
            window.location.href = 'upload.html';
        }
        catch (error) {
            showErrorToUser(error);
        }
        finally {
            this.setLoading('profile', false);
        }
    }
    validateProfileForm(formData) {
        const artistName = formData.get('artistName');
        if (!artistName || artistName.length < 3) {
            return { valid: false, message: 'Artist name must be at least 3 characters' };
        }
        return { valid: true };
    }
    setLoading(step, isLoading) {
        this.loadingStates[step] = isLoading;
        const button = document.getElementById(`${step}Btn`);
        if (button) {
            button.disabled = isLoading;
            button.innerHTML = isLoading ?
                '<span class="spinner"></span> Processing...' :
                button.textContent || '';
        }
    }
    updateRegistrationSteps(currentStep) {
        this.currentStep = currentStep;
        const steps = document.querySelectorAll('.registration-steps .step');
        steps.forEach((step, index) => {
            const stepElement = step;
            if (index + 1 < currentStep) {
                stepElement.classList.add('completed');
                stepElement.classList.remove('active');
            }
            else if (index + 1 === currentStep) {
                stepElement.classList.add('active');
                stepElement.classList.remove('completed');
            }
            else {
                stepElement.classList.remove('active', 'completed');
            }
        });
    }
}
// Utility functions
function createErrorContainer() {
    const container = document.createElement('div');
    container.id = 'errorContainer';
    container.className = 'error-message';
    document.body.appendChild(container);
    return container;
}
function createSuccessContainer() {
    const container = document.createElement('div');
    container.id = 'successContainer';
    container.className = 'success-message';
    document.body.appendChild(container);
    return container;
}
// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ArtistRegistration();
});
