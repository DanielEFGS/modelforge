---
name: ModelForge Silicon Inspection
description: A dense, inspectable compiler workspace expressed as a quiet mineral-and-metal chassis with live reference routes.
colors:
  mineral-ground: "oklch(96.4% 0.008 155)"
  mineral-chassis: "oklch(98.4% 0.006 155)"
  mineral-panel: "oklch(99% 0.004 155)"
  mineral-raised: "oklch(100% 0.003 155)"
  mineral-inset: "oklch(93.6% 0.012 170)"
  carbon-strong: "oklch(18% 0.025 210)"
  carbon-body: "oklch(29% 0.022 205)"
  carbon-muted: "oklch(43% 0.025 195)"
  seam-soft: "oklch(84% 0.022 175)"
  etched-teal: "oklch(42% 0.085 178)"
  etched-teal-strong: "oklch(37% 0.075 178)"
  copper-contact: "oklch(58% 0.12 55)"
  safety-orange: "oklch(68% 0.2 44)"
  safety-orange-hover: "oklch(61% 0.2 42)"
  action-ink: "oklch(99% 0.006 70)"
  success: "oklch(48% 0.12 155)"
  warning: "oklch(62% 0.15 75)"
  danger: "oklch(55% 0.19 28)"
  info: "oklch(50% 0.12 235)"
  dark-ground: "oklch(12% 0.016 190)"
  dark-chassis: "oklch(15% 0.02 190)"
  dark-panel: "oklch(18.5% 0.022 190)"
  dark-raised: "oklch(23% 0.025 188)"
  dark-inset: "oklch(10% 0.014 190)"
  dark-ink-strong: "oklch(94% 0.012 160)"
  dark-ink-body: "oklch(85% 0.016 165)"
  dark-ink-muted: "oklch(70% 0.025 170)"
  dark-seam-soft: "oklch(30% 0.035 180)"
  dark-etched-teal: "oklch(72% 0.08 178)"
  dark-etched-teal-strong: "oklch(68% 0.075 178)"
  dark-copper-contact: "oklch(69% 0.105 58)"
  dark-safety-orange: "oklch(67% 0.18 44)"
  dark-safety-orange-hover: "oklch(73% 0.17 46)"
  dark-action-ink: "oklch(15% 0.03 40)"
typography:
  headline:
    fontFamily: "Aptos, Segoe UI Variable, Segoe UI, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 750
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Aptos, Segoe UI Variable, Segoe UI, sans-serif"
    fontSize: "0.84rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.05em"
  body:
    fontFamily: "Aptos, Segoe UI Variable, Segoe UI, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "normal"
  label:
    fontFamily: "Cascadia Code, SFMono-Regular, Consolas, monospace"
    fontSize: "0.66rem"
    fontWeight: 650
    lineHeight: 1
    letterSpacing: "0.07em"
  code:
    fontFamily: "Cascadia Code, SFMono-Regular, Consolas, monospace"
    fontSize: "0.78rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
rounded:
  square: "0"
  control: "2px"
  inspection: "0.625rem"
spacing:
  trace: "0.25rem"
  compact: "0.45rem"
  control: "0.55rem"
  panel: "0.75rem"
  shell: "1rem"
  empty: "2rem"
components:
  button-generate:
    backgroundColor: "{colors.safety-orange}"
    textColor: "{colors.action-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.square}"
    padding: "0.5rem 1rem"
    height: "2.5rem"
  button-generate-hover:
    backgroundColor: "{colors.safety-orange-hover}"
    textColor: "{colors.action-ink}"
    rounded: "{rounded.square}"
  button-utility:
    backgroundColor: "{colors.mineral-raised}"
    textColor: "{colors.carbon-body}"
    rounded: "{rounded.square}"
    padding: "0.35rem 0.5rem"
    height: "2rem"
  input-inspection:
    backgroundColor: "{colors.mineral-raised}"
    textColor: "{colors.carbon-strong}"
    rounded: "{rounded.control}"
    padding: "0.3rem 0.5rem"
    height: "2rem"
  panel-inspection:
    backgroundColor: "{colors.mineral-panel}"
    textColor: "{colors.carbon-body}"
    rounded: "{rounded.square}"
    padding: "{spacing.panel}"
  signal-status:
    backgroundColor: "{colors.mineral-panel}"
    textColor: "{colors.carbon-muted}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "0.3rem 0.4rem"
---

# Design System: ModelForge Silicon Inspection

## Overview

**Creative North Star: "Silicon Inspection"**

