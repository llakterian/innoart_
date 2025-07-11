import { Web3Handler } from './js/web3';

interface ProfileData {
    name: string;
    bio: string;
    avatar: string;
    social: {
        twitter?: string;
        instagram?: string;
    };
    stats: {
        creations: number;
        sold: number;
        collected: number;
    };
}

interface NFTData {
    id: string;
    title: string;
    tokenURI: string;
    price: string;
    creator: string;
    owner: string;
    forSale: boolean;
}

class UserProfile {
    private web3Handler: Web3Handler;

    constructor() {
        this.web3Handler = Web3Handler.getInstance();
        this.init();
    }

    private async init(): Promise<void> {
        await this.loadProfile();
        this.initEventListeners();
    }

    private async loadProfile(): Promise<void> {
        try {
            const account = await this.web3Handler.getAccount();
            if (!account) {
                this.showConnectWalletPrompt();
                return;
            }

            this.showLoading();
            
            // In a real app, you would fetch this from your backend
            const profileData = await this.fetchProfileData(account);
            this.displayProfile(profileData);
            
            await this.loadUserNFTs(account);
        } catch (error) {
            console.error('Profile loading error:', error);
            this.showError('Failed to load profile data');
        } finally {
            this.hideLoading();
        }
    }

    private async fetchProfileData(address: string): Promise<ProfileData> {
        // Mock data - replace with actual API call
        return {
            name: "DigitalArtist",
            bio: "Creating unique digital art on the blockchain",
            avatar: "assets/images/artist1.png",
            social: {
                twitter: "@digitalartist",
                instagram: "@digitalart"
            },
            stats: {
                creations: 15,
                sold: 8,
                collected: 5
            }
        };
    }

    private displayProfile(data: ProfileData): void {
        const profileHeader = document.getElementById('profileHeader');
        const profileDetails = document.getElementById('profileDetails');
        
        if (profileHeader) {
            profileHeader.innerHTML = `
                <div class="profile-avatar">
                    <img src="${data.avatar}" alt="${data.name}">
                </div>
                <div class="profile-info">
                    <h1>${data.name}</h1>
                    <p class="bio">${data.bio}</p>
                    <div class="social-links">
                        ${data.social.twitter ? `<a href="https://twitter.com/${data.social.twitter}" target="_blank">Twitter</a>` : ''}
                        ${data.social.instagram ? `<a href="https://instagram.com/${data.social.instagram}" target="_blank">Instagram</a>` : ''}
                    </div>
                </div>
                <div class="profile-stats">
                    <div class="stat">
                        <span class="number">${data.stats.creations}</span>
                        <span class="label">Creations</span>
                    </div>
                    <div class="stat">
                        <span class="number">${data.stats.sold}</span>
                        <span class="label">Sold</span>
                    </div>
                    <div class="stat">
                        <span class="number">${data.stats.collected}</span>
                        <span class="label">Collected</span>
                    </div>
                </div>
            `;
        }
        
        if (profileDetails) {
            profileDetails.innerHTML = `
                <h2>About</h2>
                <p>${data.bio}</p>
                <h2>Activity</h2>
                <div class="activity-feed">
                    <!-- Activity items would be populated here -->
                </div>
            `;
        }
    }

