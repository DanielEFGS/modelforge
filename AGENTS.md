# AGENTS.md — Mandatory Development Instructions

These instructions are authoritative for any coding agent working on ModelForge.

## 1. Product rule

ModelForge is not a generic AI code generator. It is a **deterministic model/schema compiler**. The same normalized input + the same target options must produce byte-equivalent generated text unless a generator version intentionally changes.

Do not use an LLM/API to implement normal conversion or inference.

## 2. Privacy rule

Never transmit user source JSON, inferred model data, generated code, field names or pasted content to a server, analytics platform, ad platform or logging service.

The MVP conversion pipeline must run entirely in the browser.

Analytics may include only coarse metadata described in `docs/growth/analytics.md`.

## 3. Architecture rule

All source formats must compile into the Universal Model IR before generation.

Forbidden shortcut:

```text
JSON -> direct Spring template
```

Required:

```text
JSON -> JSON parser/inference -> IR -> Java generator -> Spring adapter -> version profile
```

Do not duplicate transformation logic between targets.

## 4. Framework versioning rule

Never scatter raw version checks throughout generator code.

Forbidden:

```ts
if (springVersion === '4.1') { ... }
```

outside the Spring adapter/profile layer.

Version compatibility belongs in explicit version profiles. See `docs/specs/framework-versioning.md`.

## 5. Scope discipline

Build only features in the active phase in `TASKS.md`.

Do not add authentication, databases, cloud sync, AI assistants, OpenAPI, SQL parsing, GraphQL, CLI, VS Code extension or paid plans during the MVP unless the task file has been intentionally updated.

## 6. No silent inference

Every non-trivial inference must be explainable in the UI and represented in IR metadata/diagnostics where relevant.

Examples:
- ISO-like string detected as a date candidate: semantic hint, not irreversible conversion.
- `null`: does not by itself establish a concrete type.
- empty array: element type is unknown until additional evidence exists.

## 7. Output correctness

Generated output must be tested with golden fixtures/snapshots.

For framework targets, maintain metadata indicating the version family and last verified release.

A target cannot be presented as “verified” unless its fixture suite passes.

## 8. UX rule

The converter is the primary content. It must be usable without scrolling on a normal desktop viewport and remain immediately accessible on mobile.

Do not put advertising inside the three-panel workspace or adjacent to Generate, Copy, Download, selector controls or editor interaction zones.

## 9. SEO rule

SEO landing pages are statically rendered. Do not create thin or near-duplicate programmatic pages merely to multiply keywords.

Every indexed converter route must correspond to a real supported target and contain unique, useful explanatory content.

## 10. Dependency rule

- Pin exact versions in the lockfile.
- Prefer permissive licenses.
- Document any non-MIT/BSD/Apache dependency before adding it.
- Do not introduce a network-dependent runtime library for core generation.
- Do not add a library if a small deterministic implementation is safer and maintainable.

## 11. Quality gate

Before finishing a phase:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

For phases affecting the UI or routing:

```bash
pnpm test:e2e
```

No phase is complete with failing checks.

## 12. Agent progress

Keep `PROGRESS.md` updated with:
- completed task IDs,
- test status,
- decisions made,
- known limitations,
- next task.

Do not hide failures. Record them and fix them before moving on.

## 13. Git discipline

Prefer one coherent commit per completed task/phase. Suggested format:

```text
feat(ir): implement scalar and object inference
feat(ts): add interface generator
feat(java): add pojo generator
feat(spring): add boot 4.1 compatibility profile
```

Do not commit secrets, `.env` values, Netlify tokens or analytics credentials.

## 14. Completion rule

“Done” means the acceptance criteria in the relevant spec and `docs/quality/release-gate.md` are met. Visual resemblance alone is not completion.
