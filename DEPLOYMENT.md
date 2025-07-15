# 🚀 InnArt Deployment Guide

This guide walks you through deploying InnArt to various hosting platforms.

## 🎯 Pre-Deployment Checklist

### 1. Configuration Setup
- [ ] Update developer wallet address in `src/js/blockchain-service.js`
- [ ] Configure Infura project ID for RPC endpoints
- [ ] Set up environment variables
- [ ] Test all functionality locally

### 2. Build Preparation
- [ ] Run `npm run build` to create production build
- [ ] Test production build with `npm run preview`
- [ ] Verify all assets are included
- [ ] Check for any console errors

### 3. Security Review
- [ ] Ensure no private keys in code
- [ ] Verify wallet addresses are correct
- [ ] Check CORS settings for API calls
- [ ] Validate input sanitization

## 📦 Build Process

### Development to Production

```bash
# Install dependencies
npm install

# Run development server (optional testing)
npm run dev

# Create production build
npm run build

# Preview production build
npm run preview
```

The build process creates a `dist/` folder with optimized files ready for deployment.

## 🌐 Netlify Deployment

### Method 1: Drag & Drop (Recommended for beginners)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Create deployment package**
   ```bash
   cd dist
   zip -r ../innoart-netlify.zip .
   cd ..
   ```

