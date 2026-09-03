# MVP Scope

## Goal

Prove that developers want a browser-local, inspectable, version-aware model generator before investing in broad schema support or accounts.

## Supported source

### JSON

Accepted:
- object root,
- array root,
- nested objects,
- arrays of objects,
- primitives,
- nulls,
- mixed evidence with diagnostics.

Not accepted as first-class inputs in MVP:
- JSON Schema,
- OpenAPI,
- SQL DDL,
- GraphQL,
- YAML,
- CSV,
- live URLs/API calls.

## TypeScript outputs

- Interface
- Type alias
- Class

Options:
- readonly on/off,
- optional field strategy,
- null strategy,
- Date hint mapping to `string` or `Date`,
- nested model generation,
- root model name,
- model/property naming normalization.

## Java outputs

### Plain Java
- POJO
- record
- Lombok data class

Options where relevant:
- no-args constructor,
- all-args constructor,
- getters,
- setters,
- `toString`,
- `equals/hashCode`,
- Lombok `@Data`, `@Getter/@Setter`, `@Builder`, constructor annotations.

### Spring Boot
Version families:
- Spring Boot 3.5.x
- Spring Boot 4.1.x

Initial artifacts:
- Entity
- DTO
- Spring Data Repository

Explicitly deferred:
- Controller
- Service
- Mapper generation
- full CRUD project ZIP

The architecture must make these easy to add later, but they are not release blockers.

## Intermediate Model editor

Required:
- display inferred models and fields,
- rename model,
- rename target property while preserving source property metadata,
- change inferred scalar type,
- change nullability/optionality,
- inspect semantic hints,
- see diagnostics.

Deferred:
- free-form relationship designer,
- ER diagram,
- database constraints editor.

## Sharing/storage

MVP:
- no account,
- no cloud save,
- no server persistence,
- no “share this JSON” URL,
- preferences may be stored locally.

Source JSON should not be persisted by default. A future opt-in local draft feature may be considered separately.

## Monetization

Advertising is ruled out; see `docs/growth/advertising.md`. The MVP codebase
carries no ad network, no ad script and no reserved ad inventory.

MVP codebase includes:
- consent boundary,
- privacy/legal pages.

Ads do not need to be live on the first private preview. Ad activation is an operational launch step after the product has meaningful content and a stable domain.

## Internationalization

Launch content language recommendation:
- English primary for global developer search demand.
- Architecture must be i18n-ready.
- Spanish is the first additional locale, but translation is not a blocker for the technical MVP.

Do not auto-generate dozens of localized thin pages.

## Explicit non-goals

- AI chatbot
- generalized IDE
- cloud compiler
- code execution sandbox
- database connection manager
- authentication
- collaboration
- billing
- user project storage
- arbitrary framework plugin marketplace

## MVP success criteria

Technical:
- deterministic generation,
- supported fixture projects compile,
- no source data network leakage,
- mobile-accessible UI,
- static SEO pages.

Product:
- users can reach successful output without documentation,
- a new user understands why a type was inferred,
- target/version selection produces meaningful differences where profiles differ.

Growth:
- Search Console begins receiving impressions for target converter queries,
- generation completion event occurs at a healthy rate,
- repeat/direct traffic begins appearing.
