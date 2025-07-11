#!/bin/bash
# Quick deploy to Surge.sh
echo "🚀 Deploying InnArt to Surge.sh..."

# Install surge globally (only needed once)
npm install -g surge

# Go to itch-package directory
cd itch-package

# Deploy to surge
surge . innart-nft-marketplace.surge.sh

echo "✅ Deployed to: https://innart-nft-marketplace.surge.sh"
echo "🔗 Share this link with your colleagues!"
