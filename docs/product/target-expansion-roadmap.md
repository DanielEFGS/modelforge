# Target expansion roadmap

Status: Phase 11 active by owner request. C# and Python language generators are implemented; framework adapters and external runtime verification remain planned.

## Decision

Expand from the Universal Model IR in two layers: language data models first, framework/ORM adapters second. A framework target must never bypass its language generator.

```text
JSON -> inference -> Universal Model IR -> language generator -> framework adapter -> version profile
```

Recommended order:

1. C#/.NET data models (`class` and `record`) using `System.Text.Json`. Implemented; .NET SDK verification pending.
2. Python models (`dataclass` and Pydantic `BaseModel`). Implemented; dataclass syntax verified and Pydantic runtime verification pending.
3. Django models as a version-profiled adapter over the Python mapping.
4. EF Core entities as a version-profiled adapter over the C# mapping.
5. Kotlin data classes with `kotlinx.serialization`.
6. Go structs with `encoding/json` tags.
7. Rust structs with Serde.

## Why this order

| Candidate | Demand signal | IR fit | Main semantic risk | Recommendation |
| --- | --- | --- | --- | --- |
| C#/.NET | Large general/backend ecosystem | Strong: records/classes, nullable reference types, lists and attributes | nullable reference context, numeric widths, framework versioning | First |
| Python/Pydantic | Python adoption grew 7 points in the 2025 Stack Overflow survey; FastAPI also grew strongly | Strong: annotated fields, nested models, lists, aliases and validation | required vs optional vs nullable must remain independent; coercion mode must be explicit | First |
| Django | Common Python ORM target | Medium: deterministic field mapping is practical | database identity, relationships, `blank` vs `null`, string length | After Python base generator |
| EF Core | Natural .NET framework target | Medium: shares C# types | keys, owned/complex types, relationship ownership and provider differences | After C# base generator |
| Kotlin | Concise model syntax and JVM adjacency | Strong: data classes, nullability, lists and serialization annotations | serializer/date policy and Kotlin/JVM compatibility | Second wave |
| Go | Simple output and standard-library JSON support | Strong for structs/tags | missing vs zero value vs null requires pointer/option policy | Second wave |
| Rust/Serde | Excellent explicit optionality and deterministic derives | Strong: structs, `Option`, `Vec`, rename attributes | unions, lifetimes/ownership choices and compile-fixture maintenance | Third wave |

## Proposed target contracts

### C#/.NET

- Styles: `class`, positional `record`, property `record`.
- JSON mapping: `System.Text.Json` and `[JsonPropertyName]` only when normalization changes a name.
- Options: namespace, nullable reference types, collection type, date policy and numeric-width policy.
- Verification: compile golden fixtures against explicitly recorded supported .NET SDK families.
- Later EF Core adapter: explicit entity/key selection and relationship review; do not infer a database schema silently from one JSON sample.

### Python

- Styles: standard-library `@dataclass` and Pydantic `BaseModel`.
- Options: Python version profile, modern `T | None` syntax, alias policy, strict/coercing Pydantic mode and datetime policy.
- Required, missing and nullable evidence remain separate in IR and must map visibly to defaults and `None`.
- Verification: deterministic golden files plus import/type-check fixtures for each supported Python/Pydantic profile.

### Django

- Implement only as `IR -> Python generator -> Django adapter -> Django version profile`.
- Require explicit root entity and identifier choices. Nested JSON objects cannot silently become relations.
- Expose decisions for `CharField` length, `TextField`, `JSONField`, `null`, `blank`, `ForeignKey` and delete behavior.
- Verify with Django system checks and migration-state fixtures for recorded versions.

### Kotlin, Go and Rust

- Kotlin: `data class`, nullable types, `List<T>`, `@Serializable` and `@SerialName`.
- Go: exported struct fields, stable `json` tags, slices and an explicit pointer/optional policy.
- Rust: `Serialize`/`Deserialize`, `Option<T>`, `Vec<T>` and `serde(rename = ...)`.

## Acceptance gate for every new target

- All generation consumes the Universal Model IR.
- Output is byte-equivalent for the same normalized input and options.
- Every lossy or uncertain mapping emits an explainable diagnostic.
- Golden output and an actual compiler/framework fixture pass.
- Version compatibility is isolated in a profile, not scattered conditionals.
- Generation remains entirely in the browser; no source data enters telemetry.
- A unique static converter route is added only after the target is genuinely supported.

## Sources reviewed

- [Stack Overflow 2025 technology survey](https://survey.stackoverflow.co/2025/technology)
- [System.Text.Json overview](https://learn.microsoft.com/en-us/dotnet/standard/serialization/system-text-json/overview)
- [System.Text.Json immutable types and records](https://learn.microsoft.com/en-us/dotnet/standard/serialization/system-text-json/immutability)
- [Pydantic models](https://docs.pydantic.dev/latest/concepts/models/)
- [Python data classes](https://docs.python.org/3/library/dataclasses.html)
- [Django models](https://docs.djangoproject.com/en/6.0/topics/db/models/)
- [Kotlin data classes](https://kotlinlang.org/docs/data-classes.html)
- [Kotlin serialization](https://kotlinlang.org/docs/serialization-get-started.html)
- [Go encoding/json](https://pkg.go.dev/encoding/json)
- [Serde derive](https://serde.rs/derive.html)
