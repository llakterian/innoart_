// Gallery page with working wallet connection
class GalleryApp {
    constructor() {
        this.walletConnection = window.walletConnection;
        this.nfts = [];
        this.filteredNFTs = [];
        this.currentFilter = 'all';
        this.init();
    }

    async init() {
        this.setupEventListeners();
        await this.loadNFTs();
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
    }

    async handleWalletConnection() {
        const connectButton = document.getElementById('connectWallet');
        
        if (this.walletConnection.getConnectionStatus()) {
            // Already connected, disconnect
            this.walletConnection.disconnect();
        } else {
            // Not connected, try to connect
            connectButton.textContent = 'Connecting...';
            connectButton.classList.add('btn-connecting');
            
            const success = await this.walletConnection.connectWallet();
            
            if (!success) {
                // Reset button state if connection failed
                connectButton.textContent = 'Connect Wallet';
                connectButton.classList.remove('btn-connecting');
            }
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

            // Generate sample NFTs with working images
            this.nfts = await this.generateSampleNFTs();
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

    async generateSampleNFTs() {
        // Get real NFTs from user store
        const allNFTs = window.userStore.getNFTs();
        const availableNFTs = allNFTs.filter(nft => nft.forSale && !nft.sold);
        
        // If no real NFTs, create some sample data
        if (availableNFTs.length === 0) {
            const categories = ['art', 'digital', 'abstract', 'photography'];
            const sampleNFTs = [];

            for (let i = 1; i <= 8; i++) {
                const category = categories[Math.floor(Math.random() * categories.length)];
                const colors = [
                    ['#FF6B6B', '#4ECDC4'],
                    ['#45B7D1', '#96CEB4'],
                    ['#FFEAA7', '#DDA0DD'],
                    ['#74B9FF', '#A29BFE'],
                    ['#FD79A8', '#6C5CE7'],
                    ['#00B894', '#00CEC9'],
                    ['#E17055', '#FDCB6E'],
                    ['#6C5CE7', '#A29BFE']
                ];
                
                const colorPair = colors[i % colors.length];
                
                sampleNFTs.push({
                    id: `sample_${i}`,
                    name: `Sample NFT #${i}`,
                    creator: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 4)}`,
                    price: (Math.random() * 5 + 0.1).toFixed(2),
                    image: this.generateNFTImage(i, `NFT #${i}`, colorPair[0], colorPair[1]),
                    category: category,
                    forSale: true,
                    sold: false
                });
            }

            return sampleNFTs;
        }

        // Process real NFTs for display
        return availableNFTs.map(nft => ({
            ...nft,
            title: nft.name,
            artist: this.formatAddress(nft.creator),
            image: this.getNFTImage(nft)
        }));
    }

    generateNFTImage(id, title, color1, color2) {
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 400;
        const ctx = canvas.getContext('2d');

        // Create gradient background
        const gradient = ctx.createLinearGradient(0, 0, 400, 400);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 400, 400);

        // Add some geometric shapes
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(100, 100, 60, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(300, 300, 80, 0, Math.PI * 2);
        ctx.fill();

        // Add text
        ctx.globalAlpha = 1;
        ctx.fillStyle = 'white';
        ctx.font = '32px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('🎨', 200, 180);

        ctx.font = '16px Arial';
        ctx.fillText(title, 200, 220);

        ctx.font = '12px Arial';
        ctx.fillText(`ID: ${id}`, 200, 240);

        return canvas.toDataURL();
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
                <img src="${this.getNFTImage(nft)}" alt="${nft.title || nft.name}" class="nft-image" loading="lazy">
                <div class="nft-info">
                    <h3 class="nft-title">${nft.title || nft.name}</h3>
                    <p class="nft-artist">by ${nft.artist || this.formatAddress(nft.creator)}</p>
                    <div class="nft-price">
                        <div>
                            <div class="price-converter" data-eth-amount="${nft.price}" data-currency="kes">
                                ${nft.price} ETH
                            </div>
                            <div class="price-label">Price</div>
                        </div>
                    </div>
                    <div class="nft-actions">
                        <button class="btn btn-primary btn-small" onclick="gallery.viewNFT('${nft.id}')">View Details</button>
                        <button class="btn btn-secondary btn-small" onclick="gallery.buyNFT('${nft.id}')">Buy Now</button>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Update currency displays
        if (window.currencyConverter) {
            window.currencyConverter.updateUI();
        }
    }

