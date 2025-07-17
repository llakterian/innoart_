# 🚀 Deploying InnArt to GitHub Pages

This guide explains how to deploy the InnArt NFT Marketplace to GitHub Pages using the automated workflow.

## 📋 Automated Deployment

The project is configured with a GitHub Actions workflow that automatically deploys the application to GitHub Pages whenever changes are pushed to the `main` branch.

### How It Works

1. When you push changes to the `main` branch, the GitHub Actions workflow is triggered
2. The workflow builds the project with the correct base path for GitHub Pages
3. The built files are deployed to the `gh-pages` branch
4. GitHub Pages serves the content from the `gh-pages` branch

### 🔍 Viewing the Deployment Status

1. Go to the repository on GitHub
2. Click on the "Actions" tab
3. Look for the "Deploy to GitHub Pages" workflow
4. Check the status of the latest run

## 🛠️ Manual Deployment

If you need to manually deploy the application to GitHub Pages, follow these steps:

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Git

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/llakterian/innoart_.git
   cd innoart_
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project for GitHub Pages:
   ```bash
   npm run build:github
   ```

4. Deploy to GitHub Pages:
   ```bash
   npm run deploy:github
   ```

   Alternatively, you can manually push the `dist` folder to the `gh-pages` branch:
   ```bash
   git checkout -b gh-pages
   git rm -rf .
   cp -r dist/* .
   git add .
   git commit -m "Manual deployment to GitHub Pages"
   git push -f origin gh-pages
   ```

## 🌐 Accessing the Deployed Application

Once deployed, the application will be available at:

[https://llakterian.github.io/innoart_/](https://llakterian.github.io/innoart_/)

## ⚙️ Configuration Details

The GitHub Pages deployment is configured with the following settings:

- **Base Path**: `/innoart_/` (the repository name)
- **Build Mode**: The `build:github` script sets the correct base path
- **GitHub Actions**: The workflow is defined in `.github/workflows/deploy-gh-pages.yml`

## 🔧 Troubleshooting

### 404 Errors on Page Refresh

If you encounter 404 errors when refreshing pages, it's because GitHub Pages doesn't support client-side routing by default. To fix this:

1. Make sure all internal links use relative paths
2. Consider adding a custom 404.html page that redirects to the main application

### Assets Not Loading

If assets (images, CSS, JS) are not loading:

1. Check that all asset paths are relative to the base path
2. Verify that the `base` setting in `vite.config.ts` is correctly set to `/innoart_/`
3. Ensure that the build process is using the GitHub Pages mode

### Workflow Failures

If the GitHub Actions workflow fails:

1. Check the workflow logs for specific errors
2. Verify that the repository has GitHub Pages enabled in the settings
3. Ensure the workflow has the necessary permissions to deploy to GitHub Pages

## 📝 Notes

- The deployment process uses the `JamesIves/github-pages-deploy-action` action to deploy to GitHub Pages
- The `gh-pages` branch is created and updated automatically by the workflow
- The `clean` option in the workflow ensures that old files are removed before deploying new ones