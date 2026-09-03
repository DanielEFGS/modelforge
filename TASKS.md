# ModelForge Implementation Plan

Complete phases in order. Do not begin a later phase while the previous release gate is red.

## Phase 0 — Repository foundation

- [x] MF-001 Scaffold Astro static project with React + strict TypeScript.
- [x] MF-002 Add Tailwind CSS and design tokens.
- [x] MF-003 Configure ESLint/Prettier, Vitest, Testing Library and Playwright.
- [x] MF-004 Add CI workflow: lint, typecheck, unit tests, build, E2E smoke.
- [x] MF-005 Add route shell, metadata helper, sitemap and robots configuration.
- [x] MF-006 Add `PROGRESS.md`, issue template and pull-request checklist.

**Gate:** clean empty app deploys to a Netlify preview and all checks pass.

## Phase 1 — Universal Model IR

- [x] MF-101 Implement IR TypeScript types.
- [x] MF-102 Implement stable internal IDs and naming model.
- [x] MF-103 Implement diagnostics structure.
- [x] MF-104 Implement IR validation and schema version.
- [x] MF-105 Add fixtures for scalar, nested object, root array, null, empty array, heterogeneous array and invalid JSON cases.

**Gate:** IR can represent every case defined in `docs/specs/universal-model-ir.md` without target-language assumptions.

## Phase 2 — JSON parser and inference

- [x] MF-201 Parse JSON with actionable syntax errors.
- [x] MF-202 Infer scalar types deterministically.
- [x] MF-203 Infer nested models.
- [x] MF-204 Infer arrays and merge evidence across elements.
- [x] MF-205 Handle nullable/unknown fields.
- [x] MF-206 Add semantic hints: date-time, date, email, URL, UUID as non-destructive hints.
- [x] MF-207 Implement source-name to target-name normalization and collision diagnostics.
- [x] MF-208 Expose inference decisions in a serializable explanation model.

**Gate:** parser fixture suite is green and inference is deterministic.

## Phase 3 — TypeScript generator

- [x] MF-301 Interface target.
- [x] MF-302 Type alias target.
- [x] MF-303 Class target.
- [x] MF-304 Options: readonly, semicolon style, optional vs nullable mapping, dates as string/Date.
- [x] MF-305 Nested model ordering and dependency-safe output.
- [x] MF-306 Golden fixtures.

**Gate:** same IR/options generates stable output; generated TypeScript fixtures typecheck.

## Phase 4 — Java generator

- [x] MF-401 Plain POJO.
- [x] MF-402 Java record.
- [x] MF-403 Lombok class.
- [x] MF-404 Getters/setters/constructors/builder options where applicable.
- [x] MF-405 Java type mapping, collections, nullable policy and imports.
- [x] MF-406 Golden fixtures.

**Gate:** generated fixture sources compile in supported Java fixture projects.

## Phase 5 — Spring Boot versioned targets

- [x] MF-501 Create framework profile registry.
- [x] MF-502 Add Spring Boot 3.5.x profile.
- [x] MF-503 Add Spring Boot 4.1.x profile.
- [x] MF-504 Compatibility validation for Java selection.
- [x] MF-505 JPA Entity generator adapter.
- [x] MF-506 DTO generator adapter.
- [x] MF-507 Spring Data Repository generator adapter.
- [x] MF-508 Package/import generation.
- [x] MF-509 Maven fixture project for each supported profile.

**Gate:** generated Spring fixtures compile against each verified profile.

## Phase 6 — ModelForge workspace UI

- [x] MF-601 Three-area workspace: Source / Model / Output.
- [x] MF-602 CodeMirror source editor with example loader.
- [x] MF-603 Visual inferred model inspector/editor.
- [x] MF-604 Output editor/viewer with tabs for generated files.
- [x] MF-605 Target, framework, version and style selectors.
- [x] MF-606 Compatibility warnings before generation.
- [x] MF-607 Copy one file / copy all / download one file.
- [x] MF-608 Accessible mobile layout.
- [x] MF-609 Local-only privacy indicator and clear/reset.

**Gate:** complete happy path works in Chromium, Firefox and Safari; no source content is sent over the network.

## Phase 7 — SEO landing system

- [x] MF-701 Home page.
- [x] MF-702 `/json-to-typescript`.
- [x] MF-703 `/json-to-java`.
- [x] MF-704 `/json-to-spring-boot`.
- [x] MF-705 Static target-specific metadata and canonical URLs.
- [x] MF-706 SoftwareApplication/WebApplication structured data.
- [x] MF-707 Useful visible FAQ/content sections without keyword stuffing.
- [x] MF-708 Internal links among supported converters.
- [x] MF-709 Sitemap, robots and social cards.

**Gate:** View Source contains indexable route-specific copy before JavaScript executes.

## Phase 8 — Analytics, privacy and ad readiness

