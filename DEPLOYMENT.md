# 🚀 InnArt NFT Marketplace - Deployment Guide

This comprehensive guide covers all deployment options for the InnArt NFT Marketplace.

## 📋 Table of Contents

- [Deployment Options](#-deployment-options)
  - [GitHub Pages](#github-pages-automated-deployment)
  - [Netlify](#netlify-recommended)
  - [Vercel](#vercel)
  - [Other Options](#other-hosting-options)
- [Environment Setup](#-environment-setup)
- [Deployment Verification](#-deployment-verification)
- [Troubleshooting](#-troubleshooting)

## 🌐 Deployment Options

### GitHub Pages (Automated Deployment)

The project is configured with GitHub Actions for automatic deployment to GitHub Pages:

1. **Push to Main Branch**: Deployment is automatically triggered when you push to the `main` branch
2. **Manual Trigger**: You can also manually trigger deployment from the Actions tab in GitHub
3. **Deployment URL**: Your site will be available at `https://[username].github.io/innoart_/`

**Configuration Files**:
- `.github/workflows/deploy-gh-pages.yml`: GitHub Actions workflow
- `scripts/deploy-gh-pages.js`: Build script for GitHub Pages

**Manual Deployment**:
```bash
# Build for GitHub Pages
npm run build:github

# Deploy to GitHub Pages
npm run deploy:github
```

### Netlify (Recommended)

**Option 1: Drag & Drop Deployment**

1. **Build and prepare the deployment package**:
   ```bash
   npm run deploy:netlify
   ```

2. **Upload to Netlify**:
   - Go to [netlify.com/drop](https://netlify.com/drop)
   - Drag and drop the `deploy/innoart-netlify.zip` file
   - Wait for deployment to complete

**Option 2: Git Integration**:

1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Set environment variables
4. Deploy

**Configuration Files**:
- `netlify.toml`: Netlify configuration
- `.netlifyignore`: Files to exclude from deployment
- `prepare-deploy.cjs`: Script to create optimized deployment package

### Vercel

1. Create a Vercel account at [vercel.com](https://vercel.com/)
2. Import your GitHub repository
3. Configure project settings:
   - Framework preset: Vite
   - Build command: `npm run build`
   - Output directory: `dist`
4. Configure environment variables
5. Click "Deploy"

### Other Hosting Options

The project can also be deployed to:
- **Firebase Hosting**
- **AWS Amplify**
- **Cloudflare Pages**
- **Digital Ocean App Platform**
- **Render**

For detailed instructions on these platforms, refer to the [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md).

## 🔧 Environment Setup

For any deployment platform, you'll need to set these environment variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_INFURA_PROJECT_ID` | Your Infura project ID for Ethereum interactions | Yes |
| `VITE_DEVELOPER_WALLET` | Your Ethereum wallet address | Yes |
| `VITE_ENVIRONMENT` | Set to `production` for production deployments | Yes |

## 🔍 Deployment Verification

After deploying, verify that:

1. **All pages load** correctly
2. **Wallet connection** works properly
3. **NFT display** functions correctly
4. **Artist registration** process works
5. **Mobile responsiveness** is maintained
6. **Environment variables** are correctly set

## 🚨 Troubleshooting

### GitHub Pages Issues

- **404 Errors**: Make sure the base path is correctly set to `/innoart_/` in `vite.config.ts`
- **Blank Page**: Check browser console for path-related errors
- **Failed Deployment**: Verify GitHub Actions permissions are set correctly

### Netlify Issues

- **Build Failures**: Check build logs for specific errors
- **Missing Assets**: Ensure all assets are included in the deployment package
- **Environment Variables**: Verify they are correctly set in Netlify dashboard

### General Issues

- **Wallet Connection**: Test with different browsers and wallet providers
- **Missing Images**: Check asset paths and ensure they're relative to the base path
- **Console Errors**: Use browser developer tools to identify specific issues

---

For more detailed information on specific deployment options, refer to:
- [GITHUB_PAGES_DEPLOYMENT.md](GITHUB_PAGES_DEPLOYMENT.md) for GitHub Pages
- [DEPLOYMENT_OPTIMIZATION.md](DEPLOYMENT_OPTIMIZATION.md) for optimizing deployments