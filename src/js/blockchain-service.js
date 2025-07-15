// Blockchain service for handling real transactions
class BlockchainService {
    constructor() {
        this.web3 = null;
        this.provider = null;
        this.chainId = null;
        // Use centralized configuration
        this.config = window.config;
        this.developerWallet = this.config.developerWallet;
        this.contractAddress = this.config.contractAddress;
        this.networks = this.config.networks;
        
        // Fee configuration from your .env
        this.platformFeePercent = this.config.platformFee; // 20% platform fee
        this.artistRoyaltyPercent = this.config.artistRoyalty; // 80% to artists
        
        this.init();
    }
    
    async init() {
        if (window.ethereum) {
            this.provider = window.ethereum;
            try {
                this.chainId = await this.provider.request({ method: 'eth_chainId' });
                console.log('Connected to chain:', this.chainId);
            } catch (error) {
                console.error('Failed to get chain ID:', error);
            }
        }
    }
    
    // Get current network info
    getCurrentNetwork() {
        switch (this.chainId) {
            case '0x1':
                return this.networks.mainnet;
            case '0xaa36a7':
                return this.networks.sepolia;
            default:
                return { chainId: this.chainId, name: 'Unknown Network' };
        }
    }
    
    // Switch to Sepolia testnet
    async switchToSepolia() {
        try {
            await this.provider.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: this.networks.sepolia.chainId }]
            });
            this.chainId = this.networks.sepolia.chainId;
            return true;
        } catch (error) {
            if (error.code === 4902) {
                // Network not added to wallet, add it
                try {
                    await this.provider.request({
                        method: 'wallet_addEthereumChain',
                        params: [{
                            chainId: this.networks.sepolia.chainId,
                            chainName: this.networks.sepolia.name,
                            nativeCurrency: {
                                name: 'SepoliaETH',
                                symbol: 'ETH',
                                decimals: 18
                            },
                            rpcUrls: [this.networks.sepolia.rpcUrl],
                            blockExplorerUrls: ['https://sepolia.etherscan.io']
                        }]
                    });
                    this.chainId = this.networks.sepolia.chainId;
                    return true;
                } catch (addError) {
                    console.error('Failed to add Sepolia network:', addError);
                    return false;
                }
            } else {
                console.error('Failed to switch to Sepolia:', error);
                return false;
            }
        }
    }
    
    // Convert ETH to Wei
    toWei(ethAmount) {
        return (parseFloat(ethAmount) * Math.pow(10, 18)).toString();
    }
    
    // Convert Wei to ETH
    fromWei(weiAmount) {
        return (parseFloat(weiAmount) / Math.pow(10, 18)).toString();
    }
    
    // Get wallet balance
    async getBalance(walletAddress) {
        try {
            const balance = await this.provider.request({
                method: 'eth_getBalance',
                params: [walletAddress, 'latest']
            });
            return this.fromWei(balance);
        } catch (error) {
            console.error('Failed to get balance:', error);
            return '0';
        }
    }
    
    // Send ETH transaction
    async sendTransaction(fromAddress, toAddress, amount, data = '0x') {
        try {
            const gasPrice = await this.provider.request({
                method: 'eth_gasPrice'
            });
            
            const gasLimit = await this.provider.request({
                method: 'eth_estimateGas',
                params: [{
                    from: fromAddress,
                    to: toAddress,
                    value: this.toWei(amount),
                    data: data
                }]
            });
            
            const transaction = {
                from: fromAddress,
                to: toAddress,
                value: this.toWei(amount),
                gasPrice: gasPrice,
                gasLimit: gasLimit,
                data: data
            };
            
            const txHash = await this.provider.request({
                method: 'eth_sendTransaction',
                params: [transaction]
            });
            
            return {
                success: true,
                transactionHash: txHash,
                transaction: transaction
            };
        } catch (error) {
            console.error('Transaction failed:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    // Pay registration fee
    async payRegistrationFee(fromAddress) {
        const registrationFee = '0.01'; // 0.01 ETH
        
        // Check if user has enough balance
        const balance = await this.getBalance(fromAddress);
        if (parseFloat(balance) < parseFloat(registrationFee)) {
            return {
                success: false,
                error: 'Insufficient balance for registration fee'
            };
        }
        
        // Send transaction to developer wallet
        const result = await this.sendTransaction(
            fromAddress,
            this.developerWallet,
            registrationFee
        );
        
        if (result.success) {
            return {
                success: true,
                transactionHash: result.transactionHash,
                amount: registrationFee,
                message: 'Registration fee paid successfully'
            };
        } else {
            return {
                success: false,
                error: result.error || 'Registration fee payment failed'
            };
        }
    }
    
    // Purchase NFT with proper fee distribution
    async purchaseNFT(fromAddress, nftPrice, creatorAddress) {
        const DEVELOPER_FEE_RATE = this.platformFeePercent / 100; // 20% to developer
        const ARTIST_EARNINGS_RATE = this.artistRoyaltyPercent / 100; // 80% to artist
        
        const price = parseFloat(nftPrice);
        const developerFee = price * DEVELOPER_FEE_RATE;
        const artistEarnings = price * ARTIST_EARNINGS_RATE;
        
        // Check balance
        const balance = await this.getBalance(fromAddress);
        if (parseFloat(balance) < price) {
            return {
                success: false,
                error: 'Insufficient balance for NFT purchase'
            };
        }
        
        try {
            // Send artist earnings
            const artistTransaction = await this.sendTransaction(
                fromAddress,
                creatorAddress,
                artistEarnings.toString()
            );
            
            if (!artistTransaction.success) {
                return {
                    success: false,
                    error: 'Failed to send payment to artist'
                };
            }
            
            // Send developer fee
            const developerTransaction = await this.sendTransaction(
                fromAddress,
                this.developerWallet,
                developerFee.toString()
            );
            
            if (!developerTransaction.success) {
                return {
                    success: false,
                    error: 'Failed to send developer fee'
                };
            }
            
            return {
                success: true,
                artistTransaction: artistTransaction.transactionHash,
                developerTransaction: developerTransaction.transactionHash,
                breakdown: {
                    total: price,
                    artistReceives: artistEarnings,
                    platformFee: developerFee,
                    artistPercentage: '80%',
                    platformPercentage: '20%'
                }
            };
        } catch (error) {
            console.error('NFT purchase failed:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    // Wait for transaction confirmation
    async waitForTransaction(txHash, maxWaitTime = 60000) {
        const startTime = Date.now();
        
        while (Date.now() - startTime < maxWaitTime) {
            try {
                const receipt = await this.provider.request({
                    method: 'eth_getTransactionReceipt',
                    params: [txHash]
                });
                
                if (receipt) {
                    return {
                        success: true,
                        receipt: receipt,
                        confirmed: receipt.status === '0x1'
                    };
                }
                
                // Wait 2 seconds before checking again
                await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (error) {
                console.error('Error checking transaction:', error);
            }
        }
        
        return {
            success: false,
            error: 'Transaction confirmation timeout'
        };
    }
    
    // Get transaction details
    async getTransactionDetails(txHash) {
        try {
            const tx = await this.provider.request({
                method: 'eth_getTransactionByHash',
                params: [txHash]
            });
            
            const receipt = await this.provider.request({
                method: 'eth_getTransactionReceipt',
                params: [txHash]
            });
            
            return {
                success: true,
                transaction: tx,
                receipt: receipt
            };
        } catch (error) {
            console.error('Failed to get transaction details:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
    
    // Format transaction for explorer
    getExplorerUrl(txHash) {
        const network = this.getCurrentNetwork();
        switch (network.chainId) {
            case '0x1':
                return `https://etherscan.io/tx/${txHash}`;
            case '0xaa36a7':
                return `https://sepolia.etherscan.io/tx/${txHash}`;
            default:
                return null;
        }
    }
}

// Create global instance
window.blockchainService = new BlockchainService();