    viewNFT(id) {
        // Find the NFT
        let nft = this.nfts.find(nft => nft.id === id);
        
        // If not found in displayed NFTs, check user store directly
        if (!nft) {
            nft = window.userStore.getNFT(id);
        }
        
        if (!nft) {
            this.walletConnection.showMessage('NFT not found.', 'error');
            return;
        }
        
        this.showNFTDetails(nft);
    }
    
    showNFTDetails(nft) {
        // Get artist information
        const artist = window.userStore.getArtist(nft.creator);
        const artistName = artist ? artist.name : this.formatAddress(nft.creator);
        
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'nft-details-modal-overlay';
        modal.innerHTML = `
            <div class="nft-details-modal">
                <div class="modal-header">
                    <h2>NFT Details</h2>
                    <button class="close-btn" onclick="this.parentElement.parentElement.parentElement.remove()">&times;</button>
                </div>
                <div class="modal-content">
                    <div class="nft-details-layout">
                        <div class="nft-image-section">
                            <img src="${this.getNFTImage(nft)}" alt="${nft.name}" class="nft-detail-image">
                            <div class="nft-status">
                                <span class="status-badge ${nft.forSale ? 'for-sale' : 'not-for-sale'}">
                                    ${nft.sold ? 'SOLD' : nft.forSale ? 'FOR SALE' : 'NOT FOR SALE'}
                                </span>
                            </div>
                        </div>
                        <div class="nft-info-section">
                            <div class="nft-title-section">
                                <h3>${nft.name}</h3>
                                <p class="nft-description">${nft.description || 'No description provided'}</p>
                            </div>
                            
                            <div class="nft-details-grid">
                                <div class="detail-item">
                                    <span class="detail-label">Creator:</span>
                                    <span class="detail-value">${artistName}</span>
                                </div>
                                <div class="detail-item">
                                    <span class="detail-label">Contract Address:</span>
                                    <span class="detail-value">${this.formatAddress(nft.creator)}</span>
                                </div>
                                <div class="detail-item">
                                    <span class="detail-label">Token ID:</span>
                                    <span class="detail-value">${nft.id}</span>
                                </div>
                                <div class="detail-item">
                                    <span class="detail-label">Price:</span>
                                    <span class="detail-value">
                                        <span class="price-converter" data-eth-amount="${nft.price}" data-currency="kes">
                                            ${nft.price} ETH
                                        </span>
                                    </span>
                                </div>
                                <div class="detail-item">
                                    <span class="detail-label">Category:</span>
                                    <span class="detail-value">${nft.category || 'Art'}</span>
                                </div>
                                <div class="detail-item">
                                    <span class="detail-label">Created:</span>
                                    <span class="detail-value">${nft.createdAt ? new Date(nft.createdAt).toLocaleDateString() : 'Unknown'}</span>
                                </div>
                                ${nft.sold ? `
                                    <div class="detail-item">
                                        <span class="detail-label">Sold On:</span>
                                        <span class="detail-value">${new Date(nft.soldAt).toLocaleDateString()}</span>
                                    </div>
                                    <div class="detail-item">
                                        <span class="detail-label">Owner:</span>
                                        <span class="detail-value">${this.formatAddress(nft.owner)}</span>
                                    </div>
                                ` : ''}
                            </div>
                            
                            <div class="price-breakdown">
                                <h4>Price Breakdown</h4>
                                <div class="breakdown-item">
                                    <span>NFT Price:</span>
                                    <span class="price-converter" data-eth-amount="${nft.price}" data-currency="kes">${nft.price} ETH</span>
                                </div>
                                <div class="breakdown-item">
                                    <span>Artist receives (80%):</span>
                                    <span class="price-converter" data-eth-amount="${(parseFloat(nft.price) * 0.8).toFixed(4)}" data-currency="kes">${(parseFloat(nft.price) * 0.8).toFixed(4)} ETH</span>
                                </div>
                                <div class="breakdown-item">
                                    <span>Platform fee (20%):</span>
                                    <span class="price-converter" data-eth-amount="${(parseFloat(nft.price) * 0.2).toFixed(4)}" data-currency="kes">${(parseFloat(nft.price) * 0.2).toFixed(4)} ETH</span>
                                </div>
                            </div>
                            
                            <div class="nft-actions">
                                ${nft.forSale && !nft.sold ? `
                                    <button class="btn btn-primary" onclick="gallery.buyNFT('${nft.id}'); this.parentElement.parentElement.parentElement.parentElement.remove();">
                                        Buy Now - ${nft.price} ETH
                                    </button>
                                ` : ''}
                                ${nft.sold ? `
                                    <button class="btn btn-secondary" disabled>
                                        Sold
                                    </button>
                                ` : ''}
                                <button class="btn btn-secondary" onclick="this.parentElement.parentElement.parentElement.parentElement.remove();">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Update currency displays
        if (window.currencyConverter) {
            window.currencyConverter.updateUI();
        }
        
        // Add styles for the modal
        this.addNFTDetailsModalStyles();
    }

    buyNFT(id) {
        if (!this.walletConnection.getConnectionStatus()) {
            this.walletConnection.showMessage('Please connect your wallet first to buy NFTs.', 'error');
            return;
        }
        
        const buyerAddress = this.walletConnection.getWalletAddress();
        
        // First check in displayed NFTs
        let nft = this.nfts.find(nft => nft.id === id);
        
        // If not found in displayed NFTs, check user store directly
        if (!nft) {
            nft = window.userStore.getNFT(id);
        }
        
        if (!nft) {
            this.walletConnection.showMessage('NFT not found. Please refresh the page.', 'error');
            console.error('NFT not found with ID:', id);
            console.log('Available NFTs:', this.nfts.map(n => n.id));
            return;
        }
        
        if (nft.creator === buyerAddress) {
            this.walletConnection.showMessage('You cannot buy your own NFT.', 'error');
            return;
        }
        
        if (nft.sold) {
            this.walletConnection.showMessage('This NFT has already been sold.', 'error');
            return;
        }
        
        if (!nft.forSale) {
            this.walletConnection.showMessage('This NFT is not currently for sale.', 'error');
            return;
        }
        
        // Show purchase confirmation
        this.showPurchaseConfirmation(nft, buyerAddress);
    }
    
    showPurchaseConfirmation(nft, buyerAddress) {
        const modal = document.createElement('div');
        modal.className = 'purchase-modal-overlay';
        modal.innerHTML = `
            <div class="purchase-modal">
                <div class="purchase-modal-header">
                    <h3>🛒 Purchase NFT</h3>
                    <button class="close-btn" onclick="this.parentElement.parentElement.parentElement.remove()">&times;</button>
                </div>
                <div class="purchase-modal-content">
                    <div class="nft-preview">
                        <img src="${this.getNFTImage(nft)}" alt="${nft.title || nft.name}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 8px;">
                        <div class="nft-details">
                            <h4>${nft.title || nft.name}</h4>
                            <p>by ${this.formatAddress(nft.creator)}</p>
                        </div>
                    </div>
                    <div class="purchase-breakdown">
                        <div class="breakdown-item">
                            <span>NFT Price:</span>
                            <span class="price-converter" data-eth-amount="${nft.price}" data-currency="kes">${nft.price} ETH</span>
                        </div>
                        <div class="breakdown-item">
                            <span>Artist receives (80%):</span>
                            <span class="price-converter" data-eth-amount="${(parseFloat(nft.price) * 0.8).toFixed(4)}" data-currency="kes">${(parseFloat(nft.price) * 0.8).toFixed(4)} ETH</span>
                        </div>
                        <div class="breakdown-item">
                            <span>Platform fee (20%):</span>
                            <span class="price-converter" data-eth-amount="${(parseFloat(nft.price) * 0.2).toFixed(4)}" data-currency="kes">${(parseFloat(nft.price) * 0.2).toFixed(4)} ETH</span>
                        </div>
                        <hr>
                        <div class="breakdown-item total">
                            <span>Total:</span>
                            <span class="price-converter" data-eth-amount="${nft.price}" data-currency="kes">${nft.price} ETH</span>
                        </div>
                    </div>
                    <div class="purchase-actions">
                        <button class="btn btn-secondary" onclick="this.parentElement.parentElement.parentElement.remove()">Cancel</button>
                        <button class="btn btn-primary" onclick="gallery.confirmPurchase('${nft.id}', '${buyerAddress}')">Confirm Purchase</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Update currency displays
        if (window.currencyConverter) {
            window.currencyConverter.updateUI();
        }
    }
    
