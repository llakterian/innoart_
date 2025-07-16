// InnArt Configuration - Based on your environment variables
class Config {
    constructor() {
        // Network Configuration
        this.networkId = 11155111; // Sepolia Testnet
        this.networkName = 'sepolia';
        this.chainId = 11155111;
        
        // Alchemy Configuration
        this.alchemyApiKey = 'rcicHE-JjgwQXK8SeyoRH3SOOkOLkZhx';
        this.alchemyUrl = 'https://eth-sepolia.g.alchemy.com/v2/rcicHE-JjgwQXK8SeyoRH3SOOkOLkZhx';
        
        // Smart Contract Configuration
        this.contractAddress = '0xca96FFD000Ce3d041C905d4d76d5781E35D75B3A';
        this.developerWallet = '0x426F1B6F42F4fAa8cDc96D0C2a82e70709F3a191';
        
        // IPFS Storage Configuration
        this.ipfsApiKey = '378ec52e.244f1311cc574f1d90b8210688e4e0e7';
        this.nftStorageApiKey = 'e55be093.0cbe7858183d4d21a74c4581fac99941';
        this.ipfsGateway = 'https://ipfs.io/ipfs/';
        this.ipfsGatewayBackup = 'https://gateway.pinata.cloud/ipfs/';
        
        // Marketplace Configuration
        this.platformFee = 20; // 20% platform fee
        this.artistRoyalty = 80; // 80% to artists
        this.marketplaceName = 'InnoArt';
        
        // Wallet Configuration
        this.walletConnectProjectId = '77be79148051cada8506f6f586a028dd';
        
        // Development Configuration
        this.nodeEnv = 'development';
        this.debug = true;
        
        // Security Configuration
        this.enableAnalytics = false;
        this.sentryDsn = '';
        
        // Network configurations
        this.networks = {
            sepolia: {
                chainId: '0xaa36a7',
                name: 'Sepolia Testnet',
                rpcUrl: this.alchemyUrl,
                blockExplorer: 'https://sepolia.etherscan.io',
                nativeCurrency: {
                    name: 'SepoliaETH',
                    symbol: 'ETH',
                    decimals: 18
                }
            },
            mainnet: {
                chainId: '0x1',
                name: 'Ethereum Mainnet',
                rpcUrl: 'https://eth-mainnet.g.alchemy.com/v2/your_alchemy_key',
                blockExplorer: 'https://etherscan.io',
                nativeCurrency: {
                    name: 'Ethereum',
                    symbol: 'ETH',
                    decimals: 18
                }
            }
        };
    }
    
    // Get current network configuration
    getCurrentNetwork() {
        return this.networks[this.networkName];
    }
    
    // Get platform fee rate (as decimal)
    getPlatformFeeRate() {
        return this.platformFee / 100;
    }
    
    // Get artist royalty rate (as decimal)
    getArtistRoyaltyRate() {
        return this.artistRoyalty / 100;
    }
    
    // Get block explorer URL for transaction
    getTransactionUrl(txHash) {
        const network = this.getCurrentNetwork();
        return `${network.blockExplorer}/tx/${txHash}`;
    }
    
    // Get block explorer URL for address
    getAddressUrl(address) {
        const network = this.getCurrentNetwork();
        return `${network.blockExplorer}/address/${address}`;
    }
    
    // Get IPFS URL for hash
    getIpfsUrl(hash) {
        return `${this.ipfsGateway}${hash}`;
    }
    
    // Get backup IPFS URL for hash
    getIpfsBackupUrl(hash) {
        return `${this.ipfsGatewayBackup}${hash}`;
    }
    
    // Validate configuration
    isValid() {
        const required = [
            'contractAddress',
            'developerWallet',
            'alchemyApiKey',
            'nftStorageApiKey'
        ];
        
        return required.every(key => this[key] && this[key].length > 0);
    }
    
    // Get configuration summary
    getSummary() {
        return {
            network: this.networkName,
            chainId: this.chainId,
            contract: this.contractAddress,
            developer: this.developerWallet,
            platformFee: `${this.platformFee}%`,
            artistRoyalty: `${this.artistRoyalty}%`,
            marketplace: this.marketplaceName,
            environment: this.nodeEnv
        };
    }
}

// Create global configuration instance
window.config = new Config();

// Log configuration summary if debug is enabled
if (window.config.debug) {
    console.log('InnArt Configuration:', window.config.getSummary());
}
