# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro 7 static output with React 19 islands, strict TypeScript, Tailwind CSS 4, and a browser-local compiler packaged separately from the web UI. Netlify is the intended initial deployment platform.

## Users

ModelForge primarily serves frontend, backend, and full-stack developers translating JSON data shapes into TypeScript, Java, Spring Boot, C#, or Python models during day-to-day API and application work. Students and junior developers are also supported through visible, explainable inference.

## Product Purpose

ModelForge turns JSON into production-oriented programming models and framework artifacts. A successful user can paste JSON, inspect and edit the inferred model, choose an exact target profile, and copy or download deterministic output without the source leaving the browser.

## Positioning

ModelForge is a deterministic, inspectable, version-aware model compiler rather than a generic AI code generator. Its Universal Model IR, explicit inference explanations, compatibility profiles, and compile-verified fixtures distinguish it from opaque one-step converters.

## Operating Context

Users arrive either through a converter landing page or direct repeat use, paste representative API JSON, review uncertain or normalized fields, choose language/framework options, and generate one or more source files. The three-area Source / Model / Output workspace is the primary product surface.

## Capabilities and Constraints

- JSON is the only MVP source format.
- TypeScript, Java, version-profile-driven Spring Boot, C# class/record, and Python dataclass/Pydantic targets are supported through the Universal Model IR. Verification status remains target/profile-specific.
- Conversion and inference are deterministic and entirely browser-local; source JSON and generated code are never sent to a server or persisted by default.
- The MVP has no authentication, database, cloud sync, AI assistant, backend conversion endpoint, or paid tier.
- Static SEO routes contain genuine target-specific content, and ads stay outside interaction zones.
- “Verified” is used only when the corresponding compile-fixture suite passes.

## Brand Commitments

ModelForge is a working product name pending brand and domain clearance. The product voice should remain precise, transparent, and developer-oriented. The interface must provide intentional light and dark themes; no additional brand assets or visual constraints are currently committed.

## Evidence on Hand

The repository contains product, architecture, inference, generation, privacy, growth, operations, and release specifications under `docs/`. There are currently no testimonials, customer logos, public usage metrics, or third-party proof assets, and future surfaces must not fabricate them.

## Product Principles

1. Prefer deterministic, explainable behavior over magical inference.
2. Keep user source and generated output private and local.
3. Put the converter workflow ahead of marketing and monetization.
4. Make framework compatibility explicit and evidence-backed.
5. Extend parsers and generators through the Universal Model IR rather than shortcuts.

## Accessibility & Inclusion

The complete happy path must work by keyboard, expose clear focus and screen-reader labels, remain understandable without color alone, support text resizing, and keep primary conversion actions immediately accessible on desktop and mobile.