    async confirmPurchase(nftId, buyerAddress) {
        // Close modal
        const modal = document.querySelector('.purchase-modal-overlay');
        if (modal) {
            modal.remove();
        }
        
        this.walletConnection.showMessage('Processing purchase...', 'info');
        
        try {
            // Get NFT details
            const nft = window.userStore.getNFT(nftId);
            if (!nft) {
                throw new Error('NFT not found');
            }
            
            // Get blockchain service
            const blockchainService = window.blockchainService;
            if (!blockchainService) {
                throw new Error('Blockchain service not available');
            }
            
            // Check if on correct network (Sepolia for testing)
            const network = blockchainService.getCurrentNetwork();
            if (network.chainId !== '0xaa36a7') {
                const switched = await blockchainService.switchToSepolia();
                if (!switched) {
                    throw new Error('Please switch to Sepolia testnet');
                }
            }
            
            // Check balance
            const balance = await blockchainService.getBalance(buyerAddress);
            if (parseFloat(balance) < parseFloat(nft.price)) {
                throw new Error(`Insufficient balance. Required: ${nft.price} ETH, Available: ${parseFloat(balance).toFixed(4)} ETH`);
            }
            
            // Process blockchain transaction
            const blockchainResult = await blockchainService.purchaseNFT(
                buyerAddress, 
                nft.price, 
                nft.creator
            );
            
            if (blockchainResult.success) {
                // Update local storage after successful blockchain transaction
                const result = window.userStore.purchaseNFT(nftId, buyerAddress);
                
                if (result.success) {
                    this.walletConnection.showMessage(
                        `NFT purchased successfully! Artist: ${blockchainResult.artistTransaction}, Platform: ${blockchainResult.developerTransaction}`, 
                        'success'
                    );
                    
                    // Store transaction hashes
                    sessionStorage.setItem(`purchase_${nftId}_artist_tx`, blockchainResult.artistTransaction);
                    sessionStorage.setItem(`purchase_${nftId}_platform_tx`, blockchainResult.developerTransaction);
                    
                    // Refresh NFTs
                    this.loadNFTs();
                } else {
                    this.walletConnection.showMessage(result.message, 'error');
                }
            } else {
                throw new Error(blockchainResult.error || 'Blockchain transaction failed');
            }
            
        } catch (error) {
            console.error('Purchase error:', error);
            this.walletConnection.showMessage(`Purchase failed: ${error.message}`, 'error');
        }
    }
    
