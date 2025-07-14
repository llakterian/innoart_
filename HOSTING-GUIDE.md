# 🌐 InnArt Free Hosting Guide

This guide provides step-by-step instructions for deploying your InnArt NFT marketplace to various free hosting platforms.

## 🚀 Quick Deploy (Recommended)

### Option 1: Vercel (Best Overall)
**✅ Pros**: Fast, automatic deployments, great performance, custom domains
**❌ Cons**: Limited build minutes on free plan

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Build your project
npm run build

# 3. Deploy
vercel

# 4. Follow the prompts:
# - Link to existing project? No
# - Project name: innoart-nft
# - Directory: ./
# - Auto-detect settings? Yes

# 5. Deploy to production
vercel --prod
```

**Your site will be live at**: `https://innoart-nft.vercel.app`

### Option 2: Netlify (Easy Drag & Drop)
**✅ Pros**: User-friendly, form handling, instant deployments
**❌ Cons**: Less performance optimization

#### Method A: Drag & Drop
1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Build your project: `npm run build`
4. Drag `dist` folder to Netlify deploy area
5. Done! 🎉

#### Method B: Git Integration
1. Push code to GitHub
2. Connect repository in Netlify
3. Build settings:
   ```
   Build command: npm run build
   Publish directory: dist
   ```

**Your site will be live at**: `https://random-name.netlify.app`

### Option 3: GitHub Pages (Free Forever)
**✅ Pros**: Free forever, integrated with GitHub
**❌ Cons**: Static only, slower deployments

```bash
# 1. Update your repository
./scripts/update-repo.sh

# 2. Enable GitHub Pages
# Go to: Settings → Pages → Source: GitHub Actions

# 3. Your site will be automatically deployed!
```

**Your site will be live at**: `https://llakterian.github.io/innoart_/`

## 📋 Detailed Setup Instructions

### 🔧 Pre-Deployment Setup

#### 1. Get Required API Keys

##### Alchemy (Ethereum RPC) - Required
```bash
# 1. Visit https://alchemy.com
# 2. Create account → Create App
# 3. Choose "Ethereum" → "Sepolia"
# 4. Copy HTTP URL and API Key
```

##### NFT.Storage (IPFS) - Required
```bash
# 1. Visit https://nft.storage
# 2. Sign up → API Keys → New Key
# 3. Copy the token
```

##### WalletConnect - Optional but Recommended
```bash
# 1. Visit https://cloud.walletconnect.com
# 2. Create Project → Copy Project ID
```

#### 2. Configure Environment
```bash
# Copy example environment file
cp .env.example .env

# Edit with your values:
nano .env
```

Required variables:
```env
VITE_ALCHEMY_API_KEY=alch_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_CONTRACT_ADDRESS=0xYourContractAddressHere
VITE_NFT_STORAGE_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_WALLETCONNECT_PROJECT_ID=12345678901234567890123456789012
```

### 🏗️ Platform-Specific Instructions

#### Vercel Deployment

##### Method 1: CLI (Recommended)
```bash
# Install and login
npm install -g vercel
vercel login

# Configure project
vercel

# Deploy to production
vercel --prod

# Add environment variables
vercel env add VITE_ALCHEMY_API_KEY
vercel env add VITE_CONTRACT_ADDRESS
vercel env add VITE_NFT_STORAGE_API_KEY
vercel env add VITE_WALLETCONNECT_PROJECT_ID

# Redeploy with env vars
vercel --prod
```

