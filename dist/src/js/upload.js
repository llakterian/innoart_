import { Web3Handler } from './web3';
import { NFTStorage } from 'nft.storage';
export class NFTUploader {
    constructor() {
        this.isUploading = false;
        this.web3Handler = Web3Handler.getInstance();
        this.nftStorage = new NFTStorage({ token: import.meta.env?.VITE_NFT_STORAGE_API_KEY || '' });
        this.initEventListeners();
    }
    initEventListeners() {
        const imageUpload = document.getElementById('nftImage');
        const imagePreview = document.getElementById('imagePreview');
        imageUpload?.addEventListener('change', (e) => this.handleImageUpload(e));
        imagePreview?.addEventListener('dragover', (e) => this.handleDragOver(e));
        imagePreview?.addEventListener('dragleave', () => this.handleDragLeave());
        imagePreview?.addEventListener('drop', (e) => this.handleDrop(e));
        document.getElementById('nftUploadForm')?.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    handleImageUpload(event) {
        const input = event.target;
        const file = input.files?.[0];
        if (file && this.isValidImageType(file)) {
            this.displayImagePreview(file);
        }
        else {
            this.showError('Please upload a PNG, JPG, or GIF file');
        }
    }
    handleDragOver(event) {
        event.preventDefault();
        const imagePreview = document.getElementById('imagePreview');
        imagePreview?.classList.add('dragover');
    }
    handleDragLeave() {
        const imagePreview = document.getElementById('imagePreview');
        imagePreview?.classList.remove('dragover');
    }
    handleDrop(event) {
        event.preventDefault();
        this.handleDragLeave();
        const files = event.dataTransfer?.files;
        if (files && files.length > 0) {
            const file = files[0];
            if (this.isValidImageType(file)) {
                this.displayImagePreview(file);
                const input = document.getElementById('nftImage');
                if (input) {
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(file);
                    input.files = dataTransfer.files;
                }
            }
            else {
                this.showError('Please upload a PNG, JPG, or GIF file');
            }
        }
    }
    isValidImageType(file) {
        const validTypes = ['image/png', 'image/jpeg', 'image/gif'];
        return validTypes.includes(file.type);
    }
    displayImagePreview(file) {
        const reader = new FileReader();
        const previewImage = document.getElementById('previewImage');
        const uploadPlaceholder = document.querySelector('.upload-placeholder');
        reader.onload = (e) => {
            if (previewImage && e.target?.result) {
                previewImage.src = e.target.result;
                previewImage.style.display = 'block';
                if (uploadPlaceholder) {
                    uploadPlaceholder.style.display = 'none';
                }
            }
        };
        reader.readAsDataURL(file);
    }
    async handleSubmit(event) {
        event.preventDefault();
        if (this.isUploading)
            return;
        try {
            this.setLoading(true);
            const formData = new FormData(event.target);
            if (!this.validateForm(formData)) {
                return;
            }
            const account = await this.web3Handler.getAccount();
            if (!account) {
                throw new Error('Please connect your wallet first');
            }
            const metadata = await this.prepareMetadata(formData);
            const tokenURI = await this.uploadToIPFS(metadata);
            await this.mintNFT(tokenURI, formData.get('nftPrice'));
            this.showSuccess('NFT created successfully!');
            window.location.href = 'gallery.html';
        }
        catch (error) {
            this.showError(error instanceof Error ? error.message : 'NFT creation failed');
        }
        finally {
            this.setLoading(false);
        }
    }
    validateForm(formData) {
        const file = formData.get('nftImage');
        const title = this.sanitizeHTML(formData.get('nftTitle'));
        const price = formData.get('nftPrice');
        if (!file || file.size === 0) {
            throw new Error('Please upload an image');
        }
        if (file.size > 10 * 1024 * 1024) {
            throw new Error('Image must be less than 10MB');
        }
        if (!this.isValidImageType(file)) {
            throw new Error('Image must be PNG, JPG, or GIF');
        }
        if (!title || title.length < 3) {
            throw new Error('Title must be at least 3 characters');
        }
        if (!price || parseFloat(price) <= 0) {
            throw new Error('Price must be greater than 0');
        }
        return true;
    }
    async prepareMetadata(formData) {
        const file = formData.get('nftImage');
        const imageCID = await this.uploadFileToIPFS(file);
        return {
            name: this.sanitizeHTML(formData.get('nftTitle')),
            description: this.sanitizeHTML(formData.get('nftDescription') || ''),
            image: `ipfs://${imageCID}`,
            attributes: [
                {
                    trait_type: 'Creator',
                    value: await this.web3Handler.getAccount() || 'Unknown',
                },
            ],
        };
    }
    async uploadFileToIPFS(file) {
        try {
            return await this.nftStorage.storeBlob(file);
        }
        catch (error) {
            console.error('IPFS upload error:', error);
            throw new Error('Failed to upload image to IPFS');
        }
    }
    async uploadToIPFS(metadata) {
        try {
            const blob = new Blob([JSON.stringify(metadata)], { type: 'application/json' });
            return `ipfs://${await this.nftStorage.storeBlob(blob)}`;
        }
        catch (error) {
            console.error('Metadata upload error:', error);
            throw new Error('Failed to upload metadata to IPFS');
        }
    }
    async mintNFT(tokenURI, price) {
        try {
            const contract = await this.web3Handler.getContract();
            const weiPrice = await this.web3Handler.toWei(price);
            await contract.methods.createArt(tokenURI, weiPrice, 10).send({
                from: await this.web3Handler.getAccount(),
            });
        }
        catch (error) {
            console.error('Minting error:', error);
            throw new Error('Failed to mint NFT');
        }
    }
    setLoading(isLoading) {
        this.isUploading = isLoading;
        const submitButton = document.querySelector('#nftUploadForm button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = isLoading;
            const btnText = submitButton.querySelector('.btn-text');
            const btnLoading = submitButton.querySelector('.btn-loading');
            if (btnText && btnLoading) {
                btnText.style.display = isLoading ? 'none' : 'inline';
                btnLoading.style.display = isLoading ? 'inline' : 'none';
            }
        }
    }
    showError(message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.addEventListener('click', () => errorElement.remove());
        document.getElementById('nftUploadForm')?.prepend(errorElement);
    }
    showSuccess(message) {
        const successElement = document.createElement('div');
        successElement.className = 'success-message';
        successElement.textContent = message;
        successElement.addEventListener('click', () => successElement.remove());
        document.body.appendChild(successElement);
    }
    sanitizeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new NFTUploader();
});
