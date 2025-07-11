import { Web3Handler } from './web3';
import { NFTGallery } from './gallery';
import { ArtistRegistration } from '../../components/ArtistRegistration/artist-register';
import { NFTUploader } from './upload';
import { UserProfile } from './user-profile';
class InnoArtApp {
    constructor() {
        this.web3Handler = Web3Handler.getInstance();
        this.init();
    }
    async init() {
        await this.checkWalletConnection();
        this.setupGlobalListeners();
        this.initializePageSpecificComponents();
    }
    async checkWalletConnection() {
        try {
            const connected = await this.web3Handler.isConnected();
            if (connected) {
                this.updateWalletUI(await this.web3Handler.getAccount());
            }
        }
        catch (error) {
            console.error('Error checking wallet connection:', error);
        }
    }
    setupGlobalListeners() {
        const connectButton = document.getElementById('connectWallet');
        const disconnectButton = document.getElementById('disconnectWallet');
        connectButton?.addEventListener('click', () => this.connectWallet());
        disconnectButton?.addEventListener('click', () => this.disconnectWallet());
        // Listen for account changes
        window.ethereum?.on('accountsChanged', (accounts) => {
            this.updateWalletUI(accounts[0] || null);
        });
    }
    initializePageSpecificComponents() {
        const path = window.location.pathname.split('/').pop() || '';
        switch (path) {
            case 'gallery.html':
                new NFTGallery();
                break;
            case 'artist-register.html':
                new ArtistRegistration();
                break;
            case 'upload.html':
                new NFTUploader();
                break;
            case 'profile.html':
                new UserProfile();
                break;
            default:
                this.initHomepage();
        }
    }
    async initHomepage() {
        await this.loadFeaturedArtists();
        this.setupHeroAnimation();
    }
    async loadFeaturedArtists() {
        try {
            const container = document.getElementById('featuredArtists');
            if (!container)
                return;
            // Fetch from contract (mocked for now)
            const featuredArtists = await this.web3Handler.getFeaturedArtists();
            container.innerHTML = '';
            featuredArtists.forEach(artist => {
                const artistCard = document.createElement('div');
                artistCard.className = 'artist-card';
                artistCard.innerHTML = `
          <img src="${artist.avatar}" alt="${artist.name}" loading="lazy">
          <h3>${this.sanitizeHTML(artist.name)}</h3>
          <p class="bio">${this.sanitizeHTML(artist.bio)}</p>
          <p class="sales">${artist.sales} NFTs sold</p>
          <a href="gallery.html?artist=${encodeURIComponent(artist.name)}" class="btn-view">View Art</a>
        `;
                container.appendChild(artistCard);
            });
        }
        catch (error) {
            console.error('Error loading featured artists:', error);
            this.showError('Failed to load featured artists');
        }
    }
    setupHeroAnimation() {
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.classList.add('animated', 'fade-in');
        }
    }
    async connectWallet() {
        try {
            await this.web3Handler.connectWallet();
            const account = await this.web3Handler.getAccount();
            this.updateWalletUI(account);
        }
        catch (error) {
            console.error('Wallet connection error:', error);
            this.showError('Failed to connect wallet. Please ensure MetaMask is installed.');
        }
    }
    async disconnectWallet() {
        try {
            await this.web3Handler.disconnectWallet();
            this.updateWalletUI(null);
        }
        catch (error) {
            console.error('Wallet disconnection error:', error);
            this.showError('Failed to disconnect wallet');
        }
    }
    updateWalletUI(account) {
        const connectButton = document.getElementById('connectWallet');
        const disconnectButton = document.getElementById('disconnectWallet');
        if (account) {
            connectButton?.classList.add('hidden');
            disconnectButton?.classList.remove('hidden');
            disconnectButton.textContent = `Disconnect (${account.slice(0, 6)}...${account.slice(-4)})`;
        }
        else {
            connectButton?.classList.remove('hidden');
            disconnectButton?.classList.add('hidden');
        }
    }
    showError(message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        document.body.appendChild(errorElement);
        setTimeout(() => errorElement.remove(), 7000);
    }
    sanitizeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new InnoArtApp();
});
