import { Web3Handler } from './js/web3';
class UserProfile {
    constructor() {
        this.web3Handler = Web3Handler.getInstance();
        this.init();
    }
    async init() {
        await this.loadProfile();
        this.initEventListeners();
    }
    async loadProfile() {
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
        }
        catch (error) {
            console.error('Profile loading error:', error);
            this.showError('Failed to load profile data');
        }
        finally {
            this.hideLoading();
        }
    }
    async fetchProfileData(address) {
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
    displayProfile(data) {
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
    async loadUserNFTs(address) {
        try {
            const contract = await this.web3Handler.getContract();
            const nftCount = await contract.methods.tokenCounter().call();
            const count = Number(nftCount);
            const createdNFTs = document.getElementById('createdNFTs');
            const collectedNFTs = document.getElementById('collectedNFTs');
            if (createdNFTs)
                createdNFTs.innerHTML = '';
            if (collectedNFTs)
                collectedNFTs.innerHTML = '';
            for (let i = 1; i <= count; i++) {
                const nftData = await contract.methods.artItems(i).call();
                if (!nftData || !nftData.id || nftData.id === '0')
                    continue;
                const nft = {
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
        }
        catch (error) {
            console.error('Error loading user NFTs:', error);
            this.showError('Failed to load your NFTs');
        }
    }
    async createNFTCard(nft, id, container, isCreator) {
        if (!container)
            return;
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
    manageNFT(tokenId) {
        // Implement NFT management modal
        console.log('Manage NFT:', tokenId);
        this.showNFTManagementModal(tokenId);
    }
    showNFTManagementModal(tokenId) {
        // Implement modal for price/sale status management
        alert(`Management for NFT #${tokenId} would appear here`);
    }
    initEventListeners() {
        document.getElementById('connectWalletBtn')?.addEventListener('click', () => this.connectWallet());
    }
    async connectWallet() {
        try {
            await this.web3Handler.connectWallet();
            window.location.reload();
        }
        catch (error) {
            console.error('Wallet connection error:', error);
            this.showError('Failed to connect wallet');
        }
    }
    showConnectWalletPrompt() {
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
    showLoading() {
        const loadingElement = document.createElement('div');
        loadingElement.className = 'loading-spinner';
        loadingElement.id = 'profileLoading';
        const profileContent = document.getElementById('profileContent');
        profileContent?.prepend(loadingElement);
    }
    hideLoading() {
        document.getElementById('profileLoading')?.remove();
    }
    showError(message) {
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
