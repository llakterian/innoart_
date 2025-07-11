// Gallery functionality for InnArt
class GalleryApp {
    constructor() {
        this.web3Handler = null;
        this.nfts = [];
        this.filteredNFTs = [];
        this.currentFilter = 'all';
        this.init();
    }

    async init() {
        this.web3Handler = Web3Handler.getInstance();
        this.setupEventListeners();
        await this.loadNFTs();
    }

    setupEventListeners() {
        // Connect wallet button
        const connectBtn = document.getElementById('connectWallet');
        if (connectBtn) {
            connectBtn.addEventListener('click', () => this.connectWallet());
        }

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.getAttribute('data-filter'));
            });
        });

        // Search input
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchNFTs(e.target.value);
            });
        }

        // Check wallet connection on load
        this.checkWalletConnection();
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
                alert('MetaMask is not installed. Please install MetaMask to connect your wallet.');
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

    async loadNFTs() {
        const gallery = document.getElementById('nftGallery');
        if (!gallery) return;

        try {
            // Show loading
            gallery.innerHTML = `
                <div class="loading">
                    <div class="loading-spinner"></div>
                    <p>Loading amazing NFTs...</p>
                </div>
            `;

            // For demo purposes, we'll show some mock NFTs
            // In a real app, you'd load from your smart contract
            this.nfts = await this.getMockNFTs();
            this.filteredNFTs = [...this.nfts];
            this.renderNFTs();

        } catch (error) {
            console.error('Error loading NFTs:', error);
            gallery.innerHTML = `
                <div class="empty-state">
                    <h3>Failed to load NFTs</h3>
                    <p>Please try again later</p>
                </div>
            `;
        }
    }

    async getMockNFTs() {
        // Mock NFT data for demonstration
        return [
            {
                id: 1,
                title: 'Digital Sunset',
                artist: '0x1234...5678',
                price: '0.5',
                image: 'https://picsum.photos/400/400?random=1',
                category: 'art'
            },
            {
                id: 2,
                title: 'Neon Dreams',
                artist: '0xabcd...efgh',
                price: '1.2',
                image: 'https://picsum.photos/400/400?random=2',
                category: 'digital'
            },
            {
                id: 3,
                title: 'Abstract Flow',
                artist: '0x9876...5432',
                price: '0.8',
                image: 'https://picsum.photos/400/400?random=3',
                category: 'abstract'
            },
            {
                id: 4,
                title: 'City Lights',
                artist: '0xfedc...ba98',
                price: '2.1',
                image: 'https://picsum.photos/400/400?random=4',
                category: 'photography'
            },
            {
                id: 5,
                title: 'Geometric Harmony',
                artist: '0x1111...2222',
                price: '0.3',
                image: 'https://picsum.photos/400/400?random=5',
                category: 'art'
            },
            {
                id: 6,
                title: 'Cyber Punk',
                artist: '0x3333...4444',
                price: '1.5',
                image: 'https://picsum.photos/400/400?random=6',
                category: 'digital'
            }
        ];
    }

    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');

        // Filter NFTs
        if (filter === 'all') {
            this.filteredNFTs = [...this.nfts];
        } else {
            this.filteredNFTs = this.nfts.filter(nft => nft.category === filter);
        }

        this.renderNFTs();
    }

    searchNFTs(query) {
        const lowerQuery = query.toLowerCase();
        this.filteredNFTs = this.nfts.filter(nft => 
            nft.title.toLowerCase().includes(lowerQuery) ||
            nft.artist.toLowerCase().includes(lowerQuery)
        );
        this.renderNFTs();
    }

    renderNFTs() {
        const gallery = document.getElementById('nftGallery');
        if (!gallery) return;

        if (this.filteredNFTs.length === 0) {
            gallery.innerHTML = `
                <div class="empty-state">
                    <h3>No NFTs Found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                </div>
            `;
            return;
        }

        gallery.innerHTML = this.filteredNFTs.map(nft => `
            <div class="nft-card">
                <img src="${nft.image}" alt="${nft.title}" class="nft-image" loading="lazy">
                <div class="nft-info">
                    <h3 class="nft-title">${nft.title}</h3>
                    <p class="nft-artist">by ${this.web3Handler.formatAddress(nft.artist)}</p>
                    <div class="nft-price">
                        <div>
                            <div class="price-value">${nft.price} ETH</div>
                            <div class="price-label">Price</div>
                        </div>
                    </div>
                    <div class="nft-actions">
                        <button class="btn btn-primary btn-small" onclick="gallery.viewNFT(${nft.id})">View Details</button>
                        <button class="btn btn-secondary btn-small" onclick="gallery.buyNFT(${nft.id})">Buy Now</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    viewNFT(id) {
        // In a real app, this would navigate to NFT details page
        this.showMessage(`Viewing NFT #${id}`, 'info');
    }

    buyNFT(id) {
        // In a real app, this would initiate the purchase process
        this.showMessage(`Purchase functionality for NFT #${id} will be implemented`, 'info');
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

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.gallery = new GalleryApp();
});
