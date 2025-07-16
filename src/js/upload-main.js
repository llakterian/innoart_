// Upload page with working wallet connection and drag-drop functionality
class UploadApp {
    constructor() {
        this.selectedFile = null;
        this.selectedCategory = null;
        this.init();
    }

    async init() {
        this.setupEventListeners();
        await this.checkWalletConnection();
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
            
            document.addEventListener('click', (e) => {
                if (!mobileMenuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                    mobileMenu.classList.remove('active');
                }
            });
        }

        // Image upload functionality
        this.setupImageUpload();
        
        // Category selection
        this.setupCategorySelection();
        
        // Form submission
        this.setupFormSubmission();
    }

    setupImageUpload() {
        const fileInput = document.getElementById('nftImage');
        const imagePreview = document.getElementById('imagePreview');
        const previewImage = document.getElementById('previewImage');
        const uploadPlaceholder = imagePreview.querySelector('.upload-placeholder');

        // File input change event
        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                this.handleFileSelect(e.target.files[0]);
            });
        }

        // Click to upload
        if (imagePreview) {
            imagePreview.addEventListener('click', () => {
                fileInput?.click();
            });
        }

        // Drag and drop functionality
        if (imagePreview) {
            // Prevent default drag behaviors
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                imagePreview.addEventListener(eventName, this.preventDefaults, false);
                document.body.addEventListener(eventName, this.preventDefaults, false);
            });

            // Highlight drop area when item is dragged over it
            ['dragenter', 'dragover'].forEach(eventName => {
                imagePreview.addEventListener(eventName, () => {
                    imagePreview.classList.add('drag-over');
                }, false);
            });

            ['dragleave', 'drop'].forEach(eventName => {
                imagePreview.addEventListener(eventName, () => {
                    imagePreview.classList.remove('drag-over');
                }, false);
            });

            // Handle dropped files
            imagePreview.addEventListener('drop', (e) => {
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    this.handleFileSelect(files[0]);
                }
            }, false);
        }
    }

    preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    setupCategorySelection() {
        const categoryOptions = document.querySelectorAll('.category-option');
        
        categoryOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all options
                categoryOptions.forEach(opt => opt.classList.remove('selected'));
                
                // Add active class to clicked option
                option.classList.add('selected');
                
                // Store selected category
                this.selectedCategory = option.dataset.category;
            });
        });
    }

    setupFormSubmission() {
        const form = document.getElementById('nftUploadForm');
        
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleMintNFT();
            });
        }
    }

    async checkWalletConnection() {
        console.log('Upload: checkWalletConnection called');
        
        // Check using direct wallet connection system
        if (!(window.walletState && window.walletState.isConnected)) {
            this.showConnectWalletPrompt();
        }
    }

    async handleWalletConnection() {
        console.log('Upload: handleWalletConnection called');
        
        // Use the direct wallet connection system
        if (window.walletState && window.walletState.isConnected) {
            // Already connected, disconnect
            if (window.disconnectWalletDirect) {
                window.disconnectWalletDirect();
            }
            this.showConnectWalletPrompt();
        } else {
            // Not connected, try to connect
            if (window.connectWalletDirect) {
                try {
                    await window.connectWalletDirect();
                    // Check if connection was successful
                    if (window.walletState && window.walletState.isConnected) {
                        this.hideConnectWalletPrompt();
                    }
                } catch (error) {
                    console.error('Upload: Wallet connection failed', error);
                }
            } else {
                console.error('Upload: Direct wallet connection not available');
            }
        }
    }

    showConnectWalletPrompt() {
        const uploadForm = document.getElementById('uploadForm');
        const connectPrompt = document.getElementById('connectWalletPrompt');
        
        if (uploadForm) uploadForm.style.display = 'none';
        if (connectPrompt) connectPrompt.style.display = 'block';
    }

    hideConnectWalletPrompt() {
        const uploadForm = document.getElementById('uploadForm');
        const connectPrompt = document.getElementById('connectWalletPrompt');
        
        if (uploadForm) uploadForm.style.display = 'block';
        if (connectPrompt) connectPrompt.style.display = 'none';
    }

    handleFileSelect(file) {
        if (!file) return;

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type.toLowerCase())) {
            this.showMessage('Please select a valid image file (JPEG, PNG, GIF, WebP)', 'error');
            return;
        }

        // Validate file size (10MB max)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            this.showMessage('File size must be less than 10MB', 'error');
            return;
        }

        // Store the selected file
        this.selectedFile = file;

        // Show preview
        const preview = document.getElementById('previewImage');
        const placeholder = document.querySelector('.upload-placeholder');
        const imagePreview = document.getElementById('imagePreview');
        
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (preview && placeholder && imagePreview) {
                    preview.src = e.target.result;
                    preview.style.display = 'block';
                    placeholder.style.display = 'none';
                    imagePreview.classList.add('has-image');
                }
            };
            reader.readAsDataURL(file);
        }
    }

    async handleMintNFT() {
        // Check wallet connection
        if (!(window.walletState && window.walletState.isConnected)) {
            this.showMessage('Please connect your wallet first.', 'error');
            return;
        }

        // Get form data
        const title = document.getElementById('nftTitle')?.value?.trim();
        const description = document.getElementById('nftDescription')?.value?.trim();
        const price = document.getElementById('nftPrice')?.value;
        const royalty = document.getElementById('royaltyPercentage')?.value || 5;

        // Validate required fields
        if (!title || !price || !this.selectedFile) {
            this.showMessage('Please fill in all required fields and select an image.', 'error');
            return;
        }

        if (!this.selectedCategory) {
            this.showMessage('Please select a category for your NFT.', 'error');
            return;
        }

        // Validate price
        if (parseFloat(price) <= 0) {
            this.showMessage('Price must be greater than 0 ETH.', 'error');
            return;
        }

        const walletAddress = window.walletState.address;

        // Check if user is registered as artist
        if (!window.userStore.isArtistRegistered(walletAddress)) {
            this.showMessage('You must be a registered artist to mint NFTs.', 'error');
            setTimeout(() => {
                window.location.href = 'artist-register.html';
            }, 2000);
            return;
        }

        // Show loading state
        const submitBtn = document.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        const progressBar = document.getElementById('uploadProgress');
        const progressFill = document.getElementById('progressFill');

        if (submitBtn) {
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline-block';
        }

        if (progressBar) {
            progressBar.style.display = 'block';
        }

        try {
            // Simulate upload progress
            this.updateProgress(progressFill, 20);
            
            // Process image upload
            const imageResult = await window.imageHandler.processImage(this.selectedFile);
            this.updateProgress(progressFill, 60);
            
            // Create NFT data
            const nftData = {
                name: title,
                description: description || 'No description provided',
                price: parseFloat(price),
                creator: walletAddress,
                image: imageResult.imageId,
                category: this.selectedCategory,
                royalty: parseInt(royalty),
                createdAt: Date.now(),
                status: 'for-sale'
            };

            this.updateProgress(progressFill, 80);

            // Create NFT in storage
            const newNFT = window.userStore.createNFT(nftData);
            this.updateProgress(progressFill, 100);
            
            // Show success message
            setTimeout(() => {
                this.showMessage(`NFT "${title}" created successfully!`, 'success');
                this.resetForm();
                
                // Reset button state
                if (submitBtn) {
                    submitBtn.disabled = false;
                    btnText.style.display = 'inline';
                    btnLoading.style.display = 'none';
                }
                
                if (progressBar) {
                    progressBar.style.display = 'none';
                }
                
                // Redirect to profile to view the new NFT
                setTimeout(() => {
                    window.location.href = 'profile.html';
                }, 2000);
            }, 1000);
            
        } catch (error) {
            console.error('Minting error:', error);
            this.showMessage('Failed to create NFT: ' + error.message, 'error');
            
            // Reset button state
            if (submitBtn) {
                submitBtn.disabled = false;
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
            }
            
            if (progressBar) {
                progressBar.style.display = 'none';
            }
        }
    }

    updateProgress(progressElement, percentage) {
        if (progressElement) {
            progressElement.style.width = percentage + '%';
        }
    }

    showMessage(message, type = 'info') {
        // Create or update message element
        let messageEl = document.getElementById('uploadMessage');
        if (!messageEl) {
            messageEl = document.createElement('div');
            messageEl.id = 'uploadMessage';
            messageEl.className = 'upload-message';
            
            const form = document.getElementById('nftUploadForm');
            if (form) {
                form.insertBefore(messageEl, form.firstChild);
            }
        }

        messageEl.className = `upload-message ${type}`;
        messageEl.textContent = message;
        messageEl.style.display = 'block';

        // Auto-hide after 5 seconds
        setTimeout(() => {
            if (messageEl) {
                messageEl.style.display = 'none';
            }
        }, 5000);
    }

    resetForm() {
        // Reset the form
        const form = document.getElementById('nftUploadForm');
        if (form) {
            form.reset();
        }
        
        // Reset image preview
        const preview = document.getElementById('previewImage');
        const placeholder = document.querySelector('.upload-placeholder');
        const imagePreview = document.getElementById('imagePreview');
        
        if (preview) {
            preview.style.display = 'none';
            preview.src = '';
        }
        
        if (placeholder) {
            placeholder.style.display = 'block';
        }
        
        if (imagePreview) {
            imagePreview.classList.remove('has-image');
        }
        
        // Reset category selection
        const categoryOptions = document.querySelectorAll('.category-option');
        categoryOptions.forEach(opt => opt.classList.remove('selected'));
        
        // Reset internal state
        this.selectedFile = null;
        this.selectedCategory = null;
        
        // Hide any messages
        const messageEl = document.getElementById('uploadMessage');
        if (messageEl) {
            messageEl.style.display = 'none';
        }
    }
}

// Initialize upload app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new UploadApp();
});
