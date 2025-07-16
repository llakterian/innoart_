// Service for handling user-related logic
class UserService {
    constructor(apiClient) {
        this.apiClient = apiClient;
    }

    async getProfile(walletAddress) {
        // In a real application, this would make an API call to the backend
        // return this.apiClient.getProfile(walletAddress);

        // For now, we'll use mock data
        return {
            walletAddress,
            name: 'John Doe',
            bio: 'I am a user of this amazing platform.',
            social: 'https://twitter.com/johndoe',
            avatar: 'https://via.placeholder.com/100',
            isArtist: true,
        };
    }

    async updateProfile(walletAddress, profileData) {
        // In a real application, this would make an API call to the backend
        // return this.apiClient.updateProfile(walletAddress, profileData);

        // For now, we'll use mock data
        return {
            ...profileData,
            walletAddress,
        };
    }
}

window.userService = new UserService(window.apiClient);