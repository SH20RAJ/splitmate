# Deploying SplitMate to Vercel

This document explains how to deploy SplitMate to Vercel for production hosting.

## Prerequisites

Before deploying, ensure you have:

1. A Vercel account
2. A GitHub/GitLab/Bitbucket account
3. All required environment variables

## Environment Variables

SplitMate requires the following environment variables:

### OpenAI API
```
OPENAI_API_KEY=sk-...
```

### StackAuth Configuration
```
STACK_PROJECT_ID=...
STACK_PUBLISHABLE_CLIENT_KEY=pck_...
STACK_SECRET_SERVER_KEY=ssk_...
```

### Supabase Configuration
```
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

## Deployment Steps

### 1. Push to Git Repository

Ensure your SplitMate code is pushed to a Git repository:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/splitmate.git
git push -u origin main
```

### 2. Import Project to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your Git repository
4. Configure project settings:
   - Framework: Next.js
   - Build Command: `next build`
   - Output Directory: `.next`

### 3. Configure Environment Variables

In the Vercel project settings:

1. Go to "Settings" > "Environment Variables"
2. Add all required environment variables from the list above
3. Make sure to set them for both Production and Preview environments

### 4. Deploy

1. Click "Deploy"
2. Vercel will automatically detect the Next.js framework
3. Wait for the build to complete
4. Your SplitMate app will be available at the provided URL

## Custom Domain

To use a custom domain:

1. Go to "Settings" > "Domains"
2. Add your custom domain
3. Follow the DNS configuration instructions
4. Vercel will automatically provision an SSL certificate

## Environment-Specific Configuration

### Production Environment
```
NODE_ENV=production
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

### Development Environment
```
NODE_ENV=development
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Build Optimization

### Next.js Configuration

SplitMate uses the default Next.js configuration in `next.config.ts`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
```

### Performance Optimization

To optimize performance:

1. Enable Vercel's Automatic Static Optimization
2. Use Image Optimization with `next/image`
3. Implement Incremental Static Regeneration where appropriate

## Monitoring and Analytics

### Vercel Analytics

Vercel provides built-in analytics:

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Error Monitoring

Consider adding error monitoring with services like Sentry:

```bash
npm install @sentry/nextjs
```

## CI/CD Pipeline

### GitHub Actions

SplitMate can use GitHub Actions for automated deployments:

```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## Environment Branching

### Preview Environments

Vercel automatically creates preview deployments for pull requests:

1. Each PR gets its own URL
2. Environment variables can be configured per environment
3. Perfect for testing new features

### Production Environment

Main branch deployments go to production:

1. Zero-downtime deployments
2. Automatic rollback on failure
3. Instant global CDN distribution

## Scaling

### Auto-scaling

Vercel automatically scales SplitMate:

1. Serverless functions scale automatically
2. Edge network ensures low latency
3. No manual intervention required

### Database Scaling

For database scaling:

1. Use Supabase's auto-scaling plans
2. Implement database connection pooling
3. Use caching strategies where appropriate

## Security

### HTTPS

Vercel automatically provides HTTPS:

1. Free SSL certificates
2. Automatic renewal
3. HTTP to HTTPS redirects

### Security Headers

Configure security headers in `next.config.ts`:

```typescript
const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};
```

## Troubleshooting

### Common Issues

1. **Environment Variables Missing**: Ensure all required env vars are set in Vercel
2. **Build Failures**: Check build logs in Vercel dashboard
3. **Runtime Errors**: Use Vercel's log viewer for debugging

### Support

For deployment issues:

1. Check Vercel documentation
2. Review build logs
3. Contact Vercel support if needed

## Conclusion

Deploying SplitMate to Vercel provides:

1. Zero-configuration deployments
2. Global CDN distribution
3. Automatic SSL
4. Serverless scaling
5. Preview deployments
6. Built-in analytics

With these features, SplitMate can be deployed to production in minutes while ensuring optimal performance and reliability.