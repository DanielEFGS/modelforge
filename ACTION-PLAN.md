# Plan de acción SEO, despliegue y crecimiento

Fecha: 2026-08-31  
Base: `FULL-AUDIT-REPORT.md`  
Principio: primero hacer el sitio publicable y medible; después ampliar contenido, internacionalización y monetización.

## Fase 0 — Decisiones del propietario

Estas decisiones no deben inferirse desde código:

- dominio final;
- host canónico: apex o `www`;
- lanzamiento indexable solo en inglés o con una primera locale adicional;
- identidad pública/contacto;
- repositorio público o privado;
- política frente a `GPTBot` y otros bots de entrenamiento;
- país/entidad responsable para revisión legal y consentimiento.

Salida: una hoja de configuración de producción sin secretos en Git.

## Fase 1 — Bloqueo técnico de lanzamiento (P0)

### SEO-001 — URL canónica de producción

Trabajo:

- configurar `PUBLIC_SITE_URL` en Netlify;
- rechazar builds de producción con `modelforge.example`;
- elegir una política de barra final;
- alinear canonical, sitemap y enlaces internos;
- redirigir 301 la variante no canónica de host y ruta.

Aceptación:

- ningún artefacto contiene `modelforge.example`;
- cada URL del sitemap coincide exactamente con su canonical;
- `www`/apex y slash alternativo hacen una sola redirección a la URL final;
- sitemap y robots responden 200 con HTTPS.

### SEO-002 — Metadata y preview social

Trabajo:

- generar `social-card.png` 1200×630;
- añadir tipo, dimensiones y alt de OG/Twitter;
- verificar title, description, canonical y preview en las seis landings.

Aceptación:

- las tarjetas se renderizan en validadores de las redes elegidas;
- la URL de imagen es absoluta, pública y responde 200;
- cada landing conserva metadata única.

### SEO-003 — Producción segura y verificable

Trabajo:

- activar HTTPS y luego HSTS;
- diseñar CSP mínima compatible con Astro;
- configurar revalidación de HTML;
- verificar status 404 y `noindex` defensivo;
- confirmar que no existe fallback SPA.

Aceptación:

- headers efectivos validados sobre el dominio;
- ruta inexistente responde 404;
- assets con hash conservan caché inmutable;
- HTML puede actualizarse sin invalidación manual.

## Fase 2 — Confianza, entidad y contenido (P1)

### SEO-004 — Identidad pública

Trabajo:

- crear About y Contact;
- identificar responsable y canal de contacto;
- enlazar documentación/repositorio/licencia si son públicos;
- cerrar textos legales con revisión adecuada.

Aceptación:

- footer enlaza About, Contact y legales;
- no quedan placeholders de proveedor, retención o contacto;
- schema no afirma entidades o perfiles inexistentes.

### SEO-005 — H1 visible y propuesta diferencial

Trabajo:

- mostrar un H1 compacto por ruta sobre controles;
- mantener el workspace utilizable sin scroll en desktop;
- expresar “local, deterministic, inspectable inference” de manera visible y específica.

Aceptación:

- exactamente un H1 visible por página;
- CTA y controles siguen en el primer viewport 1440×900;
- no reaparece una franja redundante ni se rompe mobile.

### SEO-006 — Contenido útil por conversor

Orden sugerido: TypeScript → Java → Python → C# → Spring Boot.

Cada página debe incluir:

- pasos de uso;
- ejemplo JSON y resultado corto;
- mapeo de tipos;
- optionalidad/nulabilidad/unknown;
- opciones válidas y compatibilidad;
- limitaciones;
- documentación oficial;
- enlace a metodología y conversores relacionados.

Aceptación:

- contenido realmente distinto por destino;
- ejemplos corresponden al generador actual y tienen fixture/golden test;
- ninguna página promete una transformación no soportada;
- navegación y schema siguen siendo estáticos.

### SEO-007 — Metodología y compatibilidad

Trabajo:

- publicar una página estática de inferencia y verificación;
- exponer una matriz de targets/versiones verificadas;
- explicar determinismo, IR y privacidad local;
- añadir fecha de verificación solo donde pueda mantenerse.

Aceptación:

- afirmaciones técnicas enlazan evidencia mantenible;
- fuentes externas son documentación primaria;
- no hay métricas, reviews ni autoridad inventadas.

### SEO-008 — Grafo de entidades y schema

Trabajo:

- añadir `WebSite` global con `@id` estable;
- enriquecer cada `WebApplication` con URL y nombre específico;
- añadir `Organization`/creator solo tras SEO-004;
- validar JSON-LD compilado y luego Rich Results Test en producción.

Aceptación:

- JSON válido en cada ruta;
- propiedades coinciden con contenido visible;
- sin warnings críticos en validadores;
- no se añade FAQ schema solo para perseguir un rich result.

## Fase 3 — Rendimiento y accesibilidad (P1/P2)

### PERF-001 — Reducir JavaScript inicial

