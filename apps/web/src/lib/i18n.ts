export const LOCALES = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
  { value: 'pt-BR', label: 'Português' },
  { value: 'de', label: 'Deutsch' },
  { value: 'ru', label: 'Русский' },
  { value: 'zh-CN', label: '简体中文' },
  { value: 'ja', label: '日本語' },
  { value: 'ko', label: '한국어' },
] as const;

export type Locale = (typeof LOCALES)[number]['value'];

export interface WorkspaceMessages {
  language: string;
  generationControls: string;
  target: string;
  typescriptStyle: string;
  interfaceStyle: string;
  typeAliasStyle: string;
  classStyle: string;
  recordStyle: string;
  dataclassStyle: string;
  csharpStyle: string;
  pythonStyle: string;
  javaStyle: string;
  springBootFamily: string;
  javaVersion: string;
  references: string;
  referencesTitle: string;
  useLightTheme: string;
  useDarkTheme: string;
  workspaceStages: string;
  source: string;
  model: string;
  output: string;
  validJson: string;
  syntaxError: string;
  jsonEditor: string;
  localProcessing: string;
  localPrivacy: string;
  loadExample: string;
  clear: string;
  modelInspection: string;
  inferencePaused: string;
  sourceTarget: string;
  type: string;
  evidence: string;
  required: string;
  nullable: string;
  entityIdentifier: string;
  notSelected: string;
  inferenceDiagnostics: string;
  allExplainable: string;
  incompatible: string;
  verified: string;
  useJava21: string;
  generatedOutput: string;
  copied: string;
  copyFile: string;
  copyAll: string;
  download: string;
  awaitingGeneration: string;
  awaitingHelp: string;
  hoverRoute: string;
  pinned: string;
  generate: string;
  reset: string;
  dismissInfo: string;
  targetInfo: Record<
    'typescript' | 'java' | 'spring' | 'csharp' | 'python',
    string
  >;
  severity: Record<'error' | 'warning' | 'info', string>;
  models: (count: number) => string;
  fields: (count: number) => string;
  diagnostics: (count: number) => string;
  files: (count: number) => string;
  modelNameFor: (name: string) => string;
  generatedNameFor: (name: string) => string;
  typeFor: (name: string) => string;
  pinReference: (name: string) => string;
  unpinReference: (name: string) => string;
  traceGenerated: (name: string) => string;
}

const en: WorkspaceMessages = {
  language: 'Interface language',
  generationControls: 'Generation controls',
  target: 'Target',
  typescriptStyle: 'TypeScript style',
  interfaceStyle: 'Interface',
  typeAliasStyle: 'Type alias',
  classStyle: 'Class',
  recordStyle: 'Record',
  dataclassStyle: 'Data class',
  csharpStyle: 'C# style',
  pythonStyle: 'Python style',
  javaStyle: 'Java style',
  springBootFamily: 'Spring Boot family',
  javaVersion: 'Java version',
  references: 'References',
  referencesTitle:
    'Show every field reference; hovered and pinned references remain available when off',
  useLightTheme: 'Use light theme',
  useDarkTheme: 'Use dark theme',
  workspaceStages: 'Workspace stages',
  source: 'Source',
  model: 'Model',
  output: 'Output',
  validJson: 'VALID JSON',
  syntaxError: 'SYNTAX ERROR',
  jsonEditor: 'JSON source editor',
  localProcessing: 'Local processing.',
  localPrivacy: 'Your JSON stays in this browser.',
  loadExample: 'Load example',
  clear: 'Clear',
  modelInspection: 'Model inspection',
  inferencePaused: 'Inference paused',
  sourceTarget: 'Source → target',
  type: 'Type',
  evidence: 'Evidence',
  required: 'required',
  nullable: 'nullable',
  entityIdentifier: 'Entity identifier',
  notSelected: 'Not selected',
  inferenceDiagnostics: 'Inference diagnostics',
  allExplainable: 'All evidence is explainable.',
  incompatible: 'INCOMPATIBLE',
  verified: 'VERIFIED',
  useJava21: 'Use Java 21',
  generatedOutput: 'Generated output',
  copied: 'Copied',
  copyFile: 'Copy file',
  copyAll: 'Copy all',
  download: 'Download',
  awaitingGeneration: 'Awaiting generation',
  awaitingHelp: 'Inspect the model, choose a target, then commit the route.',
  hoverRoute: 'Hover a field to inspect its route',
  pinned: 'PINNED',
  generate: 'Generate',
  reset: 'Reset',
  dismissInfo: 'Dismiss target information',
  targetInfo: {
    typescript:
      'Generate interfaces, type aliases, or classes from inspectable JSON inference—locally and deterministically.',
    java: 'Generate POJOs, records, or Lombok models from inspectable JSON inference—locally and deterministically.',
    spring:
      'Generate version-profiled JPA entities, DTOs, and Spring Data repositories from inspectable JSON inference.',
    csharp:
      'Generate nullable-aware C# classes or records with System.Text.Json property mappings.',
    python:
      'Generate Python data classes or Pydantic models with explicit optional, nullable, alias, and date policies.',
  },
  severity: { error: 'error', warning: 'warning', info: 'info' },
  models: (count) => `${count} ${count === 1 ? 'MODEL' : 'MODELS'}`,
  fields: (count) => `${count} ${count === 1 ? 'field' : 'fields'}`,
  diagnostics: (count) =>
    `${count} ${count === 1 ? 'diagnostic' : 'diagnostics'}`,
  files: (count) => `${count} ${count === 1 ? 'FILE' : 'FILES'}`,
  modelNameFor: (name) => `Model name for ${name}`,
  generatedNameFor: (name) => `Generated name for ${name}`,
  typeFor: (name) => `Type for ${name}`,
  pinReference: (name) => `Pin reference ${name}`,
  unpinReference: (name) => `Unpin reference ${name}`,
  traceGenerated: (name) => `Trace generated property ${name}`,
};

