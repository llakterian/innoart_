import { NFTStorage } from 'nft.storage';
class NFTUploader {
    constructor() {
        this.form = document.getElementById('nftUploadForm');
        this.imagePreview = document.getElementById('imagePreview');
        this.previewImage = document.getElementById('previewImage');
        this.initEventListeners();
    }
    initEventListeners() {
        const imageUpload = document.getElementById('nftImage');
        imageUpload?.addEventListener('change', this.handleImageUpload.bind(this));
        this.imagePreview?.addEventListener('dragover', this.handleDragOver.bind(this));
        this.imagePreview?.addEventListener('dragleave', this.handleDragLeave.bind(this));
        this.imagePreview?.addEventListener('drop', this.handleDrop.bind(this));
        this.form?.addEventListener('submit', this.handleFormSubmit.bind(this));
    }
    handleImageUpload(event) {
        const input = event.target;
        const file = input.files?.[0];
        if (file) {
            this.displayImagePreview(file);
        }
    }
    handleDragOver(event) {
        event.preventDefault();
        this.imagePreview.classList.add('drag-over');
    }
    handleDragLeave(event) {
        event.preventDefault();
        this.imagePreview.classList.remove('drag-over');
    }
    handleDrop(event) {
        event.preventDefault();
        this.imagePreview.classList.remove('drag-over');
        const files = event.dataTransfer?.files;
        if (files && files.length > 0) {
            this.displayImagePreview(files[0]);
        }
    }
    displayImagePreview(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (this.previewImage && e.target?.result) {
                this.previewImage.src = e.target.result;
                this.previewImage.style.display = 'block';
            }
        };
        reader.readAsDataURL(file);
    }
    validateForm(formData) {
        const title = formData.get('nftTitle');
        const price = formData.get('nftPrice');
        const file = formData.get('nftImage');
        if (!file || file.size === 0)
            return { valid: false, message: 'Please upload an image' };
        if (file.size > 10 * 1024 * 1024)
            return { valid: false, message: 'Image must be less than 10MB' };
        if (!title || title.length < 3)
            return { valid: false, message: 'Title must be at least 3 characters' };
        if (!price || parseFloat(price) <= 0)
            return { valid: false, message: 'Price must be greater than 0' };
        return { valid: true };
    }
    async handleFormSubmit(event) {
        event.preventDefault();
        const formData = new FormData(this.form);
        const validation = this.validateForm(formData);
        if (!validation.valid) {
            showErrorToUser(new Error(validation.message || 'Invalid form data'));
            return;
        }
        try {
            this.setLoading(true);
            const metadata = await this.prepareMetadata(formData);
            const tokenURI = await this.uploadToIPFS(metadata);
            await this.mintNFT(tokenURI, formData.get('nftPrice'));
            showSuccessMessage('NFT created successfully!');
            window.location.href = 'gallery.html';
        }
        catch (error) {
            showErrorToUser(error);
        }
        finally {
            this.setLoading(false);
        }
    }
    async prepareMetadata(formData) {
        const file = formData.get('nftImage');
        const imageCID = await this.uploadFileToIPFS(file);
        return {
            name: formData.get('nftTitle'),
            description: formData.get('nftDescription') || '',
            image: `ipfs://${imageCID}`,
            attributes: [
                {
                    trait_type: "Creator",
                    value: account || "Unknown"
                }
            ]
        };
    }
    async uploadFileToIPFS(file) {
        try {
            const client = new NFTStorage({ token: process.env.REACT_APP_IPFS_API_KEY || '' });
            const cid = await client.storeBlob(file);
            return cid;
        }
        catch (error) {
            console.error("File upload to IPFS failed:", error);
            throw new Error("Failed to upload file to IPFS");
        }
    }
    async uploadToIPFS(metadata) {
        try {
            const client = new NFTStorage({ token: process.env.REACT_APP_IPFS_API_KEY || '' });
            const blob = new Blob([JSON.stringify(metadata)], { type: 'application/json' });
            const cid = await client.storeBlob(blob);
            return `ipfs://${cid}`;
        }
        catch (error) {
            console.error("IPFS upload failed:", error);
            throw new Error("Failed to upload to IPFS. Please try again.");
        }
    }
    async mintNFT(tokenURI, price) {
        try {
            const contract = await getContract();
            const weiPrice = web3.utils.toWei(price, 'ether');
            await contract.methods.createArt(tokenURI, weiPrice).send({ from: account });
        }
        catch (error) {
            console.error("Minting failed:", error);
            throw new Error("Failed to create NFT. Check your wallet connection and try again.");
        }
    }
    setLoading(isLoading) {
        const submitButton = this.form.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = isLoading;
            submitButton.textContent = isLoading ? 'Creating NFT...' : 'Create NFT';
        }
    }
}
// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NFTUploader();
});
