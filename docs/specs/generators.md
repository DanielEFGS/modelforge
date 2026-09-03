# Generator Specification

## General contract

A generator accepts:
- valid Universal Model IR,
- target configuration,
- optional framework profile.

It returns:

```ts
interface GenerationResult {
  files: GeneratedFile[];
  diagnostics: Diagnostic[];
  metadata: GenerationMetadata;
}
```

```ts
interface GeneratedFile {
  path: string;
  language: string;
  content: string;
}
```

Generators must be pure/deterministic where practical.

## Shared rules

- Stable import ordering.
- Stable model ordering.
- Stable newline style (`LF`).
- UTF-8.
- No timestamps in generated content.
- No advertising/branding comments in output by default.
- No network calls.
- Unsupported IR constructs produce diagnostics; never silently coerce dangerous cases.

## TypeScript

### Type mapping

| IR | TS |
|---|---|
| string | string |
| integer | number |
| number | number |
| boolean | boolean |
| model | ModelName |
| array | T[] or Array<T> according to style option |
| unknown | unknown by default |
| union | supported union syntax when valid |

Do not generate `any` by default.

### Optional/null mapping

Required=false -> `?` by default.
Nullable=true -> include `null` according to selected strategy.

Example:

```ts
interface User {
  middleName?: string | null;
}
```

### Date hint

Default: `string`.
Optional setting: datetime/date hint -> `Date`.

The UI must explain this is a mapping preference, not JSON certainty.

### Interface target

One interface per model.
Nested model dependencies may appear before or after root, but order is deterministic.

### Type target

Equivalent type aliases.

### Class target

Properties with explicit types. Constructor generation is optional and must have a clear policy for optional/nullable fields.

## Java core

### Type mapping

Recommended defaults:

| IR | Java |
|---|---|
| string | String |
| integer | Long |
| number | Double |
| boolean | Boolean |
| model | ModelName |
| array | List<T> |
| unknown | Object |

Use boxed types by default because nullable evidence is common in API models.

Expose a later option for primitive types only when non-nullable/required, but do not complicate MVP unless tests are clear.

### Semantic hint mapping

Date/datetime hint options:
- preserve as `String` default,
- date -> `LocalDate`,
- datetime -> `OffsetDateTime` default or user-selected supported policy.

Do not guess timezone-free `LocalDateTime` from offset-bearing data.

### POJO

Options:
- no-args constructor,
- all-args constructor,
- getters,
- setters,
- equals/hashCode,
- toString.

Ordering:
1. package
2. imports
3. class
4. fields
5. constructors
6. accessors
7. utility methods

### Record

Use record components. Unsupported mutability options disappear from UI.

### Lombok

Profiles may enable:
- `@Getter`
- `@Setter`
- `@Data`
- `@Builder`
- `@NoArgsConstructor`
- `@AllArgsConstructor`

Do not emit contradictory combinations without explanation.

## Spring adapter

The Spring adapter takes Java-oriented model generation and adds framework semantics using a version profile.

### Entity

MVP cannot infer a database primary key reliably from arbitrary JSON.

Therefore Entity generation must **not silently annotate a field as `@Id` merely because it is named `id`**.

Recommended UX:
- detect `id` as a candidate and ask/allow the user to mark it as identifier in Model/target options,
- if no ID is selected, generate entity with a warning and no false `@Id`, or require explicit selection before “verified entity” status.

Later SQL input can supply real PK evidence.

Fields may map to JPA columns, but do not invent `length`, `unique` or nullable DB constraints from one JSON sample unless user explicitly requests them.

### DTO

Plain Java DTO; optional validation annotations may be added in a later release.

### Repository

Requires selected entity ID field/type.

Example:

```java
public interface UserRepository extends JpaRepository<User, Long> {
}
```

If no ID selected, Repository generation is disabled with a clear explanation.

## Package naming

Default example package should not pretend to know the user's project domain.

Use configurable package base such as:

```text
com.example.demo
```

and clearly mark it as editable.

Potential generated paths:

```text
src/main/java/com/example/demo/model/User.java
src/main/java/com/example/demo/dto/UserDto.java
src/main/java/com/example/demo/repository/UserRepository.java
```

## Verification

TypeScript fixtures:
- run TypeScript compiler.

Java fixtures:
- compile with configured JDK in CI matrix.

Spring fixtures:
- compile Maven/Gradle fixture projects using target version families.

A generator profile is “verified” only while its fixture project passes.
