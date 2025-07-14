#!/bin/bash

# 🚀 InnArt Deployment Script
# This script automates the deployment process

set -e  # Exit on any error

echo "🎨 Starting InnArt deployment process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if .env file exists
if [ ! -f ".env" ]; then
    print_warning ".env file not found. Copying from .env.example..."
    cp .env.example .env
    print_error "Please edit .env file with your actual values before continuing!"
    exit 1
fi

print_status "Checking environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js v16 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    print_error "Node.js version 16 or higher is required. Current version: $(node -v)"
    exit 1
fi

print_success "Node.js $(node -v) detected"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm."
    exit 1
fi

print_status "Installing dependencies..."
npm install

print_status "Running type check..."
if npm run type-check; then
    print_success "Type check passed"
else
    print_warning "Type check failed, but continuing..."
fi

print_status "Building project..."
npm run build

if [ $? -eq 0 ]; then
    print_success "Build completed successfully!"
else
    print_error "Build failed!"
    exit 1
fi

print_status "Build output:"
ls -la dist/

# Deployment options
echo ""
echo "🚀 Choose deployment method:"
echo "1) Vercel"
echo "2) Netlify" 
echo "3) GitHub Pages"
echo "4) Firebase"
echo "5) Surge.sh"
echo "6) Manual (just build)"

read -p "Enter your choice (1-6): " choice

case $choice in
    1)
        print_status "Deploying to Vercel..."
        if command -v vercel &> /dev/null; then
            vercel --prod
        else
            print_warning "Vercel CLI not installed. Installing..."
            npm install -g vercel
            vercel --prod
        fi
        ;;
    2)
        print_status "Deploying to Netlify..."
        if command -v netlify &> /dev/null; then
            netlify deploy --prod --dir=dist
        else
            print_warning "Netlify CLI not installed. Installing..."
            npm install -g netlify-cli
            netlify deploy --prod --dir=dist
        fi
        ;;
    3)
        print_status "Preparing for GitHub Pages..."
        # Copy dist to docs folder for GitHub Pages
        rm -rf docs
        cp -r dist docs
        print_success "Files copied to 'docs' folder. Push to GitHub and enable Pages!"
        ;;
    4)
        print_status "Deploying to Firebase..."
        if command -v firebase &> /dev/null; then
            firebase deploy
        else
            print_warning "Firebase CLI not installed. Installing..."
            npm install -g firebase-tools
            firebase login
            firebase init hosting
            firebase deploy
        fi
        ;;
    5)
        print_status "Deploying to Surge.sh..."
        if command -v surge &> /dev/null; then
            cd dist && surge
        else
            print_warning "Surge CLI not installed. Installing..."
            npm install -g surge
            cd dist && surge
        fi
        ;;
    6)
        print_success "Build completed! Files are in 'dist' folder."
        print_status "You can manually upload the contents of 'dist' folder to any web host."
        ;;
    *)
        print_error "Invalid choice. Exiting."
        exit 1
        ;;
esac

print_success "🎉 Deployment process completed!"
echo ""
echo "📋 Next steps:"
echo "1. Test your deployed application"
echo "2. Verify wallet connection works"
echo "3. Test NFT creation and purchasing"
echo "4. Update your GitHub repository"
echo ""
echo "🔗 Useful commands:"
echo "- Update repo: git add . && git commit -m 'Deploy update' && git push"
echo "- Redeploy: ./scripts/deploy.sh"
echo ""
print_status "Happy minting! 🎨"
