# 🎨 InnArt - NFT Marketplace

**InnArt** is a modern, decentralized NFT marketplace built for digital artists and collectors. Create, buy, sell, and trade unique digital artwork on the Ethereum blockchain with a focus on artist empowerment and fair revenue distribution.

## 🌟 Features

### 🎯 Core Functionality
- **NFT Creation & Minting**: Upload and mint digital artwork as NFTs
- **Marketplace**: Browse, search, and purchase NFTs from verified artists
- **Artist Registration**: Professional artist verification with registration fees
- **Wallet Integration**: Secure MetaMask wallet connection with signature authentication
- **Real-time Pricing**: Live ETH to KES currency conversion
- **Mobile Responsive**: Optimized for all devices

### 💰 Revenue Distribution
- **80% Artist Earnings**: Artists receive 80% of primary sales
- **20% Platform Fee**: Sustainable platform maintenance and development
- **Transparent Transactions**: All fees clearly displayed before purchase
- **Blockchain Verified**: All transactions recorded on Ethereum blockchain

### 🔒 Security Features
- **Wallet Signature Authentication**: Required signature on each wallet connection
- **Session Management**: Automatic logout after inactivity
- **Secure Transactions**: All payments processed through blockchain
- **Input Validation**: Comprehensive form validation and error handling

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **MetaMask** browser extension
- **Ethereum wallet** with Sepolia testnet ETH for testing

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/llakterian/innoart_.git
   cd innoart_
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3002
   ```

### 🧪 Testing with Sepolia Testnet

1. **Add Sepolia Network to MetaMask**
   - Network Name: `Sepolia Testnet`
   - RPC URL: `https://sepolia.infura.io/v3/YOUR_PROJECT_ID`
   - Chain ID: `11155111`
   - Symbol: `ETH`
   - Block Explorer: `https://sepolia.etherscan.io`

