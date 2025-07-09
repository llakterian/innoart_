import { NFTStorage } from 'nft.storage';

// Import necessary functions
declare function getContract(): Promise<any>;
declare function showErrorToUser(error: Error): void;
declare function showSuccessMessage(message: string): void;
declare let account: string | null;
declare let web3: any;

interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes?: Array<{
    trait_type: string;
    value: string;
  }>;
}

class NFTUploader {
  private form: HTMLFormElement;
  private imagePreview: HTMLElement;
  private previewImage: HTMLImageElement;

  constructor() {
    this.form = document.getElementById('nftUploadForm') as HTMLFormElement;
    this.imagePreview = document.getElementById('imagePreview') as HTMLElement;
    this.previewImage = document.getElementById('previewImage') as HTMLImageElement;
    
    this.initEventListeners();
  }

  private initEventListeners() {
    const imageUpload = document.getElementById('nftImage') as HTMLInputElement;
    imageUpload?.addEventListener('change', this.handleImageUpload.bind(this));
    
    this.imagePreview?.addEventListener('dragover', this.handleDragOver.bind(this));
    this.imagePreview?.addEventListener('dragleave', this.handleDragLeave.bind(this));
    this.imagePreview?.addEventListener('drop', this.handleDrop.bind(this));
    
    this.form?.addEventListener('submit', this.handleFormSubmit.bind(this));
  }

  private handleImageUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.displayImagePreview(file);
    }
  }

  private handleDragOver(event: DragEvent) {
    event.preventDefault();
    this.imagePreview.classList.add('drag-over');
  }

  private handleDragLeave(event: DragEvent) {
    event.preventDefault();
    this.imagePreview.classList.remove('drag-over');
  }

  private handleDrop(event: DragEvent) {
    event.preventDefault();
    this.imagePreview.classList.remove('drag-over');
    
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.displayImagePreview(files[0]);
    }
  }

  private displayImagePreview(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (this.previewImage && e.target?.result) {
        this.previewImage.src = e.target.result as string;
        this.previewImage.style.display = 'block';
      }
    };
    reader.readAsDataURL(file);
  }

  private validateForm(formData: FormData): { valid: boolean; message?: string } {
    const title = formData.get('nftTitle') as string;
    const price = formData.get('nftPrice') as string;
    const file = formData.get('nftImage') as File;

    if (!file || file.size === 0) return { valid: false, message: 'Please upload an image' };
    if (file.size > 10 * 1024 * 1024) return { valid: false, message: 'Image must be less than 10MB' };
    if (!title || title.length < 3) return { valid: false, message: 'Title must be at least 3 characters' };
    if (!price || parseFloat(price) <= 0) return { valid: false, message: 'Price must be greater than 0' };

    return { valid: true };
  }

  private async handleFormSubmit(event: Event) {
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
      await this.mintNFT(tokenURI, formData.get('nftPrice') as string);
      
      showSuccessMessage('NFT created successfully!');
      window.location.href = 'gallery.html';
    } catch (error) {
      showErrorToUser(error as Error);
    } finally {
      this.setLoading(false);
    }
  }

  private async prepareMetadata(formData: FormData): Promise<NFTMetadata> {
    const file = formData.get('nftImage') as File;
    const imageCID = await this.uploadFileToIPFS(file);
    
    return {
      name: formData.get('nftTitle') as string,
      description: formData.get('nftDescription') as string || '',
      image: `ipfs://${imageCID}`,
      attributes: [
        {
          trait_type: "Creator",
          value: account || "Unknown"
        }
      ]
    };
  }

  private async uploadFileToIPFS(file: File): Promise<string> {
    try {
      const client = new NFTStorage({ token: process.env.REACT_APP_IPFS_API_KEY || '' });
      const cid = await client.storeBlob(file);
      return cid;
    } catch (error) {
      console.error("File upload to IPFS failed:", error);
      throw new Error("Failed to upload file to IPFS");
    }
  }

  private async uploadToIPFS(metadata: NFTMetadata): Promise<string> {
    try {
      const client = new NFTStorage({ token: process.env.REACT_APP_IPFS_API_KEY || '' });
      const blob = new Blob([JSON.stringify(metadata)], { type: 'application/json' });
      const cid = await client.storeBlob(blob);
      return `ipfs://${cid}`;
    } catch (error) {
      console.error("IPFS upload failed:", error);
      throw new Error("Failed to upload to IPFS. Please try again.");
    }
  }

  private async mintNFT(tokenURI: string, price: string) {
    try {
      const contract = await getContract();
      const weiPrice = web3.utils.toWei(price, 'ether');
      
      await contract.methods.createArt(tokenURI, weiPrice).send({ from: account });
    } catch (error) {
      console.error("Minting failed:", error);
      throw new Error("Failed to create NFT. Check your wallet connection and try again.");
    }
  }

  private setLoading(isLoading: boolean) {
    const submitButton = this.form.querySelector('button[type="submit"]') as HTMLButtonElement;
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
