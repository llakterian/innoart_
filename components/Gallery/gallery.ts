import { Web3Handler } from '../../src/js/web3';

export class NFTGallery {
    private web3Handler: Web3Handler;
    private galleryElement: HTMLElement | null;
    private filterButtons: NodeListOf<HTMLElement>;

    constructor() {
        this.web3Handler = Web3Handler.getInstance();
        this.galleryElement = document.getElementById('nftGallery');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        
        this.init();
    }

    private async init(): Promise<void> {
        if (!this.galleryElement) return;

        try {
            this.setupEventListeners();
            await this.loadNFTs();
        } catch (error) {
            console.error('Gallery initialization error:', error);
            this.showError('Failed to load NFTs. Please try again.');
        }
    }

    private setupEventListeners(): void {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => this.handleFilterClick(button));
        });
    }

    private async handleFilterClick(button: HTMLElement): Promise<void> {
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        await this.loadNFTs(button.dataset.filter);
    }

    private async loadNFTs(filter?: string): Promise<void> {
        if (!this.galleryElement) return;

        try {
            this.showLoading();
            
            const contract = await this.web3Handler.getContract();
            const nftCount = 10; // Mock data for demo
            const account = await this.web3Handler.getAccount();
            
            this.galleryElement.innerHTML = '';
            
            for (let i = 1; i <= nftCount; i++) {
                const nft = {
                    id: i,
                    title: `InnoArt #${i}`,
                    creator: '0x1234567890123456789012345678901234567890',
                    owner: '0x1234567890123456789012345678901234567890',
                    price: '1000000000000000000', // 1 ETH in wei
                    forSale: true,
                    tokenURI: `assets/images/nft${i}.png`
                };
                
                if (nft.id === 0) continue;
                
                if (filter && filter !== 'all' && !this.matchesFilter(nft, filter)) {
                    continue;
                }

                this.createNFTCard(nft, i, account);
            }
        } catch (error) {
            console.error('Error loading NFTs:', error);
            this.showError('Failed to load NFTs. Please refresh the page.');
        } finally {
            this.hideLoading();
        }
    }

    private matchesFilter(nft: any, filter: string): boolean {
        // Implement your filter logic here
        // For example, check NFT metadata for tags/categories
        return true;
    }

    private createNFTCard(nft: any, id: number, account: string | null): void {
        if (!this.galleryElement) return;

        const isOwner = account && account.toLowerCase() === nft.owner.toLowerCase();
        const previewStyle = isOwner ? '' : 'filter: blur(5px);';
        const price = this.web3Handler.fromWei(nft.price);

        const nftCard = document.createElement('div');
        nftCard.className = 'nft-card';
        nftCard.innerHTML = `
            <div class="nft-image-container">
                <img src="${nft.tokenURI}" alt="NFT ${id}" style="${previewStyle}" loading="lazy">
                ${!isOwner ? '<div class="preview-overlay">Purchase to view full resolution</div>' : ''}
            </div>
            <div class="nft-info">
                <h3>${nft.title || `InnoArt #${id}`}</h3>
                <p class="artist">By ${this.formatAddress(nft.creator)}</p>
                <div class="price-container">
                    <span class="price">${price} ETH</span>
                    ${nft.forSale ? 
                        `<button class="buy-btn" data-id="${id}" data-price="${nft.price}">Buy Now</button>` : 
                        '<span class="sold-badge">Sold</span>'}
                </div>
            </div>
        `;

        this.galleryElement.appendChild(nftCard);
        
        // Add event listener to buy button
        const buyBtn = nftCard.querySelector('.buy-btn');
        buyBtn?.addEventListener('click', () => this.handleBuyNFT(id, nft.price));
    }

    private async handleBuyNFT(tokenId: number, price: string): Promise<void> {
        try {
            const confirmed = confirm(`Purchase this NFT for ${this.web3Handler.fromWei(price)} ETH?`);
            if (!confirmed) return;

            const contract = await this.web3Handler.getContract();
            
            await contract.methods.buyArt(tokenId).send({
                from: await this.web3Handler.getAccount(),
                value: price
            });

            this.showSuccess('Purchase successful!');
            await this.loadNFTs();
        } catch (error) {
            console.error('Purchase error:', error);
            this.showError('Purchase failed. Please try again.');
        }
    }

    private formatAddress(address: string): string {
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    }

    private showLoading(): void {
        if (!this.galleryElement) return;
        this.galleryElement.innerHTML = '<div class="loading-spinner"></div>';
    }

    private hideLoading(): void {
        // Implement as needed
    }

    private showError(message: string): void {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        if (this.galleryElement) {
            this.galleryElement.innerHTML = '';
            this.galleryElement.appendChild(errorElement);
        }
    }

    private showSuccess(message: string): void {
        const successElement = document.createElement('div');
        successElement.className = 'success-message';
        successElement.textContent = message;
        
        document.body.appendChild(successElement);
        setTimeout(() => successElement.remove(), 3000);
    }
}

// Initialize gallery
document.addEventListener('DOMContentLoaded', () => {
    new NFTGallery();
});