# Framework Versioning Specification

## Why versioning is a product feature

Framework generation must describe what ecosystem it targets. “Spring Boot code” is too vague because supported Java ranges, dependency baselines and APIs evolve.

ModelForge therefore treats framework versions as explicit compatibility profiles.

## Version model

Do not support every patch as a separate user target.

Expose version families that matter to generated code:

```text
Spring Boot 3.5.x
Spring Boot 4.1.x
```

Each profile stores a current verified patch:

```ts
interface FrameworkProfile {
  framework: 'spring-boot';
  family: '3.5' | '4.1';
  verifiedVersion: string;
  lastVerifiedOn: string;
  compatibility: CompatibilityRules;
  capabilities: CapabilityFlags;
}
```

Initial research baseline (August 2026):

### Spring Boot 3.5.x
- verified reference when docs were prepared: 3.5.16
- Java minimum: 17
- Java compatibility: through 25
- Spring Framework: 6.2.x baseline
- Tomcat: 10.1.x family

### Spring Boot 4.1.x
- verified reference when docs were prepared: 4.1.1
- Java minimum: 17
- Java compatibility: through 26
- Spring Framework: 7.0.x baseline
- Tomcat: 11.0.x family

The agent must re-check official framework documentation before changing these profile facts.

## File structure

Suggested:

```text
packages/core/src/targets/java/
packages/core/src/frameworks/spring-boot/
  common/
  profiles/
    3.5.ts
    4.1.ts
  entity/
  dto/
  repository/
```

`common` contains behavior genuinely shared across supported profiles.

Profiles contain:
- compatibility ranges,
- artifact/dependency coordinates where relevant,
- supported capabilities,
- migration/deprecation switches,
- verification metadata.

## Compatibility engine

Inputs:
- framework family,
- language/runtime version,
- selected feature set.

Output:

```ts
interface CompatibilityResult {
  status: 'compatible' | 'warning' | 'incompatible';
  diagnostics: Diagnostic[];
  recommended?: Partial<TargetConfiguration>;
}
```

Generation should be blocked only for truly incompatible configurations. Warnings remain possible for unverified combinations.

## Verification status

UI statuses:

- **Verified** — fixture compilation passes against current recorded patch.
- **Compatible** — profile rules say valid but exact combination is not in the full fixture matrix.
- **Unverified** — code may generate but ModelForge does not claim compatibility.
- **Incompatible** — known invalid combination.

Do not use green “Verified” merely because output looks syntactically plausible.

## Profile updates

Scheduled maintenance process:

1. Check official framework release/system requirements.
2. Update `verifiedVersion` and compatibility metadata.
3. Run compile fixtures.
4. Inspect generated diffs.
5. Update changelog.
6. Only then move the “last verified” date.

## SEO and versions

Do not immediately create separate indexed pages for every patch/family.

Initial `/json-to-spring-boot` landing can expose supported families in the tool.

Version-specific pages should be created only when:
- there is real search demand,
- content materially differs,
- the target remains supported.

This avoids thin duplicate SEO pages.

## Future migration mode

The profile architecture should permit a later feature:

```text
Spring Boot 3.x -> 4.x migration analysis
```

But migration is not in MVP and must not distort the initial IR/codegen design.
