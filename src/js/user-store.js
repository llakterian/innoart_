// User Data Storage and Management
class UserStore {
    constructor() {
        this.storageKey = 'innoart_user_data';
        this.transactionKey = 'innoart_transactions';
        this.artistsKey = 'innoart_artists';
        this.nftsKey = 'innoart_nfts';
        
        this.init();
    }
    
    init() {
        // Initialize storage if not exists
        this.ensureStorageExists();
    }
    
    ensureStorageExists() {
        if (!localStorage.getItem(this.storageKey)) {
            localStorage.setItem(this.storageKey, JSON.stringify({}));
        }
        if (!localStorage.getItem(this.transactionKey)) {
            localStorage.setItem(this.transactionKey, JSON.stringify([]));
        }
        if (!localStorage.getItem(this.artistsKey)) {
            localStorage.setItem(this.artistsKey, JSON.stringify([]));
        }
        if (!localStorage.getItem(this.nftsKey)) {
            localStorage.setItem(this.nftsKey, JSON.stringify([]));
        }
    }
    
    // User Profile Management
    saveUserProfile(walletAddress, profileData) {
        const users = this.getUsersData();
        users[walletAddress] = {
            ...users[walletAddress],
            ...profileData,
            lastUpdated: Date.now()
        };
        localStorage.setItem(this.storageKey, JSON.stringify(users));
    }
    
    getUserProfile(walletAddress) {
        const users = this.getUsersData();
        return users[walletAddress] || null;
    }
    
    getUsersData() {
        return JSON.parse(localStorage.getItem(this.storageKey) || '{}');
    }
    
    // Artist Registration
    registerArtist(walletAddress, artistData) {
        const artists = this.getArtists();
        const existingArtist = artists.find(artist => artist.walletAddress === walletAddress);
        
        if (existingArtist) {
            // Update existing artist
            Object.assign(existingArtist, artistData, { lastUpdated: Date.now() });
        } else {
            // Add new artist
            artists.push({
                id: Date.now().toString(),
                walletAddress,
                ...artistData,
                registrationDate: Date.now(),
                verified: false,
                totalSales: 0,
                totalEarnings: '0'
            });
        }
        
        localStorage.setItem(this.artistsKey, JSON.stringify(artists));
        
        // Record registration fee transaction (100% to developer)
        this.addTransaction({
            type: 'artist_registration_fee',
            walletAddress,
            amount: '0.01', // Registration fee
            timestamp: Date.now(),
            status: 'completed',
            description: 'Artist registration fee (100% to developer)'
        });
        
        // Record developer fee transaction
        this.addTransaction({
            type: 'registration_fee_revenue',
            walletAddress: 'developer_wallet',
            amount: '0.01', // 100% to developer
            timestamp: Date.now(),
            status: 'completed',
            description: 'Registration fee revenue from artist registration'
        });
    }
    
    isArtistRegistered(walletAddress) {
        const artists = this.getArtists();
        return artists.some(artist => artist.walletAddress === walletAddress);
    }
    
    getArtists() {
        return JSON.parse(localStorage.getItem(this.artistsKey) || '[]');
    }
    
    getArtist(walletAddress) {
        const artists = this.getArtists();
        return artists.find(artist => artist.walletAddress === walletAddress);
    }
    
    // NFT Management
    createNFT(nftData) {
        const nfts = this.getNFTs();
        const newNFT = {
            id: Date.now().toString(),
            ...nftData,
            createdAt: Date.now(),
            forSale: true,
            sold: false,
            views: 0,
            likes: 0
        };
        
        nfts.push(newNFT);
        localStorage.setItem(this.nftsKey, JSON.stringify(nfts));
        
        return newNFT;
    }
    
    getNFTs() {
        return JSON.parse(localStorage.getItem(this.nftsKey) || '[]');
    }
    
    getNFT(id) {
        const nfts = this.getNFTs();
        return nfts.find(nft => nft.id === id);
    }
    
    updateNFT(id, updates) {
        const nfts = this.getNFTs();
        const nftIndex = nfts.findIndex(nft => nft.id === id);
        
        if (nftIndex !== -1) {
            nfts[nftIndex] = { ...nfts[nftIndex], ...updates, lastUpdated: Date.now() };
            localStorage.setItem(this.nftsKey, JSON.stringify(nfts));
            return nfts[nftIndex];
        }
        
        return null;
    }
    
    getUserNFTs(walletAddress) {
        const nfts = this.getNFTs();
        return nfts.filter(nft => nft.creator === walletAddress);
    }
    
    toggleNFTSale(id, walletAddress) {
        const nft = this.getNFT(id);
        if (nft && nft.creator === walletAddress) {
            const updatedNFT = this.updateNFT(id, { forSale: !nft.forSale });
            
            // Record transaction
            this.addTransaction({
                type: nft.forSale ? 'nft_listed' : 'nft_unlisted',
                walletAddress,
                nftId: id,
                timestamp: Date.now(),
                status: 'completed'
            });
            
            return updatedNFT;
        }
        
        return null;
    }
    
