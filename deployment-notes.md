# Deployment Notes - WorkSphere

This document outlines the steps and considerations for deploying WorkSphere to a production environment.

## 1. Environment Variable Setup

Ensure the following environment variables are configured in your production environment (e.g., Cloud Run, Vercel, Netlify):

- `GEMINI_API_KEY`: Must be a valid Google AI SDK key.
- `NODE_ENV`: Set to `production`.

## 2. Build Process

The application is built using Vite. Run the following command to generate the production build:

```bash
npm run build
```

This will output static files in the `dist/` directory.

## 3. Server Configuration

If deploying to a custom server:
- Ensure the server serves `index.html` for all non-file routes to support React Router's SPA routing.
- Port 3000 is used for internal load balancing in AI Studio; ensure your production port matches your environment's requirements.

## 4. Optimization Checklists

- [x] All SVGs are optimized.
- [x] Unused dependencies have been removed.
- [x] Responsive layout tested on 375px, 768px, 1024px, and 1440px widths.
- [x] Color contrast ratios verified for accessibility.
- [x] Error boundaries and 404 pages implemented.

## 5. Security Considerations

- The Gemini API is currently called from the client-side for demonstration purposes in this prototype. In a production-hardened environment, these calls should be proxied through a server-side route to protect the API key.
- All forms use Zod validation to prevent invalid data entry.
