## Outcome

Describe the completed user-visible or compiler behavior.

## Task and scope

- Task ID:
- Active phase:
- Deferred work intentionally left out:

## Correctness

- [ ] Parser/generator behavior remains deterministic.
- [ ] All source formats still compile through the Universal Model IR.
- [ ] Framework version behavior lives in profiles/adapters.
- [ ] Diagnostics explain non-trivial inference or compatibility decisions.
- [ ] Golden or compile fixtures were added where applicable.

## Privacy and product

- [ ] Source JSON and generated code stay browser-local.
- [ ] No sensitive data was added to telemetry or logs.
- [ ] No backend, auth, database, cloud storage, or AI conversion was introduced.
- [ ] Ads remain outside the workspace and interaction controls.

## Verification

- [ ] `pnpm lint`
- [ ] `pnpm typecheck`
- [ ] `pnpm test`
- [ ] `pnpm build`
- [ ] `pnpm test:e2e` when UI or routing changed
- [ ] `PROGRESS.md` updated
