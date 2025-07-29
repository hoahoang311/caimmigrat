#!/bin/bash

# CAimmigrat Website - Deploy to AWS Amplify
# Usage: ./deploy.sh "commit message"

set -e

echo "🚀 Deploying CAimmigrat website to AWS Amplify..."

# Check if commit message provided
if [ -z "$1" ]; then
    echo "❌ Error: Please provide a commit message"
    echo "Usage: ./deploy.sh \"your commit message\""
    exit 1
fi

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf out .next

# Test build locally first
echo "🔨 Testing build locally..."
npm run build
if [ $? -eq 0 ]; then
    echo "✅ Local build successful"
    echo "📁 Static export created in 'out' directory"
    ls -la out/ | head -5
else
    echo "❌ Local build failed. Please fix errors before deploying."
    exit 1
fi

# Run linting
echo "🔍 Running linter..."
npm run lint
if [ $? -eq 0 ]; then
    echo "✅ Linting passed"
else
    echo "⚠️  Linting warnings found, but continuing..."
fi

# Git operations
echo "📦 Committing changes..."
git add .
git commit -m "$1"

echo "📤 Pushing to GitHub..."
git push origin main

echo "✅ Deployment initiated!"
echo "🌐 Check your AWS Amplify console for build progress:"
echo "   https://console.aws.amazon.com/amplify/home"
echo ""
echo "📊 Your site will be live in 5-10 minutes at:"
echo "   https://main.d[your-id].amplifyapp.com"
echo ""
echo "🎉 Happy deploying!"