const es: WorkspaceMessages = {
  ...en,
  language: 'Idioma de la interfaz',
  generationControls: 'Controles de generación',
  target: 'Destino',
  typescriptStyle: 'Estilo de TypeScript',
  interfaceStyle: 'Interfaz',
  typeAliasStyle: 'Alias de tipo',
  classStyle: 'Clase',
  recordStyle: 'Record',
  dataclassStyle: 'Clase de datos',
  csharpStyle: 'Estilo de C#',
  pythonStyle: 'Estilo de Python',
  javaStyle: 'Estilo de Java',
  springBootFamily: 'Familia de Spring Boot',
  javaVersion: 'Versión de Java',
  references: 'Referencias',
  referencesTitle:
    'Mostrar todas las referencias; las referencias resaltadas o fijadas siguen disponibles al desactivarlo',
  useLightTheme: 'Usar tema claro',
  useDarkTheme: 'Usar tema oscuro',
  workspaceStages: 'Etapas del workspace',
  source: 'Origen',
  model: 'Modelo',
  output: 'Resultado',
  validJson: 'JSON VÁLIDO',
  syntaxError: 'ERROR DE SINTAXIS',
  jsonEditor: 'Editor de JSON de origen',
  localProcessing: 'Procesamiento local.',
  localPrivacy: 'Tu JSON permanece en este navegador.',
  loadExample: 'Cargar ejemplo',
  clear: 'Limpiar',
  modelInspection: 'Inspección del modelo',
  inferencePaused: 'Inferencia en pausa',
  sourceTarget: 'Origen → destino',
  type: 'Tipo',
  evidence: 'Evidencia',
  required: 'obligatorio',
  nullable: 'admite null',
  entityIdentifier: 'Identificador de entidad',
  notSelected: 'Sin seleccionar',
  inferenceDiagnostics: 'Diagnósticos de inferencia',
  allExplainable: 'Toda la evidencia es explicable.',
  incompatible: 'INCOMPATIBLE',
  verified: 'VERIFICADO',
  useJava21: 'Usar Java 21',
  generatedOutput: 'Código generado',
  copied: 'Copiado',
  copyFile: 'Copiar archivo',
  copyAll: 'Copiar todo',
  download: 'Descargar',
  awaitingGeneration: 'Esperando generación',
  awaitingHelp: 'Revisa el modelo, elige un destino y genera el código.',
  hoverRoute: 'Pasa por un campo para inspeccionar su ruta',
  pinned: 'FIJADA',
  generate: 'Generar',
  reset: 'Restablecer',
  dismissInfo: 'Cerrar información del destino',
  targetInfo: {
    typescript:
      'Genera interfaces, alias de tipo o clases desde una inferencia JSON inspeccionable, local y determinista.',
    java: 'Genera POJO, records o modelos Lombok desde una inferencia JSON inspeccionable, local y determinista.',
    spring:
      'Genera entidades JPA, DTO y repositorios Spring Data con perfiles de versión desde una inferencia JSON inspeccionable.',
    csharp:
      'Genera clases o records de C# con nulabilidad explícita y mapeos de propiedades de System.Text.Json.',
    python:
      'Genera clases de datos o modelos Pydantic con políticas explícitas de opcionalidad, null, alias y fechas.',
  },
  severity: { error: 'error', warning: 'aviso', info: 'info' },
  models: (count) => `${count} ${count === 1 ? 'MODELO' : 'MODELOS'}`,
  fields: (count) => `${count} ${count === 1 ? 'campo' : 'campos'}`,
  diagnostics: (count) =>
    `${count} ${count === 1 ? 'diagnóstico' : 'diagnósticos'}`,
  files: (count) => `${count} ${count === 1 ? 'ARCHIVO' : 'ARCHIVOS'}`,
  modelNameFor: (name) => `Nombre del modelo para ${name}`,
  generatedNameFor: (name) => `Nombre generado para ${name}`,
  typeFor: (name) => `Tipo de ${name}`,
  pinReference: (name) => `Fijar referencia ${name}`,
  unpinReference: (name) => `Soltar referencia ${name}`,
  traceGenerated: (name) => `Rastrear propiedad generada ${name}`,
};

