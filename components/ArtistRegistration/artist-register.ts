import { Web3Handler } from '../../src/js/web3';

export class ArtistRegistration {
    private web3Handler: Web3Handler;
    private currentStep: number = 1;
    private loadingStates: Record<string, boolean> = {};

    constructor() {
        this.web3Handler = Web3Handler.getInstance();
        this.initEventListeners();
    }

    private initEventListeners(): void {
        document.getElementById('registerConnectBtn')?.addEventListener('click', () => this.connectWallet());
        document.getElementById('payRegistrationBtn')?.addEventListener('click', () => this.payRegistration());
        document.getElementById('artistProfileForm')?.addEventListener('submit', (e) => this.completeProfile(e));
    }

    private async connectWallet(): Promise<void> {
        if (this.loadingStates.walletConnect) return;

        try {
            this.setLoading('walletConnect', true);
            await this.web3Handler.connectWallet();
            const account = await this.web3Handler.getAccount();
            
            if (account) {
                this.showStep(2);
                this.updateRegistrationSteps(2);
            }
        } catch (error) {
            this.showError('Failed to connect wallet. Please try again.');
        } finally {
            this.setLoading('walletConnect', false);
        }
    }

    private async payRegistration(): Promise<void> {
        if (this.loadingStates.payment) return;

        try {
            this.setLoading('payment', true);
            const contract = await this.web3Handler.getContract();
            const fee = '0.01'; // Fixed fee in ETH
            const feeWei = await this.web3Handler.toWei(fee);
            
            await contract.methods.registerArtist().send({
                from: await this.web3Handler.getAccount(),
                value: feeWei
            });
            
            this.showStep(3);
            this.updateRegistrationSteps(3);
        } catch (error) {
            this.showError('Registration payment failed. Please try again.');
        } finally {
            this.setLoading('payment', false);
        }
    }

    private async completeProfile(event: Event): Promise<void> {
        event.preventDefault();
        if (this.loadingStates.profile) return;

        try {
            this.setLoading('profile', true);
            const formData = new FormData(event.target as HTMLFormElement);
            
            if (!this.validateProfileForm(formData)) {
                throw new Error('Please fill in all required fields');
            }

            // In a real app, you would save this to your backend
            const profileData = {
                name: formData.get('artistName'),
                bio: formData.get('artistBio'),
                social: formData.get('artistSocial'),
                avatar: formData.get('artistAvatar')
            };

            this.showSuccess('Registration complete! You can now create and sell NFTs.');
            window.location.href = 'upload.html';
        } catch (error) {
            this.showError(error instanceof Error ? error.message : 'Profile submission failed');
        } finally {
            this.setLoading('profile', false);
        }
    }

    private validateProfileForm(formData: FormData): boolean {
        const artistName = formData.get('artistName') as string;
        if (!artistName || artistName.length < 3) {
            throw new Error('Artist name must be at least 3 characters');
        }
        
        const avatar = formData.get('artistAvatar') as File;
        if (avatar && avatar.size > 5 * 1024 * 1024) { // 5MB limit
            throw new Error('Profile picture must be less than 5MB');
        }

        return true;
    }

    private showStep(stepNumber: number): void {
        const steps = [
            document.getElementById('walletConnectStep'),
            document.getElementById('paymentStep'),
            document.getElementById('profileStep')
        ];

        steps.forEach((step, index) => {
            if (step) {
                step.style.display = index === stepNumber - 1 ? 'block' : 'none';
            }
        });
    }

    private updateRegistrationSteps(currentStep: number): void {
        this.currentStep = currentStep;
        const steps = document.querySelectorAll('.registration-steps .step');
        
        steps.forEach((step, index) => {
            const stepElement = step as HTMLElement;
            if (index + 1 < currentStep) {
                stepElement.classList.add('completed');
                stepElement.classList.remove('active');
            } else if (index + 1 === currentStep) {
                stepElement.classList.add('active');
                stepElement.classList.remove('completed');
            } else {
                stepElement.classList.remove('active', 'completed');
            }
        });
    }

    private setLoading(step: string, isLoading: boolean): void {
        this.loadingStates[step] = isLoading;
        const button = document.getElementById(`${step}Btn`);
        if (button) {
            (button as HTMLButtonElement).disabled = isLoading;
            const spinner = isLoading ? '<span class="spinner"></span> ' : '';
            button.innerHTML = `${spinner}${button.textContent?.trim()}`;
        }
    }

    private showError(message: string): void {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        const container = document.querySelector('.register-form') || document.body;
        container.prepend(errorElement);
        
        setTimeout(() => errorElement.remove(), 5000);
    }

    private showSuccess(message: string): void {
        const successElement = document.createElement('div');
        successElement.className = 'success-message';
        successElement.textContent = message;
        
        document.body.appendChild(successElement);
        setTimeout(() => successElement.remove(), 3000);
    }
}

// Initialize registration flow
document.addEventListener('DOMContentLoaded', () => {
    new ArtistRegistration();
});