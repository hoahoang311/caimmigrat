#!/bin/bash

# Deploy CAImmigration Website to AWS S3 + CloudFront
# Usage: ./deploy-to-aws.sh [environment]

set -e

ENVIRONMENT=${1:-prod}
TERRAFORM_DIR="terraform"

echo "🚀 Starting deployment for environment: $ENVIRONMENT"

# Check if terraform directory exists
if [ ! -d "$TERRAFORM_DIR" ]; then
    echo "❌ Terraform directory not found. Please run this script from the project root."
    exit 1
fi

# Check if terraform is installed
if ! command -v terraform &> /dev/null; then
    echo "❌ Terraform is not installed. Please install Terraform first."
    exit 1
fi

# Check if AWS CLI is installed and configured
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed. Please install AWS CLI first."
    exit 1
fi

# Check AWS credentials
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS credentials not configured. Please run 'aws configure' first."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Build the Next.js application
echo "📦 Building Next.js application..."
npm run build

echo "✅ Build completed"

# Initialize Terraform if needed
echo "🔧 Initializing Terraform..."
cd $TERRAFORM_DIR
if [ ! -d ".terraform" ]; then
    terraform init
else
    echo "✅ Terraform already initialized"
fi

# Check if terraform.tfvars exists
if [ ! -f "terraform.tfvars" ]; then
    echo "⚠️  terraform.tfvars not found. Please create it from terraform.tfvars.example"
    echo "📋 Copy and edit the example file:"
    echo "   cp terraform.tfvars.example terraform.tfvars"
    echo "   # Edit terraform.tfvars with your values"
    cd ..
    exit 1
fi

# Apply Terraform configuration
echo "🏗️  Applying Terraform configuration..."
terraform apply -auto-approve

# Get outputs from Terraform
echo "📊 Getting deployment information..."
BUCKET_NAME=$(terraform output -raw s3_bucket_name)
DISTRIBUTION_ID=$(terraform output -raw cloudfront_distribution_id)
WEBSITE_URL=$(terraform output -raw website_url)

echo "✅ Infrastructure deployed successfully"
echo "📦 S3 Bucket: $BUCKET_NAME"
echo "🌐 CloudFront Distribution: $DISTRIBUTION_ID"

cd ..

# Upload files to S3
echo "⬆️  Uploading files to S3..."

# Check if build output exists
if [ ! -d ".next" ]; then
    echo "❌ Build output not found. Please run 'npm run build' first."
    exit 1
fi

# Upload static assets with long-term caching
if [ -d ".next/static" ]; then
    echo "📂 Uploading static assets..."
    aws s3 sync .next/static/ s3://$BUCKET_NAME/_next/static/ \
        --cache-control "public, max-age=31536000, immutable" \
        --delete
fi

# Check if we have static export or standard build
if [ -d "out" ]; then
    echo "📂 Uploading static export..."
    aws s3 sync out/ s3://$BUCKET_NAME/ \
        --cache-control "public, max-age=3600" \
        --delete
elif [ -d ".next/server/pages" ]; then
    echo "📂 Uploading server-side pages (Note: This is a server-side build, consider using static export)..."
    # For server-side builds, you might need additional setup
    echo "⚠️  Warning: This appears to be a server-side build. For S3 hosting, consider:"
    echo "   1. Adding 'output: \"export\"' to next.config.ts"
    echo "   2. Running 'npm run build' again"
    echo "   3. Or use a service like Vercel or AWS Amplify for server-side rendering"
else
    echo "❌ No build output found to upload"
    exit 1
fi

echo "✅ Files uploaded successfully"

# Create CloudFront invalidation
echo "🔄 Creating CloudFront invalidation..."
INVALIDATION_ID=$(aws cloudfront create-invalidation \
    --distribution-id $DISTRIBUTION_ID \
    --paths "/*" \
    --query 'Invalidation.Id' \
    --output text)

echo "✅ CloudFront invalidation created: $INVALIDATION_ID"

# Display deployment information
echo ""
echo "🎉 Deployment completed successfully!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🌐 Website URL: $WEBSITE_URL"
echo "📦 S3 Bucket: $BUCKET_NAME"
echo "🔄 CloudFront Distribution: $DISTRIBUTION_ID"
echo "🔄 Invalidation ID: $INVALIDATION_ID"
echo ""
echo "⏱️  Note: CloudFront changes may take 5-15 minutes to propagate globally."
echo ""
echo "📋 To check invalidation status:"
echo "   aws cloudfront get-invalidation --distribution-id $DISTRIBUTION_ID --id $INVALIDATION_ID"
echo ""
echo "🔍 To monitor your website:"
echo "   curl -I $WEBSITE_URL"