const ptBR: WorkspaceMessages = {
  ...en,
  language: 'Idioma da interface',
  generationControls: 'Controles de geração',
  target: 'Destino',
  typescriptStyle: 'Estilo do TypeScript',
  interfaceStyle: 'Interface',
  typeAliasStyle: 'Alias de tipo',
  classStyle: 'Classe',
  recordStyle: 'Record',
  dataclassStyle: 'Classe de dados',
  csharpStyle: 'Estilo do C#',
  pythonStyle: 'Estilo do Python',
  javaStyle: 'Estilo do Java',
  springBootFamily: 'Família do Spring Boot',
  javaVersion: 'Versão do Java',
  references: 'Referências',
  referencesTitle: 'Mostrar todas as referências de campos',
  useLightTheme: 'Usar tema claro',
  useDarkTheme: 'Usar tema escuro',
  workspaceStages: 'Etapas do workspace',
  source: 'Origem',
  model: 'Modelo',
  output: 'Saída',
  validJson: 'JSON VÁLIDO',
  syntaxError: 'ERRO DE SINTAXE',
  jsonEditor: 'Editor de JSON de origem',
  localProcessing: 'Processamento local.',
  localPrivacy: 'Seu JSON permanece neste navegador.',
  loadExample: 'Carregar exemplo',
  clear: 'Limpar',
  modelInspection: 'Inspeção do modelo',
  inferencePaused: 'Inferência pausada',
  sourceTarget: 'Origem → destino',
  type: 'Tipo',
  evidence: 'Evidência',
  required: 'obrigatório',
  nullable: 'aceita null',
  entityIdentifier: 'Identificador da entidade',
  notSelected: 'Não selecionado',
  inferenceDiagnostics: 'Diagnósticos de inferência',
  allExplainable: 'Toda evidência é explicável.',
  incompatible: 'INCOMPATÍVEL',
  verified: 'VERIFICADO',
  useJava21: 'Usar Java 21',
  generatedOutput: 'Código gerado',
  copied: 'Copiado',
  copyFile: 'Copiar arquivo',
  copyAll: 'Copiar tudo',
  download: 'Baixar',
  awaitingGeneration: 'Aguardando geração',
  awaitingHelp: 'Revise o modelo, escolha um destino e gere o código.',
  hoverRoute: 'Passe sobre um campo para inspecionar sua rota',
  pinned: 'FIXADA',
  generate: 'Gerar',
  reset: 'Redefinir',
  dismissInfo: 'Fechar informações do destino',
  targetInfo: {
    typescript:
      'Gere interfaces, aliases de tipo ou classes a partir de inferência JSON inspecionável, local e determinística.',
    java: 'Gere POJOs, records ou modelos Lombok a partir de inferência JSON inspecionável, local e determinística.',
    spring:
      'Gere entidades JPA, DTOs e repositórios Spring Data com perfis de versão a partir de inferência JSON inspecionável.',
    csharp:
      'Gere classes ou records C# com nulabilidade explícita e mapeamentos System.Text.Json.',
    python:
      'Gere classes de dados ou modelos Pydantic com políticas explícitas de opcionalidade, null, alias e datas.',
  },
  severity: { error: 'erro', warning: 'aviso', info: 'info' },
  models: (count) => `${count} ${count === 1 ? 'MODELO' : 'MODELOS'}`,
  fields: (count) => `${count} ${count === 1 ? 'campo' : 'campos'}`,
  diagnostics: (count) =>
    `${count} ${count === 1 ? 'diagnóstico' : 'diagnósticos'}`,
  files: (count) => `${count} ${count === 1 ? 'ARQUIVO' : 'ARQUIVOS'}`,
  modelNameFor: (name) => `Nome do modelo para ${name}`,
  generatedNameFor: (name) => `Nome gerado para ${name}`,
  typeFor: (name) => `Tipo de ${name}`,
  pinReference: (name) => `Fixar referência ${name}`,
  unpinReference: (name) => `Soltar referência ${name}`,
  traceGenerated: (name) => `Rastrear propriedade gerada ${name}`,
};