- [x] MF-801 Implement privacy-safe analytics event facade.
- [x] MF-802 Ensure source/code is never included in telemetry payloads.
- [x] MF-803 Add Privacy, Cookies, Terms and Generated Code Disclaimer pages.
- [x] MF-805 Add consent integration boundary; no ad script hardcoded into business logic.
- [x] MF-809 Rule out advertising and remove every trace of it: ownership meta, `ads.txt`, ad zones, tests and reference links. See `docs/growth/advertising.md`.
- [x] ~~MF-808 Publish the real AdSense ownership meta tag and authorized-seller record.~~ Reverted by MF-809.

**Gate:** app works identically with all analytics/ad integrations disabled.

## Phase 9 — Production hardening

- [x] MF-901 Performance audit and lazy-load editor-heavy code.
- [x] MF-902 Accessibility audit, keyboard-only run, focus order and screen-reader labels.
- [x] MF-903 Security review.
- [x] MF-904 Dependency/license audit.
- [x] MF-905 SEO crawl test.
- [x] MF-906 Netlify production configuration.
- [ ] MF-907 Domain/brand clearance gate.
- [x] MF-908 Search Console and analytics setup checklist ready.
- [x] MF-909 Refine workspace controls, syntax highlighting, visual routing hierarchy and complete diagnostic disclosure.
- [x] MF-910 Add private browser-locale detection, an eight-language workspace selector, local preference persistence and invariant English code generation.
- [x] MF-911 Harden icon-only controls, ship the ModelForge circuit mark and repair the mobile control/action composition.
- [x] MF-912 Complete eight-language shell/diagnostic copy, replace stale route headings with dismissible target-aware guidance, layer diagnostics above routes and filter incompatible target options.
- [x] MF-913 Localize the post-workspace compiler notes, FAQs and related-converter navigation across all eight interface languages.
- [x] MF-914 Localize the complete privacy, cookie, terms and generated-code disclaimer documents across all eight interface languages.
- [x] MF-915 Prevent locale hydration flash, inherit the browser color scheme until a manual override, align source/target field headings, and preserve continuous clipped panel borders.
- [x] MF-916 Animate reference-route disclosure and dismissal with progressive pipeline tracing and a reduced-motion fallback.
- [x] MF-917 Prepare a portable Cloudflare Workers Static Assets deployment with canonical URL validation, custom 404 handling, security headers and a verified Wrangler dry run.
- [x] MF-918 Deploy the production static site to Cloudflare Workers at `modelforge.daniel-gs.dev` and verify DNS, TLS, canonical metadata, crawl files, security headers and custom 404 behavior.

**Gate:** every item in `docs/quality/release-gate.md` passes.

## Phase 10 — Local workspace memory (planned, not active)

- [ ] MF-1001 Implement a bounded, session-only command timeline for source, IR and option mutations.
- [ ] MF-1002 Add Undo/Redo controls, localized tooltips, keyboard shortcuts and complete disabled/focus states.
- [ ] MF-1003 Record successful generations in an in-memory, renameable session history.
- [ ] MF-1004 Add explicit named local snapshots backed by IndexedDB; never persist source by default.
- [ ] MF-1005 Add restore, rename, duplicate, delete, dirty-state confirmation and storage-limit UX.
- [ ] MF-1006 Add versioned snapshot migrations and deterministic restore/generation fixtures.
- [ ] MF-1007 Add privacy-sentinel, accessibility, mobile and cross-browser history coverage.

**Gate:** the acceptance criteria in `docs/specs/local-workspace-history.md` pass, restored compatible snapshots generate byte-equivalent output, and no source or snapshot name leaves the browser.

## Post-MVP — intentionally deferred

### Phase 11 — Target expansion (active by owner request)

- [x] MF-1100 Research and prioritize deterministic language/framework targets; see `docs/product/target-expansion-roadmap.md`.
- [x] MF-1101 Specify and implement deterministic C# class/record generation with nullable types, `System.Text.Json` aliases, golden tests and an unverified net8 fixture.
- [ ] MF-1102 Add EF Core only as an adapter over the verified C# generator with explicit key/relationship decisions.
- [x] MF-1103 Specify and implement Python dataclass/Pydantic generation with explicit missing/null semantics, aliases, strict-mode contract, golden tests and syntax fixtures.
- [ ] MF-1104 Add Django only as an adapter over the verified Python mapping with explicit entity/relationship decisions.
- [ ] MF-1105 Evaluate and schedule Kotlin, Go and Rust generators using the roadmap acceptance matrix.
- [ ] MF-1106 Compile the C# fixture with a recorded .NET SDK and only then publish verified C# metadata.
- [ ] MF-1107 Execute Pydantic runtime fixtures against a recorded supported version before publishing verified Pydantic metadata.

**Gate:** each shipped target consumes Universal Model IR, passes deterministic golden and real compiler/framework fixtures, and has explicit compatibility metadata.

- JSON -> Zod
- Multiple JSON samples as separate input documents
- SQL DDL parser
- JSON Schema input
- OpenAPI input
- GraphQL input
- Prisma input
- SQLAlchemy / GORM / TypeORM targets beyond the prioritized Phase 11 pool
- Project ZIP recipes
- CLI
- VS Code extension
- Account-based or cloud-synced saved presets
- AI explanations
- Paid tier
