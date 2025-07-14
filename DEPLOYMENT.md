# 🚀 InnArt Deployment Guide

This guide will help you deploy your InnArt NFT marketplace to various free hosting platforms.

## 📋 Prerequisites

Before deploying, ensure you have:
- [x] Node.js (v16+) installed
- [x] Git installed
- [x] GitHub account
- [x] MetaMask wallet
- [x] Alchemy account (for Ethereum RPC)
- [x] NFT.Storage account (for IPFS)

## 🔧 Environment Setup

### 1. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Required variables:
```env
VITE_ALCHEMY_API_KEY=your_alchemy_api_key
VITE_CONTRACT_ADDRESS=your_deployed_contract_address
VITE_NFT_STORAGE_API_KEY=your_nft_storage_api_key
VITE_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
```

### 2. Get Required API Keys

#### Alchemy (Ethereum RPC)
1. Visit [alchemy.com](https://alchemy.com)
2. Sign up and create new app
3. Select "Ethereum" → "Sepolia" (testnet)
4. Copy API key to `VITE_ALCHEMY_API_KEY`

#### NFT.Storage (IPFS)
1. Visit [nft.storage](https://nft.storage)
2. Sign up and generate API token
3. Copy token to `VITE_NFT_STORAGE_API_KEY`

#### WalletConnect
1. Visit [cloud.walletconnect.com](https://cloud.walletconnect.com)
2. Create project and get Project ID
3. Copy to `VITE_WALLETCONNECT_PROJECT_ID`

## 📤 GitHub Repository Update

### Method 1: Command Line

```bash
# Navigate to your project directory
cd innoart-nft

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "🔥 Major update: Fixed security vulnerabilities, added multi-wallet support, complete contract ABI"

# Add your GitHub repository as remote
git remote add origin https://github.com/llakterian/innoart_.git

# Push to GitHub
git push -u origin main
```

### Method 2: GitHub Desktop
1. Open GitHub Desktop
2. Select "Add an Existing Repository from your Hard Drive"
3. Choose your project folder
4. Commit changes with message
5. Push to GitHub

## 🌐 Free Hosting Options

### Option 1: Vercel (Recommended)
**Best for**: React/Next.js projects, automatic deployments

#### Setup:
1. Visit [vercel.com](https://vercel.com)
2. Sign up with GitHub account
3. Click "New Project"
4. Import your GitHub repository
5. Configure build settings:
   ```
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```
6. Add environment variables in Vercel dashboard
7. Deploy!

#### Domain: `yourproject.vercel.app`

### Option 2: Netlify
**Best for**: Static sites, easy drag-and-drop deployment

#### Setup:
1. Visit [netlify.com](https://netlify.com)
2. Sign up with GitHub account
3. Click "New site from Git"
4. Choose your repository
5. Build settings:
   ```
   Build command: npm run build
   Publish directory: dist
   ```
6. Deploy!

#### Domain: `yourproject.netlify.app`

### Option 3: GitHub Pages
**Best for**: Simple static hosting, already integrated with GitHub

#### Setup:
1. Go to your GitHub repository
2. Settings → Pages
3. Source: "Deploy from a branch"
4. Branch: `main`
5. Folder: `/ (root)`
6. Save

#### Domain: `yourusername.github.io/innoart_`

### Option 4: Firebase Hosting
**Best for**: Google integration, CDN, custom domains

#### Setup:
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize in your project
firebase init hosting

# Build your project
npm run build

# Deploy
firebase deploy
```

#### Domain: `yourproject.web.app`

### Option 5: Surge.sh
**Best for**: Quick deployments, custom domains

#### Setup:
```bash
# Install Surge globally
npm install -g surge

# Build your project
npm run build

# Deploy
cd dist
surge

# Follow prompts to set domain
```

#### Domain: `yourproject.surge.sh`

## 🔨 Build Process

### 1. Install Dependencies
```bash
npm install
```

### 2. Build for Production
```bash
npm run build
```

### 3. Preview Build
```bash
npm run preview
```

## 🎯 Smart Contract Deployment

### 1. Using Remix IDE (Recommended for beginners)
1. Visit [remix.ethereum.org](https://remix.ethereum.org)
2. Upload your `InnoArtNFT.sol` file
3. Compile the contract
4. Connect MetaMask to Sepolia testnet
5. Deploy and verify
6. Copy contract address to `.env`

### 2. Using Hardhat (Advanced)
```bash
# Install Hardhat
npm install --save-dev hardhat

# Create hardhat.config.js
npx hardhat

# Deploy script
npx hardhat run scripts/deploy.js --network sepolia
```

## 🔍 Testing Your Deployment

### Pre-deployment Checklist:
- [ ] All environment variables set
- [ ] Smart contract deployed and verified
- [ ] Website builds without errors
- [ ] Wallet connection works
- [ ] Contract interactions work
- [ ] IPFS uploads work

### Testing Steps:
1. **Connect Wallet**: Test multi-wallet connectivity
2. **Artist Registration**: Try registering as artist
3. **NFT Creation**: Upload and mint test NFT
4. **NFT Purchase**: Buy NFT with different wallet
5. **Gallery View**: Check NFT displays correctly

## 🚨 Common Issues & Solutions

### Build Errors
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Environment Variables Not Working
- Ensure variables start with `VITE_`
- Restart development server after changes
- Check for typos in variable names

### Contract Connection Issues
- Verify contract address is correct
- Check network ID matches (11155111 for Sepolia)
- Ensure ABI is complete and correct

### IPFS Upload Failures
- Verify NFT.Storage API key
- Check file size limits (10MB)
- Ensure supported file types

## 📊 Monitoring & Analytics

### Add Analytics (Optional)
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## 🔐 Security Best Practices

1. **Never commit private keys or sensitive data**
2. **Use environment variables for all secrets**
3. **Enable HTTPS on your hosting platform**
4. **Regular security updates for dependencies**
5. **Contract auditing before mainnet deployment**

## 🎉 Going Live Checklist

- [ ] Domain configured
- [ ] SSL certificate active
- [ ] Environment variables set
- [ ] Smart contract deployed
- [ ] Testing completed
- [ ] Analytics configured
- [ ] SEO meta tags added
- [ ] Social media cards configured

## 📞 Support Resources

- **InnArt Documentation**: This README
- **Ethereum Development**: [ethereum.org/developers](https://ethereum.org/developers/)
- **Web3.js Docs**: [web3js.readthedocs.io](https://web3js.readthedocs.io/)
- **Solidity Docs**: [docs.soliditylang.org](https://docs.soliditylang.org/)

---

**Need help?** Open an issue on GitHub or check the troubleshooting section above!
