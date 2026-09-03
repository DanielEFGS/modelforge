# Testing Strategy

## Testing pyramid

### Unit — highest volume

Core:
- IR validation
- naming
- inference merge rules
- semantic hint recognizers
- compatibility engine
- target mappings

### Golden/snapshot generator tests

Every supported target has stable input fixtures and expected generated files.

Do not blindly update snapshots. Review diffs.

### Compile tests

Generated code should compile where practical.

TypeScript:
- build fixture with supported compiler baseline.

Java:
- compile POJO/record/Lombok fixtures.

Spring:
- Maven compile fixture for each verified Spring Boot family.

C#:
- exact golden generation tests,
- a pinned `net8.0`/C# 12 project fixture,
- verified status remains false until the fixture passes with a recorded .NET SDK.

Python:
- exact dataclass/Pydantic golden tests,
- syntax-compile both fixture styles with the recorded Python interpreter,
- execute Pydantic import/validation fixtures before publishing a verified Pydantic profile.

### Component tests

Workspace:
- invalid JSON diagnostic,
- target selection,
- model edit,
- compatibility error,
- generated file tabs,
- copy actions.

### E2E

Playwright:
- home load,
- `/json-to-typescript` happy path,
- `/json-to-java` happy path,
- `/json-to-spring-boot` compatible path,
- `/json-to-csharp` class/record path,
- `/json-to-python` dataclass/Pydantic path,
- incompatible Java selection,
- mobile tabs,
- no unexpected network payload containing sample sentinel.

## Privacy leakage test

Use a unique sentinel in source:

```text
MODEL_FORGE_PRIVATE_SENTINEL_92741
```

During E2E, inspect outbound request bodies/URLs/headers and assert sentinel never leaves the page.

This is critical once analytics/ads exist.

## Determinism test

Run same generation twice and compare exact content.

No timestamps/random IDs in generated text.

## Fuzz/property tests

Useful for parser/inference later:
- random valid JSON values,
- weird property names,
- nested arrays,
- null-heavy inputs.

Ensure no crashes and IR invariants hold.

## Cross-browser

At minimum before public release:
- latest Chromium,
- Firefox,
- Safari/WebKit via Playwright + a real Safari spot check where possible.

## Accessibility

Automated axe checks are helpful but not sufficient.

Manual:
- keyboard-only path,
- focus visibility,
- screen-reader labels,
- mobile zoom/text resize.

## Performance

Measure:
- initial route JS,
- editor lazy-load cost,
- interaction responsiveness for representative JSON sizes,
- Core Web Vitals after ads are enabled.

The compiler should not freeze the main thread on moderately large input. Add worker offloading later if profiling shows it is necessary; do not add complexity preemptively.
