# ModelForge — Project Blueprint

This repository is the **development specification** for ModelForge. It is intentionally written so a local coding agent can build the product with minimal ambiguity.

> Working product name: **ModelForge**. Do not purchase a domain or publish under this name until the brand/domain clearance gate in `docs/operations/brand-domain.md` is completed.

## Product in one sentence

ModelForge converts structured data into production-oriented programming models and framework artifacts, locally in the browser, with deterministic output and explicit version compatibility.

## MVP

Input:
- JSON

Outputs:
- TypeScript: interface, type, class
- Java: POJO, record, Lombok class
- Spring Boot: 3.5.x and 4.1.x profiles, JPA Entity, DTO and Repository

Core principle:

```text
JSON -> Parser -> Universal Model IR -> Generator -> Framework Adapter -> Version Profile -> Code
```

## Read first

1. `AGENTS.md` — non-negotiable instructions for coding agents.
2. `docs/product/vision.md` — product definition and positioning.
3. `docs/product/mvp-scope.md` — exact v1 scope and exclusions.
4. `docs/specs/universal-model-ir.md` — the heart of the product.
5. `docs/specs/json-inference.md` — deterministic inference rules.
6. `docs/specs/generators.md` — output generator requirements.
7. `docs/specs/framework-versioning.md` — framework/version architecture.
8. `TASKS.md` — implementation order and acceptance gates.

## Architecture choice

- Astro 7.x, static output
- React 19.x islands for the interactive workspace
- TypeScript strict mode
- Tailwind CSS 4.x for styling
- CodeMirror 6 for code editing, loaded only where needed
- Vitest + Testing Library for unit/component tests
- Playwright for end-to-end testing
- Cloudflare Workers Static Assets for the prepared production path; Netlify remains a portable fallback

The app is **static-first and browser-local**. No database, login, backend, serverless conversion endpoint or paid API is required for the MVP.

## Documentation map

### Product
- `docs/product/vision.md`
- `docs/product/mvp-scope.md`
- `docs/product/ux.md`
- `docs/product/roadmap.md`

### Technical specifications
- `docs/specs/universal-model-ir.md`
- `docs/specs/json-inference.md`
- `docs/specs/generators.md`
- `docs/specs/framework-versioning.md`
- `docs/specs/project-structure.md`
- `docs/specs/security-privacy.md`

### Growth and monetization
- `docs/growth/seo.md`
- `docs/growth/advertising.md`
- `docs/growth/analytics.md`

### Operations
- `docs/operations/cloudflare-workers-deployment.md`
- `docs/operations/netlify-deployment.md`
- `docs/operations/brand-domain.md`
- `docs/operations/legal-checklist.md`

### Quality
- `docs/quality/testing.md`
- `docs/quality/release-gate.md`
- `docs/quality/compatibility-matrix.md`

### Architecture decisions
- `docs/adr/001-static-astro-react.md`
- `docs/adr/002-client-side-processing.md`
- `docs/adr/003-ir-first-codegen.md`
- `docs/adr/004-ads-outside-workspace.md`

### Source review
- `docs/source-review-micro-saas.md` documents what was adopted, adapted or rejected from the supplied `crear-web-micro-saas.zip` guidance.

## Definition of success for the first public release

A developer can land on an indexed route such as `/json-to-typescript`, paste JSON, inspect and edit the inferred model, select a supported target/version, generate deterministic code, copy/download it, and understand exactly what ModelForge inferred — without the source JSON leaving the browser.