    // Transaction Management
    addTransaction(transactionData) {
        const transactions = this.getTransactions();
        const transaction = {
            id: Date.now().toString(),
            ...transactionData,
            timestamp: transactionData.timestamp || Date.now()
        };
        
        transactions.push(transaction);
        localStorage.setItem(this.transactionKey, JSON.stringify(transactions));
        
        return transaction;
    }
    
    getTransactions() {
        return JSON.parse(localStorage.getItem(this.transactionKey) || '[]');
    }
    
    getUserTransactions(walletAddress) {
        const transactions = this.getTransactions();
        return transactions.filter(tx => tx.walletAddress === walletAddress);
    }
    
    // Purchase NFT with proper fee distribution
    purchaseNFT(nftId, buyerAddress) {
        const nft = this.getNFT(nftId);
        if (!nft || !nft.forSale || nft.sold) {
            return { success: false, message: 'NFT not available for purchase' };
        }
        
        // Validate buyer is not the creator
        if (nft.creator === buyerAddress) {
            return { success: false, message: 'Cannot purchase your own NFT' };
        }
        
        // Calculate fees with proper precision
        const nftPrice = parseFloat(nft.price);
        const DEVELOPER_FEE_RATE = 0.20; // 20% to developer (from your .env)
        const ARTIST_EARNINGS_RATE = 0.80; // 80% to artist (from your .env)
        
        const developerFee = Number((nftPrice * DEVELOPER_FEE_RATE).toFixed(6));
        const artistEarnings = Number((nftPrice * ARTIST_EARNINGS_RATE).toFixed(6));
        
        // Validate fee calculation
        if (Math.abs((developerFee + artistEarnings) - nftPrice) > 0.000001) {
            return { success: false, message: 'Fee calculation error' };
        }
        
        // Update NFT status
        this.updateNFT(nftId, {
            owner: buyerAddress,
            forSale: false,
            sold: true,
            soldAt: Date.now(),
            soldPrice: nft.price,
            originalPrice: nft.price
        });
        
        // Record buyer transaction
        this.addTransaction({
            type: 'nft_purchase',
            walletAddress: buyerAddress,
            nftId: nftId,
            amount: nft.price,
            timestamp: Date.now(),
            status: 'completed',
            description: `Purchased "${nft.name}" for ${nft.price} ETH`
        });
        
        // Record artist earnings transaction
        this.addTransaction({
            type: 'nft_sale_earnings',
            walletAddress: nft.creator,
            nftId: nftId,
            amount: artistEarnings.toString(),
            timestamp: Date.now(),
            status: 'completed',
            description: `Sale earnings for "${nft.name}" (80% of ${nft.price} ETH)`
        });
        
        // Record developer fee transaction
        this.addTransaction({
            type: 'platform_fee',
            walletAddress: 'developer_wallet',
            nftId: nftId,
            amount: developerFee.toString(),
            timestamp: Date.now(),
            status: 'completed',
            description: `Platform fee for "${nft.name}" (20% of ${nft.price} ETH)`
        });
        
        // Update artist statistics
        const artist = this.getArtist(nft.creator);
        if (artist) {
            artist.totalSales = (artist.totalSales || 0) + 1;
            artist.totalEarnings = (parseFloat(artist.totalEarnings || '0') + artistEarnings).toFixed(6);
            
            const artists = this.getArtists();
            const artistIndex = artists.findIndex(a => a.walletAddress === nft.creator);
            if (artistIndex !== -1) {
                artists[artistIndex] = artist;
                localStorage.setItem(this.artistsKey, JSON.stringify(artists));
            }
        }
        
        return {
            success: true,
            message: 'NFT purchased successfully',
            transaction: {
                nftPrice,
                developerFee,
                artistEarnings,
                breakdown: {
                    total: nftPrice,
                    artistReceives: artistEarnings,
                    platformFee: developerFee,
                    artistPercentage: '80%',
                    platformPercentage: '20%'
                }
            }
        };
    }
    
    // Statistics
    getStats() {
        const nfts = this.getNFTs();
        const artists = this.getArtists();
        const transactions = this.getTransactions();
        
        const totalVolume = transactions
            .filter(tx => tx.type === 'nft_purchase')
            .reduce((sum, tx) => sum + parseFloat(tx.amount), 0);
        
        return {
            totalNFTs: nfts.length,
            totalArtists: artists.length,
            totalTransactions: transactions.length,
            totalVolume: totalVolume.toFixed(2),
            activeListings: nfts.filter(nft => nft.forSale && !nft.sold).length
        };
    }
    
    // Clear all data (for testing)
    clearAllData() {
        localStorage.removeItem(this.storageKey);
        localStorage.removeItem(this.transactionKey);
        localStorage.removeItem(this.artistsKey);
        localStorage.removeItem(this.nftsKey);
        this.ensureStorageExists();
    }
}

// Initialize user store
window.userStore = new UserStore();
