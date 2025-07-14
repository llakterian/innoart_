import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { Contract } from 'web3-eth-contract';
import { MultiWalletConnector, WalletProvider } from './wallet-connector';

const InnoArtNFT_ABI: AbiItem[] = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [{ "internalType": "string", "name": "tokenURI", "type": "string" }, { "internalType": "uint256", "name": "price", "type": "uint256" }, { "internalType": "uint256", "name": "royaltyPercentage", "type": "uint256" }],
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
    "inputs": [],
    "name": "registerArtist",
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
    "inputs": [{ "internalType": "uint256", "name": "artId", "type": "uint256" }, { "internalType": "uint256", "name": "newPrice", "type": "uint256" }],
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
    "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "uint256", "name": "salePrice", "type": "uint256" }],
    "name": "royaltyInfo",
    "outputs": [{ "internalType": "address", "name": "receiver", "type": "address" }, { "internalType": "uint256", "name": "royaltyAmount", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [{ "indexed": true, "internalType": "address", "name": "artist", "type": "address" }],
    "name": "ArtistRegistered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{ "indexed": true, "internalType": "uint256", "name": "id", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "creator", "type": "address" }, { "indexed": false, "internalType": "string", "name": "tokenURI", "type": "string" }],
    "name": "ArtCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{ "indexed": true, "internalType": "uint256", "name": "id", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "buyer", "type": "address" }, { "indexed": true, "internalType": "address", "name": "seller", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "price", "type": "uint256" }],
    "name": "ArtSold",
    "type": "event"
  }
];

interface Window {
  ethereum?: any;
}

interface Artist {
  name: string;
  sales: number;
  avatar: string;
  bio: string;
}

export class Web3Handler {
  private static instance: Web3Handler;
  private walletConnector: MultiWalletConnector;
  private readonly contractAddress: string = (import.meta as any).env?.VITE_CONTRACT_ADDRESS || 'YOUR_CONTRACT_ADDRESS_HERE';

  private constructor() {
    this.walletConnector = new MultiWalletConnector(this.contractAddress, InnoArtNFT_ABI);
  }

  public static getInstance(): Web3Handler {
    if (!Web3Handler.instance) {
      Web3Handler.instance = new Web3Handler();
    }
    return Web3Handler.instance;
  }

  public getAvailableWallets(): WalletProvider[] {
    return this.walletConnector.getAvailableProviders();
  }

  public async connectWallet(providerName?: string): Promise<boolean> {
    try {
      if (providerName) {
        const provider = this.walletConnector.getAvailableProviders().find(p => p.name === providerName);
        if (!provider) {
          throw new Error(`Wallet ${providerName} not found`);
        }
        await provider.connector();
      } else {
        // Default to first available provider
        const providers = this.walletConnector.getAvailableProviders();
        if (providers.length === 0) {
          throw new Error('No wallets available');
        }
        await providers[0].connector();
      }
      
      return true;
    } catch (error) {
      this.showError(error instanceof Error ? error.message : 'Wallet connection failed');
      return false;
    }
  }

  public async disconnectWallet(): Promise<void> {
    await this.walletConnector.disconnect();
  }

  public async getAccount(): Promise<string | null> {
    return this.walletConnector.getAccount();
  }

  public async getContract(): Promise<Contract<any>> {
    const contract = this.walletConnector.getContract();
    if (!contract) {
      throw new Error('Contract not initialized. Please connect wallet first.');
    }
    return contract;
  }

  public async isConnected(): Promise<boolean> {
    return this.walletConnector.isConnected();
  }

  public async toWei(amount: string): Promise<string> {
    return this.walletConnector.toWei(amount);
  }

  public fromWei(amount: string): string {
    return this.walletConnector.fromWei(amount);
  }

  public getWeb3(): Web3 | null {
    return this.walletConnector.getWeb3();
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