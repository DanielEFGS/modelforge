# Cloudflare Workers deployment

## Hosting model

ModelForge is an Astro static site. Deploy it with **Workers Static Assets**:

- no Astro Cloudflare adapter;
- no Worker entry point;
- no Pages Functions;
- no KV, D1, R2 or runtime bindings;
- all conversion remains in the browser.

The source of truth is `wrangler.jsonc`. It uploads `apps/web/dist` and uses `404-page` handling so unknown routes keep a real 404 response instead of falling back to the home page.

`netlify.toml` remains available as a portable fallback. Do not configure both providers to serve the production domain simultaneously.

## Local validation

Install dependencies and build normally:

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm build
```

Preview the generated site through the local Workers runtime:

```bash
corepack pnpm cloudflare:preview
```

This starts Wrangler locally and does not publish anything.

## Canonical production URL

Production packaging requires `PUBLIC_SITE_URL`. It must be the final HTTPS origin, with no path:

```text
PUBLIC_SITE_URL=https://modelforge.daniel-gs.dev
```

The deployment scripts reject missing, invalid, HTTP and reserved `.example` values. This prevents canonical, Open Graph, robots and sitemap URLs from being published with the development fallback.

Do not commit a real value in `.env`; configure it in Workers Builds or in the local shell used for an intentional deployment.

## Dry run

After the final domain is known, validate the production package without uploading it:

```bash
corepack pnpm cloudflare:dry-run
```

The command validates `PUBLIC_SITE_URL`, builds every workspace package, and runs `wrangler deploy --dry-run`.

## First manual deployment

The owner approved `modelforge.daniel-gs.dev` as the production hostname on 2026-08-31. Deploy with:

```bash
corepack pnpm cloudflare:deploy
```

Wrangler deploys the static assets to the `modelforge` Worker and attaches the configured Custom Domain. Cloudflare creates the required DNS record and certificate for `modelforge.daniel-gs.dev`.

## Workers Builds

Recommended repository settings:

| Setting | Value |
|---|---|
| Root directory | repository root |
| Node.js | 24 |
| Package manager | pnpm 11.24.0 via Corepack |
| Build command | `corepack pnpm build:cloudflare` |
| Deploy command | `corepack pnpm exec wrangler deploy` |
| Production variable | `PUBLIC_SITE_URL=https://modelforge.daniel-gs.dev` |

Keep automatic production deployment disabled until the first dry run and manual preview have been reviewed.

## Headers and caching

`apps/web/public/_headers` is copied into the Astro output and interpreted by Workers Static Assets. It preserves the current security headers and gives hashed `/_astro/*` assets immutable one-year browser caching.

Do not add HSTS until the custom domain and HTTPS are stable. Add a Content Security Policy only after testing the current inline Astro scripts and the final consent/analytics/ad providers in a preview.

## Domain cutover

1. Complete `docs/operations/brand-domain.md`.
2. Add the cleared domain to Cloudflare.
3. Choose one canonical host: apex or `www`.
4. Set `PUBLIC_SITE_URL` to that exact origin.
5. Redirect the alternate host to the canonical host with a Cloudflare Redirect Rule.
6. Deploy and verify HTTPS, canonical, sitemap, robots, Open Graph and the custom 404.
7. Submit the production sitemap to Search Console and Bing Webmaster Tools.

Do not place a redirect in application code solely for host canonicalization; keep DNS/host routing at the Cloudflare edge.

## Rollback

Before each production change, note the active Worker version. If a release fails, use Workers deployment/version history or Wrangler rollback rather than deleting the last known-good deployment.

## Secrets and privacy

The static deployment needs no Cloudflare secret and no runtime API token in the repository. Authentication belongs to Wrangler OAuth locally or a narrowly scoped CI token managed by Cloudflare. Never send source JSON, IR, field names or generated code to Cloudflare analytics or logs.
