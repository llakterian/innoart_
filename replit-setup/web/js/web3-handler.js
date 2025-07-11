// Web3Handler - JavaScript version for InnArt
class Web3Handler {
  static instance = null;
  
  constructor() {
    this.web3 = null;
    this.contract = null;
    this.account = null;
    this.contractAddress = 'YOUR_CONTRACT_ADDRESS_HERE'; // Replace with actual contract address
    this.networkId = '11155111'; // Sepolia testnet
    
    this.init();
  }

  static getInstance() {
    if (!Web3Handler.instance) {
      Web3Handler.instance = new Web3Handler();
    }
    return Web3Handler.instance;
  }

  async init() {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        // Check if Web3 is already loaded
        if (typeof Web3 !== 'undefined') {
          this.web3 = new Web3(window.ethereum);
        } else {
          // Load Web3 if not available
          await this.loadWeb3();
          this.web3 = new Web3(window.ethereum);
        }
        
        this.setupEventListeners();
        
        // Check if already connected
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          this.account = accounts[0];
        }
      } catch (error) {
        console.error('Failed to initialize Web3:', error);
      }
    }
  }

  async loadWeb3() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  setupEventListeners() {
    if (!window.ethereum) return;

    window.ethereum.on('accountsChanged', (accounts) => {
      this.account = accounts[0] || null;
      window.location.reload(); // Refresh page on account change
    });

    window.ethereum.on('chainChanged', () => {
      window.location.reload(); // Refresh page on network change
    });
  }

  async connectWallet() {
    if (!window.ethereum) {
      throw new Error('MetaMask is not installed. Please install MetaMask to connect your wallet.');
    }

    try {
      // Request account access
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      if (accounts.length > 0) {
        this.account = accounts[0];
        
        // Initialize Web3 if not already done
        if (!this.web3) {
          await this.init();
        }
        
        // Check network (optional - commenting out for now to avoid network switching issues)
        /*
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        const expectedChainId = `0x${parseInt(this.networkId).toString(16)}`;
        
        if (chainId !== expectedChainId) {
          await this.switchNetwork();
        }
        */
        
        return this.account;
      } else {
        throw new Error('No accounts found');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      
      // Handle specific MetaMask errors
      if (error.code === 4001) {
        throw new Error('User rejected the connection request');
      } else if (error.code === -32002) {
        throw new Error('Connection request already pending. Please check MetaMask.');
      }
      
      throw error;
    }
  }

  async switchNetwork() {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${parseInt(this.networkId).toString(16)}` }],
      });
    } catch (switchError) {
      // If network doesn't exist, add it
      if (switchError.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: `0x${parseInt(this.networkId).toString(16)}`,
              chainName: 'Sepolia Test Network',
              rpcUrls: ['https://eth-sepolia.g.alchemy.com/v2/demo'],
              nativeCurrency: {
                name: 'ETH',
                symbol: 'ETH',
                decimals: 18,
              },
              blockExplorerUrls: ['https://sepolia.etherscan.io/'],
            },
          ],
        });
      } else {
        throw switchError;
      }
    }
  }

  async getAccount() {
    if (!this.account && window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      this.account = accounts[0] || null;
    }
    return this.account;
  }

  async isConnected() {
    const account = await this.getAccount();
    return !!account;
  }

  async getBalance() {
    if (!this.account || !this.web3) return '0';
    
    try {
      const balance = await this.web3.eth.getBalance(this.account);
      return this.web3.utils.fromWei(balance, 'ether');
    } catch (error) {
      console.error('Error getting balance:', error);
      return '0';
    }
  }

  async getContract() {
    if (!this.contract && this.web3) {
      // Basic ERC721 ABI for NFT operations
      const abi = [
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
          "inputs": [],
          "name": "tokenCounter",
          "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
          "name": "artItems",
          "outputs": [
            { "internalType": "uint256", "name": "id", "type": "uint256" },
            { "internalType": "string", "name": "tokenURI", "type": "string" },
            { "internalType": "uint256", "name": "price", "type": "uint256" },
            { "internalType": "address", "name": "creator", "type": "address" },
            { "internalType": "address", "name": "owner", "type": "address" },
            { "internalType": "bool", "name": "forSale", "type": "bool" }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ];
      
      this.contract = new this.web3.eth.Contract(abi, this.contractAddress);
    }
    return this.contract;
  }

  formatAddress(address) {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  }
}

// Make it globally available
window.Web3Handler = Web3Handler;
