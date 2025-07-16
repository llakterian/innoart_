# 🚀 InnArt NFT Marketplace - Deployment Guide

## 📋 **Deployment Options**

InnArt can be deployed on various platforms. Here are the best options, ranked by ease of use and features:

### 1. **Netlify (Recommended)** ⭐⭐⭐⭐⭐

**Pros:**
- Free tier with generous limits
- Continuous deployment from GitHub
- Built-in CI/CD pipeline
- Custom domains with free SSL
- Serverless functions support
- Excellent performance with global CDN

**Deployment Steps:**
1. Create a Netlify account at [netlify.com](https://www.netlify.com/)
2. Choose "Deploy from ZIP" or connect your GitHub repository
3. Upload the `innoart-deploy.zip` file or select your repository
4. Configure build settings (not needed for ZIP deployment):
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Configure environment variables:
   - `VITE_INFURA_PROJECT_ID`: Your Infura project ID
   - `VITE_DEVELOPER_WALLET`: Your Ethereum wallet address
   - `VITE_ENVIRONMENT`: `production`
6. Click "Deploy" and wait for the process to complete

**Access Your Site:** Once deployed, Netlify will provide a URL like `https://your-site-name.netlify.app`

### 2. **Vercel** ⭐⭐⭐⭐⭐

**Pros:**
- Excellent for frontend applications
- Free tier with generous limits
- GitHub integration
- Preview deployments for PRs
- Serverless functions
- Global CDN

**Deployment Steps:**
1. Create a Vercel account at [vercel.com](https://vercel.com/)
2. Import your GitHub repository
3. Configure project settings:
   - Framework preset: Vite
   - Build command: `npm run build`
   - Output directory: `dist`
4. Configure environment variables (same as Netlify)
5. Click "Deploy"

### 3. **GitHub Pages** ⭐⭐⭐⭐

**Pros:**
- Free hosting
- Simple setup
- Direct integration with GitHub repositories
- Custom domains with SSL

**Deployment Steps:**
1. Update `vite.config.ts` to include your repository name as the base path:
   ```typescript
   export default defineConfig({
     base: '/your-repo-name/',
     // other config
   });
   ```
2. Build your project:
   ```bash
   npm run build
   ```
3. Create a new branch called `gh-pages`
4. Copy the contents of the `dist` folder to the root of the `gh-pages` branch
5. Push the `gh-pages` branch to GitHub
6. Go to your repository settings > Pages
7. Select the `gh-pages` branch as the source

### 4. **Firebase Hosting** ⭐⭐⭐⭐

**Pros:**
- Free tier with generous limits
- Fast global CDN
- Easy CLI deployment
- Custom domains with SSL
- Integration with other Firebase services

**Deployment Steps:**
1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```
2. Login to Firebase:
   ```bash
   firebase login
   ```
3. Initialize your project:
   ```bash
   firebase init hosting
   ```
4. Select your Firebase project
5. Set `dist` as your public directory
6. Configure as a single-page app: `Yes`
7. Build your project:
   ```bash
   npm run build
   ```
8. Deploy to Firebase:
   ```bash
   firebase deploy
   ```

### 5. **AWS Amplify** ⭐⭐⭐⭐

**Pros:**
- Seamless CI/CD pipeline
- Easy integration with other AWS services
- Custom domains with SSL
- Global CDN
- Built-in monitoring

**Deployment Steps:**
1. Create an AWS account and go to the Amplify Console
2. Choose "Deploy without Git provider" or connect your GitHub repository
3. Upload the `innoart-deploy.zip` file or select your repository
4. Configure build settings (for Git deployment):
   - Build command: `npm run build`
   - Output directory: `dist`
5. Configure environment variables (same as Netlify)
6. Click "Save and deploy"

### 6. **Cloudflare Pages** ⭐⭐⭐⭐

**Pros:**
- Free tier with generous limits
- Incredibly fast global CDN
- Built-in analytics
- Custom domains with SSL
- DDoS protection

**Deployment Steps:**
1. Create a Cloudflare account and go to the Pages section
2. Connect your GitHub repository
3. Configure build settings:
   - Framework preset: Vite
   - Build command: `npm run build`
   - Output directory: `dist`
4. Configure environment variables (same as Netlify)
5. Click "Save and deploy"

### 7. **Digital Ocean App Platform** ⭐⭐⭐

**Pros:**
- Simple deployment process
- Reliable infrastructure
- Custom domains with SSL
- Built-in monitoring

**Deployment Steps:**
1. Create a Digital Ocean account
2. Go to the App Platform section
3. Connect your GitHub repository
4. Select the repository and branch
5. Configure as a Static Site
6. Set build command: `npm run build`
7. Set output directory: `dist`
8. Configure environment variables (same as Netlify)
9. Choose a plan and click "Launch App"

### 8. **Render** ⭐⭐⭐

**Pros:**
- Free static site hosting
- Simple deployment process
- Custom domains with SSL
- Automatic deployments from Git

**Deployment Steps:**
1. Create a Render account
2. Go to the Dashboard and click "New" > "Static Site"
3. Connect your GitHub repository
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Configure environment variables (same as Netlify)
6. Click "Create Static Site"

## 📦 **Preparing the ZIP File for Netlify**

To deploy on Netlify using the ZIP method:

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Create a ZIP file containing:**
   - The `dist` folder (built project)
   - `netlify.toml` file with configuration

3. **Sample `netlify.toml` file:**
   ```toml
   [build]
     publish = "dist"
     command = "echo 'Already built'"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

4. **Upload the ZIP file to Netlify:**
   - Go to [netlify.com/drop](https://netlify.com/drop)
   - Drag and drop your ZIP file
   - Wait for deployment to complete

## 🔧 **Environment Variables**

For any deployment platform, you'll need to set these environment variables:

- `VITE_INFURA_PROJECT_ID`: Your Infura project ID for Ethereum interactions
- `VITE_DEVELOPER_WALLET`: Your Ethereum wallet address (`0x426F1B6F42F4fAa8cDc96D0C2a82e70709F3a191`)
- `VITE_ENVIRONMENT`: Set to `production` for production deployments

## 🌐 **Custom Domain Setup**

After deploying to any platform, you can add a custom domain:

1. **Purchase a domain** from a registrar like Namecheap, GoDaddy, or Google Domains
2. **Add the domain** in your hosting platform's settings
3. **Configure DNS settings** as instructed by your hosting platform
4. **Wait for DNS propagation** (can take up to 48 hours)
5. **Enable SSL** for your custom domain (usually automatic on most platforms)

## 🔍 **Post-Deployment Verification**

After deploying, verify that:

1. **All pages load** correctly
2. **Wallet connection** works properly
3. **NFT display** functions correctly
4. **Artist registration** process works
5. **Mobile responsiveness** is maintained
6. **Environment variables** are correctly set

## 🚀 **Scaling Considerations**

As your NFT marketplace grows:

1. **Consider dedicated hosting** for high traffic
2. **Implement caching strategies** for better performance
3. **Use a dedicated database** for storing metadata
4. **Consider serverless functions** for backend operations
5. **Implement rate limiting** to prevent abuse

## 🛡️ **Security Best Practices**

1. **Keep environment variables secure**
2. **Regularly update dependencies**
3. **Implement proper authentication**
4. **Use HTTPS everywhere**
5. **Consider a Web Application Firewall (WAF)**

---

## 📝 **Summary**

The best deployment options for InnArt NFT Marketplace are:

1. **Netlify** - Best overall for ease of use and features
2. **Vercel** - Excellent alternative with similar features
3. **GitHub Pages** - Best free option for simple hosting
4. **Firebase Hosting** - Good option with additional backend services
5. **AWS Amplify** - Best for AWS integration

For the quickest deployment, use the provided ZIP file with Netlify Drop or connect your GitHub repository to Netlify/Vercel for continuous deployment.