2. **Get Test ETH**
   - Visit [Sepolia Faucet](https://sepoliafaucet.com/)
   - Enter your wallet address
   - Request test ETH (0.1 ETH recommended)

3. **Configure Developer Wallet**
   - Update `src/js/blockchain-service.js`
   - Replace `developerWallet` address with your address
   - This receives registration fees and platform fees

## 📁 Project Structure

```
innoart-nft/
├── src/
│   ├── js/
│   │   ├── wallet-connection.js      # MetaMask wallet integration
│   │   ├── blockchain-service.js     # Ethereum blockchain transactions
│   │   ├── user-store.js            # Local storage management
│   │   ├── session-manager.js       # User session handling
│   │   ├── currency-converter.js    # Real-time price conversion
│   │   ├── image-handler.js         # Image upload and processing
│   │   ├── gallery-main.js          # NFT marketplace functionality
│   │   ├── upload-main.js           # NFT creation interface
│   │   ├── profile-main.js          # User profile management
│   │   ├── artist-register-main.js  # Artist registration flow
│   │   └── member-artists-main.js   # Artist directory
│   │
│   ├── pages/
│   │   ├── gallery.html             # NFT marketplace
│   │   ├── upload.html              # NFT creation
│   │   ├── profile.html             # User profiles
│   │   ├── artist-register.html     # Artist registration
│   │   └── member-artists.html      # Artist directory
│   │
│   └── styles/
│       └── global.css               # Application styles
│
├── assets/                          # Static assets
├── dist/                           # Production build
├── index.html                      # Homepage
├── package.json                    # Dependencies
├── vite.config.ts                  # Build configuration
└── README.md                       # This file
```

## 🎨 Usage Guide

### For Artists

1. **Connect Wallet**
   - Click "Connect Wallet" in navigation
   - Approve MetaMask connection
   - Sign authentication message

2. **Register as Artist**
   - Navigate to "Artists" page
   - Complete 3-step registration:
     - Connect wallet
     - Pay 0.01 ETH registration fee
     - Complete profile setup

3. **Create NFTs**
   - Visit "Create" page
   - Upload artwork (PNG, JPG, GIF)
   - Set title, description, and price
   - Mint NFT (no blockchain fee, stored locally)

4. **Manage Profile**
   - Edit artist information
   - View sales statistics
   - Toggle NFT sale status

### For Collectors

1. **Browse NFTs**
   - Visit "Gallery" page
   - Filter by price, artist, or category
   - Search by title or description

2. **Purchase NFTs**
   - Click "Buy Now" on desired NFT
   - Review price breakdown
   - Confirm purchase through MetaMask
   - Two transactions: 80% to artist, 20% to platform

3. **View Collection**
   - Check "Profile" page
   - See owned NFTs
   - Track purchase history

### For Visitors

1. **Explore Artists**
   - Visit "Members" page
   - Filter by top sellers, verified artists
   - View artist profiles and portfolios

2. **Browse Marketplace**
   - Gallery accessible without wallet
   - View NFT details and artist information
   - Connect wallet when ready to purchase

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_INFURA_PROJECT_ID=your_infura_project_id
VITE_DEVELOPER_WALLET=your_developer_wallet_address
VITE_ENVIRONMENT=development
```

### Blockchain Configuration
Update `src/js/blockchain-service.js`:

```javascript
// Replace with your developer wallet address
this.developerWallet = '0xYourDeveloperWalletAddress';

// Add your Infura project ID
this.networks = {
  sepolia: {
    chainId: '0xaa36a7',
    name: 'Sepolia Testnet',
    rpcUrl: 'https://sepolia.infura.io/v3/YOUR_PROJECT_ID'
  }
};
```

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Netlify

1. **Create deployment package**
   ```bash
   npm run build
   cd dist
   zip -r ../innoart-deployment.zip .
   ```

2. **Deploy to Netlify**
   - Visit [Netlify](https://netlify.com)
   - Drag and drop the zip file
   - Configure custom domain (optional)

### Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

### Environment Configuration for Production

```javascript
// In blockchain-service.js for production
this.networks = {
  mainnet: {
    chainId: '0x1',
    name: 'Ethereum Mainnet',
    rpcUrl: 'https://mainnet.infura.io/v3/YOUR_PROJECT_ID'
  }
};
```

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run code linting
npm run test         # Run tests (if configured)
```

### Code Style

- **ES6+ JavaScript** with modern async/await patterns
- **Modular architecture** with separate service classes
- **Mobile-first responsive design**
- **Semantic HTML** with accessibility considerations
- **CSS variables** for consistent theming

### Adding New Features

1. **Create service files** in `src/js/`
2. **Add HTML pages** in `src/pages/`
3. **Update navigation** in all HTML files
4. **Add styles** to `src/styles/global.css`
5. **Test thoroughly** on both desktop and mobile

## 🐛 Troubleshooting

### Common Issues

**MetaMask Not Connecting**
- Ensure MetaMask is installed and unlocked
- Check if the site has MetaMask permissions
- Try refreshing the page

**Transaction Failing**
- Check wallet balance (need ETH for gas fees)
- Ensure connected to correct network (Sepolia for testing)
- Verify contract addresses are correct

**Images Not Loading**
- Check file size limits (max 5MB)
- Ensure supported formats (PNG, JPG, GIF)
- Clear browser cache and try again

**Registration Fee Not Processing**
- Ensure sufficient ETH balance (0.01 ETH + gas)
- Check MetaMask for pending transactions
- Verify network connection

### Performance Optimization

- **Image compression** before upload
- **Lazy loading** for gallery images
- **Caching** of frequently accessed data
- **Efficient DOM manipulation**

## 📊 Analytics & Monitoring

### Transaction Tracking
- All transactions stored with hashes
- View on Etherscan for verification
- Local storage backup for user data

### Usage Metrics
- Artist registration statistics
- NFT creation and sales tracking
- Platform fee collection monitoring

## 🔐 Security Considerations

### Smart Contract Security
- All transactions through MetaMask
- No private key handling on frontend
- Signature-based authentication

### Data Protection
- Local storage for user preferences
- Session storage for temporary data
- No sensitive data in localStorage

### Best Practices
- Input validation on all forms
- XSS protection through proper escaping
- CSRF protection through signature verification

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style
- Add comments for complex logic
- Test on multiple devices
- Update documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **MetaMask** for wallet integration
- **Ethereum** blockchain infrastructure
- **CoinGecko** for price data API
- **Vite** for build tooling
- **Inter** font family

## 📞 Support

For support, email [llakterian@gmail.com](mailto:llakterian@gmail.com) or join our [Discord](https://discord.gg/llakterian).

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ Basic NFT marketplace
- ✅ Artist registration
- ✅ Real blockchain transactions
- ✅ Mobile responsive design

### Phase 2 (Next)
- [ ] IPFS integration for metadata
- [ ] Advanced search and filtering
- [ ] Artist verification system
- [ ] Royalty management

### Phase 3 (Future)
- [ ] Multi-chain support
- [ ] Auction functionality
- [ ] Social features
- [ ] Advanced analytics

---

**Built with ❤️ by the InnArt Team**

*Empowering digital artists through decentralized technology*
