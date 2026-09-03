# External launch checklist

Local implementation and verification can finish without production accounts. Public launch remains blocked on these owner actions:

## Brand and domain

- Complete exact-name collision searches across search, GitHub, npm, PyPI, product directories, app stores, and relevant trademark databases.
- Obtain professional trademark advice if commercial risk warrants it.
- Select the final brand, buy one primary domain, and secure the matching repository/package handles.
- Set `PUBLIC_SITE_URL` to the canonical production origin, then configure the apex/www redirect in the selected host.

## Hosting

- Select one production host. Cloudflare Workers Static Assets is prepared; Netlify remains a fallback.
- Connect the repository and production branch to the selected provider.
- For Cloudflare, confirm `corepack pnpm build:cloudflare`, `wrangler.jsonc` and `apps/web/dist`.
- For Netlify, confirm `corepack pnpm build`, `netlify.toml` and `apps/web/dist`.
- Add the cleared custom domain, configure DNS, verify HTTPS, and test a deploy preview plus rollback.

## Search and analytics

- Create and verify the Search Console domain property, submit the production sitemap, and inspect all four converter URLs.
- Select an analytics provider and legal basis, publish production contact/retention details, configure its public ID, and connect it only through the analytics facade after consent review.

## Advertising and consent

- Obtain AdSense approval and the real publisher ID before changing `ads.txt`.
- Select a Google-certified CMP where required, connect it through the consent boundary, and review every ad placement on desktop/mobile.
- Keep vignette/anchor formats disabled until they pass converter interaction review.

## Legal

- Have Privacy, Cookies, Terms, and Generated Code Disclaimer text reviewed for the final entity, jurisdiction, contact method, analytics provider, advertising vendor, and retention terms.
