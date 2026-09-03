# Compatibility Matrix

This file is operational data for humans. The application should keep equivalent machine-readable profiles in source.

## Current initial targets

| Target | Family | Verified reference | Runtime language range | Status at blueprint creation |
|---|---|---:|---|---|
| TypeScript | plain | project-pinned compiler | project baseline | planned |
| Java | plain | project fixture JDKs | 17/21+ as configured | planned |
| Spring Boot | 3.5.x | 3.5.16 | Java 17–25 | blueprint researched |
| Spring Boot | 4.1.x | 4.1.1 | Java 17–26 | blueprint researched |

## Meaning

`blueprint researched` means official system requirements were reviewed while writing documentation. It does **not** mean ModelForge generated fixtures already compile.

Only change to `verified` after compile fixtures pass in the actual repo.

## Required test matrix for Spring MVP

At minimum:

### Boot 3.5.x
- Java 17
- Java 21
- one newer supported JDK used in CI if readily available

### Boot 4.1.x
- Java 17
- Java 21
- one newer supported JDK used in CI if readily available

Avoid exploding CI matrix to every supported patch/JDK until traffic justifies it.
