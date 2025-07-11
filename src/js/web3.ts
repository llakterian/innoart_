import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { Contract } from 'web3-eth-contract';

const InnoArtNFT_ABI: AbiItem[] = [
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

interface Window {
  ethereum?: {
    request: (request: { method: string; params?: any[] }) => Promise<any>;
    on: (event: string, callback: (...args: any[]) => void) => void;
    selectedAddress: string | null;
  };
}

interface Artist {
  name: string;
  sales: number;
  avatar: string;
  bio: string;
}

export class Web3Handler {
  private static instance: Web3Handler;
  private web3: Web3 | null = null;
  private contract: Contract<any> | null = null;
  private account: string | null = null;
  private readonly contractAddress: string = (import.meta as any).env?.VITE_CONTRACT_ADDRESS || 'YOUR_CONTRACT_ADDRESS_HERE';
  private readonly networkId: string = (import.meta as any).env?.VITE_NETWORK_ID || '11155111';

  private constructor() {}

  public static getInstance(): Web3Handler {
    if (!Web3Handler.instance) {
      Web3Handler.instance = new Web3Handler();
    }
    return Web3Handler.instance;
  }

  public async init(): Promise<boolean> {
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
    } catch (error) {
      this.showError(error instanceof Error ? error.message : 'Web3 initialization failed');
      return false;
    }
  }

  private async initContract(): Promise<void> {
    if (!this.web3) throw new Error('Web3 not initialized');
    
    const networkId = await this.web3.eth.net.getId();
    if (networkId.toString() !== this.networkId) {
      await this.switchNetwork();
    }

    this.contract = new this.web3.eth.Contract(InnoArtNFT_ABI, this.contractAddress);
  }

  private async switchNetwork(): Promise<void> {
    try {
      await window.ethereum!.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${parseInt(this.networkId).toString(16)}` }],
      });
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        await window.ethereum!.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: `0x${parseInt(this.networkId).toString(16)}`,
              chainName: 'Sepolia Test Network',
              rpcUrls: [(import.meta as any).env?.VITE_ALCHEMY_URL || 'https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY'],
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

  private setupEventListeners(): void {
    if (!window.ethereum) return;

    window.ethereum.on('accountsChanged', (accounts: string[]) => {
      this.account = accounts[0] || null;
    });

    window.ethereum.on('chainChanged', () => {
      window.location.reload();
    });
  }

  public async connectWallet(): Promise<void> {
    if (!window.ethereum) throw new Error('MetaMask not installed');
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    this.account = accounts[0] || null;
  }

  public async disconnectWallet(): Promise<void> {
    this.account = null;
  }

  public async getAccount(): Promise<string | null> {
    return this.account;
  }

  public async getContract(): Promise<Contract<any>> {
    if (!this.contract) {
      await this.initContract();
    }
    return this.contract!;
  }

  public async isConnected(): Promise<boolean> {
    if (!window.ethereum) return false;
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    return accounts.length > 0;
  }

  public async toWei(amount: string): Promise<string> {
    if (!this.web3) throw new Error('Web3 not initialized');
    return this.web3.utils.toWei(amount, 'ether');
  }

  public fromWei(amount: string): string {
    if (!this.web3) throw new Error('Web3 not initialized');
    return this.web3.utils.fromWei(amount, 'ether');
  }

  public async getFeaturedArtists(): Promise<Artist[]> {
    // Mock implementation; replace with contract call
    return [
      { name: "DigitalPainter", sales: 45, avatar: "assets/images/artist1.png", bio: "Pioneer in digital art NFTs" },
      { name: "CryptoCreator", sales: 32, avatar: "assets/images/artist2.png", bio: "Blockchain art specialist" },
      { name: "BlockchainArtist", sales: 28, avatar: "assets/images/artist3.png", bio: "Mixing traditional and digital" },
    ];
  }

  private showError(message: string): void {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    document.body.appendChild(errorElement);
    setTimeout(() => errorElement.remove(), 7000);
  }
}