# Netlify Deployment

## Initial hosting choice

Use Netlify for the first production release because the product is static-first and the owner already uses Netlify.

The deployment must remain portable to Cloudflare Pages or another static host.

## Build

Suggested Netlify configuration:

```toml
[build]
  command = "pnpm build"
  publish = "apps/web/dist"
```

Adjust actual monorepo build path after scaffold.

## Runtime architecture

MVP:
- static HTML/assets,
- no Netlify Functions required,
- no Netlify database/blobs required,
- no server-side conversion.

This keeps operational cost/complexity low.

## Cache policy

Astro/Vite hashed assets can be cached long-term.

Recommended conceptual headers:

```text
/_astro/*
  Cache-Control: public, max-age=31536000, immutable

/*.html
  Cache-Control: public, max-age=0, must-revalidate
```

Use Netlify `_headers` or config syntax supported by the final build.

Do not copy the supplied micro-SaaS guide's query-string cache busting pattern into an Astro/Vite build; hashed asset filenames already solve this more cleanly.

## Redirects

Do not add a blanket SPA fallback (`/* /index.html 200`) because main SEO routes are real prerendered pages.

Add redirects only intentionally, e.g. renamed canonical routes.

## Environment variables

Only public configuration needed by client code should use public prefixes.

Potential later:
- analytics measurement ID,
- AdSense client ID.

Secrets/tokens for deployment belong in Netlify/GitHub settings, never source control.

## Preview workflow

Recommended:
- production branch: `main`,
- PR/branch deploy previews,
- run automated tests before production merge.

Use preview deploys to inspect:
- SEO rendered HTML,
- responsive workspace,
- CSP/ads/CMP later,
- cross-browser behavior.

## Free plan monitoring

Netlify's current Free plan is credit-based. Monitor usage as traffic grows; do not pay preemptively unless credits/build limits become a real constraint.

Static/browser-local architecture keeps server usage minimal, but bandwidth and requests still matter.

## Production domain flow

1. Clear brand/name.
2. Buy domain through chosen registrar.
3. Add custom domain to Netlify.
4. Configure DNS.
5. Verify HTTPS certificate.
6. Set one canonical host (`www` or apex) and redirect the other.
7. Update canonical metadata/site URL.
8. Add Search Console domain property.
9. Submit sitemap.
10. Only then activate final ad/analytics configuration.

## Rollback

Netlify deploy history makes rollback easy. Never delete the last known-good production deploy during a release.
