// Artist registration functionality
document.addEventListener('DOMContentLoaded', async () => {
    const connectBtn = document.getElementById('registerConnectBtn');
    const paymentStep = document.getElementById('paymentStep');
    const profileStep = document.getElementById('profileStep');
    const payBtn = document.getElementById('payRegistrationBtn');
    const profileForm = document.getElementById('artistProfileForm');
    
    // Connect wallet for registration
    if (connectBtn) {
        connectBtn.addEventListener('click', async () => {
            const success = await connectWallet();
            if (success) {
                document.getElementById('walletConnectStep').style.display = 'none';
                paymentStep.style.display = 'block';
                updateRegistrationSteps(2);
            }
        });
    }
    
    // Pay registration fee
    if (payBtn) {
        payBtn.addEventListener('click', async () => {
            try {
                const contract = await getContract();
                const fee = await contract.methods.registrationFee().call();
                
                await contract.methods.registerArtist().send({
                    from: account,
                    value: fee
                });
                
                paymentStep.style.display = 'none';
                profileStep.style.display = 'block';
                updateRegistrationSteps(3);
            } catch (error) {
                console.error('Registration failed:', error);
                alert(`Registration failed: ${error.message}`);
            }
        });
    }
    
    // Complete profile
    if (profileForm) {
        profileForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            // In a complete implementation, you would save the profile info
            alert('Registration complete! You can now create and sell NFTs.');
            window.location.href = 'upload.html';
        });
    }
});

function updateRegistrationSteps(currentStep) {
    const steps = document.querySelectorAll('.registration-steps .step');
    steps.forEach((step, index) => {
        if (index + 1 < currentStep) {
            step.classList.add('completed');
            step.classList.remove('active');
        } else if (index + 1 === currentStep) {
            step.classList.add('active');
            step.classList.remove('completed');
        } else {
            step.classList.remove('active', 'completed');
        }
    });
}