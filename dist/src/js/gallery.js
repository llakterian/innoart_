import { Web3Handler } from './web3';
export class NFTGallery {
    constructor() {
        this.nfts = [];
        this.currentPage = 1;
        this.itemsPerPage = 12;
        this.web3Handler = Web3Handler.getInstance();
        this.init();
    }
    async init() {
        await this.loadNFTs();
        this.setupEventListeners();
        this.renderNFTs();
    }
    setupEventListeners() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                this.filterNFTs(filter);
            });
        });
        const searchInput = document.getElementById('searchInput');
        searchInput?.addEventListener('input', (e) => {
            const searchTerm = e.target.value;
            this.searchNFTs(searchTerm);
        });
    }
    async loadNFTs() {
        try {
            const contract = await this.web3Handler.getContract();
            // Mock data for demo
            this.nfts = [];
            for (let i = 1; i <= 10; i++) {
                this.nfts.push({
                    id: i.toString(),
                    name: `InnoArt #${i}`,
                    description: `Digital artwork piece #${i}`,
                    image: `assets/images/nft${i}.png`,
                    price: '1.0',
                    creator: 'Artist',
                    owner: '0x1234567890123456789012345678901234567890'
                });
            }
        }
        catch (error) {
            console.error('Error loading NFTs:', error);
            this.showError('Failed to load NFTs');
        }
    }
    async fetchMetadata(tokenURI) {
        try {
            const response = await fetch(tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/'));
            return await response.json();
        }
        catch (error) {
            console.error('Error fetching metadata:', error);
            return { name: 'Unknown', description: '', image: '', attributes: [] };
        }
    }
    renderNFTs() {
        const gallery = document.getElementById('nftGallery');
        if (!gallery)
            return;
        gallery.innerHTML = '';
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const pageNFTs = this.nfts.slice(startIndex, endIndex);
        pageNFTs.forEach(nft => {
            const nftCard = document.createElement('div');
            nftCard.className = 'nft-card';
            nftCard.innerHTML = `
        <div class="nft-image">
          <img src="${nft.image.replace('ipfs://', 'https://ipfs.io/ipfs/')}" alt="${nft.name}" loading="lazy">
        </div>
        <div class="nft-info">
          <h3>${this.sanitizeHTML(nft.name)}</h3>
          <p class="nft-description">${this.sanitizeHTML(nft.description)}</p>
          <div class="nft-details">
            <span class="creator">By: ${this.sanitizeHTML(nft.creator)}</span>
            <span class="price">${nft.price} ETH</span>
          </div>
          <button class="btn-purchase" data-id="${nft.id}">Purchase</button>
        </div>
      `;
            nftCard.querySelector('.btn-purchase')?.addEventListener('click', () => {
                this.purchaseNFT(nft.id);
            });
            gallery.appendChild(nftCard);
        });
        this.renderPagination();
    }
    renderPagination() {
        const pagination = document.getElementById('pagination');
        if (!pagination)
            return;
        const totalPages = Math.ceil(this.nfts.length / this.itemsPerPage);
        pagination.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.textContent = i.toString();
            button.className = i === this.currentPage ? 'active' : '';
            button.addEventListener('click', () => {
                this.currentPage = i;
                this.renderNFTs();
            });
            pagination.appendChild(button);
        }
    }
    filterNFTs(filter) {
        // Filter logic can be implemented based on requirements
        // For now, just refresh the view
        this.renderNFTs();
    }
    searchNFTs(searchTerm) {
        if (!searchTerm) {
            this.renderNFTs();
            return;
        }
        const filteredNFTs = this.nfts.filter(nft => nft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            nft.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            nft.creator.toLowerCase().includes(searchTerm.toLowerCase()));
        this.renderFilteredNFTs(filteredNFTs);
    }
    renderFilteredNFTs(filteredNFTs) {
        const gallery = document.getElementById('nftGallery');
        if (!gallery)
            return;
        gallery.innerHTML = '';
        filteredNFTs.forEach(nft => {
            const nftCard = document.createElement('div');
            nftCard.className = 'nft-card';
            nftCard.innerHTML = `
        <div class="nft-image">
          <img src="${nft.image.replace('ipfs://', 'https://ipfs.io/ipfs/')}" alt="${nft.name}" loading="lazy">
        </div>
        <div class="nft-info">
          <h3>${this.sanitizeHTML(nft.name)}</h3>
          <p class="nft-description">${this.sanitizeHTML(nft.description)}</p>
          <div class="nft-details">
            <span class="creator">By: ${this.sanitizeHTML(nft.creator)}</span>
            <span class="price">${nft.price} ETH</span>
          </div>
          <button class="btn-purchase" data-id="${nft.id}">Purchase</button>
        </div>
      `;
            nftCard.querySelector('.btn-purchase')?.addEventListener('click', () => {
                this.purchaseNFT(nft.id);
            });
            gallery.appendChild(nftCard);
        });
    }
    async purchaseNFT(tokenId) {
        try {
            const account = await this.web3Handler.getAccount();
            if (!account) {
                throw new Error('Please connect your wallet first');
            }
            const contract = await this.web3Handler.getContract();
            const price = await this.web3Handler.toWei('1.0'); // Mock price
            await contract.methods.purchaseArt(tokenId).send({
                from: account,
                value: price
            });
            this.showSuccess('NFT purchased successfully!');
            await this.loadNFTs();
            this.renderNFTs();
        }
        catch (error) {
            console.error('Purchase error:', error);
            this.showError('Purchase failed. Please try again.');
        }
    }
    showError(message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        document.body.appendChild(errorElement);
        setTimeout(() => errorElement.remove(), 5000);
    }
    showSuccess(message) {
        const successElement = document.createElement('div');
        successElement.className = 'success-message';
        successElement.textContent = message;
        document.body.appendChild(successElement);
        setTimeout(() => successElement.remove(), 3000);
    }
    sanitizeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
}