##### Method 2: Web Interface
1. Visit [vercel.com](https://vercel.com)
2. Import GitHub repository
3. Configure build settings:
   ```
   Framework: Vite
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```
4. Add environment variables in settings
5. Deploy!

#### Netlify Deployment

##### Method 1: CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login and link site
netlify login
netlify init

# Build and deploy
npm run build
netlify deploy --prod --dir=dist

# Set environment variables
netlify env:set VITE_ALCHEMY_API_KEY "your_key_here"
netlify env:set VITE_CONTRACT_ADDRESS "your_address_here"
# ... add other variables
```

##### Method 2: Web Interface
1. Connect GitHub repository
2. Build settings:
   ```
   Build command: npm run build
   Publish directory: dist
   ```
3. Environment variables → Add each variable
4. Deploy!

#### GitHub Pages

##### Automatic with Actions (Recommended)
```bash
# 1. Push to GitHub
./scripts/update-repo.sh

# 2. Go to repository Settings → Pages
# 3. Source: "GitHub Actions"
# 4. The workflow will automatically deploy!
```

##### Manual Method
```bash
# Build the project
npm run build

# Copy dist to docs folder
rm -rf docs
cp -r dist docs

# Commit and push
git add docs
git commit -m "Deploy to GitHub Pages"
git push

# Enable Pages in repository settings
# Source: "Deploy from a branch" → "main" → "/docs"
```

#### Firebase Hosting
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login and initialize
firebase login
firebase init hosting

# Select options:
# - Public directory: dist
# - Single-page app: Yes
# - Automatic builds with GitHub: No (for now)

# Build and deploy
npm run build
firebase deploy

# Your site: https://your-project.web.app
```

#### Surge.sh (Simplest)
```bash
# Install Surge
npm install -g surge

# Build project
npm run build

# Deploy
cd dist
surge

# Choose domain or use generated one
# Example: innoart-nft.surge.sh
```

## 🎯 Smart Contract Deployment

### Using Remix (Beginner-Friendly)
1. Visit [remix.ethereum.org](https://remix.ethereum.org)
2. Create new file: `InnoArtNFT.sol`
3. Copy your contract code
4. Go to "Solidity Compiler" → Compile
5. Go to "Deploy & Run Transactions"
6. Connect MetaMask to Sepolia testnet
7. Deploy contract
8. Copy contract address to `.env`

### Using Hardhat (Advanced)
```bash
# Initialize Hardhat project
npm install --save-dev hardhat
npx hardhat

# Create deployment script
mkdir -p scripts
```

Create `scripts/deploy.js`:
```javascript
async function main() {
  const InnoArtNFT = await ethers.getContractFactory("InnoArtNFT");
  const innoart = await InnoArtNFT.deploy();
  await innoart.deployed();
  console.log("InnoArtNFT deployed to:", innoart.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

Deploy:
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

## 🔍 Testing Your Deployment

### Local Testing
```bash
# Start local server
npm run dev

# Or serve built files
npm run build
npm run preview
```

### Production Testing Checklist
- [ ] Website loads without errors
- [ ] Wallet connection works (try multiple wallets)
- [ ] Artist registration works
- [ ] NFT upload and minting works
- [ ] NFT purchasing works
- [ ] Gallery displays correctly
- [ ] Mobile responsive
- [ ] HTTPS enabled
- [ ] All images and assets load

### Performance Testing
```bash
# Install Lighthouse
npm install -g lighthouse

# Test your live site
lighthouse https://your-site.com --output=html
```

## 🔧 Troubleshooting

### Common Build Errors

#### "Module not found"
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### "Environment variables not working"
```bash
# Ensure variables start with VITE_
# Restart dev server after changes
# Check for typos in variable names
```

#### "TypeScript errors"
```bash
# Check types
npm run type-check

# Skip type checking for build (temporary)
npm run build -- --mode production
```

### Common Deployment Issues

#### 404 Errors on Page Refresh
**Solution**: Configure redirects for SPA

Netlify - Create `public/_redirects`:
```
/*    /index.html   200
```

Vercel - Create `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

#### Images Not Loading
**Solution**: Check image paths and update base URL in `vite.config.ts`

#### Wallet Connection Issues
**Solution**: 
1. Verify contract address is correct
2. Check network configuration (Sepolia = 11155111)
3. Ensure HTTPS is enabled

### Performance Optimization

#### Reduce Bundle Size
```bash
# Analyze bundle
npm install -g vite-bundle-analyzer
vite-bundle-analyzer

# Optimize images
# Use WebP format for images
# Compress images before uploading
```

#### Enable Caching
```bash
# Most hosting platforms enable this automatically
# For custom servers, configure cache headers
```

## 🔒 Security & Best Practices

### Environment Variables
```bash
# Never commit .env files
echo ".env" >> .gitignore

# Use different values for production
# Rotate API keys regularly
```

### Smart Contract Security
```bash
# Test on testnet first
# Get contract audited before mainnet
# Use OpenZeppelin contracts
# Enable pausing for emergencies
```

### Frontend Security
```bash
# Enable HTTPS everywhere
# Validate all user inputs
# Sanitize HTML content
# Use CSP headers
```

## 📊 Monitoring & Analytics

### Add Google Analytics
Add to `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Monitor Uptime
- Use UptimeRobot (free)
- Set up alerts for downtime
- Monitor from multiple locations

### Error Tracking
```bash
# Add Sentry for error tracking
npm install @sentry/browser

# Initialize in your app
```

## 🎉 Going Live Checklist

### Pre-Launch
- [ ] All features tested
- [ ] Smart contract deployed and verified
- [ ] Environment variables configured
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active
- [ ] Analytics configured
- [ ] SEO meta tags added
- [ ] Social media cards configured
- [ ] Error pages created (404, 500)

### Launch Day
- [ ] Final deployment
- [ ] Smoke testing on live site
- [ ] Social media announcement
- [ ] Community notification
- [ ] Documentation updated

### Post-Launch
- [ ] Monitor for errors
- [ ] Collect user feedback
- [ ] Plan feature updates
- [ ] Regular security updates

## 📞 Getting Help

### Resources
- **InnArt Documentation**: This guide and README
- **Ethereum Docs**: [ethereum.org/developers](https://ethereum.org/developers/)
- **Web3.js Docs**: [web3js.readthedocs.io](https://web3js.readthedocs.io/)
- **Vite Docs**: [vitejs.dev](https://vitejs.dev/)
- **Solidity Docs**: [docs.soliditylang.org](https://docs.soliditylang.org/)

### Community Support
- **GitHub Issues**: [Create an issue](https://github.com/llakterian/innoart_/issues)
- **Ethereum Community**: [ethereum.org/community](https://ethereum.org/community/)
- **Web3 Discord Servers**: Various community servers

---

**🚀 Ready to launch your NFT marketplace? Follow this guide step by step and you'll be live in no time!**
