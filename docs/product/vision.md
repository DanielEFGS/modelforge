# Product Vision

## Problem

Developers repeatedly translate the same data shape between representations:

- API JSON response -> TypeScript interfaces
- JSON -> Java DTO/model
- data model -> persistence entity
- schema -> framework-specific files

Existing converters often stop at “generate a class”. Framework scaffolding tools are powerful but usually require installation, project access or database connectivity. ModelForge aims to occupy the middle ground: immediate web access, explicit inference, version-aware output and no upload of source data.

## Positioning

**ModelForge is a deterministic, version-aware model compiler for developers.**

Primary promise:

> Paste structured data. Inspect the inferred model. Generate code for the exact language/framework version you use.

Supporting promise:

> Your source data stays in your browser.

## Target users

Primary:
- frontend developers consuming REST APIs,
- backend developers creating DTOs/entities,
- full-stack developers moving data models between layers,
- students/junior developers who want generated code plus transparent inference.

Secondary later:
- architects generating project model bundles,
- teams with custom templates,
- API/schema designers.

## Product principles

1. **Deterministic over magical.** Normal conversion is parser/codegen logic, not an LLM.
2. **Inspectable.** The user can see and edit the inferred model before generation.
3. **Version-aware.** Framework output declares the target family and verification date.
4. **Local-first.** Source data stays on-device by default.
5. **Fast first use.** No login wall for basic generation.
6. **Search-accessible.** Each genuine converter has a statically rendered landing route.
7. **Ads must not damage the tool.** Monetization surrounds the experience rather than interrupting it.
8. **Extensible compiler architecture.** Every new parser and every new generator should multiply useful combinations through the IR.

## Competitive differentiation

ModelForge should not compete merely on “number of languages”. Its durable differentiation is the combination of:

- editable intermediate model,
- deterministic inference explanations,
- framework/version profiles,
- compatibility checks,
- generation of multiple related artifacts,
- client-side privacy,
- verified fixtures for claimed framework targets.

## North-star behavior

The strongest success signal is not only Google traffic. It is repeat direct usage:

> A developer discovers ModelForge through a search, uses it successfully, then returns directly when another API/schema needs conversion.

## Business model

Initial:
- free tool,
- non-invasive advertising,
- no account required.

Potential later:
- ad-free Pro,
- advanced framework bundles,
- batch generation,
- custom templates/presets,
- CLI/team tooling.

The free deterministic converter must remain genuinely useful even if paid features are added later.
