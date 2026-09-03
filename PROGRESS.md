# Progress

Implementation is in progress.

## Current phase
Phase 11 — the first C#/.NET and Python transformation slice is implemented; external target-verification and launch gates remain.

## Completed
- Documentation blueprint prepared.
- MF-001: scaffolded an Astro 7 static app with React 19 islands and strict TypeScript in a pnpm workspace.
- MF-002: added Tailwind CSS 4 and semantic light/dark Silicon Inspection design tokens.
- MF-003: configured ESLint, Prettier, Vitest, Testing Library, and Playwright with passing smoke tests.
- MF-004: added GitHub Actions quality workflow.
- MF-005: added the static route shell, metadata helper, reserved-domain canonical fallback, sitemap, and generated robots route.
- MF-006: added issue and pull-request quality templates.
- MF-101–MF-105: implemented the versioned Universal Model IR, stable IDs and naming, reproducible diagnostics, invariant validation, and representative fixtures.
- MF-201–MF-208: implemented actionable JSON parsing, deterministic scalar/object/array inference, independent missing/null evidence, conservative semantic hints, collision diagnostics, source-size/depth safeguards, and serializable inference decisions.
- MF-301–MF-306: implemented deterministic interface, type-alias, and class generation with configurable formatting, optional/null/date/array policies, dependency-safe ordering, golden output, and a strict TypeScript compile fixture.
- MF-401–MF-406: implemented deterministic POJO, record, and Lombok generation; constructors, accessors, utility methods and builder policies; boxed/collection/java.time mappings; stable imports; union diagnostics; and Maven compile fixtures for all three styles.
- MF-501–MF-509: implemented isolated Spring Boot 3.5.16 and 4.1.1 profiles, Java compatibility checks, JPA Entity/DTO/Repository adapters, explicit identifier selection, stable package/import generation, and compiling Maven fixtures for both verified families.
- MF-601–MF-609: shipped the approved Silicon Inspection / Central Inspection workspace with lazy CodeMirror, editable IR inspection, multi-file output, compatibility blocking, local-only state, copy/download, responsive stages, and light/dark themes.
- MF-701–MF-709: shipped four statically rendered converter routes with unique visible copy, metadata, canonicals, structured data, FAQs, internal links, crawl controls, 404 handling, and a social card.
- MF-801–MF-807: added a disabled-by-default, allowlisted analytics facade; sentinel leak coverage; legal pages; consent and advertising boundaries; ads.txt placeholder; and zero-shift reserved ad inventory outside the workspace.
- MF-901–MF-906 and MF-908: completed local performance, accessibility, security, dependency/license, crawl, and Netlify hardening plus the external launch checklist.
- MF-909: refined the workspace controls and neutral seam hierarchy, removed decorative header routing, added semantic source/output syntax colors, and exposed every inference diagnostic in an expandable inspector.
- MF-910: replaced the redundant local-pipeline status with an eight-language interface selector, browser-locale detection, local preference persistence, localized accessible names, stable target-field sizing under extreme source names, viewport-bound reference rails, and tests proving generated identifiers and code remain unchanged.
- MF-911: preserved pinned-reference icon contrast, completed icon-only control tooltips, added a circuit-die SVG app mark, repaired Reset spacing, moved the mobile locale selector below References, and kept Generate/Reset inside safe viewport bounds.
- MF-912: removed the stale visible route heading while preserving its static SEO H1, added dismissible target-aware guidance, localized shell/style/diagnostic copy across eight interface languages, raised expanded diagnostics above reference routes, and filtered Spring/Java selector combinations directly from version profiles.
- MF-913: connected the post-workspace compiler notes, FAQ content and related-converter navigation to the persisted locale across all eight interface languages while preserving English static-rendered SEO content and invariant technical names.
- MF-914: localized every visible section of the privacy, cookie, terms and generated-code disclaimer documents across all eight interface languages, including localized document titles, update notices and the root language attribute while preserving English static HTML.
- MF-915: added a first-paint readiness overlay for locale/theme hydration, made the initial theme follow browser preference until an explicit persisted override, separated source and target column headings, and replaced clipped element borders with continuous nested polygon seams.
- MF-916: animated reference visibility as a short source-to-model-to-output trace, retained hidden route geometry for reversible dismissal, staggered contact acknowledgment within a bounded motion budget, and reduced the transition to near-instant feedback when the browser requests reduced motion.
- MF-917: prepared Cloudflare Workers Static Assets deployment with pinned Wrangler 4.127.1, canonical-origin validation, a real custom 404, portable security/cache headers, local Workers preview, dry-run packaging and an owner-facing deployment guide while retaining Netlify as a fallback.
- MF-918: selected `https://modelforge.daniel-gs.dev` as the production origin and added its Cloudflare Workers Custom Domain route; deployment verification is recorded below.
- MF-808: published AdSense account ownership metadata and the real authorized-seller record for publisher `ca-pub-1200613323576407` without loading the executable AdSense script; live ad serving remains blocked on approval, root-domain ads.txt coverage, CMP configuration and legal review.
- MF-808 verification note (2026-09-01): the first formatting check found only Prettier layout drift in `BaseLayout.astro`; the file was reformatted before rerunning the unchanged quality gates.
- MF-808 production verification note (2026-09-01): the first PowerShell edge check used `$home`, which collides case-insensitively with the reserved `$HOME` variable; `ads.txt` was already healthy, and the home-page check was rerun with a task-specific variable name.
- MF-1100: researched and prioritized C#/.NET, Python/Pydantic, Django, EF Core, Kotlin, Go and Rust targets in `docs/product/target-expansion-roadmap.md`; the owner subsequently activated Phase 11 for the first language-generator slice.
- MF-1101: implemented deterministic C# sealed class/property-record generation with nullable types, PascalCase properties, `System.Text.Json` aliases, list/date mappings, stable lossy-union diagnostics, exact golden coverage, UI integration and a net8/C# 12 compile fixture.
- MF-1103: implemented deterministic Python dataclass/Pydantic generation with explicit required/missing/null mapping, source aliases, nested/list/union/date types, opt-in Pydantic strict mode, exact golden coverage, syntax fixtures, UI integration and a static converter route.

