# ADR-002 — Browser-Local Core Processing

## Status
Accepted.

## Decision
Parsing, inference and code generation run locally in browser code distributed as static assets.

## Rationale
- source JSON may contain sensitive business/API data,
- conversion does not require server compute,
- zero per-generation infrastructure cost,
- stronger privacy positioning,
- static hosting portability.

## Consequences
- no server history/accounts in MVP,
- browser memory/performance limits must be handled honestly,
- analytics must be deliberately separated from source content.

## Future exception process
Any feature requiring server processing must receive a new ADR and cannot silently weaken the local-processing promise for existing converters.
