// Service for handling artist-related logic
class ArtistService {
    constructor(apiClient) {
        this.apiClient = apiClient;
    }

    async registerArtist(artistData) {
        // In a real application, this would make an API call to the backend
        // return this.apiClient.registerArtist(artistData);

        // For now, we'll use mock data
        return {
            id: '1',
            ...artistData,
            walletAddress: '0x123...',
            registrationDate: Date.now(),
            verified: true,
            totalSales: 0,
            totalEarnings: '0',
        };
    }

    async getArtists() {
        // In a real application, this would make an API call to the backend
        // return this.apiClient.getArtists();

        // For now, we'll use mock data
        return [
            {
                id: '1',
                name: 'CryptoCreator',
                walletAddress: '0x123...',
                bio: 'I create amazing crypto art.',
                social: 'https://twitter.com/cryptocreator',
                avatar: 'https://via.placeholder.com/100',
            },
            {
                id: '2',
                name: 'ApeLover',
                walletAddress: '0x456...',
                bio: 'I love bored apes.',
                social: 'https://twitter.com/apelover',
                avatar: 'https://via.placeholder.com/100',
            },
        ];
    }
}

window.artistService = new ArtistService(window.apiClient);