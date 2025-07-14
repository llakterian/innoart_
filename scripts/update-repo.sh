#!/bin/bash

# 🔄 GitHub Repository Update Script
# Updates your repository with the latest changes

set -e

echo "🔄 Updating GitHub repository..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

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

# Check if git is initialized
if [ ! -d ".git" ]; then
    print_status "Initializing git repository..."
    git init
    git remote add origin https://github.com/llakterian/innoart_.git
fi

# Check git status
print_status "Checking git status..."
git status

# Add all changes
print_status "Adding all changes..."
git add .

# Get commit message from user or use default
if [ -n "$1" ]; then
    COMMIT_MESSAGE="$1"
else
    echo ""
    echo "📝 Enter commit message (or press Enter for default):"
    read -r USER_MESSAGE
    
    if [ -n "$USER_MESSAGE" ]; then
        COMMIT_MESSAGE="$USER_MESSAGE"
    else
        COMMIT_MESSAGE="🔥 Major update: Security fixes, multi-wallet support, complete contract ABI, deployment ready"
    fi
fi

# Commit changes
print_status "Committing changes..."
git commit -m "$COMMIT_MESSAGE"

# Check if we're on main/master branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ] && [ "$CURRENT_BRANCH" != "master" ]; then
    print_warning "You're on branch '$CURRENT_BRANCH'. Switching to main..."
    git checkout main 2>/dev/null || git checkout -b main
fi

# Push to GitHub
print_status "Pushing to GitHub..."
if git push origin main; then
    print_success "Successfully pushed to GitHub!"
else
    print_status "Setting upstream and pushing..."
    git push -u origin main
fi

print_success "🎉 Repository updated successfully!"
echo ""
echo "🔗 Your repository: https://github.com/llakterian/innoart_"
echo "📊 GitHub Actions will automatically build and deploy your changes"
echo ""
echo "Next steps:"
echo "1. Check GitHub Actions at: https://github.com/llakterian/innoart_/actions"
echo "2. Your site will be available at: https://llakterian.github.io/innoart_/"
echo "3. Set up environment secrets in GitHub for auto-deployment"
