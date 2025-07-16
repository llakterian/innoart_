// Service for handling transaction-related logic
class TransactionService {
    constructor(apiClient) {
        this.apiClient = apiClient;
    }

    async getTransactions(walletAddress) {
        // In a real application, this would make an API call to the backend
        // return this.apiClient.getTransactions(walletAddress);

        // For now, we'll use mock data
        return [
            {
                id: '1',
                type: 'nft_purchase',
                walletAddress,
                nftId: '123',
                amount: '0.5',
                timestamp: Date.now() - 1000 * 60 * 60 * 24,
                status: 'completed',
                description: 'Purchased "CryptoPunk #123" for 0.5 ETH',
            },
            {
                id: '2',
                type: 'artist_registration_fee',
                walletAddress,
                amount: '0.01',
                timestamp: Date.now() - 1000 * 60 * 60 * 48,
                status: 'completed',
                description: 'Artist registration fee',
            },
        ];
    }
}

window.transactionService = new TransactionService(window.apiClient);