    formatAddress(address) {
        if (!address) return '';
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    }
    
    getNFTImage(nft) {
        if (nft.image) {
            const imageData = window.imageHandler.getImage(nft.image);
            if (imageData) {
                return imageData.data;
            }
        }
        
        // Fallback to generated image
        return this.generateNFTImage(nft.id, nft.name, '#6366f1', '#ec4899');
    }
    
    addNFTDetailsModalStyles() {
        // Check if styles already added
        if (document.getElementById('nft-details-modal-styles')) {
            return;
        }
        
        const styles = document.createElement('style');
        styles.id = 'nft-details-modal-styles';
        styles.textContent = `
            .nft-details-modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                padding: 2rem;
            }
            
            .nft-details-modal {
                background: var(--card-background);
                border-radius: 16px;
                max-width: 900px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                border: 1px solid var(--border-color);
                box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 2rem 2rem 1rem;
                border-bottom: 1px solid var(--border-color);
            }
            
            .modal-header h2 {
                margin: 0;
                color: var(--text-light);
                font-size: 1.5rem;
            }
            
            .close-btn {
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                color: var(--text-dark);
                padding: 0;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
            }
            
            .close-btn:hover {
                background: var(--border-color);
                color: var(--text-light);
            }
            
            .modal-content {
                padding: 2rem;
            }
            
            .nft-details-layout {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 2rem;
            }
            
            .nft-image-section {
                position: relative;
            }
            
            .nft-detail-image {
                width: 100%;
                height: 400px;
                object-fit: cover;
                border-radius: 12px;
                border: 1px solid var(--border-color);
            }
            
            .nft-status {
                position: absolute;
                top: 1rem;
                right: 1rem;
            }
            
            .status-badge {
                padding: 0.5rem 1rem;
                border-radius: 20px;
                font-size: 0.8rem;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .status-badge.for-sale {
                background: var(--success-color);
                color: white;
            }
            
            .status-badge.not-for-sale {
                background: var(--error-color);
                color: white;
            }
            
            .nft-info-section {
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
            }
            
            .nft-title-section h3 {
                font-size: 1.5rem;
                margin: 0 0 0.5rem 0;
                color: var(--text-light);
            }
            
            .nft-description {
                color: var(--text-dark);
                line-height: 1.6;
                margin: 0;
            }
            
            .nft-details-grid {
                display: grid;
                gap: 1rem;
            }
            
            .detail-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.75rem 0;
                border-bottom: 1px solid var(--border-color);
            }
            
            .detail-label {
                font-weight: 600;
                color: var(--text-dark);
            }
            
            .detail-value {
                color: var(--text-light);
                font-family: 'Courier New', monospace;
                font-size: 0.9rem;
            }
            
            .price-breakdown {
                background: var(--background-light);
                padding: 1rem;
                border-radius: 8px;
                border: 1px solid var(--border-color);
            }
            
            .price-breakdown h4 {
                margin: 0 0 1rem 0;
                color: var(--text-light);
                font-size: 1rem;
            }
            
            .breakdown-item {
                display: flex;
                justify-content: space-between;
                margin-bottom: 0.5rem;
            }
            
            .breakdown-item span:first-child {
                color: var(--text-dark);
            }
            
            .breakdown-item span:last-child {
                color: var(--text-light);
                font-weight: 600;
            }
            
            .nft-actions {
                display: flex;
                gap: 1rem;
                margin-top: 1rem;
            }
            
            .nft-actions .btn {
                flex: 1;
                padding: 0.75rem 1rem;
                border-radius: 8px;
                border: none;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .nft-actions .btn-primary {
                background: var(--primary-color);
                color: white;
            }
            
            .nft-actions .btn-primary:hover {
                background: var(--primary-hover);
                transform: translateY(-2px);
            }
            
            .nft-actions .btn-secondary {
                background: var(--border-color);
                color: var(--text-light);
            }
            
            .nft-actions .btn-secondary:hover {
                background: var(--text-dark);
                color: white;
            }
            
            .nft-actions .btn:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
            
            .nft-actions .btn:disabled:hover {
                transform: none;
            }
            
            @media (max-width: 768px) {
                .nft-details-modal-overlay {
                    padding: 1rem;
                }
                
                .nft-details-layout {
                    grid-template-columns: 1fr;
                }
                
                .nft-detail-image {
                    height: 300px;
                }
                
                .modal-header, .modal-content {
                    padding: 1rem;
                }
                
                .nft-actions {
                    flex-direction: column;
                }
            }
        `;
        
        document.head.appendChild(styles);
    }
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.gallery = new GalleryApp();
});
