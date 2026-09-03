# Auditoría SEO integral de ModelForge

Fecha: 2026-08-31  
Alcance: build estático local, código fuente, contenido, metadata, schema, sitemap, rendimiento de laboratorio, experiencia visual, SEO internacional y preparación para búsquedas con IA.  
Estado: preproducción; no existe un dominio público verificable.

## Resumen ejecutivo

ModelForge tiene una base SEO mejor que la habitual para una herramienta aún no desplegada: las páginas son estáticas, cada conversor tiene una ruta real, la herramienta funciona sobre el primer viewport, el contenido principal existe en el HTML inicial y el procesamiento sigue siendo local. La arquitectura de producto —un compilador determinista con IR inspeccionable— es además un diferencial defendible.

El puntaje preproducción es **74/100**. No es una medición de posicionamiento ni tráfico; representa la preparación técnica y editorial observada.

El lanzamiento indexable está bloqueado por un problema crítico: si no se define `PUBLIC_SITE_URL`, canonical, Open Graph, robots y sitemap se generan con `https://modelforge.example`. También deben unificarse las variantes con y sin barra final y definirse el host canónico (`www` o apex).

La traducción actual mejora la UX, pero no crea SEO multilingüe: el HTML estático, metadata y schema nacen en inglés y se traducen después en el navegador. Esto es correcto si el lanzamiento indexable será solo en inglés. Para posicionar los ocho idiomas se necesitan URLs estáticas independientes y `hreflang`; Google recomienda URLs diferentes para cada versión lingüística y advierte que depender de cookies o del idioma del navegador dificulta el rastreo ([Google: sitios multilingües](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)).

## Puntajes

| Dimensión | Peso | Puntaje | Lectura |
|---|---:|---:|---|
| SEO técnico | 22% | 73 | Buena base estática; dominio y normalización de URL bloquean publicación |
| Contenido | 23% | 65 | Útil y honesto, pero cada landing explica poco su ecosistema |
| On-page y SXO | 20% | 76 | Metadata única y herramienta arriba; H1 no visible y propuesta diferencial enterrada |
| Datos estructurados | 10% | 82 | JSON-LD válido y conservador; identidad y relaciones incompletas |
| Rendimiento | 10% | 90 | Métricas locales buenas; carga JS optimizable |
| Preparación para IA/GEO | 10% | 61 | HTML accesible; baja autoridad, citabilidad y documentación pública |
| Imágenes | 5% | 82 | Assets livianos; tarjeta social SVG poco robusta |
| **Total ponderado** | **100%** | **74** | **Buena base, aún no publicable como dominio canónico** |

Los puntajes son una rúbrica diagnóstica, no un puntaje oficial de Google ni Lighthouse.

## Hallazgos prioritarios

### P0 — Bloqueos de lanzamiento

#### 1. Dominio reservado en el build

`apps/web/astro.config.mjs:9` usa `https://modelforge.example` como fallback. El valor llega a:

- canonical y `og:url` en `apps/web/src/layouts/BaseLayout.astro`;
- sitemap generado;
- `robots.txt` en `apps/web/src/pages/robots.txt.ts`;
- `og:image` y `twitter:image` absolutos.

El artefacto auditado confirma diez URLs y todos los canonical con ese host. Antes del deploy se debe definir `PUBLIC_SITE_URL=https://dominio-final` y hacer fallar un build de producción que conserve el placeholder.

#### 2. Canonical y sitemap no normalizan igual la barra final

Los canonical usan rutas como `/json-to-typescript`; el sitemap emite `/json-to-typescript/`. En desarrollo ambas variantes responden `200`. Google considera canonical, redirects y sitemap como señales de canonicalización, por lo que deben apuntar a la misma URL ([Google: consolidar URLs duplicadas](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls), [Google: sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)).

Hay que elegir una política explícita (`always` o `never`), alinear enlaces internos, canonical y sitemap, y confirmar una sola redirección 301 en Netlify.

