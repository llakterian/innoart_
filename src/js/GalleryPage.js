class GalleryPage {
    constructor() {
        this.nftService = window.nftService;
        this.uiManager = window.uiManager;
        this.init();
    }

    async init() {
        this.loadNFTs();
    }

    async loadNFTs() {
        const galleryGrid = document.getElementById('nftGallery');
        galleryGrid.innerHTML = '<div class="loading"><div class="loading-spinner"></div><p>Loading amazing NFTs...</p></div>';

        try {
            const nfts = await this.nftService.getNFTs();
            this.renderNFTs(nfts);
        } catch (error) {
            galleryGrid.innerHTML = '<div class="empty-state"><h3>Failed to load NFTs</h3><p>Please try again later.</p></div>';
        }
    }

    renderNFTs(nfts) {
        const galleryGrid = document.getElementById('nftGallery');
        if (nfts.length === 0) {
            galleryGrid.innerHTML = '<div class="empty-state"><h3>No NFTs Found</h3><p>There are no NFTs available in the gallery yet.</p></div>';
            return;
        }

        galleryGrid.innerHTML = nfts.map(nft => this.createNftCard(nft)).join('');
    }

    createNftCard(nft) {
        return `
            <div class="nft-card">
                <img src="${this.uiManager.sanitize(nft.imageUrl)}" alt="${this.uiManager.sanitize(nft.name)}" class="nft-image">
                <div class="nft-info">
                    <h3 class="nft-title">${this.uiManager.sanitize(nft.name)}</h3>
                    <p class="nft-artist">by ${this.uiManager.sanitize(nft.artist.name)}</p>
                    <div class="nft-price">
                        <span class="price-value">${this.uiManager.sanitize(nft.price)} ETH</span>
                    </div>
                </div>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('gallery.html')) {
        new GalleryPage();
    }
});