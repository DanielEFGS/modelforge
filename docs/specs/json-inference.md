# JSON Inference Specification

## Objective

Turn JSON evidence into the Universal Model IR without pretending that a sample contains more certainty than it actually does.

## Parse stage

1. Preserve source text in the editor only.
2. Parse JSON.
3. On syntax failure, return a parse diagnostic with location when available.
4. Do not run code, evaluate expressions or accept JavaScript object syntax in MVP.

## Scalar rules

| JSON value | IR |
|---|---|
| string | string |
| integer-valued number | integer |
| non-integer number | number |
| boolean | boolean |
| null | null evidence / unknown until merged |

### Integer vs number

`1` -> integer.
`1.2` -> number.

When evidence mixes integer and number, widen to number.

## String semantic hints

Run conservative recognizers after establishing `string`.

Hints:
- RFC3339/ISO-like datetime
- ISO-like date
- email-like
- http/https URL
- UUID canonical pattern

Rules:
- hints never change raw scalar type,
- a hint must be visible/editable,
- conflicting samples reduce/remove confidence,
- do not classify arbitrary numeric strings as numbers.

## Object rules

Each object shape produces a model candidate.

For a single JSON object:
- every present property is required initially,
- a property whose value is null is nullable but type may remain unknown.

For multiple objects observed in an array:
- union the property names,
- a property absent from any observed object becomes not-required,
- null observations set `nullable=true`,
- merge type evidence.

## Arrays

### Empty array

```json
{"items": []}
```

IR:
- array element = unknown(`empty-array`)
- warning diagnostic.

Never default to `string[]` or `any[]` silently.

### Homogeneous primitives

```json
[1,2,3]
```

-> integer[]

### Integer + number

```json
[1,2.5]
```

-> number[]

### Objects

Merge object evidence recursively.

### Mixed incompatible primitives

```json
[1,"x"]
```

Represent a union if enabled in IR, with warning. Target generators decide whether they support it.

### Null within array

```json
[1,null,2]
```

Element has integer type plus nullable evidence.

## Model naming

Nested source path:

```json
{
  "user": {
    "address": {"city":"Santiago"}
  }
}
```

Suggested models:
- Root
- User
- Address

Plural array key:

```json
{"users":[{"id":1}]}
```

Suggested item model `User`, but singularization must be conservative and overridable.

Do not implement an aggressive linguistic inflector for MVP. Support common ASCII English plural cases and fall back safely.

## Identifier normalization

Target-neutral suggested identifier should preserve semantics while removing invalid punctuation.

Examples:

```text
first-name -> firstName
first_name -> firstName
First Name -> firstName
123value -> value123 or _123value according to target adapter policy
class -> class (IR), target generator handles reserved word
```

Important: target-language reserved words are handled by generators, not core normalization.

## Collisions

Input:

```json
{
  "first-name": "A",
  "first_name": "B"
}
```

Both may normalize to `firstName`.

Required behavior:
- preserve both source fields,
- emit collision diagnostic,
- assign deterministic temporary generated names (`firstName`, `firstName2`) or require user resolution,
- never drop one field.

## Nullability vs required

These concepts are independent.

```json
[
  {"middleName": null},
  {}
]
```

`middleName`:
- required = false
- nullable = true

Generators map this according to target language/profile.

## Recursive/cyclic structures

JSON values themselves cannot contain runtime object cycles, so parser recursion is finite. Extremely deep input must be protected by a depth/size safeguard to avoid browser lockups.

MVP soft limits should be measured and documented rather than arbitrary marketing claims.

## Size protection

Provide a configurable source-size warning before parsing very large text. Do not reject modest API payloads unnecessarily.

Suggested initial warning threshold: 2 MB text; hard safety threshold to be established through performance testing.

## Determinism

Field ordering should follow source encounter order for readability unless user explicitly sorts.

Model generation ordering must be deterministic.

The same JSON + same root name + same inference settings must produce the same IR serialization.
