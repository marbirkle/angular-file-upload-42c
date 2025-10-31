# Deployment Guide - Angular File Upload

## 🚀 Vercel Deployment

This project is configured for automatic deployment on Vercel.

### Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. Vercel CLI installed globally (optional for manual deployment)

### Automatic Deployment (Recommended)

1. **Connect to Vercel:**

   - Go to [vercel.com/import](https://vercel.com/import)
   - Select "Import Git Repository"
   - Choose this repository
   - Vercel will automatically detect the configuration

2. **Configure Build Settings:**

   - Framework Preset: `Angular`
   - Build Command: `npm run build`
   - Output Directory: `dist/apps/file-upload/browser`
   - Install Command: `npm install`

3. **Deploy:**
   - Click "Deploy"
   - Vercel will build and deploy your application
   - You'll receive a production URL

### Manual Deployment via CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

### Environment Variables

If you need environment variables for production:

1. Go to your project settings in Vercel
2. Navigate to "Environment Variables"
3. Add your variables (e.g., API keys, backend URLs)

### Configuration Files

- **vercel.json**: Main Vercel configuration

  - Defines build settings
  - Sets up routing for SPA
  - Configures security headers
  - Sets cache policies for assets

- **.vercelignore**: Files to exclude from deployment
  - Reduces deployment size
  - Speeds up build process

### Production Build

To test the production build locally:

```bash
# Build for production
npm run build

# The output will be in dist/apps/file-upload/browser
```

### Deployment URL

After deployment, your application will be available at:

- Production: `https://angular-file-upload-42c.vercel.app`
- Preview deployments: Unique URLs for each PR

### Features Included

✅ Automatic HTTPS
✅ Global CDN
✅ Automatic deployments from `main` branch
✅ Preview deployments for PRs
✅ Security headers configured
✅ Asset caching optimized
✅ SPA routing configured

### Troubleshooting

**Build fails:**

- Check that all dependencies are in `package.json`
- Verify Node.js version compatibility
- Check build logs in Vercel dashboard

**404 on routes:**

- Verify `vercel.json` rewrites configuration
- Ensure Angular routing is properly configured

**Slow performance:**

- Check asset optimization
- Verify lazy loading is enabled
- Review bundle sizes in build output

### Support

For issues specific to Vercel deployment:

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Angular Guide](https://vercel.com/guides/deploying-angular-with-vercel)