#### 3. Falta host canónico de producción

No hay una regla de redirección apex ↔ `www`. La decisión depende del dominio final, pero debe resolverse antes de indexar. También deben comprobarse DNS, HTTPS, headers reales y previews de Netlify.

#### 4. Identidad y contacto aún provisionales

Privacidad, Cookies, Términos y aviso de código existen, lo cual es positivo, pero todavía falta una entidad o responsable público, contacto, About, repositorio/documentación pública si corresponde y revisión legal final. Esto es especialmente importante antes de analytics y anuncios.

### P1 — Alto impacto después de cerrar el dominio

#### 5. La app soporta ocho idiomas de interfaz, no ocho sitios indexables

El documento estático nace con `lang="en"`; JavaScript resuelve `en`, `es`, `pt-BR`, `de`, `ru`, `zh-CN`, `ja` y `ko` mediante navegador o preferencia local. No existen rutas localizadas, metadata localizada ni `hreflang`.

Decisión recomendada:

1. Lanzar primero las rutas inglesas actuales.
2. Publicar después `/es/...` y otros idiomas solo cuando cada página tenga traducción humana y contenido útil.
3. Generar para cada variante: `lang`, title, description, H1, canonical, Open Graph, JSON-LD e `hreflang` recíproco con `x-default`.

No conviene crear de una vez 48 páginas casi idénticas. Cada URL indexable debe aportar contenido localizado real y corresponder a un conversor soportado.

#### 6. Contenido específico insuficiente

Cada landing tiene aproximadamente 99–124 palabras explicativas específicas. El workspace eleva el texto total, pero gran parte se repite. No existe un mínimo de palabras exigido por Google; el problema es que todavía no responde de manera completa las dudas propias de TypeScript, Java, Spring, C# o Python ([Google: contenido útil](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)).

Cada conversor debería añadir:

- uso en tres o cuatro pasos;
- un ejemplo breve de entrada y salida;
- tabla de mapeo de tipos;
- explicación de `optional`, `nullable`, `unknown` y límites de inferir desde una muestra;
- opciones y combinaciones compatibles;
- compatibilidad/versiones verificadas;
- enlaces a documentación oficial relevante.

Esto debe ser contenido específico, no bloques genéricos duplicados para multiplicar keywords.

#### 7. El H1 está oculto visualmente