## Decisions
- Pinned TypeScript 6.0.3 because Astro's checker does not yet support the TypeScript 7 programmatic API.
- Core compiler packages will remain separate workspace packages from `apps/web`.
- Captured durable product context in `PRODUCT.md`; light and dark themes are a confirmed brand commitment.
- Impeccable workflow uses comp-first visual development for new surfaces.
- Approved the Silicon Inspection visual direction and its model-first Central Inspection composition (`.impeccable/mocks/silicon-central.png`).
- Impeccable finish review passed after desktop/mobile/dark screenshots and anti-pattern detection; the implemented system is documented in `DESIGN.md`.
- CodeMirror is split into lazy chunks; the hydrated workspace entry is approximately 41 KB uncompressed before shared React chunks.
- Production dependencies have no known audit vulnerabilities; non-MIT-family transitive licenses are documented in `THIRD_PARTY_NOTICES.md`.
- Restored the approved Silicon Central visual contract: full-width routed header, clipped inspection bays, viewport-height workspace, denser sample evidence, and visible Source → Model → Output connections.
- Added deterministic reference inspection using stable IR field IDs: CodeMirror property decorations, model-row hover/pin controls, generated-property decorations, a show-all switch, an accessible live readout, and SVG routes that never leave the browser.
- Reference endpoints outside an internally scrolled panel project to inset top or bottom rails, grouping offscreen connections without clipping the route graph or crossing fixed panel chrome.
- Reserved teal linework for live field references and active states; structural borders are now neutral so the source → model → output graph carries the visual meaning.
- Reused CodeMirror's existing parser for JSON highlighting and added a small deterministic lexer for generated TypeScript/Java instead of a networked or heavyweight runtime highlighter.
- Localize workspace chrome only: browser language is detected without IP or network access, explicit choice is stored as `modelforge-locale`, and compiler input/IR names/generated artifacts remain language-invariant.
- Resolve locale and color scheme before first paint; keep the opaque startup surface until localized React content is committed. Browser color-scheme changes remain live only while no explicit `modelforge-theme` preference exists.
- Planned Phase 10 as scoped local workspace memory rather than a generalized IDE: undo/redo and run history are session-only, while raw JSON reaches IndexedDB only through an explicit named local-save action.
- Target expansion keeps the same compiler layering: language model generators consume Universal Model IR first; Django and EF Core are later adapters over verified Python and C# generators with explicit version profiles and identity/relationship choices.
- Compatibility selectors derive disabled options and fallback values from framework profiles, so the UI cannot drift from generator compatibility metadata.
- New language targets remain honest about verification: C# metadata is unverified until the net8 fixture compiles with a recorded SDK; Pydantic metadata is unverified until runtime fixtures execute against a recorded version. Standard-library dataclass output is syntax-verified with Python 3.14.6.
- Cloudflare uses Workers Static Assets with no Astro adapter, Worker entry point or bindings because the product is fully prerendered. `PUBLIC_SITE_URL` is mandatory for Cloudflare production commands; Netlify remains a portable fallback rather than a simultaneous production origin.
- The production hostname is `modelforge.daniel-gs.dev`; Cloudflare owns DNS and provisions its Custom Domain record and TLS certificate from `wrangler.jsonc`.

