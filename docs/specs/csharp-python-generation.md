# C# and Python generation

Status: implemented language generators; external runtime verification remains explicit below.

## Architecture

Both targets follow the mandatory compiler path:

```text
JSON -> JSON inference -> Universal Model IR -> language generator
```

Neither generator reparses source JSON or duplicates inference logic.

## C# contract

Styles:

- sealed property `class`,
- sealed property `record`.

Mappings:

| IR | C# |
| --- | --- |
| integer | `long` |
| number | `double` |
| boolean | `bool` |
| string | `string` |
| date hint with .NET date policy | `DateOnly` |
| datetime hint with .NET date policy | `DateTimeOffset` |
| array | `List<T>` |
| model | generated model type |
| unknown/union | `object` with a diagnostic for unions |

Missing or nullable evidence adds `?`. Source JSON names are preserved through `[JsonPropertyName]` when the generated PascalCase property differs. The default namespace is `ModelForge.Generated` and must pass deterministic syntax validation.

The generator metadata deliberately reports `verified: false`: the repository contains a `net8.0`, C# 12, warnings-as-errors fixture, but the current release environment has no .NET SDK. MF-1106 is the gate for changing that flag.

## Python contract

Styles:

- standard-library `@dataclass(slots=True)`,
- Pydantic `BaseModel`.

Mappings:

| IR | Python |
| --- | --- |
| integer | `int` |
| number | `float` |
| boolean | `bool` |
| string | `str` |
| date/datetime hint with datetime policy | `date` / `datetime` |
| array | `list[T]` |
| model | generated model type |
| unknown | `Any` |
| union | `T | U`, falling back to `Any` with a diagnostic only above four variants |

Required-nullable fields use `T | None` without a default. Fields that may be missing use `T | None = None`. Dataclasses retain source aliases in field metadata; Pydantic uses `Field(alias=...)` and `ConfigDict(populate_by_name=True)`. Strict Pydantic mode is an explicit option.

Both fixture styles pass Python syntax compilation. Dataclass output is verified by the available standard-library interpreter. Pydantic output remains unverified until MF-1107 records and executes a supported Pydantic runtime version.

## Determinism and privacy

- Same IR plus options produces byte-equivalent files.
- No timestamps, random identifiers, source transmission, runtime downloads or LLM calls.
- Lossy mappings emit stable diagnostic codes.
- Generated names and code are language-invariant with respect to interface locale.
