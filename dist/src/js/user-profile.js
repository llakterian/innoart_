import { Web3Handler } from './web3';
export class UserProfile {
    constructor() {
        this.userNFTs = [];
        this.userStats = {
            totalNFTs: 0,
            totalSales: 0,
            totalEarnings: '0'
        };
        this.web3Handler = Web3Handler.getInstance();
        this.init();
    }
    async init() {
        await this.checkWalletConnection();
        await this.loadUserData();
        this.setupEventListeners();
        this.renderProfile();
    }
    async checkWalletConnection() {
        const connected = await this.web3Handler.isConnected();
        if (!connected) {
            this.showConnectWallet();
            return;
        }
    }
    setupEventListeners() {
        const connectButton = document.getElementById('connectWalletBtn');
        connectButton?.addEventListener('click', () => this.connectWallet());
        const editProfileBtn = document.getElementById('editProfileBtn');
        editProfileBtn?.addEventListener('click', () => this.toggleEditMode());
        const saveProfileBtn = document.getElementById('saveProfileBtn');
        saveProfileBtn?.addEventListener('click', () => this.saveProfile());
        const tabButtons = document.querySelectorAll('.tab-btn');
        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const tab = e.target.dataset.tab;
                this.switchTab(tab);
            });
        });
    }
    async loadUserData() {
        try {
            const account = await this.web3Handler.getAccount();
            if (!account)
                return;
            await this.loadUserNFTs(account);
            await this.loadUserStats(account);
        }
        catch (error) {
            console.error('Error loading user data:', error);
            this.showError('Failed to load profile data');
        }
    }
    async loadUserNFTs(account) {
        try {
            const contract = await this.web3Handler.getContract();
            // Mock data for demo
            this.userNFTs = [];
            for (let i = 1; i <= 3; i++) {
                this.userNFTs.push({
                    id: i.toString(),
                    name: `My NFT #${i}`,
                    image: `assets/images/nft${i}.png`,
                    price: '1.0',
                    isForSale: i % 2 === 0 // Every other NFT is for sale
                });
            }
        }
        catch (error) {
            console.error('Error loading user NFTs:', error);
        }
    }
    async loadUserStats(account) {
        try {
            // In a real implementation, you would fetch this from your backend
            this.userStats = {
                totalNFTs: this.userNFTs.length,
                totalSales: 0, // This would come from transaction history
                totalEarnings: '0' // This would come from transaction history
            };
        }
        catch (error) {
            console.error('Error loading user stats:', error);
        }
    }
    async fetchMetadata(tokenURI) {
        try {
            const response = await fetch(tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/'));
            return await response.json();
        }
        catch (error) {
            console.error('Error fetching metadata:', error);
            return { name: 'Unknown', image: '' };
        }
    }
    renderProfile() {
        this.renderUserInfo();
        this.renderStats();
        this.renderNFTs();
    }
    renderUserInfo() {
        const userAddress = document.getElementById('userAddress');
        const userAddressDisplay = document.getElementById('userAddressDisplay');
        if (userAddress && userAddressDisplay) {
            this.web3Handler.getAccount().then(account => {
                if (account) {
                    const shortAddress = `${account.slice(0, 6)}...${account.slice(-4)}`;
                    userAddress.textContent = shortAddress;
                    userAddressDisplay.textContent = account;
                }
            });
        }
    }
    renderStats() {
        const totalNFTsElement = document.getElementById('totalNFTs');
        const totalSalesElement = document.getElementById('totalSales');
        const totalEarningsElement = document.getElementById('totalEarnings');
        if (totalNFTsElement)
            totalNFTsElement.textContent = this.userStats.totalNFTs.toString();
        if (totalSalesElement)
            totalSalesElement.textContent = this.userStats.totalSales.toString();
        if (totalEarningsElement)
            totalEarningsElement.textContent = `${this.userStats.totalEarnings} ETH`;
    }
    renderNFTs() {
        const nftGrid = document.getElementById('userNFTGrid');
        if (!nftGrid)
            return;
        nftGrid.innerHTML = '';
        if (this.userNFTs.length === 0) {
            nftGrid.innerHTML = '<p class="no-nfts">You don\'t own any NFTs yet.</p>';
            return;
        }
        this.userNFTs.forEach(nft => {
            const nftCard = document.createElement('div');
            nftCard.className = 'nft-card';
            nftCard.innerHTML = `
        <div class="nft-image">
          <img src="${nft.image.replace('ipfs://', 'https://ipfs.io/ipfs/')}" alt="${nft.name}" loading="lazy">
          ${nft.isForSale ? '<span class="sale-badge">For Sale</span>' : ''}
        </div>
        <div class="nft-info">
          <h3>${this.sanitizeHTML(nft.name)}</h3>
          <div class="nft-actions">
            <span class="price">${nft.price} ETH</span>
            <button class="btn-toggle-sale" data-id="${nft.id}">
              ${nft.isForSale ? 'Remove from Sale' : 'Put on Sale'}
            </button>
          </div>
        </div>
      `;
            nftCard.querySelector('.btn-toggle-sale')?.addEventListener('click', () => {
                this.toggleSaleStatus(nft.id, !nft.isForSale);
            });
            nftGrid.appendChild(nftCard);
        });
    }
    async toggleSaleStatus(tokenId, forSale) {
        try {
            const contract = await this.web3Handler.getContract();
            const account = await this.web3Handler.getAccount();
            if (forSale) {
                // Put NFT on sale
                await contract.methods.putOnSale(tokenId).send({ from: account });
            }
            else {
                // Remove NFT from sale
                await contract.methods.removeFromSale(tokenId).send({ from: account });
            }
            this.showSuccess(`NFT ${forSale ? 'put on' : 'removed from'} sale successfully!`);
            await this.loadUserData();
            this.renderProfile();
        }
        catch (error) {
            console.error('Error toggling sale status:', error);
            this.showError('Failed to update sale status');
        }
    }
    showConnectWallet() {
        const profileContent = document.getElementById('profileContent');
        const connectWalletSection = document.getElementById('connectWalletSection');
        if (profileContent)
            profileContent.style.display = 'none';
        if (connectWalletSection)
            connectWalletSection.style.display = 'block';
    }
    async connectWallet() {
        try {
            await this.web3Handler.connectWallet();
            const profileContent = document.getElementById('profileContent');
            const connectWalletSection = document.getElementById('connectWalletSection');
            if (profileContent)
                profileContent.style.display = 'block';
            if (connectWalletSection)
                connectWalletSection.style.display = 'none';
            await this.loadUserData();
            this.renderProfile();
        }
        catch (error) {
            console.error('Wallet connection error:', error);
            this.showError('Failed to connect wallet');
        }
    }
    toggleEditMode() {
        const editableFields = document.querySelectorAll('.editable');
        const editBtn = document.getElementById('editProfileBtn');
        const saveBtn = document.getElementById('saveProfileBtn');
        editableFields.forEach(field => {
            const input = field;
            input.disabled = !input.disabled;
        });
        if (editBtn)
            editBtn.style.display = editBtn.style.display === 'none' ? 'block' : 'none';
        if (saveBtn)
            saveBtn.style.display = saveBtn.style.display === 'none' ? 'block' : 'none';
    }
    async saveProfile() {
        try {
            // In a real implementation, you would save this to your backend
            this.showSuccess('Profile updated successfully!');
            this.toggleEditMode();
        }
        catch (error) {
            console.error('Error saving profile:', error);
            this.showError('Failed to save profile');
        }
    }
    switchTab(tab) {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        tabButtons.forEach(button => {
            button.classList.remove('active');
        });
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        const activeTabButton = document.querySelector(`[data-tab="${tab}"]`);
        const activeTabContent = document.getElementById(`${tab}Tab`);
        if (activeTabButton)
            activeTabButton.classList.add('active');
        if (activeTabContent)
            activeTabContent.classList.add('active');
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