## Next task
- MF-1106 Compile the net8/C# 12 fixture with a recorded .NET SDK before presenting C# output as verified.
- MF-1107 Execute the Pydantic runtime fixture against a pinned supported version before presenting Pydantic output as verified.
- MF-907 Complete owner-led brand/trademark/domain clearance, then execute the external launch checklist.

## Test status
- MF-001: strict typecheck and Astro static build pass.
- MF-002–MF-003: lint, typecheck, unit/component test, build, and Chromium E2E smoke pass locally.
- Phase 0 gate: lint, typecheck, unit/component tests, static build, and Chromium E2E smoke pass locally.
- Phase 1 gate: lint, typecheck, 16 unit/component tests, and static build pass locally.
- Phase 2 gate: lint, typecheck, 29 unit/component tests, and static build pass locally.
- Phase 3 gate: lint, typecheck, 34 unit/component tests, static build, and strict generated TypeScript fixture compilation pass locally.
- Phase 4 gate: lint, typecheck, 38 unit/component tests, static build, and Maven compilation of POJO, record, and Lombok fixtures pass locally.
- Phase 5 gate: lint, typecheck, 42 unit/component tests, static build, and Maven compilation against the recorded Spring Boot 3.5.16 and 4.1.1 profiles pass locally.
- Phase 6 gate: Chromium, Firefox, and WebKit happy paths, keyboard generation, mobile stages, and privacy-sentinel network test pass locally; Impeccable finish verdict passed.
- Phase 7 gate: initial HTML contains unique H1/copy/metadata/structured data for every converter; build emits the static routes and sitemap.
- Phase 8 gate: 49 unit/component tests pass; integrations disabled leaves conversion behavior unchanged; ad-slot simulation causes no following-content shift.
- Phase 9 local gate (final verification, 2026-08-28): lint, formatting, typecheck, 59 unit/component tests, static build, Java/TypeScript/Spring compile fixtures, and 42 cross-browser E2E tests pass. The target-aware dismissible guidance, eight-language shell and diagnostic copy, profile-driven compatibility filtering, diagnostic stacking, reference graph and offscreen endpoint rails, generated syntax highlighting, invariant English generated code, mobile actions, and stable field mapping under extreme source names are covered in Chromium, Firefox, and WebKit; desktop/mobile Spanish visual captures were reviewed. The Impeccable detector reports no findings. `pnpm audit --prod` reports no known vulnerabilities.
- Phase 11 first-slice gate (2026-08-29): formatting, lint, typecheck, 68 unit/component tests, static build, existing Java/TypeScript/Spring compile fixtures, Python 3.14.6 syntax fixtures, and 48 cross-browser E2E tests pass. The build emits 11 static pages, including the unique C#/.NET and Python converter routes. The E2E language paths verify that the workspace, post-workspace explanations and all four legal documents switch to Spanish while generated code remains invariant. Desktop C# and mobile Python Spanish captures were reviewed. C# and Pydantic remain explicitly unverified until MF-1106 and MF-1107 pass in their recorded external runtimes.
- MF-915 hardening gate (2026-08-31): formatting, lint, typecheck, 68 unit/component tests, static build and 54 cross-browser E2E tests pass. First-paint readiness, browser-theme inheritance and manual persistence, separate source/target column alignment, continuous clipped borders and responsive composition are covered; desktop Spanish and mobile German captures were reviewed. The Impeccable detector reports no findings.
- MF-916 motion gate (2026-08-31): formatting, lint, typecheck, 68 unit/component tests, static build and 54 cross-browser E2E tests pass. Reference-route entrance, reversible dismissal, pinned-route behavior and the reduced-motion override are covered in Chromium, Firefox and WebKit; intermediate and completed desktop frames were reviewed. The Impeccable detector reports no findings.
- MF-917 Cloudflare preparation gate (2026-08-31): frozen pnpm install, formatting, lint, typecheck, 68 unit/component tests, full static/fixture build and 54 cross-browser E2E tests pass. Wrangler 4.127.1 dry-run reads 41 static assets with no bindings; local Workers preview returns 200 for the home page, 404 for an unknown route, the expected security headers, and immutable caching for hashed Astro assets. The first lint pass exposed missing Node globals for `scripts/**`; the ESLint scope was corrected and the rerun passed.
- MF-918 production deployment gate (2026-08-31): lint, typecheck, 68 unit/component tests, production build and Cloudflare dry-run pass for `https://modelforge.daniel-gs.dev`. The first E2E attempt could not start because the existing local Astro process (PID 33708) owned port 4321; the process was stopped before rerunning the unchanged suite.
- MF-918 deployment completed with Cloudflare version `30945ac9-ee67-49b5-8efe-002d4bd0ac18`; all 54 E2E tests passed on rerun. Cloudflare created the proxied DNS record and enabled the Custom Domain with a managed certificate. Edge verification returned 200 for the home page, robots, sitemap and Python route; 404 for an unknown route; the correct production canonical and sitemap origins; and the expected security headers. The workstation resolver briefly retained the pre-deployment NXDOMAIN, while Cloudflare public DNS and direct edge verification were already healthy.
- MF-808 AdSense verification gate (2026-09-01): formatting, lint, typecheck, 68 unit/component tests, full static/fixture build, Cloudflare dry-run and 57 cross-browser E2E tests pass. Cloudflare version `d55fb456-48ea-4f75-a499-1ac213e3918a` publishes the account meta tag and authorized-seller record. A production request using the `Mediapartners-Google` user agent returned 200, found publisher `ca-pub-1200613323576407`, confirmed the executable AdSense script is absent, and read the exact `ads.txt` record.

