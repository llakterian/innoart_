import Web3 from 'web3';
let web3 = null;
let contract = null;
let account = null;
export const initWeb3 = async () => {
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
    }
    catch (error) {
        console.error("Web3 initialization failed:", error);
        showErrorToUser(error);
        return false;
    }
};
const setupEventListeners = () => {
    if (!window.ethereum)
        return;
    window.ethereum.on('accountsChanged', (accounts) => {
        account = accounts[0] || null;
        updateUI();
    });
    window.ethereum.on('chainChanged', () => {
        window.location.reload();
    });
};
export const getContract = async () => {
    if (contract)
        return contract;
    try {
        if (!web3)
            await initWeb3();
        const networkId = process.env.REACT_APP_NETWORK_ID || '1';
        const deployedNetwork = InnoArtNFT.networks[networkId];
        if (!deployedNetwork) {
            throw new Error("Contract not deployed on current network");
        }
        contract = new web3.eth.Contract(InnoArtNFT.abi, process.env.REACT_APP_CONTRACT_ADDRESS);
        return contract;
    }
    catch (error) {
        console.error("Contract initialization failed:", error);
        throw error;
    }
};
// Utility functions
function showErrorToUser(error) {
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
