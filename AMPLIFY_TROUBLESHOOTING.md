# AWS Amplify Troubleshooting Guide

## 🚨 Current Issues & Solutions

### Issue 1: Node.js Version Warning
```
Node.js 18 support ends soon.
Starting September 15, 2025, AWS Amplify Console will end support for Node.js 18.
```

**✅ SOLUTION APPLIED:**
- Added `.nvmrc` file specifying Node.js 20
- Updated `amplify.yml` to use `nvm use 20`
- Added `engines` field in `package.json` requiring Node.js 20+

### Issue 2: Missing required-server-files.json
```
CustomerError: Can't find required-server-files.json in build output directory
```

**🔍 ROOT CAUSE:**
AWS Amplify is auto-detecting this as a Next.js server app instead of a static export.

**✅ SOLUTIONS APPLIED:**

1. **Explicit Static Export Configuration:**
   ```typescript
   // next.config.ts
   const nextConfig: NextConfig = {
     output: 'export',           // Force static export
     trailingSlash: true,
     images: { unoptimized: true }
   };
   ```

2. **Amplify YAML Optimization:**
   ```yaml
   # amplify.yml
   frontend:
     phases:
       preBuild:
         commands:
           - nvm use 20          # Use Node.js 20
           - npm ci
       build:
         commands:
           - npm run build      # Creates static export
     artifacts:
       baseDirectory: out      # Static export directory
   ```

3. **Build Verification:**
   Added debug commands to verify static export:
   ```bash
   - ls -la out/
   - echo "Static files generated successfully"
   ```

## 🔧 Manual Fix Steps

If the automated fixes don't work, try these manual steps:

### Option 1: Recreate Amplify App
1. **Delete current app** in AWS Amplify console
2. **Create new app** and select "Deploy without Git provider"
3. **Upload zip file** of the `out` directory after running `npm run build`

### Option 2: Force Static Site Detection
1. **Go to Amplify Console** → Your App → Build Settings
2. **Edit amplify.yml** directly in the console
3. **Ensure baseDirectory is set to**: `out`
4. **Redeploy**

### Option 3: Alternative Build Command
Try this alternative `amplify.yml`:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - nvm use 20
        - npm ci
    build:
      commands:
        - npm run build
        - cp -r out/* .
    artifacts:
      baseDirectory: .
      files:
        - '**/*'
        - '!node_modules/**/*'
```

## 🔍 Verification Steps

After deployment, verify these:

1. **Check Build Logs:**
   - Node.js version should be 20.x
   - Build should create `out` directory
   - No server-related errors

2. **Test Static Export Locally:**
   ```bash
   npm run build
   cd out
   python3 -m http.server 8000
   # Visit http://localhost:8000
   ```

3. **Verify Amplify Output:**
   - Check that all HTML files are present
   - CSS and JS files are correctly referenced
   - Images load properly

## 📞 Current Build Status

**Expected Build Process:**
1. ✅ Use Node.js 20
2. ✅ Install dependencies with `npm ci`
3. ✅ Run `npm run build` (creates static export)
4. ✅ Deploy from `out` directory
5. ✅ Apply security headers

**If Still Failing:**

1. **Check Node Version in Build Logs**
2. **Verify `out` directory is created**
3. **Look for any TypeScript/ESLint errors**
4. **Try deploying manually with zip upload**

## 🆘 Emergency Deployment Method

If all else fails, use manual deployment:

```bash
# 1. Build locally
npm run build

# 2. Create deployment zip
cd out
zip -r ../deployment.zip .
cd ..

# 3. Upload to Amplify
# Go to Amplify Console → Deploy without Git → Upload zip
```

## 📞 Support Resources

- **AWS Amplify Documentation**: https://docs.amplify.aws
- **Next.js Static Export**: https://nextjs.org/docs/app/building-your-application/deploying/static-exports
- **AWS Support**: https://aws.amazon.com/support

---

**Status**: Issues addressed, ready for retry deployment 🚀