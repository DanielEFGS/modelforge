# Product Roadmap

## Release 0.1 — Compiler core

- JSON parser/inference
- Universal Model IR
- TypeScript output
- Java output
- basic workspace

Purpose: prove architecture and generation quality.

## Release 0.2 — Version-aware framework generation

- Spring Boot 3.5.x
- Spring Boot 4.1.x
- JPA Entity
- DTO
- Repository
- Java compatibility validation

Purpose: establish ModelForge differentiation.

## Release 0.3 — Public growth release

- final landing pages
- analytics
- privacy/legal
- ad-ready shell
- Netlify production
- domain
- Search Console
- AdSense application/integration if appropriate

## Release 0.4 — TypeScript ecosystem

Candidates:
- Zod
- NestJS DTO + class-validator
- Angular model/service recipe
- Valibot

Choose based on Search Console demand and user behavior, not completeness for its own sake.

## Release 0.5 — SQL / database source

- SQL DDL parser
- PK/FK/unique/nullability/length/default interpretation
- relation IR
- SQL -> JPA
- SQL -> Prisma
- SQL -> TypeORM

This is the first major expansion of the IR.

## Release 0.6 — Schema/API inputs

Candidates:
- JSON Schema
- OpenAPI
- GraphQL
- Prisma schema

## Release 1.x — Workflow products

- Recipes that output coordinated multi-file bundles
- custom templates
- local presets
- CLI
- VS Code extension

## Paid features — only after demand

Potential:
- no ads,
- advanced bundle generation,
- batch inputs,
- custom templates,
- saved local/team presets,
- CLI automation.

Do not introduce subscriptions merely because the architecture can support them. First prove repeat usage.