3. **Deploy to Netlify**
   - Go to [Netlify](https://netlify.com)
   - Sign up/login
   - Drag `innoart-netlify.zip` to the deployment area
   - Wait for deployment to complete

### Method 2: Git Integration

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to Netlify dashboard
   - Click "New site from Git"
   - Choose GitHub and select your repository
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`

3. **Environment Variables**
   - Go to Site settings → Environment variables
   - Add required variables:
     ```
     VITE_INFURA_PROJECT_ID=your_infura_project_id
     VITE_DEVELOPER_WALLET=your_wallet_address
     VITE_ENVIRONMENT=production
     ```

### Custom Domain Setup

1. **Add Custom Domain**
   - Go to Domain settings in Netlify
   - Add your domain
   - Configure DNS records

2. **SSL Certificate**
   - Netlify automatically provides SSL
   - Force HTTPS in site settings

## ⚡ Vercel Deployment

### Method 1: CLI Deployment

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Method 2: Git Integration

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [Vercel](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure build settings automatically detected

## 🔧 Configuration for Production

### Update Blockchain Service

Edit `src/js/blockchain-service.js`:

```javascript
// For production deployment
class BlockchainService {
    constructor() {
        // Use environment variables
        this.developerWallet = import.meta.env.VITE_DEVELOPER_WALLET || '0x742d35Cc6634C0532925a3b8D44d3E7bF9c5d9e9';
        
        this.networks = {
            mainnet: {
                chainId: '0x1',
                name: 'Ethereum Mainnet',
                rpcUrl: `https://mainnet.infura.io/v3/${import.meta.env.VITE_INFURA_PROJECT_ID}`
            },
            sepolia: {
                chainId: '0xaa36a7',
                name: 'Sepolia Testnet',
                rpcUrl: `https://sepolia.infura.io/v3/${import.meta.env.VITE_INFURA_PROJECT_ID}`
            }
        };
    }
}
```

### Environment Variables

Create `.env` file:
```env
VITE_INFURA_PROJECT_ID=your_infura_project_id
VITE_DEVELOPER_WALLET=0xYourDeveloperWalletAddress
VITE_ENVIRONMENT=production
VITE_NETWORK=mainnet
```

### Update Network Configuration

For production, update default network:

```javascript
// In blockchain-service.js
async init() {
    if (window.ethereum) {
        this.provider = window.ethereum;
        
        // For production, default to mainnet
        if (import.meta.env.VITE_ENVIRONMENT === 'production') {
            await this.switchToMainnet();
        }
    }
}
```

## 📊 Testing Deployment

### Pre-Launch Testing

1. **Functionality Testing**
   - Test wallet connection
   - Verify artist registration
   - Test NFT creation
   - Confirm purchase flow

2. **Network Testing**
   - Test on different networks
   - Verify transaction processing
   - Check fee distribution

3. **Mobile Testing**
   - Test on various devices
   - Verify responsive design
   - Check mobile wallet integration

### Post-Launch Monitoring

1. **Error Tracking**
   - Monitor console errors
   - Track transaction failures
   - Monitor API response times

2. **Performance Metrics**
   - Page load speeds
   - Transaction success rates
   - User engagement metrics

## 🔐 Security Considerations

### Production Security

1. **Environment Variables**
   - Never commit sensitive data
   - Use platform-specific env vars
   - Rotate API keys regularly

2. **Wallet Security**
   - Use hardware wallet for developer address
   - Monitor transactions regularly
   - Set up alerts for large transactions

3. **Code Security**
   - Minify production code
   - Remove development logs
   - Validate all inputs

### Network Security

1. **RPC Endpoints**
   - Use reputable providers (Infura, Alchemy)
   - Implement rate limiting
   - Monitor for anomalies

2. **Transaction Monitoring**
   - Log all transactions
   - Monitor for unusual patterns
   - Set up alerts for failed transactions

## 📈 Performance Optimization

### Build Optimization

1. **Code Splitting**
   ```javascript
   // Lazy load components
   const MemberArtists = await import('./member-artists-main.js');
   ```

2. **Asset Optimization**
   - Compress images
   - Minify CSS/JS
   - Use CDN for assets

3. **Caching Strategy**
   - Set appropriate cache headers
   - Use service workers
   - Implement browser caching

### Runtime Optimization

1. **Lazy Loading**
   ```javascript
   // Load images on demand
   const observer = new IntersectionObserver((entries) => {
       entries.forEach(entry => {
           if (entry.isIntersecting) {
               const img = entry.target;
               img.src = img.dataset.src;
           }
       });
   });
   ```

2. **Memory Management**
   - Clean up event listeners
   - Avoid memory leaks
   - Optimize DOM manipulation

## 🌍 Multi-Environment Setup

### Development Environment
```javascript
// vite.config.ts
export default defineConfig({
  mode: 'development',
  define: {
    'import.meta.env.VITE_NETWORK': '"sepolia"'
  }
});
```

### Staging Environment
```javascript
// For staging deployment
export default defineConfig({
  mode: 'staging',
  define: {
    'import.meta.env.VITE_NETWORK': '"sepolia"'
  }
});
```

### Production Environment
```javascript
// For production deployment
export default defineConfig({
  mode: 'production',
  define: {
    'import.meta.env.VITE_NETWORK': '"mainnet"'
  }
});
```

## 🚨 Troubleshooting Deployment

### Common Issues

**Build Failures**
- Check Node.js version compatibility
- Verify all dependencies are installed
- Review build logs for errors

**Missing Environment Variables**
- Ensure all required vars are set
- Check variable naming (case sensitive)
- Verify variable access in code

**Network Issues**
- Check Infura project ID
- Verify network configurations
- Test RPC endpoints

**Wallet Connection Problems**
- Ensure MetaMask compatibility
- Check network switching logic
- Verify wallet addresses

### Debugging Tools

1. **Browser Developer Tools**
   - Network tab for API calls
   - Console for JavaScript errors
   - Application tab for storage

2. **Blockchain Explorers**
   - Etherscan for mainnet
   - Sepolia Etherscan for testnet
   - Transaction verification

3. **Performance Monitoring**
   - Lighthouse for performance scores
   - Web Vitals for user experience
   - Error tracking services

## 🎯 Post-Deployment Checklist

### Immediate Actions
- [ ] Test all functionality on live site
- [ ] Verify SSL certificate
- [ ] Check mobile responsiveness
- [ ] Test wallet connections

### Ongoing Maintenance
- [ ] Monitor transaction volumes
- [ ] Track error rates
- [ ] Update dependencies regularly
- [ ] Review security logs

### User Communication
- [ ] Update documentation
- [ ] Communicate any network requirements
- [ ] Provide support channels
- [ ] Create user guides

## 📞 Support Resources

### Platform Support
- **Netlify**: [Netlify Docs](https://docs.netlify.com)
- **Vercel**: [Vercel Docs](https://vercel.com/docs)
- **Infura**: [Infura Support](https://infura.io/docs)

### Community Resources
- **Ethereum**: [Ethereum.org](https://ethereum.org)
- **MetaMask**: [MetaMask Support](https://metamask.io/support)
- **Web3**: [Web3.js Docs](https://web3js.readthedocs.io)

---

**Need help with deployment? Contact our support team or check the main README.md for additional resources.**
