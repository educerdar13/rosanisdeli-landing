# Deployment Guide

## Vercel Deployment

### Quick Deploy
From the `site/` directory:
```bash
npx vercel --yes
```

This creates a preview deployment with a unique URL like `https://site-abc123.vercel.app`.

### First-Time Setup
If the user hasn't logged into Vercel before:
1. Run `npx vercel login`
2. A browser window opens for authentication
3. User can log in with GitHub, GitLab, Bitbucket, or email
4. Once authenticated, re-run `npx vercel --yes`

If the user doesn't have a Vercel account:
1. Guide them to create one at vercel.com (free tier is sufficient)
2. Or they can sign up directly through the CLI login flow

### Production Deploy
For a production deployment (custom domain support):
```bash
npx vercel --prod --yes
```

### Troubleshooting

**Auth error:**
```
Error: No existing credentials found.
```
Solution: Run `npx vercel login` first.

**Build error:**
Run `npm run build` locally first to check for errors. Fix any TypeScript or build issues before deploying.

**Port 3000 in use (during preview):**
```bash
npm run dev -- --port 3001
```

**Deployment hangs:**
Check internet connection. If behind a proxy, Vercel CLI may need proxy configuration.

### Notes
- Preview deployments stay live as long as the Vercel account is active
- Free tier includes unlimited preview deployments
- Custom domains require the user to configure DNS settings in Vercel dashboard
- The user can manage deployments at vercel.com/dashboard
