// Calculation Verification System for InnArt
class CalculationVerifier {
    constructor() {
        this.config = window.config;
        this.developerWallet = this.config.developerWallet; // 0x426F1B6F42F4fAa8cDc96D0C2a82e70709F3a191
        this.platformFeeRate = this.config.platformFee / 100; // 20% = 0.20
        this.artistRoyaltyRate = this.config.artistRoyalty / 100; // 80% = 0.80
        this.registrationFee = 0.01; // 0.01 ETH
        
        this.init();
    }
    
    init() {
        console.log('🧮 Calculation Verifier Initialized');
        console.log('Developer Wallet:', this.developerWallet);
        console.log('Platform Fee Rate:', this.platformFeeRate * 100 + '%');
        console.log('Artist Royalty Rate:', this.artistRoyaltyRate * 100 + '%');
        console.log('Registration Fee:', this.registrationFee + ' ETH');
        
        this.verifyConfiguration();
    }
    
    verifyConfiguration() {
        const totalRate = this.platformFeeRate + this.artistRoyaltyRate;
        
        if (Math.abs(totalRate - 1.0) > 0.0001) {
            console.error('❌ Fee Configuration Error: Platform fee + Artist royalty must equal 100%');
            console.error('Current total:', (totalRate * 100).toFixed(2) + '%');
            return false;
        }
        
        if (!this.developerWallet || this.developerWallet.length !== 42) {
            console.error('❌ Invalid Developer Wallet Address:', this.developerWallet);
            return false;
        }
        
        console.log('✅ Configuration Verified Successfully');
        return true;
    }
    
    // Verify NFT Purchase Calculations
    verifyNFTPurchase(nftPrice, expectedArtistAmount, expectedPlatformFee) {
        const price = parseFloat(nftPrice);
        const calculatedArtistAmount = Number((price * this.artistRoyaltyRate).toFixed(6));
        const calculatedPlatformFee = Number((price * this.platformFeeRate).toFixed(6));
        const calculatedTotal = Number((calculatedArtistAmount + calculatedPlatformFee).toFixed(6));
        
        const verification = {
            originalPrice: price,
            calculatedArtistAmount,
            calculatedPlatformFee,
            calculatedTotal,
            expectedArtistAmount: parseFloat(expectedArtistAmount),
            expectedPlatformFee: parseFloat(expectedPlatformFee),
            artistAmountMatch: Math.abs(calculatedArtistAmount - parseFloat(expectedArtistAmount)) < 0.000001,
            platformFeeMatch: Math.abs(calculatedPlatformFee - parseFloat(expectedPlatformFee)) < 0.000001,
            totalMatch: Math.abs(calculatedTotal - price) < 0.000001,
            developerWallet: this.developerWallet
        };
        
        verification.isValid = verification.artistAmountMatch && 
                             verification.platformFeeMatch && 
                             verification.totalMatch;
        
        if (verification.isValid) {
            console.log('✅ NFT Purchase Calculation Verified:', verification);
        } else {
            console.error('❌ NFT Purchase Calculation Failed:', verification);
        }
        
        return verification;
    }
    
    // Calculate NFT Purchase Breakdown
    calculateNFTPurchase(nftPrice) {
        const price = parseFloat(nftPrice);
        
        if (isNaN(price) || price <= 0) {
            return {
                success: false,
                error: 'Invalid NFT price'
            };
        }
        
        const artistAmount = Number((price * this.artistRoyaltyRate).toFixed(6));
        const platformFee = Number((price * this.platformFeeRate).toFixed(6));
        const total = Number((artistAmount + platformFee).toFixed(6));
        
        // Verify calculation accuracy
        if (Math.abs(total - price) > 0.000001) {
            return {
                success: false,
                error: 'Calculation precision error',
                details: { price, artistAmount, platformFee, total, difference: total - price }
            };
        }
        
        return {
            success: true,
            breakdown: {
                totalPrice: price,
                artistReceives: artistAmount,
                platformFee: platformFee,
                artistPercentage: (this.artistRoyaltyRate * 100).toFixed(1) + '%',
                platformPercentage: (this.platformFeeRate * 100).toFixed(1) + '%',
                developerWallet: this.developerWallet,
                calculations: {
                    artistCalculation: `${price} × ${this.artistRoyaltyRate} = ${artistAmount}`,
                    platformCalculation: `${price} × ${this.platformFeeRate} = ${platformFee}`,
                    totalVerification: `${artistAmount} + ${platformFee} = ${total}`
                }
            }
        };
    }
    
    // Verify Registration Fee
    verifyRegistrationFee() {
        const verification = {
            registrationFee: this.registrationFee,
            developerReceives: this.registrationFee, // 100% to developer
            developerWallet: this.developerWallet,
            isValid: this.registrationFee === 0.01 && this.developerWallet.length === 42
        };
        
        if (verification.isValid) {
            console.log('✅ Registration Fee Verified:', verification);
        } else {
            console.error('❌ Registration Fee Verification Failed:', verification);
        }
        
        return verification;
    }
    
    // Generate calculation report
    generateReport() {
        const report = {
            timestamp: new Date().toISOString(),
            configuration: {
                developerWallet: this.developerWallet,
                platformFeeRate: this.platformFeeRate,
                artistRoyaltyRate: this.artistRoyaltyRate,
                registrationFee: this.registrationFee
            },
            verifications: {
                configurationValid: this.verifyConfiguration(),
                registrationFeeValid: this.verifyRegistrationFee().isValid
            },
            sampleCalculations: {
                nft_0_1_eth: this.calculateNFTPurchase(0.1),
                nft_1_eth: this.calculateNFTPurchase(1.0),
                nft_5_eth: this.calculateNFTPurchase(5.0)
            }
        };
        
        console.log('📊 Calculation Verification Report:', report);
        return report;
    }
    
    // Test all calculations
    runTests() {
        console.log('🧪 Running Calculation Tests...');
        
        const tests = [
            { price: 0.1, expectedArtist: 0.08, expectedPlatform: 0.02 },
            { price: 1.0, expectedArtist: 0.8, expectedPlatform: 0.2 },
            { price: 2.5, expectedArtist: 2.0, expectedPlatform: 0.5 },
            { price: 10.0, expectedArtist: 8.0, expectedPlatform: 2.0 }
        ];
        
        let passedTests = 0;
        
        tests.forEach((test, index) => {
            const result = this.verifyNFTPurchase(test.price, test.expectedArtist, test.expectedPlatform);
            if (result.isValid) {
                passedTests++;
                console.log(`✅ Test ${index + 1} PASSED: ${test.price} ETH`);
            } else {
                console.error(`❌ Test ${index + 1} FAILED: ${test.price} ETH`, result);
            }
        });
        
        const testResults = {
            totalTests: tests.length,
            passedTests,
            failedTests: tests.length - passedTests,
            successRate: ((passedTests / tests.length) * 100).toFixed(1) + '%'
        };
        
        console.log('🎯 Test Results:', testResults);
        return testResults;
    }
}

// Initialize calculation verifier
document.addEventListener('DOMContentLoaded', () => {
    if (window.config) {
        window.calculationVerifier = new CalculationVerifier();
        
        // Run tests in development mode
        if (window.config.debug) {
            setTimeout(() => {
                window.calculationVerifier.runTests();
                window.calculationVerifier.generateReport();
            }, 1000);
        }
    }
});

// Export for global access
window.CalculationVerifier = CalculationVerifier;