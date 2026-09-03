# Advertising — decision record

**Status: ruled out. Decided 2 September 2026.**

ModelForge does not carry advertising, and no longer prepares for it. This
document replaces the previous placement specification so the decision is not
quietly re-litigated later.

## What was removed

- `google-adsense-account` ownership meta tag from `apps/web/src/layouts/BaseLayout.astro`.
- `apps/web/public/ads.txt` and its authorized-seller record.
- The `AdZone` component and the reserved slot it rendered after the workspace.
- The end-to-end tests that asserted the ownership metadata and the reserved slot.
- The AdSense reference links in `REFERENCES.md`.

The legal pages in `apps/web/src/lib/legal-i18n.ts` were rewritten in all eight
locales. They previously said advertising was "disabled in this MVP", which
implied a pending activation; they now state that advertising is excluded, and
they disclose the one third-party script that does load.

## Why

The product's entire proposition is that your JSON never leaves the browser.
The interface says so on the screen where the work happens. Loading an ad
network on that same page means shipping a third-party script that profiles the
visitor, which does not technically contradict the local-processing promise but
reads as a contradiction to the exact audience that chooses the tool for it.

The audience for a JSON-to-code compiler is developers, who are the people most
likely to notice and least likely to forgive it. Weighed against the revenue a
niche developer tool earns from display advertising, the trade was not close.

## What remains true

There is no ad network, no ad script, no advertising cookies, and no ad
inventory reserved in the layout. The only third-party request the site makes is
Cloudflare Web Analytics, which is cookieless and aggregate, and which is
disclosed on the privacy and cookies pages.

An end-to-end test in `tests/e2e/hardening.spec.ts` fails if
`google-adsense-account`, `ca-pub-`, `pagead2.googlesyndication.com` or
`adsbygoogle` reappears in the home page, or if `/ads.txt` stops returning 404.

## If this is ever revisited

Reopening this would require, at minimum: a placement plan that keeps ads out of
the Source, Model and Output panels and away from the Generate, Copy and
Download controls; a Google-certified consent mechanism for EEA, UK and Swiss
visitors; disclosure of provider, purpose, retention and controls on the legal
pages before activation; and an honest answer to the question of what the
privacy promise on the workspace screen is worth afterwards.
