// Image Upload and Management System
class ImageHandler {
    constructor() {
        this.maxFileSize = 5 * 1024 * 1024; // 5MB
        this.allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        this.storageKey = 'innoart_images';
        
        // IPFS Configuration from your .env
        this.ipfsApiKey = '378ec52e.244f1311cc574f1d90b8210688e4e0e7';
        this.nftStorageApiKey = 'e55be093.0cbe7858183d4d21a74c4581fac99941';
        this.ipfsGateway = 'https://ipfs.io/ipfs/';
        this.ipfsGatewayBackup = 'https://gateway.pinata.cloud/ipfs/';
        
        this.init();
    }
    
    init() {
        // Initialize image storage
        if (!localStorage.getItem(this.storageKey)) {
            localStorage.setItem(this.storageKey, JSON.stringify({}));
        }
    }
    
    // Validate file before upload
    validateFile(file) {
        const errors = [];
        
        if (!file) {
            errors.push('No file selected');
            return errors;
        }
        
        // Check file type
        if (!this.allowedTypes.includes(file.type)) {
            errors.push('Invalid file type. Please select a JPEG, PNG, GIF, or WebP image.');
        }
        
        // Check file size
        if (file.size > this.maxFileSize) {
            errors.push(`File size must be less than ${this.maxFileSize / 1024 / 1024}MB`);
        }
        
        return errors;
    }
    
    // Process and store image
    async processImage(file, id = null) {
        const errors = this.validateFile(file);
        if (errors.length > 0) {
            throw new Error(errors.join(', '));
        }
        
        try {
            // Convert to base64 for storage
            const base64 = await this.fileToBase64(file);
            
            // Generate unique ID if not provided
            const imageId = id || Date.now().toString();
            
            // Create image metadata
            const imageData = {
                id: imageId,
                name: file.name,
                size: file.size,
                type: file.type,
                data: base64,
                uploadedAt: Date.now()
            };
            
            // Store in localStorage
            this.saveImage(imageId, imageData);
            
            return {
                success: true,
                imageId,
                url: base64,
                metadata: {
                    name: file.name,
                    size: file.size,
                    type: file.type
                }
            };
            
        } catch (error) {
            throw new Error('Failed to process image: ' + error.message);
        }
    }
    