    private async loadUserNFTs(address: string): Promise<void> {
        try {
            const contract = await this.web3Handler.getContract();
            const nftCount = await contract.methods.tokenCounter().call();
            const count = Number(nftCount);
            
            const createdNFTs: HTMLElement | null = document.getElementById('createdNFTs');
            const collectedNFTs: HTMLElement | null = document.getElementById('collectedNFTs');
            
            if (createdNFTs) createdNFTs.innerHTML = '';
            if (collectedNFTs) collectedNFTs.innerHTML = '';
            
            for (let i = 1; i <= count; i++) {
                const nftData = await contract.methods.artItems(i).call() as any;
                if (!nftData || !nftData.id || nftData.id === '0') continue;
                
                const nft: NFTData = {
                    id: nftData.id?.toString() || '0',
                    title: nftData.title || `InnoArt #${i}`,
                    tokenURI: nftData.tokenURI || '',
                    price: nftData.price?.toString() || '0',
                    creator: nftData.creator || '',
                    owner: nftData.owner || '',
                    forSale: nftData.forSale || false
                };
                
                if (nft.creator.toLowerCase() === address.toLowerCase()) {
                    await this.createNFTCard(nft, i, createdNFTs, true);
                }
                
                if (nft.owner.toLowerCase() === address.toLowerCase() && 
                    nft.creator.toLowerCase() !== address.toLowerCase()) {
                    await this.createNFTCard(nft, i, collectedNFTs, false);
                }
            }
        } catch (error) {
            console.error('Error loading user NFTs:', error);
            this.showError('Failed to load your NFTs');
        }
    }

    private async createNFTCard(nft: NFTData, id: number, container: HTMLElement | null, isCreator: boolean): Promise<void> {
        if (!container) return;

        const priceInWei = nft.price || '0';
        const price = (parseFloat(priceInWei) / 1e18).toString();
        
        const nftCard = document.createElement('div');
        nftCard.className = 'nft-card';
        nftCard.innerHTML = `
            <div class="nft-image-container">
                <img src="${nft.tokenURI}" alt="NFT ${id}" loading="lazy">
            </div>
            <div class="nft-info">
                <h3>${nft.title || `InnoArt #${id}`}</h3>
                <div class="price-container">
                    <span class="price">${price} ETH</span>
                    ${isCreator && nft.forSale ? 
                        `<button class="manage-btn" data-id="${id}">Manage</button>` : 
                        `<a href="gallery.html?nft=${id}" class="view-btn">View</a>`}
                </div>
            </div>
        `;

        container.appendChild(nftCard);
        
        const manageBtn = nftCard.querySelector('.manage-btn');
        manageBtn?.addEventListener('click', () => this.manageNFT(id));
    }

    private manageNFT(tokenId: number): void {
        // Implement NFT management modal
        console.log('Manage NFT:', tokenId);
        this.showNFTManagementModal(tokenId);
    }

    private showNFTManagementModal(tokenId: number): void {
        // Implement modal for price/sale status management
        alert(`Management for NFT #${tokenId} would appear here`);
    }

    private initEventListeners(): void {
        document.getElementById('connectWalletBtn')?.addEventListener('click', () => this.connectWallet());
    }

    private async connectWallet(): Promise<void> {
        try {
            await this.web3Handler.connectWallet();
            window.location.reload();
        } catch (error) {
            console.error('Wallet connection error:', error);
            this.showError('Failed to connect wallet');
        }
    }

    private showConnectWalletPrompt(): void {
        const profileContent = document.getElementById('profileContent');
        if (profileContent) {
            profileContent.innerHTML = `
                <div class="connect-prompt">
                    <h2>Connect Your Wallet</h2>
                    <p>Connect your wallet to view your profile and NFTs</p>
                    <button id="connectWalletBtn" class="btn-primary">Connect Wallet</button>
                </div>
            `;
            
            document.getElementById('connectWalletBtn')?.addEventListener('click', () => this.connectWallet());
        }
    }

    private showLoading(): void {
        const loadingElement = document.createElement('div');
        loadingElement.className = 'loading-spinner';
        loadingElement.id = 'profileLoading';
        
        const profileContent = document.getElementById('profileContent');
        profileContent?.prepend(loadingElement);
    }

    private hideLoading(): void {
        document.getElementById('profileLoading')?.remove();
    }

    private showError(message: string): void {
        console.error('Profile error:', message);
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        const profileContent = document.getElementById('profileContent');
        if (profileContent) {
            profileContent.prepend(errorElement);
            setTimeout(() => errorElement.remove(), 5000);
        }
    }
}

// Initialize profile
document.addEventListener('DOMContentLoaded', () => {
    new UserProfile();
});