const de: WorkspaceMessages = {
  ...en,
  language: 'Sprache der Oberfläche',
  generationControls: 'Generierungssteuerung',
  target: 'Ziel',
  typescriptStyle: 'TypeScript-Stil',
  interfaceStyle: 'Schnittstelle',
  typeAliasStyle: 'Typalias',
  classStyle: 'Klasse',
  recordStyle: 'Record',
  dataclassStyle: 'Datenklasse',
  csharpStyle: 'C#-Stil',
  pythonStyle: 'Python-Stil',
  javaStyle: 'Java-Stil',
  springBootFamily: 'Spring-Boot-Familie',
  javaVersion: 'Java-Version',
  references: 'Referenzen',
  referencesTitle: 'Alle Feldreferenzen anzeigen',
  useLightTheme: 'Helles Design verwenden',
  useDarkTheme: 'Dunkles Design verwenden',
  workspaceStages: 'Arbeitsbereichsschritte',
  source: 'Quelle',
  model: 'Modell',
  output: 'Ausgabe',
  validJson: 'GÜLTIGES JSON',
  syntaxError: 'SYNTAXFEHLER',
  jsonEditor: 'JSON-Quelleditor',
  localProcessing: 'Lokale Verarbeitung.',
  localPrivacy: 'Dein JSON bleibt in diesem Browser.',
  loadExample: 'Beispiel laden',
  clear: 'Leeren',
  modelInspection: 'Modellprüfung',
  inferencePaused: 'Inferenz pausiert',
  sourceTarget: 'Quelle → Ziel',
  type: 'Typ',
  evidence: 'Evidenz',
  required: 'erforderlich',
  nullable: 'null zulässig',
  entityIdentifier: 'Entitätskennung',
  notSelected: 'Nicht ausgewählt',
  inferenceDiagnostics: 'Inferenzdiagnosen',
  allExplainable: 'Alle Evidenzen sind erklärbar.',
  incompatible: 'INKOMPATIBEL',
  verified: 'VERIFIZIERT',
  useJava21: 'Java 21 verwenden',
  generatedOutput: 'Generierter Code',
  copied: 'Kopiert',
  copyFile: 'Datei kopieren',
  copyAll: 'Alles kopieren',
  download: 'Herunterladen',
  awaitingGeneration: 'Warten auf Generierung',
  awaitingHelp: 'Modell prüfen, Ziel wählen und Code generieren.',
  hoverRoute: 'Feld berühren, um seine Route zu prüfen',
  pinned: 'FIXIERT',
  generate: 'Generieren',
  reset: 'Zurücksetzen',
  dismissInfo: 'Zielinformation schließen',
  targetInfo: {
    typescript:
      'Erzeugt Schnittstellen, Typaliase oder Klassen aus überprüfbarer JSON-Inferenz – lokal und deterministisch.',
    java: 'Erzeugt POJOs, Records oder Lombok-Modelle aus überprüfbarer JSON-Inferenz – lokal und deterministisch.',
    spring:
      'Erzeugt JPA-Entitäten, DTOs und Spring-Data-Repositories mit Versionsprofilen aus überprüfbarer JSON-Inferenz.',
    csharp:
      'Erzeugt nullfähige C#-Klassen oder Records mit System.Text.Json-Eigenschaftszuordnung.',
    python:
      'Erzeugt Python-Datenklassen oder Pydantic-Modelle mit expliziten Richtlinien für Optionalität, null, Aliase und Datumswerte.',
  },
  severity: { error: 'Fehler', warning: 'Warnung', info: 'Info' },
  models: (count) => `${count} ${count === 1 ? 'MODELL' : 'MODELLE'}`,
  fields: (count) => `${count} ${count === 1 ? 'Feld' : 'Felder'}`,
  diagnostics: (count) => `${count} ${count === 1 ? 'Diagnose' : 'Diagnosen'}`,
  files: (count) => `${count} ${count === 1 ? 'DATEI' : 'DATEIEN'}`,
  modelNameFor: (name) => `Modellname für ${name}`,
  generatedNameFor: (name) => `Generierter Name für ${name}`,
  typeFor: (name) => `Typ für ${name}`,
  pinReference: (name) => `Referenz ${name} fixieren`,
  unpinReference: (name) => `Fixierung für ${name} lösen`,
  traceGenerated: (name) => `Generierte Eigenschaft ${name} verfolgen`,
};

