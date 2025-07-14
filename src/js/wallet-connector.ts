import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';

export interface WalletProvider {
  name: string;
  icon: string;
  connector: () => Promise<any>;
  isInstalled: () => boolean;
}

export class MultiWalletConnector {
  private web3: Web3 | null = null;
  private provider: any = null;
  private account: string | null = null;
  private contract: Contract<any> | null = null;
  private chainId: number = 11155111; // Sepolia

  private providers: WalletProvider[] = [
    {
      name: 'MetaMask',
      icon: '🦊',
      connector: () => this.connectMetaMask(),
      isInstalled: () => typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask
    },
    {
      name: 'WalletConnect',
      icon: '🔗',
      connector: () => this.connectWalletConnect(),
      isInstalled: () => true // Always available
    },
    {
      name: 'Coinbase Wallet',
      icon: '🔵',
      connector: () => this.connectCoinbaseWallet(),
      isInstalled: () => typeof window.ethereum !== 'undefined' && window.ethereum.isCoinbaseWallet
    },
    {
      name: 'Trust Wallet',
      icon: '🛡️',
      connector: () => this.connectTrustWallet(),
      isInstalled: () => typeof window.ethereum !== 'undefined' && window.ethereum.isTrust
    },
    {
      name: 'Brave Wallet',
      icon: '🦁',
      connector: () => this.connectBraveWallet(),
      isInstalled: () => typeof window.ethereum !== 'undefined' && window.ethereum.isBraveWallet
    }
  ];

  constructor(private contractAddress: string, private contractABI: AbiItem[]) {}

  public getAvailableProviders(): WalletProvider[] {
    return this.providers.filter(provider => provider.isInstalled());
  }

  private async connectMetaMask(): Promise<void> {
    if (!window.ethereum || !window.ethereum.isMetaMask) {
      throw new Error('MetaMask not installed');
    }

    this.provider = window.ethereum;
    await this.provider.request({ method: 'eth_requestAccounts' });
    this.web3 = new Web3(this.provider);
    await this.initializeConnection();
  }

  private async connectWalletConnect(): Promise<void> {
    try {
      // For WalletConnect v2 (recommended)
      const { EthereumProvider } = await import('@walletconnect/ethereum-provider');
      
      this.provider = await EthereumProvider.init({
        chains: [this.chainId],
        projectId: process.env.VITE_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
        showQrModal: true,
        rpcMap: {
          [this.chainId]: process.env.VITE_ALCHEMY_URL || 'https://eth-sepolia.g.alchemy.com/v2/demo'
        }
      });

      await this.provider.enable();
      this.web3 = new Web3(this.provider);
      await this.initializeConnection();
    } catch (error) {
      console.error('WalletConnect connection failed:', error);
      throw new Error('Failed to connect with WalletConnect');
    }
  }

  private async connectCoinbaseWallet(): Promise<void> {
    if (!window.ethereum || !window.ethereum.isCoinbaseWallet) {
      // Fallback to Coinbase Wallet SDK
      try {
        const { CoinbaseWalletSDK } = await import('@coinbase/wallet-sdk');
        
        const coinbaseWallet = new CoinbaseWalletSDK({
          appName: 'InnArt',
          appLogoUrl: 'https://your-logo-url.com/logo.png',
          darkMode: true
        });

        this.provider = coinbaseWallet.makeWeb3Provider(
          process.env.VITE_ALCHEMY_URL || 'https://eth-sepolia.g.alchemy.com/v2/demo',
          this.chainId
        );

        await this.provider.enable();
        this.web3 = new Web3(this.provider);
        await this.initializeConnection();
      } catch (error) {
        throw new Error('Coinbase Wallet not available');
      }
    } else {
      this.provider = window.ethereum;
      await this.provider.request({ method: 'eth_requestAccounts' });
      this.web3 = new Web3(this.provider);
      await this.initializeConnection();
    }
  }

  private async connectTrustWallet(): Promise<void> {
    if (!window.ethereum || !window.ethereum.isTrust) {
      throw new Error('Trust Wallet not installed');
    }

    this.provider = window.ethereum;
    await this.provider.request({ method: 'eth_requestAccounts' });
    this.web3 = new Web3(this.provider);
    await this.initializeConnection();
  }

  private async connectBraveWallet(): Promise<void> {
    if (!window.ethereum || !window.ethereum.isBraveWallet) {
      throw new Error('Brave Wallet not available');
    }

    this.provider = window.ethereum;
    await this.provider.request({ method: 'eth_requestAccounts' });
    this.web3 = new Web3(this.provider);
    await this.initializeConnection();
  }

  private async initializeConnection(): Promise<void> {
    if (!this.web3) throw new Error('Web3 not initialized');

    // Get accounts
    const accounts = await this.web3.eth.getAccounts();
    this.account = accounts[0];

    // Check network
    const networkId = await this.web3.eth.net.getId();
    if (Number(networkId) !== this.chainId) {
      await this.switchNetwork();
    }

    // Initialize contract
    this.contract = new this.web3.eth.Contract(this.contractABI, this.contractAddress);

    // Setup event listeners
    this.setupEventListeners();
  }

  private async switchNetwork(): Promise<void> {
    const chainIdHex = `0x${this.chainId.toString(16)}`;
    
    try {
      await this.provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainIdHex }],
      });
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to the wallet
      if (switchError.code === 4902) {
        try {
          await this.provider.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: chainIdHex,
                chainName: 'Sepolia Test Network',
                rpcUrls: [process.env.VITE_ALCHEMY_URL || 'https://eth-sepolia.g.alchemy.com/v2/demo'],
                nativeCurrency: {
                  name: 'ETH',
                  symbol: 'ETH',
                  decimals: 18,
                },
                blockExplorerUrls: ['https://sepolia.etherscan.io/'],
              },
            ],
          });
        } catch (addError) {
          throw new Error('Failed to add network');
        }
      } else {
        throw switchError;
      }
    }
  }

  private setupEventListeners(): void {
    if (!this.provider) return;

    this.provider.on('accountsChanged', (accounts: string[]) => {
      this.account = accounts[0] || null;
      if (!this.account) {
        this.disconnect();
      }
    });

    this.provider.on('chainChanged', (chainId: string) => {
      window.location.reload();
    });

    this.provider.on('disconnect', () => {
      this.disconnect();
    });
  }

  public async disconnect(): Promise<void> {
    if (this.provider && this.provider.disconnect) {
      await this.provider.disconnect();
    }
    
    this.web3 = null;
    this.provider = null;
    this.account = null;
    this.contract = null;
  }

  public isConnected(): boolean {
    return !!this.account;
  }

  public getAccount(): string | null {
    return this.account;
  }

  public getWeb3(): Web3 | null {
    return this.web3;
  }

  public getContract(): Contract<any> | null {
    return this.contract;
  }

  public toWei(amount: string): string {
    if (!this.web3) throw new Error('Web3 not initialized');
    return this.web3.utils.toWei(amount, 'ether');
  }

  public fromWei(amount: string): string {
    if (!this.web3) throw new Error('Web3 not initialized');
    return this.web3.utils.fromWei(amount, 'ether');
  }
}

// Global interface for window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}
