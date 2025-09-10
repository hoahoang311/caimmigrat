# Amplify Deployment Guide

## Required Environment Variables

To deploy this application on AWS Amplify, you need to configure the following environment variables in the Amplify console:

### Supabase Configuration
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Setting Environment Variables in Amplify

1. Go to your Amplify app in the AWS Console
2. Navigate to "App settings" > "Environment variables"
3. Add the required variables:
   - `NEXT_PUBLIC_SUPABASE_URL`: Get this from your Supabase project dashboard
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Get this from your Supabase project dashboard

## Build Configuration

This application uses Next.js App Router with server-side features (API routes, server components). The `amplify.yml` is configured for SSR deployment.

**Important**: Do not use static export for this application as it has dynamic server-side functionality.

The application includes fallback handling for missing environment variables to prevent build failures, but the database functionality will not work without proper Supabase configuration.

## Notes

- The app will build successfully even without environment variables configured
- Database operations will show console warnings and return mock data when Supabase is not configured
- Make sure to configure the environment variables before going live to enable full functionality