const ru: WorkspaceMessages = {
  ...en,
  language: 'Язык интерфейса',
  generationControls: 'Параметры генерации',
  target: 'Цель',
  typescriptStyle: 'Стиль TypeScript',
  interfaceStyle: 'Интерфейс',
  typeAliasStyle: 'Псевдоним типа',
  classStyle: 'Класс',
  recordStyle: 'Record',
  dataclassStyle: 'Класс данных',
  csharpStyle: 'Стиль C#',
  pythonStyle: 'Стиль Python',
  javaStyle: 'Стиль Java',
  springBootFamily: 'Версия Spring Boot',
  javaVersion: 'Версия Java',
  references: 'Связи',
  referencesTitle: 'Показать все связи полей',
  useLightTheme: 'Использовать светлую тему',
  useDarkTheme: 'Использовать тёмную тему',
  workspaceStages: 'Этапы рабочей области',
  source: 'Источник',
  model: 'Модель',
  output: 'Результат',
  validJson: 'JSON КОРРЕКТЕН',
  syntaxError: 'ОШИБКА СИНТАКСИСА',
  jsonEditor: 'Редактор исходного JSON',
  localProcessing: 'Локальная обработка.',
  localPrivacy: 'Ваш JSON остаётся в этом браузере.',
  loadExample: 'Загрузить пример',
  clear: 'Очистить',
  modelInspection: 'Проверка модели',
  inferencePaused: 'Анализ приостановлен',
  sourceTarget: 'Источник → цель',
  type: 'Тип',
  evidence: 'Данные',
  required: 'обязательно',
  nullable: 'допускает null',
  entityIdentifier: 'Идентификатор сущности',
  notSelected: 'Не выбрано',
  inferenceDiagnostics: 'Диагностика анализа',
  allExplainable: 'Все данные объяснимы.',
  incompatible: 'НЕСОВМЕСТИМО',
  verified: 'ПРОВЕРЕНО',
  useJava21: 'Использовать Java 21',
  generatedOutput: 'Сгенерированный код',
  copied: 'Скопировано',
  copyFile: 'Копировать файл',
  copyAll: 'Копировать всё',
  download: 'Скачать',
  awaitingGeneration: 'Ожидание генерации',
  awaitingHelp: 'Проверьте модель, выберите цель и создайте код.',
  hoverRoute: 'Наведите на поле, чтобы увидеть его маршрут',
  pinned: 'ЗАКРЕПЛЕНО',
  generate: 'Создать',
  reset: 'Сбросить',
  dismissInfo: 'Закрыть информацию о цели',
  targetInfo: {
    typescript:
      'Создавайте интерфейсы, псевдонимы типов или классы из проверяемого вывода JSON — локально и детерминированно.',
    java: 'Создавайте POJO, records или модели Lombok из проверяемого вывода JSON — локально и детерминированно.',
    spring:
      'Создавайте JPA-сущности, DTO и репозитории Spring Data с профилями версий из проверяемого вывода JSON.',
    csharp:
      'Создавайте C#-классы или records с явной поддержкой null и сопоставлением свойств System.Text.Json.',
    python:
      'Создавайте классы данных Python или модели Pydantic с явными правилами optional, null, псевдонимов и дат.',
  },
  severity: { error: 'ошибка', warning: 'предупреждение', info: 'инфо' },
  models: (count) => `${count} МОДЕЛЕЙ`,
  fields: (count) => `${count} ПОЛЕЙ`,
  diagnostics: (count) => `${count} ДИАГНОСТИК`,
  files: (count) => `${count} ФАЙЛОВ`,
  modelNameFor: (name) => `Имя модели для ${name}`,
  generatedNameFor: (name) => `Сгенерированное имя для ${name}`,
  typeFor: (name) => `Тип для ${name}`,
  pinReference: (name) => `Закрепить связь ${name}`,
  unpinReference: (name) => `Открепить связь ${name}`,
  traceGenerated: (name) => `Проследить свойство ${name}`,
};

