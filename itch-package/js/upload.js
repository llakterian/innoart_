// Upload functionality for InnArt
class UploadApp {
    constructor() {
        this.web3Handler = null;
        this.selectedCategory = null;
        this.uploadedFile = null;
        this.init();
    }

    async init() {
        this.web3Handler = Web3Handler.getInstance();
        this.setupEventListeners();
        await this.checkWalletConnection();
    }

    setupEventListeners() {
        // Connect wallet button
        const connectBtn = document.getElementById('connectWallet');
        if (connectBtn) {
            connectBtn.addEventListener('click', () => this.connectWallet());
        }

        // File upload
        const fileInput = document.getElementById('nftImage');
        const imagePreview = document.getElementById('imagePreview');
        
        if (fileInput && imagePreview) {
            fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
            imagePreview.addEventListener('click', () => fileInput.click());
            
            // Drag and drop
            imagePreview.addEventListener('dragover', (e) => {
                e.preventDefault();
                imagePreview.style.background = 'rgba(99, 102, 241, 0.1)';
            });
            
            imagePreview.addEventListener('dragleave', () => {
                imagePreview.style.background = '';
            });
            
            imagePreview.addEventListener('drop', (e) => {
                e.preventDefault();
                imagePreview.style.background = '';
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    this.handleFile(files[0]);
                }
            });
        }

        // Category selection
        document.querySelectorAll('.category-option').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.selectCategory(e.target.getAttribute('data-category'));
            });
        });

        // Form submission
        const form = document.getElementById('nftUploadForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleUpload();
            });
        }
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

    updateWalletUI(account) {
        const connectBtn = document.getElementById('connectWallet');
        if (connectBtn) {
            connectBtn.textContent = this.web3Handler.formatAddress(account);
            connectBtn.style.background = 'var(--success-color)';
        }
    }

    handleFileSelect(event) {
        const file = event.target.files[0];
        if (file) {
            this.handleFile(file);
        }
    }

    handleFile(file) {
        // Validate file
        if (!file.type.startsWith('image/')) {
            this.showMessage('Please select a valid image file', 'error');
            return;
        }

        if (file.size > 10 * 1024 * 1024) { // 10MB limit
            this.showMessage('File size must be less than 10MB', 'error');
            return;
        }

        this.uploadedFile = file;

        // Show preview
        const reader = new FileReader();
        reader.onload = (e) => {
            const previewImage = document.getElementById('previewImage');
            const placeholder = document.querySelector('.upload-placeholder');
            
            if (previewImage && placeholder) {
                previewImage.src = e.target.result;
                previewImage.style.display = 'block';
                placeholder.style.display = 'none';
            }
        };
        reader.readAsDataURL(file);
    }

    selectCategory(category) {
        this.selectedCategory = category;
        
        // Update UI
        document.querySelectorAll('.category-option').forEach(btn => {
            btn.classList.remove('selected');
        });
        document.querySelector(`[data-category="${category}"]`).classList.add('selected');
    }

    async handleUpload() {
        try {
            // Validate form
            if (!this.uploadedFile) {
                this.showMessage('Please select an image to upload', 'error');
                return;
            }

            const account = await this.web3Handler.getAccount();
            if (!account) {
                this.showMessage('Please connect your wallet first', 'error');
                return;
            }

            const title = document.getElementById('nftTitle').value;
            const price = document.getElementById('nftPrice').value;
            const description = document.getElementById('nftDescription').value;
            const royalty = document.getElementById('royaltyPercentage').value;

            if (!title || !price) {
                this.showMessage('Please fill in all required fields', 'error');
                return;
            }

            // Show loading state
            this.setUploadState(true);

            // Simulate upload process (in real app, you'd upload to IPFS and mint NFT)
            await this.simulateUpload();

            this.showMessage('NFT created successfully!', 'success');
            this.resetForm();

        } catch (error) {
            console.error('Upload failed:', error);
            this.showMessage('Failed to create NFT. Please try again.', 'error');
        } finally {
            this.setUploadState(false);
        }
    }

    async simulateUpload() {
        const progressBar = document.getElementById('uploadProgress');
        const progressFill = document.getElementById('progressFill');
        
        if (progressBar && progressFill) {
            progressBar.style.display = 'block';
            
            // Simulate progress
            for (let i = 0; i <= 100; i += 10) {
                progressFill.style.width = `${i}%`;
                await new Promise(resolve => setTimeout(resolve, 200));
            }
            
            await new Promise(resolve => setTimeout(resolve, 500));
            progressBar.style.display = 'none';
        }
    }

    setUploadState(loading) {
        const submitBtn = document.querySelector('button[type="submit"]');
        const btnText = document.querySelector('.btn-text');
        const btnLoading = document.querySelector('.btn-loading');
        
        if (submitBtn && btnText && btnLoading) {
            submitBtn.disabled = loading;
            btnText.style.display = loading ? 'none' : 'inline';
            btnLoading.style.display = loading ? 'inline' : 'none';
        }
    }

    resetForm() {
        // Reset form
        document.getElementById('nftUploadForm').reset();
        
        // Reset image preview
        const previewImage = document.getElementById('previewImage');
        const placeholder = document.querySelector('.upload-placeholder');
        
        if (previewImage && placeholder) {
            previewImage.style.display = 'none';
            placeholder.style.display = 'block';
        }

        // Reset category selection
        document.querySelectorAll('.category-option').forEach(btn => {
            btn.classList.remove('selected');
        });

        this.uploadedFile = null;
        this.selectedCategory = null;
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

// Initialize upload when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new UploadApp();
});