- MF-809 advertising removed (2026-09-02): the owner ruled advertising out for ModelForge. Removed the `google-adsense-account` meta tag, `apps/web/public/ads.txt`, the `AdZone` component and its reserved post-workspace slot, and the two E2E tests that asserted them. The AdSense reference links were dropped from `REFERENCES.md` and `docs/growth/advertising.md` was replaced by a decision record. The legal copy was rewritten in all eight locales: it previously described advertising as "disabled in this MVP", implying pending activation, and claimed no analytics vendor was bootstrapped, which was inaccurate because Cloudflare Web Analytics does load. The pages now state that advertising is excluded and disclose that script. A production browser audit confirmed the site sets no cookies and contacts only its own origin and `static.cloudflareinsights.com`.

## Known target verification limitations
- The local environment has no .NET SDK or C# compiler, so the committed net8/C# 12 fixture has not yet been compiled.
- The local Python 3.14.6 environment does not include Pydantic, so Pydantic output has syntax coverage but not pinned runtime validation.
- Django and EF Core remain planned framework adapters; their identity and relationship semantics require explicit version profiles and are not part of this first language-generator slice.

## Known external launch dependencies
- MF-907 brand/trademark/domain clearance and owner approval of the final public name,
- GitHub/package handle decisions,
- repository-based continuous deployment and rollback automation; production DNS, HTTPS and the Custom Domain are live on Cloudflare Workers Static Assets, while Netlify remains only a fallback,
- Google Search Console domain ownership verification and sitemap submission,
- final analytics provider/property, public measurement ID, consent/legal review, and production contact/retention details,
- legal review of the working policy pages before commercial public launch.

Exact steps are maintained in `docs/operations/launch-checklist.md`. No credentials or fictional IDs are committed; Cloudflare production hosting was activated with the owner's explicit approval.