const zhCN: WorkspaceMessages = {
  ...en,
  language: '界面语言',
  generationControls: '生成控制',
  target: '目标',
  typescriptStyle: 'TypeScript 样式',
  interfaceStyle: '接口',
  typeAliasStyle: '类型别名',
  classStyle: '类',
  recordStyle: 'Record',
  dataclassStyle: '数据类',
  csharpStyle: 'C# 样式',
  pythonStyle: 'Python 样式',
  javaStyle: 'Java 样式',
  springBootFamily: 'Spring Boot 版本系列',
  javaVersion: 'Java 版本',
  references: '字段关联',
  referencesTitle: '显示所有字段关联',
  useLightTheme: '使用浅色主题',
  useDarkTheme: '使用深色主题',
  workspaceStages: '工作区步骤',
  source: '源数据',
  model: '模型',
  output: '输出',
  validJson: 'JSON 有效',
  syntaxError: '语法错误',
  jsonEditor: 'JSON 源码编辑器',
  localProcessing: '本地处理。',
  localPrivacy: '你的 JSON 仅保留在此浏览器中。',
  loadExample: '加载示例',
  clear: '清空',
  modelInspection: '模型检查',
  inferencePaused: '推断已暂停',
  sourceTarget: '源名称 → 目标名称',
  type: '类型',
  evidence: '依据',
  required: '必填',
  nullable: '允许 null',
  entityIdentifier: '实体标识符',
  notSelected: '未选择',
  inferenceDiagnostics: '推断诊断',
  allExplainable: '所有推断依据均可解释。',
  incompatible: '不兼容',
  verified: '已验证',
  useJava21: '使用 Java 21',
  generatedOutput: '生成的代码',
  copied: '已复制',
  copyFile: '复制文件',
  copyAll: '全部复制',
  download: '下载',
  awaitingGeneration: '等待生成',
  awaitingHelp: '检查模型、选择目标，然后生成代码。',
  hoverRoute: '悬停字段以查看其关联路径',
  pinned: '已固定',
  generate: '生成',
  reset: '重置',
  dismissInfo: '关闭目标信息',
  targetInfo: {
    typescript: '根据可检查的 JSON 推断在本地确定性地生成接口、类型别名或类。',
    java: '根据可检查的 JSON 推断在本地确定性地生成 POJO、record 或 Lombok 模型。',
    spring:
      '根据可检查的 JSON 推断生成带版本配置的 JPA 实体、DTO 和 Spring Data 仓库。',
    csharp: '生成支持可空类型和 System.Text.Json 属性映射的 C# 类或 record。',
    python:
      '生成具有明确可选、可空、别名和日期策略的 Python 数据类或 Pydantic 模型。',
  },
  severity: { error: '错误', warning: '警告', info: '信息' },
  models: (count) => `${count} 个模型`,
  fields: (count) => `${count} 个字段`,
  diagnostics: (count) => `${count} 条诊断`,
  files: (count) => `${count} 个文件`,
  modelNameFor: (name) => `${name} 的模型名称`,
  generatedNameFor: (name) => `${name} 的生成名称`,
  typeFor: (name) => `${name} 的类型`,
  pinReference: (name) => `固定关联 ${name}`,
  unpinReference: (name) => `取消固定关联 ${name}`,
  traceGenerated: (name) => `追踪生成属性 ${name}`,
};

