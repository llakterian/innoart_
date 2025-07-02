// Web3 initialization and contract setup
let web3;
let contract;
let contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with actual address
let account;

// Contract ABI - Use the actual ABI from your compiled contract
const contractABI = [
    // Paste the entire ABI from your compiled contract here
    // This should match your InnoArtNFT.sol contract
];

// Initialize Web3 and contract
async function initWeb3() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            // Request account access
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            account = accounts[0];
            
            // Initialize contract
            contract = new web3.eth.Contract(contractABI, contractAddress);
            
            // Listen for account changes
            window.ethereum.on('accountsChanged', (accounts) => {
                account = accounts[0];
                updateUI();
            });
            
            // Listen for chain changes
            window.ethereum.on('chainChanged', () => {
                window.location.reload();
            });
            
            return true;
        } catch (error) {
            console.error("User denied account access");
            return false;
        }
    } else {
        alert("Please install MetaMask!");
        return false;
    }
}

// Get contract instance
async function getContract() {
    if (!contract) {
        await initWeb3();
    }
    return contract;
}

// Update UI based on connection status
async function updateUI() {
    const connectBtn = document.getElementById('connectWalletBtn');
    if (account) {
        connectBtn.textContent = `${account.substring(0, 6)}...${account.substring(38)}`;
        connectBtn.classList.add('connected');
    } else {
        connectBtn.textContent = 'Connect Wallet';
        connectBtn.classList.remove('connected');
    }
}

// Connect wallet function
async function connectWallet() {
    const success = await initWeb3();
    if (success) {
        updateUI();
        return account;
    }
    return null;
}

// Format ETH to readable format
function formatETH(wei) {
    return web3.utils.fromWei(wei, 'ether');
}

// Convert ETH to wei
function toWei(eth) {
    return web3.utils.toWei(eth, 'ether');
}

// Add event listener for connect button
document.addEventListener('DOMContentLoaded', () => {
    const connectBtn = document.getElementById('connectWalletBtn');
    if (connectBtn) {
        connectBtn.addEventListener('click', connectWallet);
    }
    
    // Initialize web3 if already connected
    if (window.ethereum && window.ethereum.selectedAddress) {
        initWeb3().then(() => updateUI());
    }
});