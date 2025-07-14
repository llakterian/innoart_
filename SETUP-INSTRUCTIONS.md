# 🎯 Complete Setup Instructions for InnArt

## 📋 Prerequisites Checklist

Before starting, ensure you have:
- [ ] Computer with internet connection
- [ ] GitHub account
- [ ] Git installed
- [ ] Node.js v16+ installed
- [ ] Text editor (VS Code recommended)
- [ ] MetaMask wallet installed

## 🚀 Step 1: Update Your GitHub Repository

```bash
# Option A: Using our script (recommended)
./scripts/update-repo.sh

# Option B: Manual commands
git add .
git commit -m "🔥 Security fixes, multi-wallet support, deployment ready"
git push origin main
```

## 🌐 Step 2: Choose Your Hosting Platform

### Option A: GitHub Pages (Recommended - 100% Free Forever)

1. **Enable GitHub Pages**:
   - Go to your repository: `https://github.com/llakterian/innoart_`
   - Click "Settings" → "Pages"
   - Source: "GitHub Actions"
   - Save

2. **Your site will be automatically deployed**:
   - URL: `https://llakterian.github.io/innoart_/`
   - Updates automatically when you push to GitHub

### Option B: Vercel (Best Performance)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy (will prompt for configuration)
vercel

# Deploy to production
vercel --prod
```

### Option C: Netlify (Easiest Setup)

1. **Build your project**:
   ```bash
   npm run build
   ```

2. **Deploy**:
   - Go to [netlify.com](https://netlify.com)
   - Drag the `dist` folder to the deployment area
   - Your site is live instantly!

## 🔧 Step 3: Get Required API Keys

### 3.1 Alchemy (Ethereum RPC) - Required

1. Visit [alchemy.com](https://alchemy.com)
2. Sign up → "Create App"
3. Settings:
   - Name: "InnArt"
   - Network: "Ethereum"
   - Chain: "Sepolia"
4. Copy the HTTP URL (looks like: `https://eth-sepolia.g.alchemy.com/v2/abc123...`)
5. Extract API key (the part after `/v2/`)

### 3.2 NFT.Storage (IPFS Storage) - Required