const ja: WorkspaceMessages = {
  ...en,
  language: '表示言語',
  generationControls: '生成コントロール',
  target: 'ターゲット',
  typescriptStyle: 'TypeScript スタイル',
  interfaceStyle: 'インターフェース',
  typeAliasStyle: '型エイリアス',
  classStyle: 'クラス',
  recordStyle: 'Record',
  dataclassStyle: 'データクラス',
  csharpStyle: 'C# スタイル',
  pythonStyle: 'Python スタイル',
  javaStyle: 'Java スタイル',
  springBootFamily: 'Spring Boot 系列',
  javaVersion: 'Java バージョン',
  references: '参照',
  referencesTitle: 'すべてのフィールド参照を表示',
  useLightTheme: 'ライトテーマを使用',
  useDarkTheme: 'ダークテーマを使用',
  workspaceStages: 'ワークスペースの手順',
  source: 'ソース',
  model: 'モデル',
  output: '出力',
  validJson: '有効な JSON',
  syntaxError: '構文エラー',
  jsonEditor: 'JSON ソースエディター',
  localProcessing: 'ローカル処理。',
  localPrivacy: 'JSON はこのブラウザー内に保持されます。',
  loadExample: '例を読み込む',
  clear: 'クリア',
  modelInspection: 'モデル検査',
  inferencePaused: '推論を一時停止',
  sourceTarget: 'ソース → ターゲット',
  type: '型',
  evidence: '根拠',
  required: '必須',
  nullable: 'null 許可',
  entityIdentifier: 'エンティティ識別子',
  notSelected: '未選択',
  inferenceDiagnostics: '推論診断',
  allExplainable: 'すべての根拠を説明できます。',
  incompatible: '非互換',
  verified: '検証済み',
  useJava21: 'Java 21 を使用',
  generatedOutput: '生成コード',
  copied: 'コピー済み',
  copyFile: 'ファイルをコピー',
  copyAll: 'すべてコピー',
  download: 'ダウンロード',
  awaitingGeneration: '生成待ち',
  awaitingHelp: 'モデルを確認し、ターゲットを選んで生成します。',
  hoverRoute: 'フィールドにカーソルを合わせて経路を確認',
  pinned: '固定済み',
  generate: '生成',
  reset: 'リセット',
  dismissInfo: 'ターゲット情報を閉じる',
  targetInfo: {
    typescript:
      '検査可能な JSON 推論から、ローカルかつ決定的にインターフェース、型エイリアス、クラスを生成します。',
    java: '検査可能な JSON 推論から、ローカルかつ決定的に POJO、record、Lombok モデルを生成します。',
    spring:
      '検査可能な JSON 推論から、バージョンプロファイル付きの JPA エンティティ、DTO、Spring Data リポジトリを生成します。',
    csharp:
      'null 許容を明示した C# クラスまたは record と System.Text.Json のプロパティ対応を生成します。',
    python:
      'optional、null、エイリアス、日付の方針を明示した Python データクラスまたは Pydantic モデルを生成します。',
  },
  severity: { error: 'エラー', warning: '警告', info: '情報' },
  models: (count) => `${count} モデル`,
  fields: (count) => `${count} フィールド`,
  diagnostics: (count) => `${count} 件の診断`,
  files: (count) => `${count} ファイル`,
  modelNameFor: (name) => `${name} のモデル名`,
  generatedNameFor: (name) => `${name} の生成名`,
  typeFor: (name) => `${name} の型`,
  pinReference: (name) => `参照 ${name} を固定`,
  unpinReference: (name) => `参照 ${name} の固定を解除`,
  traceGenerated: (name) => `生成プロパティ ${name} を追跡`,
};

