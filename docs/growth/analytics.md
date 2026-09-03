# Analytics Specification

## Goals

Answer:
- Which converter routes attract users?
- Do users successfully generate code?
- Which targets/framework versions are actually used?
- Where do users encounter inference/compatibility problems?
- Do users return?

Without collecting their code/data.

## Recommended tools

Initial:
- Google Search Console for organic search.
- GA4 or another privacy-reviewed web analytics tool for product events.
- AdSense reporting for advertising performance.

Keep an internal analytics facade so provider changes do not leak across components.

## Event schema

### Page/product events

`workspace_loaded`
- route preset
- locale

`parse_result`
- success boolean
- source size bucket
- root kind
- model count bucket
- field count bucket
- diagnostic codes only

`target_changed`
- language
- framework
- version family
- style

`generation_result`
- success boolean
- target
- file count
- diagnostic codes only

`copy_output`
- target
- scope=current/all

`download_output`
- target
- file count

`sample_loaded`
- sample ID only

`model_edit`
- category only: rename/type/nullability/required/hint

## Forbidden analytics fields

Never include:
- raw JSON,
- snippets,
- generated code,
- field names,
- model names,
- email/URL values,
- package names supplied by user,
- full error text if it can interpolate user content.

## Error diagnostics

Track stable internal error codes, not raw exception payloads.

Example:

```text
PARSE_JSON_SYNTAX
TARGET_UNSUPPORTED_UNION
SPRING_ID_REQUIRED
```

## Consent

Do not assume analytics can always run before consent. Implement provider bootstrap according to the final privacy/CMP approach.

Compiler behavior must not depend on analytics loading.

## Search Console KPIs

Per landing page:
- impressions,
- clicks,
- CTR,
- average position,
- query set,
- indexed status.

Use impressions as discovery signal, not proof that a keyword deserves a new thin page.

## Product KPIs

Primary:
- successful generation sessions / workspace sessions,
- repeat visitors/direct sessions,
- target distribution.

Secondary:
- parse error rate,
- compatibility error rate,
- copy/download rate,
- time to first successful generation.

## Advertising KPIs

- page RPM,
- ad viewability where available,
- revenue by device/geo in ad platform,
- product completion before/after ad experiments.

Do not manually instrument ad clicks.
