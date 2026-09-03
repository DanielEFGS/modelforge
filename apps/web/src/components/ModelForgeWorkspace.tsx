import type {
  FieldDefinition,
  ForgeDocument,
  GeneratedFile,
  ScalarName,
} from '@modelforge/core';
import {
  checkSpringCompatibility,
  generateSpring,
  getSpringBootProfile,
  type SpringBootFamily,
} from '@modelforge/framework-spring';
import {
  generateCSharp,
  type CSharpDeclarationStyle,
} from '@modelforge/generator-csharp';
import { generateJava, type JavaTarget } from '@modelforge/generator-java';
import {
  generatePython,
  type PythonModelStyle,
} from '@modelforge/generator-python';
import {
  generateTypeScript,
  type TypeScriptDeclarationStyle,
} from '@modelforge/generator-typescript';
import { parseAndInferJson } from '@modelforge/parser-json';
import {
  Check,
  Braces,
  ChevronDown,
  ChevronRight,
  Clipboard,
  CircuitBoard,
  Code2,
  Download,
  Eye,
  EyeOff,
  FileCode2,
  Globe2,
  Info,
  Link2,
  Moon,
  Play,
  RotateCcw,
  ShieldCheck,
  Sun,
  TriangleAlert,
  X,
} from 'lucide-react';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { JsonEditor } from './JsonEditor';
import { ReferenceOverlay, type WorkspaceReference } from './ReferenceOverlay';
import { fieldPath } from '../lib/json-references';
import {
  isLocale,
  LOCALES,
  resolveLocale,
  WORKSPACE_MESSAGES,
  type Locale,
} from '../lib/i18n';
import { translateDiagnostic } from '../lib/diagnostic-i18n';
import {
  countBucket,
  sourceSizeBucket,
  trackAnalytics,
} from '../lib/analytics';

const EXAMPLE = `{
  "id": 42,
  "email_address": "ada@example.com",
  "created_at": "2026-08-27T12:30:00Z",
  "profile": {
    "display_name": "Ada Lovelace",
    "active": true,
    "phone": null,
    "address": {
      "city": "Santiago",
      "country": "CL"
    }
  },
  "tags": ["compiler", "local-first"],
  "projects": [
    { "name": "Analytical Engine", "active": true }
  ]
}`;

type Target = 'typescript' | 'java' | 'spring' | 'csharp' | 'python';
type MobileStage = 'source' | 'model' | 'output';

function typeLabel(field: FieldDefinition): string {
  const type = field.type;
  if (type.kind === 'scalar') return type.scalar;
  if (type.kind === 'model') return 'model';
  if (type.kind === 'unknown') return 'unknown';
  if (type.kind === 'union') return 'union';
  return `${type.element.kind === 'scalar' ? type.element.scalar : type.element.kind}[]`;
}

function download(file: GeneratedFile) {
  const url = URL.createObjectURL(
    new Blob([file.content], { type: 'text/plain;charset=utf-8' }),
  );
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = file.path.split('/').at(-1) ?? 'model.txt';
  anchor.click();
  URL.revokeObjectURL(url);
}

interface ModelForgeWorkspaceProps {
  initialTarget?: Target;
  initialSource?: string;
}

const CODE_KEYWORDS = new Set([
  'abstract',
  'class',
  'def',
  'from',
  'const',
  'export',
  'extends',
  'final',
  'implements',
  'import',
  'interface',
  'namespace',
  'new',
  'package',
  'private',
  'protected',
  'public',
  'readonly',
  'record',
  'sealed',
  'return',
  'static',
  'type',
  'using',
]);

const CODE_TYPES = new Set([
  'boolean',
  'Boolean',
  'Any',
  'BaseModel',
  'ConfigDict',
  'Date',
  'DateOnly',
  'DateTimeOffset',
  'Double',
  'integer',
  'List',
  'LocalDate',
  'Long',
  'None',
  'number',
  'OffsetDateTime',
  'String',
  'bool',
  'datetime',
  'float',
  'int',
  'list',
  'object',
  'string',
  'unknown',
  'void',
]);