Trabajo:

- perfilar imports por destino;
- cargar generadores no activos bajo demanda;
- revisar cuándo debe cargar CodeMirror;
- conservar conversión totalmente local.

Aceptación:

- reducción medible frente a baseline de 216 KB JS gzip / 649 KB decodificado;
- sin cambios en bytes generados para fixtures existentes;
- app lista no empeora en mobile simulado;
- navegación entre targets no introduce errores tardíos.

### A11Y-001 — Legibilidad y objetivos táctiles

Trabajo:

- subir diagnóstico/texto operativo a ~12 px;
- acercar controles globales móviles a 44 px;
- comprobar teclado, focus, tooltips y contraste.

Aceptación:

- sin regresiones a 320–430 px;
- Generar/Restablecer permanecen visibles;
- audit automatizado y recorrido manual de teclado sin errores críticos.

## Fase 4 — SEO internacional, de forma incremental

No publicar las ocho locales simultáneamente como copias superficiales.

### I18N-SEO-001 — Infraestructura

Trabajo:

- rutas estáticas por locale;
- locale explícita en build, no solo `navigator.languages`;
- metadata, canonical, OG y schema localizados;
- `hreflang` recíproco y `x-default`;
- selector de idioma con enlaces crawlables entre equivalentes.

Aceptación:

- el HTML sin JavaScript ya está en el idioma de la URL;
- cada locale tiene canonical propio;
- todas las variantes se referencian recíprocamente;
- una URL no cambia de idioma solo por IP, cookie o navegador.

### I18N-SEO-002 — Lanzamiento por lotes

Lote recomendado:

1. inglés actual;
2. español;
3. portugués brasileño;
4. alemán;
5. chino simplificado, japonés y coreano con revisión nativa;
6. ruso con revisión nativa.

La prioridad final debe decidirse con impresiones de Search Console, soporte disponible y capacidad de revisión humana.

## Fase 5 — Indexación y observabilidad

### GROWTH-001 — Herramientas de búsqueda

Trabajo:

- verificar propiedad de dominio en Google Search Console;
- enviar sitemap;
- inspeccionar home y cinco conversores;
- configurar Bing Webmaster Tools;
- evaluar IndexNow después del lanzamiento.

Aceptación:

- sitemap procesado sin errores;
- URLs canónicas detectadas como se espera;
- se documenta baseline de cobertura e impresiones.

### GROWTH-002 — Analytics con privacidad

Trabajo:

- elegir proveedor y base legal;
- conectar únicamente mediante la fachada existente;
- activar después del consentimiento cuando corresponda;
- registrar solo metadata gruesa permitida por `docs/growth/analytics.md`.

Nunca enviar JSON, nombres de campos, IR, código generado, nombres de snapshots ni contenido pegado.

### GROWTH-003 — Búsqueda con IA

Trabajo:

- permitir explícitamente crawlers de búsqueda deseados;
- decidir aparte bots de entrenamiento;
- publicar metodología y documentación citable;
- añadir `llms.txt` solo con URLs definitivas;
- monitorizar menciones de marca cuando exista dominio.

Aceptación:

- robots refleja la política aprobada;
- CDN/WAF no bloquea accidentalmente crawlers permitidos;
- `llms.txt`, si existe, no contradice canonical, sitemap ni capacidades reales.

## Fase 6 — Monetización, solo después de señales reales

Prerrequisitos:

- dominio e indexación estables;
- identidad/legal completos;
- CMP y política de consentimiento aprobados;
- tráfico suficiente para evaluar impacto;
- AdSense aprobado e ID real.

Trabajo:

- actualizar `ads.txt` solo con el seller record real;
- cargar anuncios después de consentimiento;
- mantenerlos fuera del workspace, selectores, Generate, Copy y Download;
- probar CLS, mobile y accesibilidad con anuncios reales;
- mantener desactivados formatos intrusivos hasta revisión.

## Orden de ejecución recomendado

| Semana/iteración | Entregables |
|---|---|
| 1 | SEO-001, SEO-002, SEO-003 |
| 2 | SEO-004, SEO-005, primera landing de SEO-006 |
| 3 | resto SEO-006, SEO-007, SEO-008 |
| 4 | PERF-001, A11Y-001 y deploy preview |
| 5 | GROWTH-001 y baseline; decidir primera locale |
| Posterior | I18N por lotes, analytics, IA y monetización según datos |

## Quality gate por fase

```bash
corepack pnpm lint
corepack pnpm typecheck
corepack pnpm test
corepack pnpm build
corepack pnpm test:e2e
```

Además, para cambios SEO:

- revisar HTML de producción sin JavaScript;
- comparar canonical contra sitemap;
- probar redirects y status HTTP;
- validar JSON-LD;
- ejecutar Lighthouse/PageSpeed sobre la URL pública;
- comprobar desktop y mobile;
- registrar el resultado en `PROGRESS.md` solo cuando la fase esté realmente completada.
