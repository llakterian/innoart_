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
        // Contract ABI (you'll need to add your actual ABI here)
        this.CONTRACT_ABI = [
        // Add your contract ABI here after deployment
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
            }
            catch (error) {
                console.error('Failed to initialize Web3:', error);
                this.showErrorToUser(error);
                return false;
            }
        }
        else {
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
        }
        catch (switchError) {
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
                }
                catch (addError) {
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