    // Convert file to base64
    fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    }
    
    // Save image to localStorage
    saveImage(id, imageData) {
        const images = this.getImages();
        images[id] = imageData;
        localStorage.setItem(this.storageKey, JSON.stringify(images));
    }
    
    // Get all images
    getImages() {
        return JSON.parse(localStorage.getItem(this.storageKey) || '{}');
    }
    
    // Get specific image
    getImage(id) {
        const images = this.getImages();
        return images[id] || null;
    }
    
    // Delete image
    deleteImage(id) {
        const images = this.getImages();
        delete images[id];
        localStorage.setItem(this.storageKey, JSON.stringify(images));
    }
    
    // Create image upload component
    createUploadComponent(containerId, options = {}) {
        const container = document.getElementById(containerId);
        if (!container) {
            throw new Error(`Container with ID '${containerId}' not found`);
        }
        
        const {
            multiple = false,
            preview = true,
            dragDrop = true,
            maxFiles = 1,
            onUpload = null,
            onError = null
        } = options;
        
        const uploadHtml = `
            <div class="image-upload-component">
                <div class="upload-area ${dragDrop ? 'drag-drop' : ''}" id="uploadArea_${containerId}">
                    <div class="upload-content">
                        <div class="upload-icon">📁</div>
                        <div class="upload-text">
                            <p>Click to select ${multiple ? 'images' : 'an image'}</p>
                            ${dragDrop ? '<p>or drag and drop here</p>' : ''}
                        </div>
                        <div class="upload-formats">
                            <small>Supported formats: JPEG, PNG, GIF, WebP (max ${this.maxFileSize / 1024 / 1024}MB)</small>
                        </div>
                    </div>
                    <input type="file" id="fileInput_${containerId}" 
                           accept="${this.allowedTypes.join(',')}" 
                           ${multiple ? 'multiple' : ''} 
                           style="display: none;">
                </div>
                ${preview ? '<div class="image-preview" id="preview_' + containerId + '"></div>' : ''}
            </div>
        `;
        
        container.innerHTML = uploadHtml;
        
        // Add event listeners
        this.setupUploadEvents(containerId, options);
        
        // Add styles
        this.addUploadStyles();
    }
    
    // Setup event listeners for upload component
    setupUploadEvents(containerId, options) {
        const uploadArea = document.getElementById(`uploadArea_${containerId}`);
        const fileInput = document.getElementById(`fileInput_${containerId}`);
        const preview = document.getElementById(`preview_${containerId}`);
        
        // Click to select files
        uploadArea.addEventListener('click', () => {
            fileInput.click();
        });
        
        // File selection
        fileInput.addEventListener('change', async (e) => {
            await this.handleFileSelection(e.target.files, containerId, options);
        });
        
        // Drag and drop
        if (options.dragDrop !== false) {
            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.classList.add('drag-over');
            });
            
            uploadArea.addEventListener('dragleave', () => {
                uploadArea.classList.remove('drag-over');
            });
            
            uploadArea.addEventListener('drop', async (e) => {
                e.preventDefault();
                uploadArea.classList.remove('drag-over');
                await this.handleFileSelection(e.dataTransfer.files, containerId, options);
            });
        }
    }
    
    // Handle file selection
    async handleFileSelection(files, containerId, options) {
        const { onUpload, onError, preview = true } = options;
        const previewContainer = document.getElementById(`preview_${containerId}`);
        
        try {
            const processedImages = [];
            
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const result = await this.processImage(file);
                processedImages.push(result);
                
                // Show preview
                if (preview && previewContainer) {
                    this.addImagePreview(previewContainer, result);
                }
            }
            
            // Call success callback
            if (onUpload) {
                onUpload(processedImages);
            }
            
        } catch (error) {
            console.error('Upload error:', error);
            
            if (onError) {
                onError(error.message);
            } else {
                alert('Error: ' + error.message);
            }
        }
    }
    
    // Add image preview
    addImagePreview(container, imageResult) {
        const previewElement = document.createElement('div');
        previewElement.className = 'image-preview-item';
        previewElement.innerHTML = `
            <img src="${imageResult.url}" alt="${imageResult.metadata.name}">
            <div class="image-info">
                <span class="image-name">${imageResult.metadata.name}</span>
                <span class="image-size">${this.formatFileSize(imageResult.metadata.size)}</span>
            </div>
            <button class="remove-image" onclick="imageHandler.removePreview('${imageResult.imageId}', this)">✕</button>
        `;
        
        container.appendChild(previewElement);
    }
    
    // Remove preview
    removePreview(imageId, buttonElement) {
        const previewItem = buttonElement.closest('.image-preview-item');
        if (previewItem) {
            previewItem.remove();
        }
        
        // Optionally delete from storage
        this.deleteImage(imageId);
    }
    
    // Format file size
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    // Add upload styles
    addUploadStyles() {
        if (document.getElementById('image-upload-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'image-upload-styles';
        styles.textContent = `
            .image-upload-component {
                width: 100%;
                margin: 1rem 0;
            }
            
            .upload-area {
                border: 2px dashed var(--border-color);
                border-radius: 8px;
                padding: 2rem;
                text-align: center;
                cursor: pointer;
                transition: all 0.3s ease;
                background: var(--background-light);
            }
            
            .upload-area:hover {
                border-color: var(--primary-color);
                background: rgba(99, 102, 241, 0.1);
            }
            
            .upload-area.drag-over {
                border-color: var(--primary-color);
                background: rgba(99, 102, 241, 0.2);
            }
            
            .upload-icon {
                font-size: 3rem;
                margin-bottom: 1rem;
            }
            
            .upload-text p {
                margin: 0.5rem 0;
                color: var(--text-light);
            }
            
            .upload-formats small {
                color: var(--text-dark);
            }
            
            .image-preview {
                margin-top: 1rem;
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                gap: 1rem;
            }
            
            .image-preview-item {
                position: relative;
                background: var(--card-background);
                border-radius: 8px;
                overflow: hidden;
                border: 1px solid var(--border-color);
            }
            
            .image-preview-item img {
                width: 100%;
                height: 120px;
                object-fit: cover;
            }
            
            .image-info {
                padding: 0.5rem;
                display: flex;
                flex-direction: column;
                gap: 0.25rem;
            }
            
            .image-name {
                font-size: 0.9rem;
                color: var(--text-light);
                font-weight: 500;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            
            .image-size {
                font-size: 0.8rem;
                color: var(--text-dark);
            }
            
            .remove-image {
                position: absolute;
                top: 5px;
                right: 5px;
                background: var(--error-color);
                color: white;
                border: none;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                font-size: 0.8rem;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .remove-image:hover {
                background: #dc2626;
            }
        `;
        
        document.head.appendChild(styles);
    }
    
    // Upload to IPFS using your NFT.Storage credentials
    async uploadToIPFS(file) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            
            const response = await fetch('https://api.nft.storage/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.nftStorageApiKey}`,
                },
                body: formData
            });
            
            if (!response.ok) {
                throw new Error(`IPFS upload failed: ${response.statusText}`);
            }
            
            const data = await response.json();
            return {
                success: true,
                ipfsHash: data.value.cid,
                ipfsUrl: `${this.ipfsGateway}${data.value.cid}`,
                backupUrl: `${this.ipfsGatewayBackup}${data.value.cid}`
            };
        } catch (error) {
            console.error('IPFS upload error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    // Enhanced image upload with IPFS support
    async handleImageUploadWithIPFS(file, useIPFS = false) {
        // Validate file first
        const validationErrors = this.validateFile(file);
        if (validationErrors.length > 0) {
            return {
                success: false,
                errors: validationErrors
            };
        }
        
        try {
            // If IPFS is enabled, upload to IPFS
            if (useIPFS) {
                const ipfsResult = await this.uploadToIPFS(file);
                if (ipfsResult.success) {
                    const imageId = Date.now().toString();
                    const imageData = {
                        id: imageId,
                        name: file.name,
                        type: file.type,
                        size: file.size,
                        ipfsHash: ipfsResult.ipfsHash,
                        ipfsUrl: ipfsResult.ipfsUrl,
                        backupUrl: ipfsResult.backupUrl,
                        uploadedAt: Date.now(),
                        storage: 'ipfs'
                    };
                    
                    // Store metadata locally
                    this.storeImage(imageId, imageData);
                    
                    return {
                        success: true,
                        imageId: imageId,
                        imageUrl: ipfsResult.ipfsUrl,
                        backupUrl: ipfsResult.backupUrl,
                        storage: 'ipfs'
                    };
                } else {
                    // Fallback to local storage if IPFS fails
                    console.warn('IPFS upload failed, falling back to local storage');
                }
            }
            
            // Default local storage handling
            return await this.handleImageUpload(file);
        } catch (error) {
            console.error('Image upload error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
}

// Initialize image handler
window.imageHandler = new ImageHandler();
