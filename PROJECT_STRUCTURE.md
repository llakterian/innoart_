# 🏗️ InnArt Project Structure

## 📁 Clean Project Structure

```
innoart-nft/
├── .env                          # Environment configuration (your settings)
├── .git/                         # Git version control
├── .github/                      # GitHub workflows and configs
├── .gitignore                    # Git ignore rules
├── .gitmodules                   # Git submodule configuration
├── DEPLOYMENT.md                 # Deployment instructions
├── PROJECT_STRUCTURE.md          # This file
├── README.md                     # Project documentation
├── dist/                         # Production build output (generated)
├── index.html                    # Homepage
├── node_modules/                 # Dependencies (generated)
├── package-lock.json            # Dependency lock file
├── package.json                 # Project configuration
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Build tool configuration
└── src/                         # Source code
    ├── js/                      # JavaScript modules (12 files)
    │   ├── app-main.js          # Homepage functionality
    │   ├── artist-register-main.js # Artist registration with 3-step flow
    │   ├── blockchain-service.js    # Ethereum blockchain integration
    │   ├── currency-converter.js    # Real-time ETH/KES price conversion
    │   ├── gallery-main.js         # NFT marketplace with purchase flow
    │   ├── image-handler.js        # Image upload and processing
    │   ├── member-artists-main.js  # Artist directory with search/filter
    │   ├── profile-main.js         # User profiles and artist management
    │   ├── session-manager.js      # Session timeout and security
    │   ├── upload-main.js          # NFT creation and minting
    │   ├── user-store.js           # LocalStorage data management
    │   └── wallet-connection.js    # MetaMask integration with signatures
    │
    ├── pages/                   # HTML pages (5 files)
    │   ├── artist-register.html # Artist registration with real payments
    │   ├── gallery.html         # NFT marketplace page
    │   ├── member-artists.html  # Artist directory page
    │   ├── profile.html         # User profile page
    │   └── upload.html          # NFT creation page
    │
    └── styles/                  # CSS stylesheets (1 file)
        └── global.css           # Global styles with wallet connection states
```

## 🎯 Core Files Description

### Configuration Files
- **`.env`**: Your environment variables (Infura, wallet addresses, etc.)
- **`package.json`**: Project dependencies and scripts
- **`vite.config.ts`**: Build configuration
- **`tsconfig.json`**: TypeScript settings

### Documentation
- **`README.md`**: Comprehensive project documentation
- **`DEPLOYMENT.md`**: Step-by-step deployment guide

### Application Entry Points
- **`index.html`**: Homepage with hero section and navigation
- **`src/pages/*.html`**: Individual application pages

### Core JavaScript Modules
- **`wallet-connection.js`**: MetaMask integration with signature auth
- **`blockchain-service.js`**: Ethereum transaction handling
- **`user-store.js`**: Local storage data management
- **`session-manager.js`**: User session and security

### Page-Specific Controllers
- **`gallery-main.js`**: NFT marketplace functionality
- **`upload-main.js`**: NFT creation and minting
- **`profile-main.js`**: User profile management
- **`artist-register-main.js`**: Artist registration flow
- **`member-artists-main.js`**: Artist directory display

### Utility Modules
- **`image-handler.js`**: Image upload and processing
- **`currency-converter.js`**: Real-time price conversion

## 🚀 Production Ready

### ✅ Cleaned Up & Optimized
- **Removed unnecessary files**: .env.example, multiple deployment guides, duplicate components
- **Cleaned TypeScript files**: Removed unused .ts files and duplicates
- **Streamlined structure**: Only essential files remain
- **Optimized build**: Clean build process with no errors
- **Fresh deployment package**: `innoart-clean-deployment.zip` ready for deployment

### 🔧 Fixed Issues
- **Wallet Connection Display**: Connect Wallet button now properly shows wallet address when connected
- **Visual Feedback**: Added green color for connected state, red for disconnect hover
- **Improved Initialization**: Better timing for wallet connection UI updates
- **Added Tooltips**: Hover tooltips show full wallet address

### 🎯 Current Features
- **Real Blockchain Integration**: Sepolia testnet transactions
- **Security**: Wallet signature authentication on connection
- **Fee Distribution**: 20% platform, 80% artist (real ETH transfers)
- **Artist Registration**: 3-step flow with 0.01 ETH real payment
- **Member Directory**: Artist showcase with search and filtering
- **Mobile Responsive**: Works on all devices

### 📦 Deployment Package
- **File**: `innoart-clean-deployment.zip` (17.9 KB)
- **Ready for**: Netlify, Vercel, or any static hosting
- **Configuration needed**: Add your .env variables to hosting platform
