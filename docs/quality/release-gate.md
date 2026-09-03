# Release Gate

A production release is blocked until all applicable items pass.

## Product

- [ ] JSON -> TypeScript works end to end.
- [ ] JSON -> Java works end to end.
- [ ] Supported Spring profiles work end to end.
- [ ] Model inspector explains uncertain inference.
- [ ] No dead/placeholder action in a claimed supported target.

## Correctness

- [ ] Unit suite green.
- [ ] Golden fixture suite reviewed/green.
- [ ] TypeScript compile fixtures green.
- [ ] Java compile fixtures green.
- [ ] Spring profile compile fixtures green.
- [ ] Determinism tests green.

## Privacy/security

- [ ] Source/code sentinel does not leak into network traffic.
- [ ] No eval/code execution.
- [ ] No raw content in analytics.
- [ ] Dependency audit reviewed.
- [ ] Privacy claims match actual implementation.

## UX

- [ ] Desktop workspace usable without scrolling to reach primary action.
- [ ] Mobile tab flow works.
- [ ] Keyboard-only happy path works.
- [ ] Diagnostics readable without color dependence.
- [ ] Clear/reset works.
- [ ] Copy/download feedback works.

## Advertising

- [ ] No ad near interaction controls.
- [ ] Empty ad slots do not damage layout.
- [ ] Live ad preview reviewed on desktop/mobile if enabled.
- [ ] No accidental-click-style layout.
- [ ] CMP/consent requirements implemented where applicable.

## SEO

- [ ] Main converter routes return 200.
- [ ] Initial HTML contains unique title/H1/copy.
- [ ] Canonicals correct.
- [ ] Sitemap contains only valid public routes.
- [ ] robots.txt correct.
- [ ] Structured data validates.
- [ ] No thin target pages indexed.

## Performance

- [ ] Editor/codegen heavy modules lazy where appropriate.
- [ ] No major layout shifts from ad placeholders.
- [ ] No blocking third-party scripts before consent/config requires them.
- [ ] Representative input remains responsive.

## Operations

- [x] Selected hosting provider production build green.
- [x] Cloudflare Workers dry run green when Cloudflare is selected.
- [x] Custom domain HTTPS green if domain stage reached.
- [ ] Apex/www canonical redirect correct.
- [ ] Search Console checklist completed.
- [ ] Analytics production property configured.
- [ ] `ads.txt` correct if AdSense enabled.
- [ ] Brand/domain gate completed before public brand commitment.
