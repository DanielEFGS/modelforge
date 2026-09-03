# ADR-003 — IR-First Compiler Architecture

## Status
Accepted.

## Decision
Every source parser emits Universal Model IR; every output generator consumes IR.

## Rationale
If N parsers directly implement M generators, maintenance tends toward N×M bespoke converters. IR changes this toward N parser implementations + M generator implementations plus carefully scoped adapters.

This is the architectural moat enabling later JSON, SQL, OpenAPI and schema inputs to reuse targets.

## Consequences
- IR design must be rigorous before UI shortcuts,
- source uncertainty must survive into IR,
- target-specific assumptions cannot contaminate core.
