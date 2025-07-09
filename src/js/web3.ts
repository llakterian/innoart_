import Web3 from 'web3';

// Type definitions
type ContractMethod = {
  methods: {
    [key: string]: (...args: any[]) => {
      call: () => Promise<any>;
      send: (options: { from: string; value?: string }) => Promise<any>;
    };
  };
};

interface Window {
  ethereum?: {
    request: (request: { method: string; params?: any[] }) => Promise<any>;
    on: (event: string, callback: (...args: any[]) => void) => void;
    selectedAddress: string | null;
  };
}

declare global {
  interface Window {
    ethereum?: {
      request: (request: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (...args: any[]) => void) => void;
      selectedAddress: string | null;
    };
  }
}

let web3: Web3 | null = null;
let contract: ContractMethod | null = null;
let account: string | null = null;

export const initWeb3 = async (): Promise<boolean> => {
  try {
    if (!window.ethereum) {
      throw new Error("MetaMask not installed");
    }

    web3 = new Web3(window.ethereum);
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    
    if (!accounts.length) {
      throw new Error("No accounts found");
    }

    account = accounts[0];
    contract = await getContract();
    setupEventListeners();
    
    return true;
  } catch (error) {
    console.error("Web3 initialization failed:", error);
    showErrorToUser(error as Error);
    return false;
  }
};

const setupEventListeners = () => {
  if (!window.ethereum) return;

  window.ethereum.on('accountsChanged', (accounts: string[]) => {
    account = accounts[0] || null;
    updateUI();
  });

  window.ethereum.on('chainChanged', () => {
    window.location.reload();
  });
};

export const getContract = async (): Promise<ContractMethod> => {
  if (contract) return contract;

  try {
    if (!web3) await initWeb3();
    
    const networkId = process.env.REACT_APP_NETWORK_ID || '1';
    const deployedNetwork = (InnoArtNFT as any).networks[networkId];
    
    if (!deployedNetwork) {
      throw new Error("Contract not deployed on current network");
    }

    contract = new web3!.eth.Contract(
      (InnoArtNFT as any).abi,
      process.env.REACT_APP_CONTRACT_ADDRESS
    );
    
    return contract;
  } catch (error) {
    console.error("Contract initialization failed:", error);
    throw error;
  }
};

// Utility functions
function showErrorToUser(error: Error) {
  console.error(error.message);
}

function updateUI() {
  // Update UI logic here
}

// Placeholder for contract ABI
const InnoArtNFT = {
  abi: [],
  networks: {}
};