ModelForge looks and behaves like a compact inspection instrument for a deterministic compiler. Pale mineral work surfaces, etched teal routes, copper contact points, fine seams, and restrained technical typography make each stage feel connected and inspectable. The interface is deliberately operational: dense enough for serious model work, but ordered so source, evidence, and generated output remain legible at a glance.

The chassis is continuous rather than a collection of floating cards. Most controls are flat and integrated into the board; hierarchy comes from surface tone, neutral seams, live reference routes, and typography instead of decoration. Safety orange appears only where a user commits the conversion route. Both light and dark themes preserve the same material hierarchy and semantic roles.

**Key Characteristics:**

- Continuous three-stage inspection chassis with a dominant model bay.
- Mineral surfaces, neutral structural seams, teal reference traces, copper contacts, and rare safety orange.
- Compact technical grotesque for interface text; monospace only for code and instrumentation.
- Thin seams, near-square controls, and little ambient decoration.
- Explicit local-processing, diagnostics, compatibility, and route-state cues.
- A clipped circuit-die app mark whose routed `M` connects three copper contacts.

## Colors

The palette reads as an instrument panel: quiet mineral neutrals carry content, teal describes the deterministic route, copper marks contacts, and orange commits an action.

### Primary

- **Etched Teal:** Use for routes, stage indices, semantic hints, active navigation, and technical status emphasis. It communicates structure and selection, not promotion.
- **Safety Orange:** Reserve for the Generate action, its hover state, editor caret, and focus emphasis. Its scarcity makes the commit point unmistakable.

### Secondary

- **Copper Contact:** Use for route nodes, selected-tab underlines, and the occasional output glyph that marks a physical or logical junction.

### Neutral

- **Mineral Ground, Chassis, Panel, Raised, and Inset:** Form a five-level surface hierarchy from page canvas through shell, work bays, controls, and code wells.
- **Carbon Strong, Body, and Muted:** Separate titles and editable values from ordinary text and instrumentation metadata.
- **Soft and Strong Seams:** Divide regions and trace the chassis without creating heavy card outlines.

### Semantic

- **Success, Warning, Danger, and Info:** Communicate validation, diagnostics, incompatibility, and informational status. Always pair them with text, icons, or both.

### Theming

The theme is selected before first paint from the stored `modelforge-theme` preference, falling back to `prefers-color-scheme`. Light and dark themes remap semantic surface, ink, line, route, contact, action, status, focus, and selection roles; components consume roles rather than hard-coded light-theme values. Dark mode slightly reduces the body weight to preserve optical balance on illuminated text.

**The Orange Terminus Rule.** Safety orange belongs to decisive commit behavior. Do not spend it on ordinary links, tabs, badges, decorative strokes, or secondary controls.

**The Semantic Redundancy Rule.** Never make color the only carrier of validity, diagnostics, compatibility, selection, or route state.

## Typography

**Display/UI Font:** Aptos with Segoe UI Variable, Segoe UI, and sans-serif fallbacks.  
**Code/Instrumentation Font:** Cascadia Code with SFMono-Regular, Consolas, and monospace fallbacks.

**Character:** The UI face is compact, neutral, and engineered for dense operation. The code face marks literal source, output, byte counts, route labels, field evidence, and machine status; ligatures are disabled and numerals are tabular so technical values remain unambiguous.

### Hierarchy

- **Headline:** Used sparingly for the product wordmark; bold and tightly tracked.
- **Title:** Uppercase panel headings and other stage-level labels; compact, strong, and slightly tracked.
- **Body:** Supporting text, field controls, empty-state guidance, and action labels. Desktop workspace copy intentionally stays small but must remain legible under browser zoom.
- **Label:** Uppercase instrumentation such as target labels, state chips, table headings, and route status. Tracking supplies separation at small sizes.
- **Code:** JSON, generated code, property names, model counts, and byte counts. Use tabular numerals and no ligatures.

**The Two-Voice Rule.** Use the UI family for actions and explanations; use monospace only when text represents code, evidence, machine state, or measured data.

**The Restrained Scale Rule.** Preserve the narrow hierarchy. New workspace elements should earn emphasis through placement, weight, or surface contrast before introducing a larger type size.

## Layout

The operational shell uses the full desktop viewport with a half-rem outer gutter; explanatory content below the instrument remains reading-width constrained. A quiet clipped site header precedes the continuous bordered workspace; a shared footer follows it. Inside the chassis, the control rail spans the full width, the inspection grid holds all stages, and the commit bus terminates the workflow at the lower right.

On wide screens, use three columns with a narrow Source bay, a dominant Model bay, and a narrow Output bay. The implemented ratio is approximately 0.78 / 1.55 / 0.9, with minimum widths protecting editor and model-table usability. Workspace height is bounded against the viewport so the primary converter remains usable without page scrolling on a normal desktop display. Internal panes own their scrolling.

