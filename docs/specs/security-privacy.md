# Security and Privacy Specification

## Core privacy promise

ModelForge may state:

> Your input and generated code are processed locally in your browser and are not uploaded to ModelForge servers.

This promise is valid only if the implementation follows this document.

## Data classification

Potentially sensitive:
- pasted JSON,
- property names,
- sample values,
- generated model code,
- package names if user customizes them.

Never send these through telemetry.

## Network boundary

Core parse/inference/generation must require no network request after application assets are loaded.

Third-party requests may exist for:
- analytics after policy/consent setup,
- advertising after policy/consent setup,
- fonts only if intentionally hosted externally (self-hosting preferred),
- error monitoring only if sanitized and explicitly reviewed.

## Telemetry redaction

Events must never contain:
- editor content,
- generated code,
- field/model names,
- user-supplied package names,
- hash of source content if it could be used as a persistent fingerprint.

Allowed examples:
- source kind=`json`,
- source size bucket (`<10KB`, `10-100KB`, etc.),
- model count,
- field count bucket,
- selected target,
- selected framework family,
- success/failure diagnostic code.

## XSS prevention

Generated code is text, not HTML.

- Never inject raw source/generated content with `innerHTML`.
- CodeMirror/text nodes only.
- Escape any visible field name rendered outside code editors.
- Structured data/SEO copy must not include runtime user content.

## No execution

Never `eval`, `new Function`, import user code or execute generated source.

ModelForge generates text; it is not a code sandbox.

## Clipboard

Clipboard write requires explicit user action.

Do not automatically read clipboard on load. A dedicated Paste action may invoke the browser API with permission where supported.

## URL state

Do not serialize raw source JSON or generated code into query strings/hash for sharing in MVP.

Landing route presets may serialize only safe predefined target configuration.

## Local persistence

Do not persist source/code without an explicit future feature and privacy review.

“Clear” must clear current workspace state.

## Ads/analytics isolation

Advertising and analytics modules must be imported/configured outside compiler packages.

Core packages must have zero knowledge of AdSense, GA4 or consent APIs.

## Content Security Policy

A strict CSP is desirable but advertising expands the list of required third-party origins. Do not publish a CSP that silently breaks AdSense/CMP or weaken it to wildcard everything.

Implement CSP after actual analytics/ad vendor choices are known and test it in production preview.

## Dependency security

- lockfile committed,
- automated dependency update PRs optional,
- audit before public release,
- review licenses,
- no dependency executing remote code dynamically for core conversion.

## Generated code disclaimer

Generated code is a starting point and must be reviewed/tested before production use. ModelForge does not claim that an inferred sample represents all real production data constraints.
