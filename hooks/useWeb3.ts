import { useState, useEffect } from 'react';
import { Web3Handler } from '../src/js/web3';

interface UseWeb3Return {
  web3Handler: Web3Handler;
  account: string | null;
  isConnected: boolean;
  connectWallet: (providerName?: string) => Promise<boolean>;
  disconnectWallet: () => Promise<void>;
  availableWallets: any[];
}

export const useWeb3 = (): UseWeb3Return => {
  const [web3Handler] = useState(() => Web3Handler.getInstance());
  const [account, setAccount] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [availableWallets, setAvailableWallets] = useState<any[]>([]);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const connected = await web3Handler.isConnected();
        setIsConnected(connected);
        
        if (connected) {
          const currentAccount = await web3Handler.getAccount();
          setAccount(currentAccount);
        }
        
        const wallets = web3Handler.getAvailableWallets();
        setAvailableWallets(wallets);
      } catch (error) {
        console.error('Error checking Web3 connection:', error);
      }
    };

    checkConnection();
  }, [web3Handler]);

  const connectWallet = async (providerName?: string): Promise<boolean> => {
    try {
      const success = await web3Handler.connectWallet(providerName);
      if (success) {
        const currentAccount = await web3Handler.getAccount();
        setAccount(currentAccount);
        setIsConnected(true);
      }
      return success;
    } catch (error) {
      console.error('Error connecting wallet:', error);
      return false;
    }
  };

  const disconnectWallet = async (): Promise<void> => {
    try {
      await web3Handler.disconnectWallet();
      setAccount(null);
      setIsConnected(false);
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  };

  return {
    web3Handler,
    account,
    isConnected,
    connectWallet,
    disconnectWallet,
    availableWallets
  };
};
