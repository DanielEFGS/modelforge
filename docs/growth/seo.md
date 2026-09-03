# SEO Strategy

## Principle

ModelForge should receive search traffic because it genuinely solves distinct developer intents, not because it manufactures hundreds of duplicate pages.

## Rendering

Public SEO content must be statically rendered by Astro.

The interactive workspace hydrates on the client, but title, H1, description, explanatory copy, internal links and structured data exist in initial HTML.

## Initial indexable routes

### `/`
Intent: ModelForge / JSON model generator / schema-to-code positioning.

### `/json-to-typescript`
Intent: JSON to TypeScript interface/type/class.

### `/json-to-java`
Intent: JSON to Java class/POJO/record/Lombok.

### `/json-to-spring-boot`
Intent: JSON to Spring Boot entity/DTO/repository.

### `/json-to-csharp`
Intent: JSON to nullable C# class/record with System.Text.Json mappings.

### `/json-to-python`
Intent: JSON to Python dataclass/Pydantic model.

Potential after support exists:
- `/json-to-zod`
- `/sql-to-java`
- `/sql-to-jpa`
- `/json-schema-to-typescript`

Never publish a route before the actual converter works.

## Landing architecture

Above fold:
- literal intent H1,
- one-sentence value proposition,
- working ModelForge workspace preconfigured to target.

Below workspace:
- what the conversion does,
- inference caveats,
- target/version notes,
- concise how-to,
- examples,
- visible FAQ,
- related converters.

## Titles

Examples:

```text
JSON to TypeScript Generator | ModelForge
JSON to Java Class Generator | ModelForge
JSON to Spring Boot Models | ModelForge
JSON to C# Class and Record Generator | ModelForge
JSON to Python Dataclass and Pydantic Generator | ModelForge
```

Do not append “free online” mechanically if it makes titles look spammy. Test Search Console CTR later.

## Metadata

Every indexed route:
- unique title,
- unique meta description,
- canonical URL,
- Open Graph/Twitter metadata,
- one H1,
- real crawlable internal links.

## Structured data

Use `SoftwareApplication` or `WebApplication` where accurate.

Suggested properties:
- name,
- description,
- applicationCategory=`DeveloperApplication`,
- operatingSystem=`Any`,
- offers price=`0`/currency where required by supported schema.

Do not depend on FAQ rich results. Visible FAQs are useful for users and query coverage, but Google generally does not show FAQ rich results for ordinary developer tool sites.

## Programmatic SEO guardrail

A page is indexable only if all are true:
1. converter target actually exists,
2. route presets create a meaningfully different tool state,
3. explanatory content is target-specific,
4. examples differ meaningfully,
5. canonical is self-referential,
6. page is useful without needing another page to understand the target.

Otherwise keep it as UI state rather than a new URL.

## Content language

English first is recommended for developer reach.

Prepare i18n route structure without launching empty locale mirrors.

When Spanish launches:
- human-quality translation,
- localized metadata,
- `hreflang` en/es,
- localized canonical handling,
- no machine-generated keyword soup.

## Technical SEO

- static sitemap,
- robots.txt,
- correct 404 status/page,
- fast initial HTML,
- stable layout,
- accessible labels,
- no route content hidden behind user interaction,
- hashed static assets,
- no indexing of internal preview/test routes.

## Search Console workflow

After domain launch:
1. Verify domain property.
2. Submit sitemap.
3. Inspect main URLs.
4. Track indexing issues.
5. Review queries by landing page.
6. Use query impressions to decide future converters.

## Content expansion loop

Use actual Search Console data:

```text
impressions without suitable landing
-> verify product capability opportunity
-> build real converter/target
-> publish high-quality landing
-> measure
```

Do not let SEO drive targets that cannot be maintained technically.
