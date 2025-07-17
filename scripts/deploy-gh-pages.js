const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  red: '\x1b[31m'
};

console.log(`${colors.bright}${colors.cyan}🚀 Starting GitHub Pages Deployment${colors.reset}\n`);

// Step 1: Build the project for GitHub Pages
try {
  console.log(`${colors.yellow}📦 Building project for GitHub Pages...${colors.reset}`);
  execSync('npm run build:github', { stdio: 'inherit' });
  console.log(`${colors.green}✅ Build completed successfully${colors.reset}\n`);
} catch (error) {
  console.error(`${colors.red}❌ Build failed:${colors.reset}`, error);
  process.exit(1);
}

// Step 2: Create a 404.html file that redirects to index.html
try {
  console.log(`${colors.yellow}📄 Creating 404.html for client-side routing...${colors.reset}`);
  
  const notFoundContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Redirecting...</title>
  <script>
    // Get the current path
    const path = window.location.pathname.replace('/innoart_/', '/');
    const search = window.location.search;
    const hash = window.location.hash;
    
    // Redirect to the main app with the path as a query parameter
    window.location.href = '/innoart_/index.html?redirect=' + 
      encodeURIComponent(path + search + hash);
  </script>
  <style>
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
      padding: 20px;
      text-align: center;
      color: #f8f9fa;
      background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
    }
    h1 {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
    p {
      font-size: 1.1rem;
      margin-bottom: 2rem;
      max-width: 600px;
    }
    .loader {
      border: 4px solid rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      border-top: 4px solid #6366f1;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
      margin-bottom: 2rem;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    a {
      color: #6366f1;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="loader"></div>
  <h1>Redirecting...</h1>
  <p>If you are not redirected automatically, <a href="/innoart_/index.html">click here</a> to go to the homepage.</p>
</body>
</html>
  `;
  
  fs.writeFileSync(path.join('dist', '404.html'), notFoundContent);
  console.log(`${colors.green}✅ 404.html created successfully${colors.reset}\n`);
} catch (error) {
  console.error(`${colors.red}❌ Failed to create 404.html:${colors.reset}`, error);
  process.exit(1);
}

// Step 3: Update index.html to handle redirects
try {
  console.log(`${colors.yellow}🔄 Updating index.html to handle redirects...${colors.reset}`);
  
  const indexPath = path.join('dist', 'index.html');
  let indexContent = fs.readFileSync(indexPath, 'utf8');
  
  // Add redirect handling script before the closing </head> tag
  const redirectScript = `
  <script>
    // Check if we have a redirect parameter
    const urlParams = new URLSearchParams(window.location.search);
    const redirectPath = urlParams.get('redirect');
    
    if (redirectPath) {
      // Remove the redirect parameter from the URL
      urlParams.delete('redirect');
      const newSearch = urlParams.toString() ? '?' + urlParams.toString() : '';
      
      // Update the browser history to remove the redirect parameter
      const newUrl = window.location.pathname + newSearch + window.location.hash;
      window.history.replaceState({}, document.title, newUrl);
      
      // Handle the redirect in the application router
      window.initialRedirectPath = redirectPath;
    }
  </script>
  `;
  
  indexContent = indexContent.replace('</head>', redirectScript + '</head>');
  fs.writeFileSync(indexPath, indexContent);
  
  console.log(`${colors.green}✅ index.html updated successfully${colors.reset}\n`);
} catch (error) {
  console.error(`${colors.red}❌ Failed to update index.html:${colors.reset}`, error);
  process.exit(1);
}

console.log(`${colors.bright}${colors.green}✅ GitHub Pages deployment preparation completed!${colors.reset}`);
console.log(`${colors.cyan}📋 Next steps:${colors.reset}`);
console.log(`${colors.yellow}1. Commit and push the changes to GitHub${colors.reset}`);
console.log(`${colors.yellow}2. GitHub Actions will automatically deploy to GitHub Pages${colors.reset}`);
console.log(`${colors.yellow}3. Your site will be available at: https://llakterian.github.io/innoart_/${colors.reset}\n`);