const CODE_TOKEN =
  /(\/\/[^\n]*|\/\*[\s\S]*?\*\/|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\b\d+(?:\.\d+)?\b|\b[A-Za-z_$][\w$]*\b|[{}[\]();,.<>?:=@]|\s+|.)/g;

function referencedCode(
  content: string,
  references: WorkspaceReference[],
  activeReferenceId: string | undefined,
  onHover: (id?: string) => void,
  onSelect: (id: string) => void,
  traceLabel: (name: string) => string,
): ReactNode[] {
  const byName = new Map<string, WorkspaceReference[]>();
  for (const reference of references) {
    const names = new Set([
      reference.targetName,
      reference.targetName.replace(/^[a-z]/, (value) => value.toUpperCase()),
    ]);
    for (const name of names) {
      const candidates = byName.get(name) ?? [];
      candidates.push(reference);
      byName.set(name, candidates);
    }
  }
  const declarations = [
    ...content.matchAll(
      /\b(?:interface|class|record|type)\s+([A-Za-z_$][\w$]*)/g,
    ),
  ].map((match) => ({ name: match[1] ?? '', index: match.index }));
  const nodes: ReactNode[] = [];
  for (const match of content.matchAll(CODE_TOKEN)) {
    const index = match.index;
    const token = match[0];
    const candidates = byName.get(token) ?? [];
    const declaration = declarations.findLast((item) => item.index < index);
    const reference =
      candidates.find(
        (candidate) =>
          declaration?.name === candidate.modelName ||
          declaration?.name === `${candidate.modelName}Dto`,
      ) ?? candidates[0];
    if (reference) {
      nodes.push(
        <span
          key={`${reference.id}-${index}`}
          className={`syntax-property output-reference ${reference.id === activeReferenceId ? 'active' : ''}`}
          data-output-reference={reference.id}
          role="button"
          tabIndex={0}
          aria-label={traceLabel(
            `${reference.modelName}.${reference.targetName}`,
          )}
          aria-pressed={reference.id === activeReferenceId}
          onMouseEnter={() => onHover(reference.id)}
          onMouseLeave={() => onHover(undefined)}
          onFocus={() => onHover(reference.id)}
          onBlur={() => onHover(undefined)}
          onClick={() => onSelect(reference.id)}
          onKeyDown={(event: KeyboardEvent<HTMLSpanElement>) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              onSelect(reference.id);
            }
          }}
        >
          {token}
        </span>,
      );
      continue;
    }

    let kind: string | undefined;
    if (token.startsWith('//') || token.startsWith('/*')) kind = 'comment';
    else if (/^["'`]/.test(token)) kind = 'string';
    else if (/^\d/.test(token)) kind = 'number';
    else if (token === 'true' || token === 'false' || token === 'null')
      kind = 'literal';
    else if (CODE_KEYWORDS.has(token)) kind = 'keyword';
    else if (CODE_TYPES.has(token) || /^[A-Z][\w$]*$/.test(token))
      kind = 'type';
    else if (/^[{}[\]();,.<>?:=@]$/.test(token))
      kind = /[{}[\]()]/.test(token) ? 'bracket' : 'punctuation';

    nodes.push(
      kind ? (
        <span className={`syntax-${kind}`} key={`${index}-${kind}`}>
          {token}
        </span>
      ) : (
        token
      ),
    );
  }
  return nodes;
}

