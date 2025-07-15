// Member Artists page functionality
class MemberArtistsApp {
    constructor() {
        this.walletConnection = window.walletConnection;
        this.userStore = window.userStore;
        this.currencyConverter = window.currencyConverter;
        this.currentFilter = 'all';
        this.searchTerm = '';
        this.init();
    }

    async init() {
        this.setupEventListeners();
        await this.loadArtists();
    }

    setupEventListeners() {
        // Connect wallet button
        document.addEventListener('click', (e) => {
            if (e.target.id === 'connectWallet') {
                this.handleWalletConnection();
            }
        });

        // Search input
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value.toLowerCase();
                this.filterAndDisplayArtists();
            });
        }

        // Filter tabs
        const filterTabs = document.querySelectorAll('.filter-tab');
        filterTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                // Remove active class from all tabs
                filterTabs.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                e.target.classList.add('active');
                
                this.currentFilter = e.target.dataset.filter;
                this.filterAndDisplayArtists();
            });
        });

        // Artist card clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('.artist-card')) {
                const artistCard = e.target.closest('.artist-card');
                const walletAddress = artistCard.dataset.walletAddress;
                this.openArtistProfile(walletAddress);
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
    }

    async handleWalletConnection() {
        console.log('Member Artists: handleWalletConnection called');
        
        // Use the direct wallet connection system
        if (window.walletState && window.walletState.isConnected) {
            // Already connected, disconnect
            if (window.disconnectWalletDirect) {
                window.disconnectWalletDirect();
            }
        } else {
            // Not connected, try to connect
            if (window.connectWalletDirect) {
                try {
                    await window.connectWalletDirect();
                } catch (error) {
                    console.error('Member Artists: Wallet connection failed', error);
                }
            } else {
                console.error('Member Artists: Direct wallet connection not available');
            }
        }
    }

    async loadArtists() {
        try {
            // Show loading state
            document.getElementById('loadingIndicator').style.display = 'block';
            document.getElementById('artistsGrid').style.display = 'none';
            document.getElementById('emptyState').style.display = 'none';

            // Get all artists from user store
            const artists = this.userStore.getArtists();
            console.log('Loaded artists:', artists);

            // Calculate and display stats
            this.updateStats(artists);

            // Store artists for filtering
            this.artists = artists;

            // Filter and display artists
            this.filterAndDisplayArtists();

        } catch (error) {
            console.error('Error loading artists:', error);
            this.showError('Failed to load artists. Please try again.');
        } finally {
            // Hide loading state
            document.getElementById('loadingIndicator').style.display = 'none';
        }
    }

    updateStats(artists) {
        const totalArtists = artists.length;
        const nfts = this.userStore.getNFTs();
        const totalNFTs = nfts.length;
        
        // Calculate total sales and volume
        let totalSales = 0;
        let totalVolume = 0;
        
        artists.forEach(artist => {
            totalSales += artist.totalSales || 0;
            totalVolume += parseFloat(artist.totalEarnings || '0');
        });

        // Update DOM
        document.getElementById('totalArtists').textContent = totalArtists;
        document.getElementById('totalNFTs').textContent = totalNFTs;
        document.getElementById('totalSales').textContent = totalSales;
        document.getElementById('totalVolume').textContent = totalVolume.toFixed(2);
    }

    filterAndDisplayArtists() {
        if (!this.artists) return;

        let filteredArtists = [...this.artists];

        // Apply search filter
        if (this.searchTerm) {
            filteredArtists = filteredArtists.filter(artist => 
                artist.name.toLowerCase().includes(this.searchTerm) ||
                artist.walletAddress.toLowerCase().includes(this.searchTerm)
            );
        }

        // Apply category filter
        switch (this.currentFilter) {
            case 'verified':
                filteredArtists = filteredArtists.filter(artist => artist.verified);
                break;
            case 'top-sellers':
                filteredArtists = filteredArtists.filter(artist => (artist.totalSales || 0) > 0)
                    .sort((a, b) => (b.totalSales || 0) - (a.totalSales || 0));
                break;
            case 'new':
                filteredArtists = filteredArtists.sort((a, b) => b.registrationDate - a.registrationDate);
                break;
            default:
                // Show all artists, sorted by registration date (newest first)
                filteredArtists = filteredArtists.sort((a, b) => b.registrationDate - a.registrationDate);
                break;
        }

        this.displayArtists(filteredArtists);
    }

    displayArtists(artists) {
        const grid = document.getElementById('artistsGrid');
        const emptyState = document.getElementById('emptyState');

        if (artists.length === 0) {
            grid.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }

        grid.style.display = 'grid';
        emptyState.style.display = 'none';

        grid.innerHTML = artists.map(artist => this.createArtistCard(artist)).join('');
    }

    createArtistCard(artist) {
        const shortAddress = `${artist.walletAddress.substring(0, 6)}...${artist.walletAddress.slice(-4)}`;
        const avatar = artist.avatar ? 
            `<img src="${artist.avatar}" alt="${artist.name}">` : 
            artist.name.substring(0, 2).toUpperCase();

        const registrationDate = new Date(artist.registrationDate).toLocaleDateString();
        const verifiedBadge = artist.verified ? '<span style="color: var(--success-color); font-size: 0.9rem;">✓ Verified</span>' : '';

        // Get artist's NFTs
        const nfts = this.userStore.getNFTs().filter(nft => nft.creator === artist.walletAddress);
        const nftCount = nfts.length;

        return `
            <div class="artist-card" data-wallet-address="${artist.walletAddress}">
                <div class="artist-header">
                    <div class="artist-avatar">
                        ${avatar}
                    </div>
                    <div class="artist-info">
                        <h3>${artist.name} ${verifiedBadge}</h3>
                        <div class="artist-address">${shortAddress}</div>
                    </div>
                </div>
                
                <div class="artist-bio">
                    ${artist.bio || 'No bio provided'}
                </div>
                
                <div class="artist-stats">
                    <div class="artist-stat">
                        <span class="artist-stat-number">${nftCount}</span>
                        <span class="artist-stat-label">NFTs</span>
                    </div>
                    <div class="artist-stat">
                        <span class="artist-stat-number">${artist.totalSales || 0}</span>
                        <span class="artist-stat-label">Sales</span>
                    </div>
                    <div class="artist-stat">
                        <span class="artist-stat-number">${parseFloat(artist.totalEarnings || '0').toFixed(2)}</span>
                        <span class="artist-stat-label">ETH</span>
                    </div>
                </div>
                
                ${artist.social ? `
                    <div class="artist-social">
                        <a href="${artist.social}" target="_blank" rel="noopener noreferrer">
                            ${this.formatSocialLink(artist.social)}
                        </a>
                    </div>
                ` : ''}
                
                <div class="artist-actions">
                    <button class="btn btn-primary" onclick="window.location.href='profile.html?artist=${artist.walletAddress}'">
                        View Profile
                    </button>
                    <button class="btn btn-secondary" onclick="window.location.href='gallery.html?artist=${artist.walletAddress}'">
                        View NFTs
                    </button>
                </div>
            </div>
        `;
    }

    formatSocialLink(url) {
        if (url.includes('twitter.com') || url.includes('x.com')) {
            return '🐦 Twitter';
        } else if (url.includes('instagram.com')) {
            return '📸 Instagram';
        } else if (url.includes('linkedin.com')) {
            return '💼 LinkedIn';
        } else if (url.includes('github.com')) {
            return '🐙 GitHub';
        } else {
            return '🔗 Website';
        }
    }

    openArtistProfile(walletAddress) {
        // Navigate to profile page with artist parameter
        window.location.href = `profile.html?artist=${walletAddress}`;
    }

    showError(message) {
        if (this.walletConnection && this.walletConnection.showMessage) {
            this.walletConnection.showMessage(message, 'error');
        } else {
            console.error(message);
        }
    }
}

// Initialize member artists app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MemberArtistsApp();
});
