# ⚡ Quick Deploy - InnArt NFT Marketplace

## 🚀 1-Minute Deploy to GitHub Pages (Recommended)

```bash
# 1. Update your repository (this will auto-deploy!)
./scripts/update-repo.sh

# 2. Go to your GitHub repo settings and enable Pages
# Your site will be live at: https://llakterian.github.io/innoart_/
```

## 🌟 Alternative Quick Options

### Vercel (Fastest)
```bash
npm install -g vercel
npm run build
vercel --prod
```

### Netlify (Easiest)
```bash
npm run build
# Then drag 'dist' folder to https://app.netlify.com/drop
```

### Surge.sh (Simplest)
```bash
npm install -g surge
npm run build
cd dist && surge
```

## ⚙️ Required Environment Variables

Create `.env` file with:
```env
VITE_ALCHEMY_API_KEY=your_alchemy_api_key
VITE_CONTRACT_ADDRESS=your_contract_address  
VITE_NFT_STORAGE_API_KEY=your_nft_storage_key
VITE_WALLETCONNECT_PROJECT_ID=your_walletconnect_id
```

## 🔗 Get API Keys (Free)

1. **Alchemy**: [alchemy.com](https://alchemy.com) → Create App → Sepolia
2. **NFT.Storage**: [nft.storage](https://nft.storage) → New Token
3. **WalletConnect**: [cloud.walletconnect.com](https://cloud.walletconnect.com) → New Project

## 📱 Test Your Deployment

1. ✅ Website loads
2. ✅ Connect wallet works
3. ✅ Register as artist
4. ✅ Upload NFT
5. ✅ Buy NFT

## 🆘 Need Help?

- Read full guide: `HOSTING-GUIDE.md`
- Check deployment docs: `DEPLOYMENT.md`
- Open issue: [GitHub Issues](https://github.com/llakterian/innoart_/issues)

---
**🎉 Your NFT marketplace will be live in minutes!**