export function ModelForgeWorkspace({
  initialTarget = 'typescript',
  initialSource = EXAMPLE,
}: ModelForgeWorkspaceProps) {
  const [source, setSource] = useState(initialSource);
  const parsed = useMemo(
    () => parseAndInferJson(source, { rootName: 'User' }),
    [source],
  );
  const [editedDocument, setEditedDocument] = useState<ForgeDocument>();
  const document = editedDocument ?? (parsed.ok ? parsed.document : undefined);
  const [target, setTarget] = useState<Target>(initialTarget);
  const [tsStyle, setTsStyle] =
    useState<TypeScriptDeclarationStyle>('interface');
  const [javaStyle, setJavaStyle] = useState<JavaTarget>('pojo');
  const [csharpStyle, setCsharpStyle] =
    useState<CSharpDeclarationStyle>('class');
  const [pythonStyle, setPythonStyle] = useState<PythonModelStyle>('dataclass');
  const [springFamily, setSpringFamily] = useState<SpringBootFamily>('4.1');
  const [javaVersion, setJavaVersion] = useState(21);
  const [idFieldId, setIdFieldId] = useState('');
  const [files, setFiles] = useState<GeneratedFile[]>([]);
  const [generationDiagnostics, setGenerationDiagnostics] = useState<
    ForgeDocument['diagnostics']
  >([]);
  const [activeFile, setActiveFile] = useState(0);
  const [stage, setStage] = useState<MobileStage>('source');
  const [dark, setDark] = useState(false);
  const [locale, setLocale] = useState<Locale>('en');
  const [hasGenerated, setHasGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [hoveredReferenceId, setHoveredReferenceId] = useState<string>();
  const [pinnedReferenceId, setPinnedReferenceId] = useState<string>();
  const [showAllReferences, setShowAllReferences] = useState(true);
  const [showTargetInfo, setShowTargetInfo] = useState(true);
  const [workspaceGrid, setWorkspaceGrid] = useState<HTMLElement | null>(null);
  const workspaceTracked = useRef(false);
  const copy = WORKSPACE_MESSAGES[locale];

  const references = useMemo<WorkspaceReference[]>(
    () =>
      document?.models.flatMap((model) =>
        model.fields.map((field) => ({
          id: field.id,
          path: fieldPath(model.path, field.sourceName),
          sourceName: field.sourceName,
          targetName: field.targetName,
          modelName: model.targetName,
        })),
      ) ?? [],
    [document],
  );
  const activeReferenceId = hoveredReferenceId ?? pinnedReferenceId;
  const activeReference = references.find(
    (reference) => reference.id === activeReferenceId,
  );

  const selectReference = useCallback((id: string) => {
    setPinnedReferenceId((current) => (current === id ? undefined : id));
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('modelforge-theme');
    const storedLocale = localStorage.getItem('modelforge-locale');
    const nextLocale = isLocale(storedLocale)
      ? storedLocale
      : resolveLocale(navigator.languages);
    const enabled =
      stored === 'dark' ||
      (!stored &&
        (globalThis.matchMedia?.('(prefers-color-scheme: dark)').matches ??
          false));
    setDark(enabled);
    setLocale(nextLocale);
    setHydrated(true);
    globalThis.document.documentElement.lang = nextLocale;
    globalThis.document.documentElement.dataset.theme = enabled
      ? 'dark'
      : 'light';

    const colorScheme = globalThis.matchMedia?.('(prefers-color-scheme: dark)');
    const followBrowserTheme = (event: MediaQueryListEvent) => {
      if (localStorage.getItem('modelforge-theme')) return;
      setDark(event.matches);
      globalThis.document.documentElement.dataset.theme = event.matches
        ? 'dark'
        : 'light';
    };
    colorScheme?.addEventListener('change', followBrowserTheme);
    return () => colorScheme?.removeEventListener('change', followBrowserTheme);
  }, []);
  useEffect(
    () => setEditedDocument(parsed.ok ? parsed.document : undefined),
    [parsed],
  );
  useEffect(() => {
    globalThis.document.documentElement.lang = locale;
    globalThis.dispatchEvent(
      new CustomEvent('modelforge:locale-change', { detail: locale }),
    );
  }, [locale]);
  useEffect(() => {
    if (!hydrated) return;
    const frame = globalThis.requestAnimationFrame(() => {
      globalThis.dispatchEvent(new CustomEvent('modelforge:app-ready'));
    });
    return () => globalThis.cancelAnimationFrame(frame);
  }, [hydrated, locale]);
  useEffect(() => {
    if (
      pinnedReferenceId &&
      !references.some((reference) => reference.id === pinnedReferenceId)
    ) {
      setPinnedReferenceId(undefined);
    }
  }, [pinnedReferenceId, references]);
  useEffect(() => {
    if (!hydrated || workspaceTracked.current) return;
    workspaceTracked.current = true;
    trackAnalytics({
      name: 'workspace_loaded',
      routePreset: initialTarget,
      locale,
    });
  }, [hydrated, initialTarget, locale]);
  useEffect(() => {
    const fields = parsed.ok
      ? parsed.document.models.reduce(
          (sum, model) => sum + model.fields.length,
          0,
        )
      : 0;
    trackAnalytics({
      name: 'parse_result',
      success: parsed.ok,
      sourceSizeBucket: sourceSizeBucket(
        new TextEncoder().encode(source).length,
      ),
      rootKind: parsed.ok ? parsed.document.root.kind : 'invalid',
      modelCountBucket: countBucket(
        parsed.ok ? parsed.document.models.length : 0,
      ),
      fieldCountBucket: countBucket(fields),
      diagnosticCodes: (parsed.ok
        ? parsed.document.diagnostics
        : parsed.diagnostics
      ).map((item) => item.code),
    });
  }, [parsed, source]);
  useEffect(() => {
    trackAnalytics({
      name: 'target_changed',
      language: target === 'spring' ? 'java' : target,
      framework: target === 'spring' ? 'spring-boot' : undefined,
      versionFamily: target === 'spring' ? springFamily : undefined,
      style:
        target === 'typescript'
          ? tsStyle
          : target === 'java'
            ? javaStyle
            : target === 'csharp'
              ? csharpStyle
              : target === 'python'
                ? pythonStyle
                : undefined,
    });
  }, [target, springFamily, tsStyle, javaStyle, csharpStyle, pythonStyle]);

  const compatibility = checkSpringCompatibility(springFamily, javaVersion);
  const springProfile = getSpringBootProfile(springFamily);
  const supportsJava = (version: number) =>
    version >= springProfile.compatibility.javaMin &&
    version <= springProfile.compatibility.javaMax;
  const selectedFile = files[activeFile];
  const generate = useCallback(() => {
    if (!document) return;
    const result = (() => {
      if (target === 'typescript')
        return generateTypeScript(document, { declarationStyle: tsStyle });
      if (target === 'java')
        return generateJava(document, { target: javaStyle });
      if (target === 'csharp')
        return generateCSharp(document, { declarationStyle: csharpStyle });
      if (target === 'python')
        return generatePython(document, { modelStyle: pythonStyle });
      return generateSpring(document, {
        family: springFamily,
        javaVersion,
        idFieldId: idFieldId || undefined,
      });
    })();
    setFiles(result.files);
    setGenerationDiagnostics(result.diagnostics);
    setActiveFile(0);
    setHasGenerated(true);
    setStage('output');
    trackAnalytics({
      name: 'generation_result',
      success: !result.diagnostics.some((item) => item.severity === 'error'),
      target,
      fileCount: result.files.length,
      diagnosticCodes: result.diagnostics.map((item) => item.code),
    });
  }, [
    document,
    target,
    tsStyle,
    javaStyle,
    csharpStyle,
    pythonStyle,
    springFamily,
    javaVersion,
    idFieldId,
  ]);

  useEffect(() => {
    if (hasGenerated) generate();
  }, [hasGenerated, generate]);

  function updateField(
    modelId: string,
    fieldId: string,
    patch: Partial<FieldDefinition>,
  ) {
    if (!document) return;
    const next = structuredClone(document);
    const field = next.models
      .find((model) => model.id === modelId)
      ?.fields.find((item) => item.id === fieldId);
    if (field) Object.assign(field, patch);
    setEditedDocument(next);
    trackAnalytics({ name: 'model_edit', category: 'type' });
  }

  async function copyToClipboard(value: string, scope: 'current' | 'all') {
    await navigator.clipboard.writeText(value);
    trackAnalytics({ name: 'copy_output', target, scope });
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    globalThis.document.documentElement.dataset.theme = next ? 'dark' : 'light';
    localStorage.setItem('modelforge-theme', next ? 'dark' : 'light');
  }

  function changeLocale(next: Locale) {
    setLocale(next);
    localStorage.setItem('modelforge-locale', next);
  }

  const diagnostics = [
    ...(parsed.ok ? (document?.diagnostics ?? []) : parsed.diagnostics),
    ...generationDiagnostics,
  ];
  const incompatible =
    target === 'spring' && compatibility.status === 'incompatible';

  return (
    <main className="forge-shell" data-hydrated={hydrated} lang={locale}>
      {showTargetInfo && (
        <aside className="target-info">
          <Info size={16} aria-hidden="true" />
          <p>{copy.targetInfo[target]}</p>
          <button
            type="button"
            onClick={() => setShowTargetInfo(false)}
            aria-label={copy.dismissInfo}
            title={copy.dismissInfo}
          >
            <X size={15} aria-hidden="true" />
          </button>
        </aside>
      )}
      <section className="control-rail" aria-label={copy.generationControls}>
        <div className="rail-group">
          <span className="eyebrow">{copy.target}</span>
          <select
            aria-label={copy.target}
            value={target}
            onChange={(event) => setTarget(event.target.value as Target)}
          >
            <option value="typescript">TypeScript</option>
            <option value="java">Java</option>
            <option value="spring">Spring Boot</option>
            <option value="csharp">C# / .NET</option>
            <option value="python">Python</option>
          </select>
          {target === 'typescript' && (
            <select
              aria-label={copy.typescriptStyle}
              value={tsStyle}
              onChange={(event) =>
                setTsStyle(event.target.value as TypeScriptDeclarationStyle)
              }
            >
              <option value="interface">{copy.interfaceStyle}</option>
              <option value="type">{copy.typeAliasStyle}</option>
              <option value="class">{copy.classStyle}</option>
            </select>
          )}
          {target === 'java' && (
            <select
              aria-label={copy.javaStyle}
              value={javaStyle}
              onChange={(event) =>
                setJavaStyle(event.target.value as JavaTarget)
              }
            >
              <option value="pojo">POJO</option>
              <option value="record">Record</option>
              <option value="lombok">Lombok</option>
            </select>
          )}
          {target === 'csharp' && (
            <select
              aria-label={copy.csharpStyle}
              value={csharpStyle}
              onChange={(event) =>
                setCsharpStyle(event.target.value as CSharpDeclarationStyle)
              }
            >
              <option value="class">{copy.classStyle}</option>
              <option value="record">{copy.recordStyle}</option>
            </select>
          )}
          {target === 'python' && (
            <select
              aria-label={copy.pythonStyle}
              value={pythonStyle}
              onChange={(event) =>
                setPythonStyle(event.target.value as PythonModelStyle)
              }
            >
              <option value="dataclass">{copy.dataclassStyle}</option>
              <option value="pydantic">Pydantic</option>
            </select>
          )}
          {target === 'spring' && (
            <>
              <select
                aria-label={copy.springBootFamily}
                value={springFamily}
                onChange={(event) => {
                  const nextFamily = event.target.value as SpringBootFamily;
                  const nextProfile = getSpringBootProfile(nextFamily);
                  setSpringFamily(nextFamily);
                  if (
                    javaVersion < nextProfile.compatibility.javaMin ||
                    javaVersion > nextProfile.compatibility.javaMax
                  ) {
                    setJavaVersion(
                      Math.min(21, nextProfile.compatibility.javaMax),
                    );
                  }
                }}
              >
                <option value="3.5">Boot 3.5.x</option>
                <option value="4.1">Boot 4.1.x</option>
              </select>
              <select
                aria-label={copy.javaVersion}
                value={javaVersion}
                onChange={(event) => setJavaVersion(Number(event.target.value))}
              >
                {[11, 17, 21, 25, 26].map((version) => (
                  <option
                    key={version}
                    value={version}
                    disabled={!supportsJava(version)}
                  >
                    Java {version}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>
        <button
          className="reference-switch"
          role="switch"
          aria-checked={showAllReferences}
          onClick={() => setShowAllReferences((visible) => !visible)}
          title={copy.referencesTitle}
        >
          {showAllReferences ? <Eye size={15} /> : <EyeOff size={15} />}
          <span>{copy.references}</span>
          <i aria-hidden="true">
            <b></b>
          </i>
        </button>
        <label className="locale-control">
          <Globe2 size={16} aria-hidden="true" />
          <span className="sr-only">{copy.language}</span>
          <select
            aria-label={copy.language}
            value={locale}
            onChange={(event) => changeLocale(event.target.value as Locale)}
          >
            {LOCALES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <button
          className="icon-button"
          onClick={toggleTheme}
          aria-label={dark ? copy.useLightTheme : copy.useDarkTheme}
          title={dark ? copy.useLightTheme : copy.useDarkTheme}
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </section>

      <nav className="mobile-stages" aria-label={copy.workspaceStages}>
        {(['source', 'model', 'output'] as const).map((item, index) => (
          <button
            key={item}
            aria-current={stage === item ? 'step' : undefined}
            onClick={() => setStage(item)}
          >
            {index + 1} {copy[item]}
          </button>
        ))}
      </nav>

      <section className="inspection-grid" ref={setWorkspaceGrid}>
        <ReferenceOverlay
          container={workspaceGrid}
          references={references}
          activeReferenceId={activeReferenceId}
          showAll={showAllReferences}
          revision={`${source.length}:${selectedFile?.path ?? 'empty'}:${selectedFile?.content.length ?? 0}:${stage}`}
        />
        <article
          className={`inspection-panel source-panel ${stage === 'source' ? 'mobile-active' : ''}`}
        >
          <header className="panel-header">
            <div>
              <span className="panel-index">01</span>
              <Braces size={17} aria-hidden="true" />
              <h2>{copy.source}</h2>
            </div>
            <span className={`signal ${parsed.ok ? 'ok' : 'error'}`}>
              {parsed.ok ? copy.validJson : copy.syntaxError}
            </span>
          </header>
          <div className="local-note">
            <ShieldCheck size={15} />
            <span>
              <strong>{copy.localProcessing}</strong> {copy.localPrivacy}
            </span>
          </div>
          <JsonEditor
            value={source}
            onChange={setSource}
            ariaLabel={copy.jsonEditor}
            dark={dark}
            references={references}
            activeReferenceId={activeReferenceId}
            onReferenceHover={setHoveredReferenceId}
            onReferenceSelect={selectReference}
          />
          <footer className="panel-actions">
            <button
              onClick={() => {
                setSource(EXAMPLE);
                trackAnalytics({
                  name: 'sample_loaded',
                  sampleId: 'example-user',
                });
              }}
            >
              {copy.loadExample}
            </button>
            <button
              onClick={() => {
                setSource('');
                setFiles([]);
                setHasGenerated(false);
              }}
            >
              <X size={14} /> {copy.clear}
            </button>
            <span>{new TextEncoder().encode(source).length} B</span>
          </footer>
        </article>

        <article
          className={`inspection-panel model-panel ${stage === 'model' ? 'mobile-active' : ''}`}
        >
          <header className="panel-header">
            <div>
              <span className="panel-index">02</span>
              <CircuitBoard size={17} aria-hidden="true" />
              <h2 aria-label={copy.modelInspection}>{copy.model}</h2>
            </div>
            <span className="signal">
              {copy.models(document?.models.length ?? 0)}
            </span>
          </header>
          <div className="model-scroll">
            {!parsed.ok && (
              <div className="empty-state">
                <TriangleAlert size={22} />
                <strong>{copy.inferencePaused}</strong>
                <span>{parsed.diagnostics[0]?.message}</span>
              </div>
            )}
            {document?.models.map((model) => (
              <section className="model-card" key={model.id}>
                <header>
                  <input
                    aria-label={copy.modelNameFor(model.sourceName ?? 'root')}
                    value={model.targetName}
                    onChange={(event) => {
                      const next = structuredClone(document);
                      const found = next.models.find(
                        (item) => item.id === model.id,
                      );
                      if (found) found.targetName = event.target.value;
                      setEditedDocument(next);
                    }}
                  />
                  <span>{copy.fields(model.fields.length)}</span>
                </header>
                <div className="field-head">
                  <div className="field-mapping-head">
                    <span className="source-column-label">{copy.source}</span>
                    <span className="target-column-label">{copy.target}</span>
                  </div>
                  <span>{copy.type}</span>
                  <span>{copy.evidence}</span>
                </div>
                {model.fields.map((field) => (
                  <div
                    className={`field-row ${activeReferenceId === field.id ? 'reference-active' : ''}`}
                    key={field.id}
                    data-reference-row={field.id}
                    onMouseEnter={() => setHoveredReferenceId(field.id)}
                    onMouseLeave={() => setHoveredReferenceId(undefined)}
                    onFocusCapture={() => setHoveredReferenceId(field.id)}
                    onBlurCapture={(event) => {
                      if (!event.currentTarget.contains(event.relatedTarget)) {
                        setHoveredReferenceId(undefined);
                      }
                    }}
                  >
                    <div className="field-mapping">
                      <button
                        className="reference-pin"
                        aria-label={(pinnedReferenceId === field.id
                          ? copy.unpinReference
                          : copy.pinReference)(
                          `${model.targetName}.${field.targetName}`,
                        )}
                        title={(pinnedReferenceId === field.id
                          ? copy.unpinReference
                          : copy.pinReference)(
                          `${model.targetName}.${field.targetName}`,
                        )}
                        aria-pressed={pinnedReferenceId === field.id}
                        onClick={() => selectReference(field.id)}
                      >
                        <Link2 size={12} />
                      </button>
                      <code
                        className="source-field-name"
                        title={field.sourceName}
                      >
                        {field.sourceName}
                      </code>
                      <ChevronRight size={13} />
                      <input
                        className="target-field-name"
                        aria-label={copy.generatedNameFor(field.sourceName)}
                        value={field.targetName}
                        onChange={(event) =>
                          updateField(model.id, field.id, {
                            targetName: event.target.value,
                          })
                        }
                      />
                    </div>
                    <select
                      aria-label={copy.typeFor(field.sourceName)}
                      value={
                        field.type.kind === 'scalar'
                          ? field.type.scalar
                          : typeLabel(field)
                      }
                      onChange={(event) =>
                        updateField(model.id, field.id, {
                          type: {
                            kind: 'scalar',
                            scalar: event.target.value as ScalarName,
                          },
                        })
                      }
                    >
                      <option value={typeLabel(field)}>
                        {typeLabel(field)}
                      </option>
                      {['string', 'integer', 'number', 'boolean']
                        .filter((item) => item !== typeLabel(field))
                        .map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                    </select>
                    <div className="evidence">
                      <label>
                        <input
                          type="checkbox"
                          checked={field.required}
                          onChange={(event) =>
                            updateField(model.id, field.id, {
                              required: event.target.checked,
                            })
                          }
                        />{' '}
                        {copy.required}
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          checked={field.nullable}
                          onChange={(event) =>
                            updateField(model.id, field.id, {
                              nullable: event.target.checked,
                            })
                          }
                        />{' '}
                        {copy.nullable}
                      </label>
                      {field.semanticHints[0] && (
                        <span className="hint">
                          {field.semanticHints[0].kind}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </section>
            ))}
          </div>
          {target === 'spring' && document && (
            <div className="spring-options">
              <label>
                {copy.entityIdentifier}
                <select
                  value={idFieldId}
                  onChange={(event) => setIdFieldId(event.target.value)}
                >
                  <option value="">{copy.notSelected}</option>
                  {document.models.flatMap((model) =>
                    model.fields.map((field) => (
                      <option key={field.id} value={field.id}>
                        {model.targetName}.{field.targetName}
                      </option>
                    )),
                  )}
                </select>
              </label>
            </div>
          )}
          {diagnostics.length ? (
            <details className="diagnostic-panel">
              <summary>
                <TriangleAlert size={15} aria-hidden="true" />
                <span>
                  {copy.diagnostics(diagnostics.length)}
                  <small>
                    {diagnostics[0]
                      ? translateDiagnostic(diagnostics[0], locale)
                      : null}
                  </small>
                </span>
                <ChevronDown
                  className="diagnostic-chevron"
                  size={16}
                  aria-hidden="true"
                />
              </summary>
              <ul aria-label={copy.inferenceDiagnostics} aria-live="polite">
                {diagnostics.map((diagnostic, index) => (
                  <li key={`${diagnostic.code}-${index}`}>
                    <span
                      className={`diagnostic-severity ${diagnostic.severity}`}
                    >
                      {copy.severity[diagnostic.severity]}
                    </span>
                    <span>{translateDiagnostic(diagnostic, locale)}</span>
                    <code>{diagnostic.code}</code>
                  </li>
                ))}
              </ul>
            </details>
          ) : (
            <div className="diagnostic-clear" aria-live="polite">
              <Check size={15} aria-hidden="true" />
              <span>{copy.allExplainable}</span>
            </div>
          )}
        </article>

        <article
          className={`inspection-panel output-panel ${stage === 'output' ? 'mobile-active' : ''}`}
        >
          <header className="panel-header">
            <div>
              <span className="panel-index">03</span>
              <Code2 size={17} aria-hidden="true" />
              <h2>{copy.output}</h2>
            </div>
            {files.length > 0 && (
              <span className="signal ok">{copy.files(files.length)}</span>
            )}
          </header>
          {target === 'spring' && (
            <div className={`compatibility ${incompatible ? 'bad' : ''}`}>
              <span>
                {incompatible
                  ? copy.incompatible
                  : `${copy.verified} ${getSpringBootProfile(springFamily).verifiedVersion}`}
              </span>
              <small>
                Spring Boot {springFamily}.x · Java {javaVersion}
              </small>
              {incompatible && (
                <button onClick={() => setJavaVersion(21)}>
                  {copy.useJava21}
                </button>
              )}
            </div>
          )}
          {files.length > 0 ? (
            <>
              <div className="file-tabs" role="tablist">
                {files.map((file, index) => (
                  <button
                    role="tab"
                    aria-selected={activeFile === index}
                    key={file.path}
                    onClick={() => setActiveFile(index)}
                  >
                    {file.path.split('/').at(-1)}
                  </button>
                ))}
              </div>
              <pre
                className="output-code"
                tabIndex={0}
                aria-label={copy.generatedOutput}
              >
                <code>
                  {selectedFile
                    ? referencedCode(
                        selectedFile.content,
                        references,
                        activeReferenceId,
                        setHoveredReferenceId,
                        selectReference,
                        copy.traceGenerated,
                      )
                    : null}
                </code>
              </pre>
              <footer className="output-actions">
                <button
                  onClick={() =>
                    selectedFile &&
                    void copyToClipboard(selectedFile.content, 'current')
                  }
                >
                  {copied ? <Check size={15} /> : <Clipboard size={15} />}
                  {copied ? copy.copied : copy.copyFile}
                </button>
                <button
                  onClick={() =>
                    void copyToClipboard(
                      files
                        .map((file) => `// ${file.path}\n${file.content}`)
                        .join('\n'),
                      'all',
                    )
                  }
                >
                  <Clipboard size={15} /> {copy.copyAll}
                </button>
                <button
                  onClick={() => {
                    if (selectedFile) {
                      download(selectedFile);
                      trackAnalytics({
                        name: 'download_output',
                        target,
                        fileCount: 1,
                      });
                    }
                  }}
                >
                  <Download size={15} /> {copy.download}
                </button>
              </footer>
            </>
          ) : (
            <div className="empty-state output-empty">
              <FileCode2 size={28} />
              <strong>{copy.awaitingGeneration}</strong>
              <span>{copy.awaitingHelp}</span>
            </div>
          )}
        </article>
      </section>

      <section className="commit-bus">
        <div>
          <span className={parsed.ok ? 'contact live' : 'contact'}></span>
          <span>JSON</span>
          <i></i>
          <span className={document ? 'contact live' : 'contact'}></span>
          <span>IR</span>
          <i></i>
          <span className={files.length ? 'contact live' : 'contact'}></span>
          <span>CODE</span>
        </div>
        <span className="reference-readout" aria-live="polite">
          {activeReference ? (
            <>
              <Link2 size={13} />
              {activeReference.sourceName} → {activeReference.modelName}.
              {activeReference.targetName}
              {pinnedReferenceId === activeReference.id
                ? ` · ${copy.pinned}`
                : ''}
            </>
          ) : (
            copy.hoverRoute
          )}
        </span>
        <button
          className="generate-button"
          disabled={!document || incompatible}
          onClick={generate}
        >
          <Play size={17} fill="currentColor" /> {copy.generate}
        </button>
        <button
          className="reset-button"
          onClick={() => {
            setSource(EXAMPLE);
            setFiles([]);
            setHasGenerated(false);
            setGenerationDiagnostics([]);
          }}
        >
          <RotateCcw size={15} /> {copy.reset}
        </button>
      </section>
    </main>
  );
}
