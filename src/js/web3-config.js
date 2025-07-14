// Web3 configuration with Alchemy and environment variables
class Web3Config {
    constructor() {
        // Get configuration from environment variables or fallback values
        this.ALCHEMY_API_KEY = process.env.REACT_APP_ALCHEMY_API_KEY || 'YOUR_ALCHEMY_API_KEY_HERE';
        this.ALCHEMY_URL = process.env.REACT_APP_ALCHEMY_URL || `https://eth-sepolia.g.alchemy.com/v2/${this.ALCHEMY_API_KEY}`;
        this.CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS || 'YOUR_CONTRACT_ADDRESS_HERE';
        this.NETWORK_ID = parseInt(process.env.REACT_APP_NETWORK_ID) || 11155111;
        this.CHAIN_ID = parseInt(process.env.REACT_APP_CHAIN_ID) || 11155111;
        this.NETWORK_NAME = process.env.REACT_APP_NETWORK_NAME || 'sepolia';
        
        this.web3 = null;
        this.account = null;
        this.contract = null;
        
        // Contract ABI - Complete ABI for InnoArtNFT contract
        this.CONTRACT_ABI = [
            {
                "inputs": [],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    { "indexed": true, "internalType": "address", "name": "artist", "type": "address" }
                ],
                "name": "ArtistRegistered",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    { "indexed": true, "internalType": "uint256", "name": "id", "type": "uint256" },
                    { "indexed": true, "internalType": "address", "name": "creator", "type": "address" },
                    { "indexed": false, "internalType": "string", "name": "tokenURI", "type": "string" }
                ],
                "name": "ArtCreated",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    { "indexed": true, "internalType": "uint256", "name": "id", "type": "uint256" },
                    { "indexed": true, "internalType": "address", "name": "buyer", "type": "address" },
                    { "indexed": true, "internalType": "address", "name": "seller", "type": "address" },
                    { "indexed": false, "internalType": "uint256", "name": "price", "type": "uint256" }
                ],
                "name": "ArtSold",
                "type": "event"
            },
            {
                "inputs": [],
                "name": "registerArtist",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [
                    { "internalType": "string", "name": "tokenURI", "type": "string" },
                    { "internalType": "uint256", "name": "price", "type": "uint256" },
                    { "internalType": "uint256", "name": "royaltyPercentage", "type": "uint256" }
                ],
                "name": "createArt",
                "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [{ "internalType": "uint256", "name": "artId", "type": "uint256" }],
                "name": "buyArt",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
                "name": "registeredArtists",
                "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
                "name": "artItems",
                "outputs": [
                    { "internalType": "uint256", "name": "id", "type": "uint256" },
                    { "internalType": "address", "name": "creator", "type": "address" },
                    { "internalType": "string", "name": "tokenURI", "type": "string" },
                    { "internalType": "uint256", "name": "price", "type": "uint256" },
                    { "internalType": "bool", "name": "forSale", "type": "bool" },
                    { "internalType": "uint256", "name": "royaltyPercentage", "type": "uint256" }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }],
                "name": "tokenURI",
                "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }],
                "name": "ownerOf",
                "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    { "internalType": "uint256", "name": "artId", "type": "uint256" },
                    { "internalType": "uint256", "name": "newPrice", "type": "uint256" }
                ],
                "name": "setArtPrice",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [{ "internalType": "uint256", "name": "artId", "type": "uint256" }],
                "name": "toggleForSale",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    { "internalType": "uint256", "name": "tokenId", "type": "uint256" },
                    { "internalType": "uint256", "name": "salePrice", "type": "uint256" }
                ],
                "name": "royaltyInfo",
                "outputs": [
                    { "internalType": "address", "name": "receiver", "type": "address" },
                    { "internalType": "uint256", "name": "royaltyAmount", "type": "uint256" }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ];
    }

    async initWeb3() {
        if (typeof window.ethereum !== 'undefined') {
            try {
                // Request account access
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                
                // Use MetaMask provider for transactions
                this.web3 = new Web3(window.ethereum);
                
                // Check if we're on the correct network
                const networkId = await this.web3.eth.net.getId();
                if (networkId !== this.NETWORK_ID) {
                    await this.switchNetwork();
                }
                
                // Get current account
                const accounts = await this.web3.eth.getAccounts();
                this.account = accounts[0];
                
                // Initialize contract
                if (this.CONTRACT_ADDRESS && this.CONTRACT_ABI.length > 0) {
                    this.contract = new this.web3.eth.Contract(this.CONTRACT_ABI, this.CONTRACT_ADDRESS);
                }
                
                // Listen for account changes
                window.ethereum.on('accountsChanged', (accounts) => {
                    this.account = accounts[0];
                    window.location.reload();
                });
                
                // Listen for network changes
                window.ethereum.on('chainChanged', (chainId) => {
                    window.location.reload();
                });
                
                console.log('Web3 initialized successfully');
                console.log('Network:', this.NETWORK_NAME);
                console.log('Account:', this.account);
                
                return true;
            } catch (error) {
                console.error('Failed to initialize Web3:', error);
                this.showErrorToUser(error);
                return false;
            }
        } else {
            alert('Please install MetaMask to use this application!');
            return false;
        }
    }

    async switchNetwork() {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: `0x${this.CHAIN_ID.toString(16)}` }],
            });
        } catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask
            if (switchError.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                            {
                                chainId: `0x${this.CHAIN_ID.toString(16)}`,
                                chainName: this.NETWORK_NAME === 'sepolia' ? 'Sepolia Test Network' : 'Ethereum Mainnet',
                                rpcUrls: [this.ALCHEMY_URL],
                                nativeCurrency: {
                                    name: 'ETH',
                                    symbol: 'ETH',
                                    decimals: 18,
                                },
                                blockExplorerUrls: [
                                    this.NETWORK_NAME === 'sepolia' 
                                        ? 'https://sepolia.etherscan.io/' 
                                        : 'https://etherscan.io/'
                                ],
                            },
                        ],
                    });
                } catch (addError) {
                    console.error('Failed to add network:', addError);
                }
            }
        }
    }

    async getContract() {
        if (!this.contract) {
            await this.initWeb3();
        }
        return this.contract;
    }

    showErrorToUser(error) {
        console.error('Error:', error);
        const message = error.message || 'An unknown error occurred';
        alert(`Error: ${message}`);
    }

    showSuccessMessage(message) {
        console.log('Success:', message);
        alert(message);
    }

    // Utility functions
    toWei(amount) {
        return this.web3.utils.toWei(amount.toString(), 'ether');
    }

    fromWei(amount) {
        return this.web3.utils.fromWei(amount.toString(), 'ether');
    }
}

// Create global instance
const web3Config = new Web3Config();

// Export for use in other files
window.web3Config = web3Config;
window.web3 = web3Config.web3;
window.account = web3Config.account;

// Global functions for backward compatibility
window.getContract = () => web3Config.getContract();
window.showErrorToUser = (error) => web3Config.showErrorToUser(error);
window.showSuccessMessage = (message) => web3Config.showSuccessMessage(message);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    web3Config.initWeb3();
});
