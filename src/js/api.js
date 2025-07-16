// Secure API Communication
class ApiClient {
    constructor() {
        this.baseUrl = 'http://localhost:3000/api'; // Replace with your actual backend URL
    }

    async _fetch(endpoint, options = {}) {
        const { authManager } = window;
        const { token } = authManager.getAuthState();

        const headers = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            headers,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'API request failed');
        }

        return response.json();
    }

    // User and Artist Profile Management
    async getProfile(walletAddress) {
        return this._fetch(`/users/${walletAddress}`);
    }

    async updateProfile(walletAddress, profileData) {
        return this._fetch(`/users/${walletAddress}`, {
            method: 'PUT',
            body: JSON.stringify(profileData),
        });
    }

    async registerArtist(artistData) {
        return this._fetch('/artists', {
            method: 'POST',
            body: JSON.stringify(artistData),
        });
    }

    // NFT Management
    async createNFT(nftData) {
        return this._fetch('/nfts', {
            method: 'POST',
            body: JSON.stringify(nftData),
        });
    }

    async getNFTs() {
        return this._fetch('/nfts');
    }

    async purchaseNFT(nftId) {
        return this._fetch(`/nfts/${nftId}/purchase`, {
            method: 'POST',
        });
    }

    // Transaction Management
    async getTransactions(walletAddress) {
        return this._fetch(`/transactions/${walletAddress}`);
    }
}

window.apiClient = new ApiClient();