At 70rem and below, preserve all three stages while tightening column minima and collapsing field evidence beneath the source/target and type columns. At 48rem and below, replace the simultaneous grid with three equal sequential stage tabs. Only the selected stage is displayed, but every capability remains available. The mobile control rail places References and theme on its first row, the full-width locale selector directly beneath them, and target selectors in a final two-column row. The route legend is hidden, while the safe-area-aware commit bar uses a flexible Generate column and intrinsic Reset column so neither action can leave the viewport. At 42rem and below, the global header and footer stack. The minimum supported page width is 20rem.

Spacing follows a quarter-rem trace rhythm, with compact half-step gaps for controls and three-quarter-rem padding for panel content. Empty states may expand to 2rem padding because they carry no dense operational data.

**The Model-Dominance Rule.** On desktop, the inferred model is the widest and most information-rich stage. Do not equalize the three columns.

**The Capability-Preservation Rule.** Responsive layouts may sequence or reflow the stages, but must not remove source editing, model inspection, diagnostics, target controls, generation, copying, or downloading.

## Elevation & Depth

The system is flat by default. Depth comes primarily from tonal nesting, inset code wells, and thin neutral seams. The workspace alone receives a restrained ambient inspection shadow; the Generate button receives a compact soft lift that makes the commit control feel tactile. Cards and ordinary controls do not float.

Routing lines are structural depth cues rather than decoration. Every field reference binds a real JSON-property path to its stable IR field ID and generated target name. Low-emphasis teal routes can show the complete graph; hovering any decorated source key, model row, or generated property isolates its route, while the link control pins that route until explicitly released. Copper nodes sit above the traces with a panel-colored isolating ring. When an endpoint scrolls outside its panel's content viewport, its route projects to an eight-pixel inset rail at the corresponding top or bottom edge; offscreen routes group on that rail instead of crossing panel headers, diagnostics, or actions. Selected tabs use an inset copper underline rather than elevation.

Motion is state-driven and intentionally quiet. The current implementation uses immediate state changes rather than ornamental entrance animation. Any future transition must be brief, affect only color, opacity, or a small local transform, and explain selection, focus, generation, or route continuity. The global reduced-motion rule collapses animation and transition durations and disables smooth scrolling.

**The Flat Chassis Rule.** Keep panels and controls physically integrated. Add a shadow only when it communicates the outer instrument or a decisive tactile action.

**The Route-Is-Meaning Rule.** A trace, contact, pulse, or illumination must map to real pipeline state; never use circuit motifs as arbitrary filler.

## Shapes

The silhouette is machined and near-square. The outer shell and primary panels are rectangular, controls use a minimal 2px corner, and most buttons, status chips, tabs, and cards have square corners. Circular geometry is reserved for route contacts and small state nodes. Fine one-pixel borders form the normal seam; the shell adds an inset second seam three pixels inside its edge.

The named inspection radius exists for exceptional inspection surfaces, not as a default card radius. Avoid soft pill shapes, oversized rounding, and disconnected floating containers. Icons are simple line glyphs sized to sit comfortably beside compact labels.

**The Machined Edge Rule.** Default to square or 2px corners. Rounded containers must represent a deliberate exceptional surface, not generic friendliness.

## Components

### Buttons

- **Generate:** A near-square, high-contrast safety-orange commit button at the route terminus. It uses a strong label, play icon, darkened border, and compact soft lift. Disabled state reduces opacity, removes the shadow, and keeps the control visible.
- **Utility:** Flat raised-mineral controls with a soft seam, compact padding, and optional 14–15px line icon. Use for load, clear, reset, copy, download, and compatibility repair.
- **Icon button:** A 2.25rem square with centered 18px icon, visible border, accessible name, and title where helpful. The theme toggle is the canonical example.
- **Icon-only semantics:** Every icon-only button has a localized accessible name and matching tooltip. Toggle labels describe the next action (`Unpin`, not `Pin`) and active hover styles must preserve icon contrast.
- **Focus:** Every interactive control receives the shared 3px orange-tinted focus outline with a 3px offset. Do not suppress it locally.

### Inputs / Fields

- **Style:** Raised-mineral fill, strong ink, soft one-pixel border, 2px corners, and compact vertical rhythm. Selects retain enough right padding for their native disclosure control.
- **Editors:** Source and output use inset mineral wells. CodeMirror gutters are a nearby surface mix rather than a separate floating band. The output code region is keyboard focusable and scrolls internally.
- **Field rows:** Source-to-target mapping, type, and evidence are aligned as a compact grid. Editable values use the UI face; source property names and semantic hints use monospace.
- **Syntax:** JSON property names, strings, numbers, atomic literals, and brackets use distinct semantic colors. Generated TypeScript and Java apply the same roles while preserving interactive field references.
- **States:** Parse failure replaces model content with a clear paused state. Compatibility failure combines danger color, explicit text, and a corrective button. Disabled and error states must remain readable in both themes.

