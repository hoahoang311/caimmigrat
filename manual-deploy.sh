#!/bin/bash

# Manual Deployment Script for AWS Amplify
# Use this if the automated Git deployment keeps failing

set -e

echo "📦 Creating manual deployment package..."

# Clean and build
rm -rf out .next deploy *.zip
npm run build

# Create deployment package
mkdir -p deploy
cp -r out/* deploy/
cd deploy
zip -r ../caimmigrat-static.zip .
cd ..

echo "✅ Deployment package created: caimmigrat-static.zip"
echo ""
echo "📋 Manual deployment steps:"
echo "1. Go to AWS Amplify Console"
echo "2. Click 'Deploy without Git provider'"
echo "3. Upload the file: caimmigrat-static.zip"
echo "4. Your site will be deployed as a static site"
echo ""
echo "🌐 This approach bypasses the Next.js auto-detection issue!"
echo ""
echo "📁 Package contents:"
ls -la caimmigrat-static.zip
echo ""
echo "🚀 Ready for manual upload!"