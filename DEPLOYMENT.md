# AWS Amplify Deployment Guide

This guide will walk you through deploying the CAimmigrat website to AWS Amplify.

## 📋 Prerequisites

Before you begin, ensure you have:

1. **GitHub Account**: Your code should be in a GitHub repository
2. **AWS Account**: Create one at [aws.amazon.com](https://aws.amazon.com)
3. **Domain (Optional)**: If you want a custom domain

## 🚀 Step-by-Step Deployment

### Step 1: Push Code to GitHub

1. **Initialize Git Repository** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: CAimmigrat website"
   ```

2. **Create GitHub Repository**:
   - Go to [github.com](https://github.com) and create a new repository
   - Name it `caimmigration-website`
   - Don't initialize with README (since you already have one)

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/caimmigration-website.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Set Up AWS Amplify

1. **Access AWS Console**:
   - Go to [AWS Console](https://console.aws.amazon.com)
   - Search for "Amplify" and select "AWS Amplify"

2. **Create New App**:
   - Click "Create new app"
   - Select "Host web app"
   - Choose "GitHub" as your source

3. **Connect Repository**:
   - Authorize AWS Amplify to access your GitHub account
   - Select your `caimmigration-website` repository
   - Choose the `main` branch

### Step 3: Configure Build Settings

1. **Amplify will auto-detect the build settings** from the `amplify.yml` file:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: out
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
         - .next/cache/**/*
   ```

2. **Review Settings**:
   - App name: `caimmigration-website`
   - Environment: `main`
   - Build command: `npm run build`
   - Base directory: `/` (root)
   - Build output directory: `out` (static export)

### Step 4: Environment Variables (Optional)

If you need environment variables, add them in the Amplify console:

1. Go to your app in Amplify console
2. Click "Environment variables" in the left sidebar
3. Add the following variables:

```
NEXT_PUBLIC_SITE_URL=https://your-amplify-domain.amplifyapp.com
NEXT_PUBLIC_CONTACT_PHONE=+1 416-992-7429
NEXT_PUBLIC_CONTACT_EMAIL=info@caimmigrat.com
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

### Step 5: Deploy

1. **Start Deployment**:
   - Click "Save and deploy"
   - Amplify will automatically build and deploy your app
   - This process takes 5-10 minutes

2. **Monitor Build**:
   - Watch the build logs in the Amplify console
   - The build process includes:
     - Provision: Setting up build environment
     - Build: Running `npm ci` and `npm run build`
     - Deploy: Uploading files to CloudFront CDN
     - Verify: Health checks

3. **Access Your Website**:
   - Once deployed, you'll get a URL like: `https://main.d1234abcd.amplifyapp.com`
   - Your website is now live!

### Step 6: Custom Domain (Optional)

1. **Add Custom Domain**:
   - In Amplify console, go to "Domain management"
   - Click "Add domain"
   - Enter your domain (e.g., `caimmigrat.com`)

2. **DNS Configuration**:
   - Amplify will provide CNAME records
   - Add these to your domain registrar's DNS settings
   - SSL certificate is automatically provisioned

## 🔧 Build Configuration Details

### Files Created for Amplify:

1. **`amplify.yml`**: Build specification file
2. **`next.config.ts`**: Updated for static export
3. **`package.json`**: Added Amplify-specific scripts

### Key Configuration Changes:

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  output: 'export',           // Static export for Amplify
  trailingSlash: true,        // Better routing
  images: {
    unoptimized: true,        // Required for static export
  },
};
```

## 🔄 Automatic Deployments

Once set up, Amplify automatically:

- **Deploys on Push**: Every push to `main` branch triggers a new deployment
- **Branch Deployments**: Create feature branches for staging environments
- **Rollback**: Easy rollback to previous versions
- **CDN Distribution**: Global content delivery via CloudFront

## 📊 Monitoring & Analytics

1. **Build History**: View all deployments and build logs
2. **Performance**: Monitor Core Web Vitals
3. **Custom Metrics**: Track user behavior
4. **Logs**: Access real-time application logs

## 🛡️ Security Features

Amplify automatically provides:

- **HTTPS**: SSL/TLS certificates
- **Security Headers**: XSS protection, content type options
- **DDoS Protection**: Built-in protection via CloudFront
- **Access Control**: Branch-based access controls

## 💡 Tips for Success

1. **Test Locally First**:
   ```bash
   npm run build
   npm run start
   ```

2. **Check Build Logs**: Always review build logs for errors

3. **Environment Parity**: Keep local and production environments similar

4. **Performance**: Use Next.js Image optimization features

5. **SEO**: Ensure proper meta tags and structured data

## 🔧 Troubleshooting

### Common Issues:

1. **"Illegal path found for appRoot" Error**:
   - ✅ **Fixed**: Updated `amplify.yml` to remove incorrect `appRoot` setting
   - ✅ **Solution**: Use correct Amplify YAML format for frontend apps
   - If still occurring, delete and recreate the Amplify app

2. **Build Failures**:
   - Check Node.js version compatibility (use Node 18+)
   - Verify all dependencies are in `package.json`
   - Review build logs for specific errors
   - Ensure `out` directory is being created during build

3. **Images Not Loading**:
   - Ensure external domains are configured in `next.config.ts`
   - Check image paths and formats
   - Verify `unoptimized: true` in Next.js config for static export

4. **Routing Issues**:
   - Verify `trailingSlash: true` in Next.js config
   - Check for case-sensitive path issues
   - Ensure `output: 'export'` is set in Next.js config

### Getting Help:

- **AWS Support**: Use AWS support console
- **Amplify Documentation**: [docs.amplify.aws](https://docs.amplify.aws)
- **Community**: AWS Amplify Discord/Forums

## 📈 Cost Estimation

AWS Amplify pricing (as of 2024):

- **Build**: $0.01 per build minute
- **Hosting**: $0.15 per GB served
- **Requests**: $0.30 per million requests

**Estimated monthly cost for small site**: $5-15/month

## 🎯 Next Steps

After deployment:

1. **Set up Google Analytics** for traffic monitoring
2. **Configure contact forms** to send emails
3. **Add blog/news section** for SEO
4. **Implement A/B testing** for conversions
5. **Set up monitoring alerts** for uptime

---

Your CAimmigrat website is now ready for production deployment on AWS Amplify! 🚀