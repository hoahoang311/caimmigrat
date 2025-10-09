# Terraform AWS Deployment for CAImmigration Website

This Terraform configuration deploys the CAImmigration website to AWS using S3 for static hosting and CloudFront for CDN distribution.

## Architecture

- **S3 Bucket**: Hosts the static website files
- **CloudFront**: CDN distribution for global content delivery
- **IAM**: Optional roles for GitHub Actions deployment
- **Route 53**: Optional custom domain support

## Prerequisites

1. **AWS CLI configured** with appropriate permissions
2. **Terraform installed** (version >= 1.0)
3. **Next.js project built** and ready for deployment

## Quick Start

1. **Initialize Terraform**:
   ```bash
   cd terraform
   terraform init
   ```

2. **Configure variables**:
   ```bash
   cp terraform.tfvars.example terraform.tfvars
   # Edit terraform.tfvars with your values
   ```

3. **Plan deployment**:
   ```bash
   terraform plan
   ```

4. **Deploy infrastructure**:
   ```bash
   terraform apply
   ```

5. **Build and upload website**:
   ```bash
   # From project root
   npm run build

   # Upload to S3 (replace with your bucket name)
   aws s3 sync .next/static/ s3://your-bucket-name/_next/static/
   aws s3 sync out/ s3://your-bucket-name/ --delete

   # Invalidate CloudFront cache
   aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
   ```

## Configuration

### Required Variables

- `bucket_name`: Unique S3 bucket name for your website

### Optional Variables

- `aws_region`: AWS region (default: us-east-1)
- `environment`: Environment name (default: prod)
- `domain_name`: Custom domain name
- `ssl_certificate_arn`: ACM certificate ARN for custom domain
- `cloudfront_price_class`: CloudFront price class (default: PriceClass_100)

### GitHub Actions Integration

To enable automated deployments with GitHub Actions:

```hcl
create_github_actions_role   = true
github_repository           = "owner/repo-name"
create_github_oidc_provider = true
```

### Custom Domain Setup

1. **Request SSL certificate** in AWS Certificate Manager (ACM):
   ```bash
   aws acm request-certificate --domain-name example.com --validation-method DNS
   ```

2. **Configure variables**:
   ```hcl
   domain_name         = "example.com"
   ssl_certificate_arn = "arn:aws:acm:us-east-1:123456789012:certificate/..."
   ```

3. **Update DNS** to point to CloudFront distribution

## Deployment Script

Create a deployment script to automate the process:

```bash
#!/bin/bash
# deploy-to-aws.sh

set -e

echo "Building Next.js application..."
npm run build

echo "Getting Terraform outputs..."
BUCKET_NAME=$(terraform -chdir=terraform output -raw s3_bucket_name)
DISTRIBUTION_ID=$(terraform -chdir=terraform output -raw cloudfront_distribution_id)

echo "Uploading files to S3..."
aws s3 sync .next/static/ s3://$BUCKET_NAME/_next/static/ --cache-control "public, max-age=31536000, immutable"
aws s3 sync out/ s3://$BUCKET_NAME/ --delete --cache-control "public, max-age=3600"

echo "Creating CloudFront invalidation..."
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"

echo "Deployment complete!"
echo "Website URL: $(terraform -chdir=terraform output -raw website_url)"
```

## GitHub Actions Workflow

Example `.github/workflows/deploy.yml`:

```yaml
name: Deploy to AWS

on:
  push:
    branches: [main]

permissions:
  id-token: write
  contents: read

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build application
        run: npm run build

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: ${{ secrets.AWS_ROLE_ARN }}
          aws-region: us-east-1

      - name: Deploy to S3
        run: |
          aws s3 sync .next/static/ s3://${{ secrets.S3_BUCKET }}/_next/static/ --cache-control "public, max-age=31536000, immutable"
          aws s3 sync out/ s3://${{ secrets.S3_BUCKET }}/ --delete --cache-control "public, max-age=3600"

      - name: Invalidate CloudFront
        run: |
          aws cloudfront create-invalidation --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} --paths "/*"
```

## Outputs

After deployment, Terraform provides:

- `website_url`: CloudFront distribution URL
- `s3_bucket_name`: S3 bucket name
- `cloudfront_distribution_id`: For cache invalidation
- `github_actions_role_arn`: IAM role ARN for GitHub Actions

## Cost Optimization

- **S3**: Pay for storage and requests (~$1-5/month for small sites)
- **CloudFront**: Free tier includes 1TB of data transfer out
- **Route 53**: $0.50/month per hosted zone (if using custom domain)

## Security Features

- S3 bucket is not publicly accessible (CloudFront-only access)
- HTTPS enforced via CloudFront
- Origin Access Control (OAC) for secure S3 access
- IAM roles with least-privilege permissions

## Troubleshooting

### Common Issues

1. **Certificate validation**: Ensure ACM certificate is validated before deployment
2. **S3 bucket name conflicts**: Bucket names must be globally unique
3. **CloudFront propagation**: Can take 15-20 minutes for changes to propagate

### Useful Commands

```bash
# Check CloudFront distribution status
aws cloudfront get-distribution --id YOUR_DISTRIBUTION_ID

# List S3 bucket contents
aws s3 ls s3://your-bucket-name/ --recursive

# Get CloudFront invalidation status
aws cloudfront get-invalidation --distribution-id YOUR_DISTRIBUTION_ID --id YOUR_INVALIDATION_ID
```

## Cleanup

To destroy all resources:

```bash
terraform destroy
```

**Warning**: This will permanently delete your S3 bucket and all website files.