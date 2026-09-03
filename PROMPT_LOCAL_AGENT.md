# Prompt for the Local Coding Agent

You are implementing **ModelForge** from an empty repository.

Before writing code, read in this order:

1. `AGENTS.md`
2. `README.md`
3. `TASKS.md`
4. `docs/product/vision.md`
5. `docs/product/mvp-scope.md`
6. `docs/specs/universal-model-ir.md`
7. `docs/specs/json-inference.md`
8. `docs/specs/generators.md`
9. `docs/specs/framework-versioning.md`
10. `docs/specs/project-structure.md`
11. `docs/quality/testing.md`
12. `docs/quality/release-gate.md`

Then implement `TASKS.md` sequentially.

## Working method

- Do not ask for routine technical decisions already specified in the docs.
- Do not skip ahead to features outside the active phase.
- Keep core parser/generator packages independent from the web UI.
- Use deterministic implementations, never an LLM/API for conversion.
- Add tests alongside each capability.
- Run the required quality commands after each task/phase.
- Update `PROGRESS.md` continuously.
- If a spec is ambiguous, choose the smallest implementation consistent with product principles and document the decision in `PROGRESS.md` or a new ADR when architectural.
- Never silently change product scope.

## Completion target

Continue until all MVP phases in `TASKS.md` through Phase 9 are complete or an external credential/action blocks progress (for example buying a domain, logging into Netlify, enabling AdSense/Search Console). In that case, complete everything that can be done locally, document the exact remaining external steps, and leave the repo in a passing state.

## Important product constraints

- Source JSON and generated code remain local in browser.
- Static SEO routes are real prerendered pages.
- Ads are outside the interactive workspace.
- Spring output is version-profile-driven.
- A target is called “verified” only after compile fixtures pass.
- No backend/auth/database is part of the MVP.

Start with MF-001.
