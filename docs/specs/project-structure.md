# Project Structure

## Recommended repository

```text
modelforge/
├─ apps/
│  └─ web/
│     ├─ src/
│     │  ├─ components/
│     │  ├─ layouts/
│     │  ├─ pages/
│     │  ├─ content/
│     │  └─ styles/
│     ├─ public/
│     └─ astro.config.*
│
├─ packages/
│  ├─ core/
│  │  ├─ src/ir/
│  │  ├─ src/diagnostics/
│  │  ├─ src/naming/
│  │  └─ src/compatibility/
│  │
│  ├─ parser-json/
│  │  └─ src/
│  │
│  ├─ generator-typescript/
│  │  └─ src/
│  │
│  ├─ generator-java/
│  │  └─ src/
│  │
│  └─ framework-spring/
│     └─ src/
│
├─ fixtures/
│  ├─ input/
│  ├─ expected/
│  ├─ typescript-compile/
│  └─ spring-compile/
│
├─ docs/
├─ AGENTS.md
├─ TASKS.md
├─ PROGRESS.md
├─ pnpm-workspace.yaml
└─ package.json
```

A monorepo is justified because the compiler engine should remain independent from the Astro UI and later can power a CLI/extension without extracting code retroactively.

## Stack

- Node 24 LTS baseline for local/CI unless Astro support requirements are intentionally updated.
- pnpm workspaces.
- Astro 7.x static output.
- React 19.x for interactive components.
- strict TypeScript.
- Tailwind CSS 4.x.
- CodeMirror 6, lazy loaded in workspace.
- Vitest.
- React Testing Library.
- Playwright.

Pin actual installed versions in `package.json` + lockfile. Do not rely on floating `latest` after initial scaffold.

## Astro responsibilities

- prerender routes,
- metadata,
- sitemap,
- legal/content pages,
- page shell,
- load the React ModelForge workspace only where needed.

## React responsibilities

- editor state,
- IR editing,
- target controls,
- compatibility UI,
- generation/results,
- local preferences.

Do not build the entire public site as a client-only SPA.

## Core package boundaries

`core` must not import React/Astro/DOM APIs.

Parsers/generators should be usable in Node tests and later in CLI environments.

Browser UI translates core diagnostics into localized presentation.

## Local storage

Allowed in MVP:
- theme,
- preferred target,
- preferred framework version,
- non-sensitive UX preferences.

Not persisted by default:
- raw source JSON,
- inferred model,
- generated code.

## Build output

Astro static `dist/` can be deployed through Cloudflare Workers Static Assets or the retained Netlify fallback.

No server adapter unless a future feature genuinely requires one and an ADR approves it.
