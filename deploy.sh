#!/bin/bash

# Deploy script for GitHub Pages
echo "🚀 Starting deployment to GitHub Pages..."

# Build the project
echo "📦 Building the project..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "❌ Build failed. Exiting."
    exit 1
fi

echo "✅ Build completed successfully!"

# Install gh-pages if not already installed
if ! npm list gh-pages > /dev/null 2>&1; then
    echo "📦 Installing gh-pages..."
    npm install --save-dev gh-pages
fi

# Deploy to GitHub Pages
echo "🌐 Deploying to GitHub Pages..."
npx gh-pages -d build

echo "✅ Deployment completed!"
echo "🌍 Your site should be available at: https://ajey-bhai.github.io/pan-ocr-frontend" 