Todas las rutas tienen un solo H1, único y disponible en HTML, pero usa `.sr-only`. No es una penalización automática, aunque reduce la correspondencia entre el resultado buscado y lo primero que ve la persona. Google recomienda títulos principales descriptivos y prominentes ([Google: title links](https://developers.google.com/search/docs/appearance/title-link)).

Se recomienda un H1 compacto y visible encima de los controles, sin recuperar una franja grande ni desplazar el conversor fuera del primer viewport.

#### 8. La entidad de schema es correcta, pero débil

Las seis páginas principales incluyen JSON-LD `WebApplication` válido con nombre, descripción, categoría, sistema operativo y oferta gratuita. JSON-LD es el formato recomendado, aunque ningún marcado garantiza rich results ([Google: políticas de datos estructurados](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)).

Mejoras seguras:

- `url` y `@id` estables;
- nombre específico por conversor;
- `featureList` y `browserRequirements` cuando sean visibles y verdaderos;
- entidad global `WebSite`;
- `Organization`/`creator` solo cuando exista una identidad pública verificable;
- `logo`, `sameAs` e `inLanguage` cuando correspondan.

No añadir ratings, reviews ni estadísticas inexistentes. Puede evaluarse `SoftwareApplication` siguiendo los campos soportados por Google ([Google: SoftwareApplication](https://developers.google.com/search/docs/appearance/structured-data/software-app)).

#### 9. El diferencial no está suficientemente documentado

La ventaja competitiva —IR universal, inferencias explicables, resultados deterministas, procesamiento local y fixtures verificados— aparece en textos breves y dispersos. Falta una página pública de metodología que explique:

- qué infiere ModelForge;
- qué no puede inferir;
- cómo representa optionalidad/nulabilidad;
- cómo se verifican generadores y perfiles;
- qué significa salida byte-equivalente;
- matriz de compatibilidad y fecha de verificación.

Esta página mejoraría confianza, enlaces internos y citabilidad por buscadores y agentes sin inventar autoridad.

### P2 — Mejoras recomendadas

#### 10. Política de crawlers de IA

El wildcard actual permite todo. OpenAI separa `OAI-SearchBot` —aparición en búsqueda— de `GPTBot` —entrenamiento—, por lo que la política puede expresarse por separado ([OpenAI: bots](https://developers.openai.com/api/docs/bots)). La decisión es de producto; no se debe bloquear `OAI-SearchBot` si se busca aparecer en ChatGPT Search.

`llms.txt` no existe. Puede añadirse más adelante como recurso experimental para describir rutas canónicas, capacidades y limitaciones, pero no es un factor de ranking ni una garantía de inclusión.

#### 11. Social preview en SVG

`og:image` y `twitter:image` apuntan a `social-card.svg`. Aunque es liviano y mide 1200×630, conviene publicar una versión PNG 1200×630 para mayor compatibilidad y declarar tipo, ancho, alto y texto alternativo. Mantener el SVG como fuente editable es razonable.

#### 12. JavaScript inicial optimizable

La carga inicial medida es de 236 KB transferidos, 216 KB de JavaScript comprimido y 649 KB decodificado en diez chunks. `ModelForgeWorkspace` importa todos los generadores al inicio y CodeMirror inicia sus imports dinámicos al montar.

La optimización con más potencial es cargar generadores según el destino seleccionado y diferir módulos que no sean necesarios para la primera interacción, preservando el pipeline local y determinista.

#### 13. Legibilidad y tactilidad

Se detectaron textos operativos de 8.96–10 px y controles principales de 32–42 px. Aunque no causan el problema SEO principal, reducirán la experiencia móvil y accesibilidad. Diagnósticos y texto operativo deberían acercarse a 12 px; los objetivos táctiles móviles más usados, a 44 px cuando el layout lo permita.

#### 14. Seguridad y caché HTML

Netlify ya configura `nosniff`, `DENY`, `Referrer-Policy`, `Permissions-Policy` y caché inmutable para assets. Falta validar y desplegar:

- CSP compatible con scripts actuales y futuros CMP/ads;
- HSTS después de confirmar HTTPS;
- revalidación explícita del HTML;
- headers efectivos en producción, no solo en configuración.

#### 15. 404

La ruta 404 está fuera del sitemap y responde 404 localmente, lo importante. Puede omitir canonical y añadir `noindex` como defensa adicional. Se debe verificar el status real después del deploy.

## Rendimiento de laboratorio

Mediana de cinco ejecuciones con Playwright/Chromium:

| Métrica | Desktop local, sin throttling | Mobile, CPU 4× y 4G simulada |
|---|---:|---:|
| FCP | 36 ms | 520 ms |
| LCP | 36 ms | 764 ms |
| CLS | 0.0285 | 0.0211 |
| TBT | 0 ms | 75 ms |
| App lista | 156 ms | 1.56 s |
| DOMContentLoaded | 106 ms | 1.05 s |
| Transferencia inicial | 236 KB | 236 KB |

La app pasó los umbrales de laboratorio para LCP, CLS y TBT. El overlay desapareció alrededor de 1.70 s en una ejecución móvil instrumentada; por eso “app lista” representa mejor la percepción que el LCP detrás del overlay. INP requiere datos de usuarios reales y no fue medido. No se inventó un Lighthouse score.

## Revisión visual y responsive

Pases confirmados:

- sin scroll horizontal a 320, 360, 375, 390, 430, 768, 1024 y 1440 px;
- workspace y acciones principales dentro del primer viewport desktop 1440×900;
- Generar y Restablecer visibles sin corte entre 320–430 px;
- CTA móvil respeta `safe-area-inset-bottom`;
- no hay webfonts ni imágenes raster pesadas;
- las imágenes HTML decorativas tienen dimensiones y `alt=""` adecuados;
- CLS por traducción es bajo y queda visualmente cubierto por el overlay.

## Pases SEO confirmados

- Astro genera once páginas y diez rutas indexables.
- Cinco rutas de conversor reales y diferentes, además de la home.
- Titles, descriptions, canonical y H1 únicos por landing.
- Open Graph y Twitter Card presentes.
- Contenido, workspace, FAQs y enlaces internos están en el HTML inicial.
- Sitemap XML válido, con diez URLs y sin 404.
- `robots.txt` válido y enlazado al sitemap.
- Las rutas inexistentes responden 404; no hay fallback SPA con falsos 200.
- URLs limpias, assets versionados y caché inmutable configurada.
- El JSON de usuario no se transmite ni forma parte de analytics.
- `ads.txt` declara correctamente que no existe publisher activo; no contiene un ID ficticio.
- El build completo terminó correctamente.

## SXO y posicionamiento

El tipo de página coincide con la intención dominante: herramienta interactiva arriba, controles, salida copiable y explicación debajo. ModelForge resuelve muy bien al desarrollador que quiere pegar/copiar rápido (89/100 en la evaluación de persona), y razonablemente al usuario preocupado por privacidad (73/100). Baja para quien necesita justificar inferencias (67/100) o compatibilidad exacta (62/100), principalmente por falta de documentación visible.

El diferencial de IR inspeccionable y determinismo es más sólido que el mensaje genérico “JSON to class”, pero está enterrado. Debe ocupar un lugar visible en el H1/subtítulo y desarrollarse en la metodología y ejemplos.

No se evaluaron rankings de ModelForge: no existe URL pública. La muestra de resultados observada sirve para validar intención, no para afirmar posiciones, volumen ni dificultad.

## Preparación para monetización

El producto aún no debe activar anuncios. Antes deben cerrarse:

1. dominio, host canónico y despliegue;
2. identidad/contacto y revisión legal;
3. política de consentimiento por región;
4. CMP certificado si corresponde;
5. IDs reales de analytics/AdSense;
6. `ads.txt` únicamente después de la aprobación;
7. ubicaciones fuera del workspace, selectores y acciones, como ya exige la arquitectura del proyecto.

Search Console no requiere enviar datos privados del conversor y debe instalarse antes de decidir nuevas landings. Analytics, si se activa, debe respetar la fachada existente y limitarse a metadata gruesa permitida.

## Limitaciones de la auditoría

- No había dominio público, DNS, TLS ni headers efectivos de Netlify.
- No hubo Search Console, GA4, CrUX, backlinks ni menciones de marca.
- PageSpeed y Rich Results Test no admiten `localhost`.
- Las métricas son de laboratorio local y no sustituyen Core Web Vitals de campo.
- El análisis de intención usa una muestra web actual, no una base pagada de keywords.
- Los analizadores de la skill bloquean localhost por protección SSRF; se usaron el HTML compilado, el parser local y Playwright. Sus errores de acceso no se trataron como puntajes del sitio.

## Validación realizada

```text
corepack pnpm lint      PASS
corepack pnpm typecheck PASS (0 errors, 0 warnings)
corepack pnpm test      PASS (17 files, 68 tests)
corepack pnpm build     PASS
corepack pnpm test:e2e  PASS (54 tests, Chromium/Firefox/WebKit)
Astro pages built       11
Indexable sitemap       10 URLs
404 local               PASS
Responsive widths       320–1440 px PASS
```

El primer intento E2E no inició porque una instancia de Astro ya ocupaba el puerto 4321. Se detuvo de forma controlada, se ejecutó la suite completa y luego se restauró la app en `http://localhost:4321`; no fue un fallo funcional de los tests.

La secuencia implementable y sus criterios de aceptación están en `ACTION-PLAN.md`.
