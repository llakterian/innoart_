import { Web3Handler } from './web3';
import { NFTStorage, File } from 'nft.storage';

export class NFTUploader {
  private web3Handler: Web3Handler;
  private nftStorage: NFTStorage;
  private isUploading: boolean = false;

  constructor() {
    this.web3Handler = Web3Handler.getInstance();
    this.nftStorage = new NFTStorage({ token: (import.meta as any).env?.VITE_NFT_STORAGE_API_KEY || '' });
    this.initEventListeners();
  }

  private initEventListeners(): void {
    const imageUpload = document.getElementById('nftImage') as HTMLInputElement;
    const imagePreview = document.getElementById('imagePreview') as HTMLElement;
    
    imageUpload?.addEventListener('change', (e) => this.handleImageUpload(e));
    imagePreview?.addEventListener('dragover', (e) => this.handleDragOver(e));
    imagePreview?.addEventListener('dragleave', () => this.handleDragLeave());
    imagePreview?.addEventListener('drop', (e) => this.handleDrop(e));
    
    document.getElementById('nftUploadForm')?.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  private handleImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file && this.isValidImageType(file)) {
      this.displayImagePreview(file);
    } else {
      this.showError('Please upload a PNG, JPG, or GIF file');
    }
  }

  private handleDragOver(event: DragEvent): void {
    event.preventDefault();
    const imagePreview = document.getElementById('imagePreview');
    imagePreview?.classList.add('dragover');
  }

  private handleDragLeave(): void {
    const imagePreview = document.getElementById('imagePreview');
    imagePreview?.classList.remove('dragover');
  }

  private handleDrop(event: DragEvent): void {
    event.preventDefault();
    this.handleDragLeave();
    
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (this.isValidImageType(file)) {
        this.displayImagePreview(file);
        const input = document.getElementById('nftImage') as HTMLInputElement;
        if (input) {
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(file);
          input.files = dataTransfer.files;
        }
      } else {
        this.showError('Please upload a PNG, JPG, or GIF file');
      }
    }
  }

  private isValidImageType(file: File): boolean {
    const validTypes = ['image/png', 'image/jpeg', 'image/gif'];
    return validTypes.includes(file.type);
  }

  private displayImagePreview(file: File): void {
    const reader = new FileReader();
    const previewImage = document.getElementById('previewImage') as HTMLImageElement;
    const uploadPlaceholder = document.querySelector('.upload-placeholder') as HTMLElement;
    
    reader.onload = (e) => {
      if (previewImage && e.target?.result) {
        previewImage.src = e.target.result as string;
        previewImage.style.display = 'block';
        if (uploadPlaceholder) {
          uploadPlaceholder.style.display = 'none';
        }
      }
    };
    reader.readAsDataURL(file);
  }

  private async handleSubmit(event: Event): Promise<void> {
    event.preventDefault();
    if (this.isUploading) return;

    try {
      this.setLoading(true);
      const formData = new FormData(event.target as HTMLFormElement);
      
      if (!this.validateForm(formData)) {
        return;
      }

      const account = await this.web3Handler.getAccount();
      if (!account) {
        throw new Error('Please connect your wallet first');
      }

      const metadata = await this.prepareMetadata(formData);
      const tokenURI = await this.uploadToIPFS(metadata);
      await this.mintNFT(tokenURI, formData.get('nftPrice') as string);
      
      this.showSuccess('NFT created successfully!');
      window.location.href = 'gallery.html';
    } catch (error) {
      this.showError(error instanceof Error ? error.message : 'NFT creation failed');
    } finally {
      this.setLoading(false);
    }
  }

  private validateForm(formData: FormData): boolean {
    const file = formData.get('nftImage') as File;
    const title = this.sanitizeHTML(formData.get('nftTitle') as string);
    const price = formData.get('nftPrice') as string;

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

  private async prepareMetadata(formData: FormData): Promise<any> {
    const file = formData.get('nftImage') as File;
    const imageCID = await this.uploadFileToIPFS(file);

    return {
      name: this.sanitizeHTML(formData.get('nftTitle') as string),
      description: this.sanitizeHTML(formData.get('nftDescription') as string || ''),
      image: `ipfs://${imageCID}`,
      attributes: [
        {
          trait_type: 'Creator',
          value: await this.web3Handler.getAccount() || 'Unknown',
        },
      ],
    };
  }

  private async uploadFileToIPFS(file: File): Promise<string> {
    try {
      return await this.nftStorage.storeBlob(file);
    } catch (error) {
      console.error('IPFS upload error:', error);
      throw new Error('Failed to upload image to IPFS');
    }
  }

  private async uploadToIPFS(metadata: any): Promise<string> {
    try {
      const blob = new Blob([JSON.stringify(metadata)], { type: 'application/json' });
      return `ipfs://${await this.nftStorage.storeBlob(blob)}`;
    } catch (error) {
      console.error('Metadata upload error:', error);
      throw new Error('Failed to upload metadata to IPFS');
    }
  }

  private async mintNFT(tokenURI: string, price: string): Promise<void> {
    try {
      const contract = await this.web3Handler.getContract();
      const weiPrice = await this.web3Handler.toWei(price);
      
      await contract.methods.createArt(tokenURI, weiPrice, 10).send({
        from: await this.web3Handler.getAccount(),
      });
    } catch (error) {
      console.error('Minting error:', error);
      throw new Error('Failed to mint NFT');
    }
  }

  private setLoading(isLoading: boolean): void {
    this.isUploading = isLoading;
    const submitButton = document.querySelector('#nftUploadForm button[type="submit"]') as HTMLButtonElement;
    
    if (submitButton) {
      submitButton.disabled = isLoading;
      const btnText = submitButton.querySelector('.btn-text') as HTMLElement;
      const btnLoading = submitButton.querySelector('.btn-loading') as HTMLElement;
      
      if (btnText && btnLoading) {
        btnText.style.display = isLoading ? 'none' : 'inline';
        btnLoading.style.display = isLoading ? 'inline' : 'none';
      }
    }
  }

  private showError(message: string): void {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.addEventListener('click', () => errorElement.remove());
    document.getElementById('nftUploadForm')?.prepend(errorElement);
  }

  private showSuccess(message: string): void {
    const successElement = document.createElement('div');
    successElement.className = 'success-message';
    successElement.textContent = message;
    successElement.addEventListener('click', () => successElement.remove());
    document.body.appendChild(successElement);
  }

  private sanitizeHTML(str: string): string {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new NFTUploader();
});