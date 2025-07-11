import Web3 from 'web3';
const InnoArtNFT_ABI = [
    // Full ABI generated from InnoArtNFT.sol (add using Hardhat or Remix)
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
        "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "name": "registeredArtists",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "stateMutability": "view",
        "type": "function"
    },
    // Add other functions as needed
];
export class Web3Handler {
    constructor() {
        this.web3 = null;
        this.contract = null;
        this.account = null;
        this.contractAddress = import.meta.env?.VITE_CONTRACT_ADDRESS || 'YOUR_CONTRACT_ADDRESS_HERE';
        this.networkId = import.meta.env?.VITE_NETWORK_ID || '11155111';
    }
    static getInstance() {
        if (!Web3Handler.instance) {
            Web3Handler.instance = new Web3Handler();
        }
        return Web3Handler.instance;
    }
    async init() {
        try {
            if (!window.ethereum) {
                throw new Error('MetaMask not installed');
            }
            this.web3 = new Web3(window.ethereum);
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            if (!accounts.length) {
                throw new Error('No accounts found');
            }
            this.account = accounts[0];
            await this.initContract();
            this.setupEventListeners();
            return true;
        }
        catch (error) {
            this.showError(error instanceof Error ? error.message : 'Web3 initialization failed');
            return false;
        }
    }
    async initContract() {
        if (!this.web3)
            throw new Error('Web3 not initialized');
        const networkId = await this.web3.eth.net.getId();
        if (networkId.toString() !== this.networkId) {
            await this.switchNetwork();
        }
        this.contract = new this.web3.eth.Contract(InnoArtNFT_ABI, this.contractAddress);
    }
    async switchNetwork() {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: `0x${parseInt(this.networkId).toString(16)}` }],
            });
        }
        catch (switchError) {
            if (switchError.code === 4902) {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainId: `0x${parseInt(this.networkId).toString(16)}`,
                            chainName: 'Sepolia Test Network',
                            rpcUrls: [import.meta.env?.VITE_ALCHEMY_URL || 'https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY'],
                            nativeCurrency: {
                                name: 'ETH',
                                symbol: 'ETH',
                                decimals: 18,
                            },
                            blockExplorerUrls: ['https://sepolia.etherscan.io/'],
                        },
                    ],
                });
            }
            else {
                throw switchError;
            }
        }
    }
    setupEventListeners() {
        if (!window.ethereum)
            return;
        window.ethereum.on('accountsChanged', (accounts) => {
            this.account = accounts[0] || null;
        });
        window.ethereum.on('chainChanged', () => {
            window.location.reload();
        });
    }
    async connectWallet() {
        if (!window.ethereum)
            throw new Error('MetaMask not installed');
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        this.account = accounts[0] || null;
    }
    async disconnectWallet() {
        this.account = null;
    }
    async getAccount() {
        return this.account;
    }
    async getContract() {
        if (!this.contract) {
            await this.initContract();
        }
        return this.contract;
    }
    async isConnected() {
        if (!window.ethereum)
            return false;
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        return accounts.length > 0;
    }
    async toWei(amount) {
        if (!this.web3)
            throw new Error('Web3 not initialized');
        return this.web3.utils.toWei(amount, 'ether');
    }
    fromWei(amount) {
        if (!this.web3)
            throw new Error('Web3 not initialized');
        return this.web3.utils.fromWei(amount, 'ether');
    }
    async getFeaturedArtists() {
        // Mock implementation; replace with contract call
        return [
            { name: "DigitalPainter", sales: 45, avatar: "assets/images/artist1.png", bio: "Pioneer in digital art NFTs" },
            { name: "CryptoCreator", sales: 32, avatar: "assets/images/artist2.png", bio: "Blockchain art specialist" },
            { name: "BlockchainArtist", sales: 28, avatar: "assets/images/artist3.png", bio: "Mixing traditional and digital" },
        ];
    }
    showError(message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        document.body.appendChild(errorElement);
        setTimeout(() => errorElement.remove(), 7000);
    }
}
