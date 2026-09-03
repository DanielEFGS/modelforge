# Local Workspace History and Commands

## Status

Planned post-MVP capability. This specification does not activate implementation while Phase 9 launch gates remain open.

## Goal

Add IDE-like recovery and recall to the existing deterministic converter without turning ModelForge into a general-purpose IDE or weakening its browser-local privacy promise.

The feature has three distinct layers:

1. a reversible command timeline for the current workspace,
2. an in-memory list of successful generations for the current tab,
3. explicitly named snapshots that the user chooses to retain on this device.

## Non-goals

- accounts, cloud sync, shared links or server history,
- automatic persistence of pasted JSON by default,
- project filesystems, terminals, code execution or arbitrary source editors,
- storing generated output when it can be deterministically regenerated,
- sending snapshot names, JSON, model edits or generated code to analytics.

## Privacy model

Raw source is session-only unless the user explicitly selects **Save locally**. Opening the history surface must not silently opt the user into persistence.

- Session commands and generation runs live only in memory and disappear when the tab closes.
- Named snapshots use IndexedDB, not `localStorage`, because payloads may be larger and writes must not block the main thread.
- Every persistence action states that the snapshot remains on the current browser/device.
- A **Delete all local snapshots** action must be available from the history surface.
- Snapshot names and contents are forbidden analytics fields.
- No service worker, network request or URL serialization may contain source data.

## Functional requirements

### Command timeline

- Provide Undo and Redo buttons with localized tooltips and disabled states.
- Support `Ctrl/Cmd+Z`, `Ctrl/Cmd+Shift+Z` and `Ctrl+Y` where platform conventions permit.
- Include source edits, model/property renames, type changes, required/nullable changes, identifier selection and target options.
- Coalesce adjacent source typing into bounded commands; selector and model mutations remain atomic.
- Clear the redo branch after a new mutation.
- Reset and restore are reversible commands rather than destructive timeline resets.
- Keep a bounded in-memory timeline; the initial target is 100 commands or 5 MB of serialized state, whichever is reached first.

### Session run history

- A successful Generate creates a session entry with a suggested label such as `TypeScript · 14:32`.
- The user can rename an entry, restore it, regenerate it or remove it from the session list.
- A run records source, editable IR overrides, target options, selected identifier and generator/profile versions.
- Generated files are recomputed on restore and are not duplicated in storage.
- Failed or compatibility-blocked generations do not become successful run entries.

### Named local snapshots

- **Save locally** promotes a session state into an explicitly named IndexedDB snapshot.
- Names are required after trimming, limited to 80 Unicode characters and unique only by stable ID, not by display name.
- The list exposes name, target, last modified time and source-size bucket without previewing sensitive values.
- Support rename, duplicate, restore and delete.
- Restoring over dirty work requires a confirmation that names the unsaved state at risk.
- Never silently evict named snapshots. When the configured limit is reached, explain the limit and let the user delete entries.
- Initial limits: 50 named snapshots, 10 MB total serialized payload and the parser's existing per-source safety limit.

## Data model

Each persisted record contains:

- stable snapshot ID,
- user-visible name,
- created and updated timestamps,
- source JSON text,
- target and target-specific options,
- editable IR overrides needed to reproduce the inspected state,
- selected model/field context where useful,
- compiler, IR schema and generator/profile versions,
- deterministic source/options fingerprint for duplicate detection.

The record does not contain generated output, analytics identifiers or network metadata.

## Interface

- Add a compact command group near the Source header: Undo, Redo and History.
- History opens a non-modal side drawer on desktop and an in-flow sheet on mobile so the converter remains accessible.
- Separate **This session** and **Saved on this device** sections.
- The save form requests a name and clearly marks local persistence.
- Every icon-only command has an accessible name, visible tooltip, keyboard focus state and disabled explanation where applicable.
- Empty states explain whether data is session-only or saved locally.

## Determinism and migrations

Restoration must reproduce the same normalized input and target options. A snapshot saved under an older compiler/profile version must show its recorded version before regeneration.

- Compatible records migrate through explicit versioned migrations.
- Unsupported records open read-only with an export/delete path; they are never silently reinterpreted.
- Golden fixtures cover serialization, restore and regenerated byte equivalence.

## Acceptance criteria

- Undo/redo covers every editable workspace mutation and keyboard shortcut.
- A new mutation after Undo removes the redo branch.
- Closing the tab removes unsaved runs and command history.
- No JSON is persisted until **Save locally** is confirmed.
- Named snapshots survive reload, can be renamed/restored/deleted and respect limits.
- Restore warns before replacing dirty work.
- Restored snapshots generate byte-equivalent output under the recorded compatible versions.
- Sentinel tests prove source, snapshot names and generated output never leave the browser.
- Keyboard, screen-reader, mobile and cross-browser E2E coverage passes.

## Delivery sequence

1. Command state model and pure reducer with bounded history.
2. Source/model/options command integration and shortcuts.
3. Session run history and deterministic restore.
4. IndexedDB repository with explicit save/delete and version migrations.
5. History drawer/sheet, naming flows and accessibility.
6. Privacy, determinism, quota, migration and cross-browser release tests.