const ko: WorkspaceMessages = {
  ...en,
  language: '인터페이스 언어',
  generationControls: '생성 제어',
  target: '대상',
  typescriptStyle: 'TypeScript 스타일',
  interfaceStyle: '인터페이스',
  typeAliasStyle: '타입 별칭',
  classStyle: '클래스',
  recordStyle: 'Record',
  dataclassStyle: '데이터 클래스',
  csharpStyle: 'C# 스타일',
  pythonStyle: 'Python 스타일',
  javaStyle: 'Java 스타일',
  springBootFamily: 'Spring Boot 계열',
  javaVersion: 'Java 버전',
  references: '참조',
  referencesTitle: '모든 필드 참조 표시',
  useLightTheme: '라이트 테마 사용',
  useDarkTheme: '다크 테마 사용',
  workspaceStages: '작업 공간 단계',
  source: '소스',
  model: '모델',
  output: '출력',
  validJson: '유효한 JSON',
  syntaxError: '구문 오류',
  jsonEditor: 'JSON 소스 편집기',
  localProcessing: '로컬 처리.',
  localPrivacy: 'JSON은 이 브라우저 안에만 유지됩니다.',
  loadExample: '예제 불러오기',
  clear: '지우기',
  modelInspection: '모델 검사',
  inferencePaused: '추론 일시 중지',
  sourceTarget: '소스 → 대상',
  type: '타입',
  evidence: '근거',
  required: '필수',
  nullable: 'null 허용',
  entityIdentifier: '엔터티 식별자',
  notSelected: '선택하지 않음',
  inferenceDiagnostics: '추론 진단',
  allExplainable: '모든 근거를 설명할 수 있습니다.',
  incompatible: '호환되지 않음',
  verified: '검증됨',
  useJava21: 'Java 21 사용',
  generatedOutput: '생성된 코드',
  copied: '복사됨',
  copyFile: '파일 복사',
  copyAll: '모두 복사',
  download: '다운로드',
  awaitingGeneration: '생성 대기 중',
  awaitingHelp: '모델을 검토하고 대상을 선택한 후 코드를 생성하세요.',
  hoverRoute: '필드에 마우스를 올려 경로 확인',
  pinned: '고정됨',
  generate: '생성',
  reset: '초기화',
  dismissInfo: '대상 정보 닫기',
  targetInfo: {
    typescript:
      '검사 가능한 JSON 추론에서 인터페이스, 타입 별칭 또는 클래스를 로컬에서 결정적으로 생성합니다.',
    java: '검사 가능한 JSON 추론에서 POJO, record 또는 Lombok 모델을 로컬에서 결정적으로 생성합니다.',
    spring:
      '검사 가능한 JSON 추론에서 버전 프로필이 적용된 JPA 엔터티, DTO 및 Spring Data 리포지토리를 생성합니다.',
    csharp:
      'nullable 정책과 System.Text.Json 속성 매핑을 포함한 C# 클래스 또는 record를 생성합니다.',
    python:
      'optional, null, 별칭 및 날짜 정책이 명시된 Python 데이터 클래스 또는 Pydantic 모델을 생성합니다.',
  },
  severity: { error: '오류', warning: '경고', info: '정보' },
  models: (count) => `${count}개 모델`,
  fields: (count) => `${count}개 필드`,
  diagnostics: (count) => `${count}개 진단`,
  files: (count) => `${count}개 파일`,
  modelNameFor: (name) => `${name} 모델 이름`,
  generatedNameFor: (name) => `${name} 생성 이름`,
  typeFor: (name) => `${name} 타입`,
  pinReference: (name) => `${name} 참조 고정`,
  unpinReference: (name) => `${name} 참조 고정 해제`,
  traceGenerated: (name) => `${name} 생성 속성 추적`,
};

export const WORKSPACE_MESSAGES: Record<Locale, WorkspaceMessages> = {
  en,
  es,
  'pt-BR': ptBR,
  de,
  ru,
  'zh-CN': zhCN,
  ja,
  ko,
};

export function resolveLocale(languages: readonly string[]): Locale {
  for (const language of languages) {
    const normalized = language.toLowerCase();
    if (normalized.startsWith('pt')) return 'pt-BR';
    if (normalized.startsWith('zh')) return 'zh-CN';
    const match = LOCALES.find(
      (locale) => locale.value.toLowerCase() === normalized.split('-')[0],
    );
    if (match) return match.value;
  }
  return 'en';
}

export function isLocale(value: string | null): value is Locale {
  return LOCALES.some((locale) => locale.value === value);
}