1. Visit [nft.storage](https://nft.storage)
2. Sign up → "API Keys" → "New Token"
3. Name: "InnArt"
4. Copy the token (starts with `eyJ...`)

### 3.3 WalletConnect (Mobile Wallets) - Optional

1. Visit [cloud.walletconnect.com](https://cloud.walletconnect.com)
2. Sign up → "New Project"
3. Name: "InnArt"
4. Copy Project ID

## ⚙️ Step 4: Configure Environment Variables

### For Local Development:
```bash
# Create environment file
cp .env.example .env

# Edit with your values
nano .env
```

### For Hosting Platforms:

#### GitHub Pages:
1. Go to repository "Settings" → "Secrets and variables" → "Actions"
2. Add each secret:
   - `VITE_ALCHEMY_API_KEY` = your_alchemy_key
   - `VITE_CONTRACT_ADDRESS` = your_contract_address
   - `VITE_NFT_STORAGE_API_KEY` = your_nft_storage_token
   - `VITE_WALLETCONNECT_PROJECT_ID` = your_walletconnect_id

#### Vercel:
```bash
# Add environment variables
vercel env add VITE_ALCHEMY_API_KEY
vercel env add VITE_CONTRACT_ADDRESS
vercel env add VITE_NFT_STORAGE_API_KEY
vercel env add VITE_WALLETCONNECT_PROJECT_ID

# Redeploy with new variables
vercel --prod
```

#### Netlify:
1. Go to Netlify dashboard → Site settings → Environment variables
2. Add each variable with key-value pairs

## 🏗️ Step 5: Deploy Smart Contract

### Option A: Using Remix (Beginner Friendly)

1. **Open Remix**:
   - Visit [remix.ethereum.org](https://remix.ethereum.org)

2. **Upload Contract**:
   - Create new file: `InnoArtNFT.sol`
   - Copy content from `contracts/InnoArtNFT.sol`

3. **Compile**:
   - Go to "Solidity Compiler" tab
   - Click "Compile InnoArtNFT.sol"

4. **Deploy**:
   - Go to "Deploy & Run Transactions" tab
   - Environment: "Injected Provider - MetaMask"
   - Ensure MetaMask is on Sepolia testnet
   - Click "Deploy"
   - Confirm transaction in MetaMask

5. **Copy Contract Address**:
   - After deployment, copy the contract address
   - Add it to your environment variables

### Option B: Using Hardhat (Advanced)

```bash
# Install Hardhat
npm install --save-dev hardhat @nomiclabs/hardhat-ethers ethers

# Initialize Hardhat
npx hardhat

# Deploy to Sepolia
npx hardhat run scripts/deploy.js --network sepolia
```

## 🎯 Step 6: Test Your Deployment

### 6.1 Local Testing
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### 6.2 Production Testing

Visit your live site and test:

1. **Wallet Connection**:
   - Click "Connect Wallet"
   - Try different wallet types
   - Verify account displays correctly

2. **Artist Registration**:
   - Go to "Artists" page
   - Complete registration process
   - Pay 0.01 ETH fee (testnet)

3. **NFT Creation**:
   - Go to "Create" page
   - Upload test image
   - Fill in details
   - Mint NFT

4. **NFT Purchase**:
   - Go to "Gallery"
   - Find your NFT
   - Purchase with different wallet

## 🔍 Step 7: Verify Everything Works

### Checklist:
- [ ] Website loads on mobile and desktop
- [ ] All pages accessible
- [ ] Wallet connects successfully
- [ ] Artist registration works
- [ ] NFT upload and minting works
- [ ] NFT purchase works
- [ ] Gallery displays correctly
- [ ] HTTPS enabled (shows lock icon)
- [ ] No console errors

## 🆘 Troubleshooting

### Common Issues:

#### "Failed to connect wallet"
- **Solution**: Ensure you're on Sepolia testnet
- Check contract address is correct
- Verify API keys are set

#### "Transaction failed"
- **Solution**: Get Sepolia ETH from faucet:
  - [sepoliafaucet.com](https://sepoliafaucet.com)
  - [faucets.chain.link](https://faucets.chain.link/sepolia)

#### "Build failed"
- **Solution**: Check environment variables
- Ensure all dependencies installed: `npm install`
- Try clean build: `npm run clean && npm install && npm run build`

#### "Images not loading"
- **Solution**: Check IPFS gateway
- Verify NFT.Storage API key
- Test with smaller image files

## 📱 Step 8: Going Live

### Pre-Launch Checklist:
- [ ] All features tested
- [ ] Smart contract deployed and verified
- [ ] Environment variables configured
- [ ] Custom domain configured (optional)
- [ ] Analytics added (optional)
- [ ] Social media ready

### Launch:
1. **Final deployment**
2. **Announce on social media**
3. **Share with community**
4. **Monitor for issues**

## 🎉 Congratulations!

Your InnArt NFT marketplace is now live! 

### Your Live Links:
- **GitHub Pages**: `https://llakterian.github.io/innoart_/`
- **Repository**: `https://github.com/llakterian/innoart_`

### Next Steps:
1. **Share your marketplace** with friends and community
2. **Create your first NFTs** as an artist
3. **Invite other artists** to join your platform
4. **Collect feedback** and plan improvements
5. **Consider mainnet deployment** when ready

## 📞 Need Help?

- **Documentation**: Check `HOSTING-GUIDE.md` for detailed instructions
- **Quick Start**: See `QUICK-DEPLOY.md` for fastest deployment
- **Issues**: Open issue at [GitHub Issues](https://github.com/llakterian/innoart_/issues)
- **Community**: Join Web3 developer communities

---

**🚀 Welcome to the future of digital art! Your NFT marketplace is ready to empower creators worldwide!**
