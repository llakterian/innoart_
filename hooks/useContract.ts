import { useState, useEffect } from 'react';
import { Contract } from 'web3-eth-contract';
import { useWeb3 } from './useWeb3';

interface UseContractReturn {
  contract: Contract<any> | null;
  isLoading: boolean;
  error: string | null;
  registerArtist: () => Promise<boolean>;
  createNFT: (tokenURI: string, price: string, royalty: number) => Promise<boolean>;
  buyNFT: (tokenId: number, price: string) => Promise<boolean>;
  checkArtistRegistration: (address: string) => Promise<boolean>;
  getNFTDetails: (tokenId: number) => Promise<any>;
}

export const useContract = (): UseContractReturn => {
  const { web3Handler, isConnected } = useWeb3();
  const [contract, setContract] = useState<Contract<any> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeContract = async () => {
      if (!isConnected) {
        setContract(null);
        return;
      }

      try {
        setIsLoading(true);
        const contractInstance = await web3Handler.getContract();
        setContract(contractInstance);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize contract');
        setContract(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeContract();
  }, [web3Handler, isConnected]);

  const registerArtist = async (): Promise<boolean> => {
    if (!contract) {
      setError('Contract not initialized');
      return false;
    }

    try {
      setIsLoading(true);
      const account = await web3Handler.getAccount();
      const fee = await web3Handler.toWei('0.01'); // 0.01 ETH registration fee
      
      await contract.methods.registerArtist().send({
        from: account,
        value: fee
      });
      
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const createNFT = async (tokenURI: string, price: string, royalty: number): Promise<boolean> => {
    if (!contract) {
      setError('Contract not initialized');
      return false;
    }

    try {
      setIsLoading(true);
      const account = await web3Handler.getAccount();
      const weiPrice = await web3Handler.toWei(price);
      
      await contract.methods.createArt(tokenURI, weiPrice, royalty).send({
        from: account
      });
      
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'NFT creation failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const buyNFT = async (tokenId: number, price: string): Promise<boolean> => {
    if (!contract) {
      setError('Contract not initialized');
      return false;
    }

    try {
      setIsLoading(true);
      const account = await web3Handler.getAccount();
      const weiPrice = await web3Handler.toWei(price);
      
      await contract.methods.buyArt(tokenId).send({
        from: account,
        value: weiPrice
      });
      
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Purchase failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const checkArtistRegistration = async (address: string): Promise<boolean> => {
    if (!contract) {
      setError('Contract not initialized');
      return false;
    }

    try {
      const isRegistered = await contract.methods.registeredArtists(address).call();
      return isRegistered;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check registration');
      return false;
    }
  };

  const getNFTDetails = async (tokenId: number): Promise<any> => {
    if (!contract) {
      setError('Contract not initialized');
      return null;
    }

    try {
      const artItem = await contract.methods.artItems(tokenId).call();
      const owner = await contract.methods.ownerOf(tokenId).call();
      
      return {
        ...artItem,
        owner,
        priceInEth: web3Handler.fromWei(artItem.price)
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get NFT details');
      return null;
    }
  };

  return {
    contract,
    isLoading,
    error,
    registerArtist,
    createNFT,
    buyNFT,
    checkArtistRegistration,
    getNFTDetails
  };
};
