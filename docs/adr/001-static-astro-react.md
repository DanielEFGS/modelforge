# ADR-001 — Astro Static Shell + React Workspace

## Status
Accepted for MVP.

## Decision
Use Astro static rendering for public pages and React islands for the interactive ModelForge workspace.

## Rationale

ModelForge needs both:
- a rich editor-like developer UI,
- indexable converter landing pages.

A client-only SPA would make SEO and initial content less robust. A fully server-rendered application would add unnecessary infrastructure because conversion is local.

Astro provides static prerendering and selective hydration. React provides an appropriate component/state model for the workspace.

## Consequences

Positive:
- HTML-first SEO,
- Netlify static deployment,
- less JavaScript on content/legal routes,
- existing React ecosystem for editors.

Costs:
- two rendering mental models,
- hydration boundaries need care.

## Rejected alternatives

### Vanilla HTML/JS only
Too restrictive for a growing compiler/workspace product and contrary to maintainability goals.

### React SPA + Vite only
Technically possible, but requires extra prerender/SSR strategy for robust SEO routes.

### Next.js server application
More runtime/server complexity than MVP requires.