### Cards / Containers

- **Inspection shell:** One continuous chassis with a strong outer seam, soft inset seam, mineral background, and restrained ambient shadow.
- **Inspection panel:** Flat stage surface separated by shared borders; no individual radius or shadow.
- **Model card:** Raised-mineral record with a soft border. Its header uses a subtle inset/raised color mix and its field rows are divided by softened seams.
- **Empty state:** Centered icon, short strong title, and a restrained explanation capped to a readable width. It should tell the user what prerequisite remains.

### Navigation and Status

- **Mobile stages:** Three equal-width buttons numbered Source, Model, and Output. The active stage changes surface, text color, and copper underline while exposing `aria-current="step"`.
- **File tabs:** Horizontally scrollable monospace tabs with `role="tablist"`, `role="tab"`, and `aria-selected`. The selected file uses a raised surface and copper inset underline.
- **Signals:** Square bordered labels for validity, file count, compatibility, and local pipeline status. Use concise uppercase instrumentation copy.
- **Diagnostics:** The collapsed summary reports the total and first diagnostic. Expanding it exposes every message, severity, and stable code without covering the model inspector.
- **Reference switch:** A labeled `role="switch"` control shows or hides the complete connection graph. Turning it off does not disable inspection: hovered and pinned references remain visible.
- **Locale selector:** A compact native select in the control rail localizes workspace labels, actions, states, and accessible names. Browser-language detection is the initial hint, explicit choice wins and persists locally, and technical source names, target identifiers, file names, and generated code remain unchanged.
- **App mark:** The favicon and wordmark share one authored SVG: a clipped safety-orange die, dark mineral core, etched teal `M` route and three copper contacts. Preserve the flat colors and square geometry at small sizes; do not substitute framework defaults or rasterize the master.
- **Reference route:** Source property decorations, model-row link controls, and output property decorations share one stable field identity. Hover is temporary; activating the row's link control pins or releases the route. The live readout repeats the source-to-target relationship in text, so the SVG trace is never the only carrier of meaning.
- **Commit bus:** A semantic JSON → IR → CODE route with live contacts and connecting seams. Generate anchors its terminus; Reset remains visually secondary.

### Accessibility

Use semantic landmarks and explicit accessible names for icon-only actions, selects, editors, stage navigation, and generated-file tabs. Preserve keyboard access through every stage and never rely on hover. Status changes that affect diagnostics belong in a polite live region. Decorative routes and contacts are hidden from assistive technology; meaningful state is repeated in text. Maintain visible focus, theme contrast, touch targets near 44px where mobile layout permits, browser zoom support, and reduced-motion behavior.

Workspace copy supports English, Spanish, Brazilian Portuguese, German, Russian, Simplified Chinese, Japanese, and Korean. Layouts reserve expansion space for longer labels, and the active locale is reflected in the workspace and document language metadata without geolocation or network lookup.

## Do's and Don'ts

### Do:

- **Do** preserve the continuous Source → Model → Output reading order and make the model stage dominant on desktop.
- **Do** bind every component to semantic theme roles so light and dark modes retain the same hierarchy.
- **Do** use teal for inspection and route meaning, copper for junctions and selection, and orange for commitment.
- **Do** explain inference and compatibility through copy, icons, diagnostics, and state—not color alone.
- **Do** keep editors and long model/output regions internally scrollable so core actions remain accessible.
- **Do** use semantic HTML, CSS, and inline SVG for the visual system; the circuit grammar does not require raster decoration.
- **Do** verify desktop and mobile states, keyboard focus, text resizing, dark theme, and reduced motion whenever the workspace changes.

### Don't:

- **Don't** turn the workspace into three equal floating cards or move the converter beneath marketing content.
- **Don't** use safety orange for routine actions, decorative accents, or large background fields.
- **Don't** introduce large rounded cards, pills, glass effects, gradients, or soft dashboard shadows that weaken the machined inspection character.
- **Don't** use monospace for general prose or the UI face for literal source and generated code.
- **Don't** hide capabilities on mobile; sequence them with accessible tabs instead.
- **Don't** add circuit traces, contacts, or motion unless they reveal an actual deterministic relationship or state.
- **Don't** place advertising or promotional UI inside the chassis or adjacent to Generate, Copy, Download, selectors, or editor interaction zones.
