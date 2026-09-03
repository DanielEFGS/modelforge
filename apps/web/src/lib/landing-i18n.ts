import type { Locale } from './i18n';

export type LandingKind =
  'home' | 'typescript' | 'java' | 'spring' | 'csharp' | 'python';

export interface LandingTranslation {
  compilerNotes: string;
  title: string;
  body: string;
  notes: [string, string, string];
  commonQuestions: string;
  faq: [[string, string], [string, string]];
  relatedConverters: string;
}

type LocalizedTemplate = Omit<LandingTranslation, 'title' | 'body'> & {
  targets: Record<LandingKind, string>;
  title: (target: string) => string;
  body: (target: string) => string;
};

const translations: Record<Exclude<Locale, 'en'>, LocalizedTemplate> = {
  es: {
    targets: {
      home: 'modelos de código',
      typescript: 'TypeScript',
      java: 'Java',
      spring: 'Spring Boot',
      csharp: 'C#',
      python: 'Python',
    },
    compilerNotes: 'NOTAS DEL COMPILADOR',
    title: (target) => `Cómo ModelForge compila JSON para ${target}`,
    body: (target) =>
      `ModelForge primero convierte JSON en un modelo intermedio universal y después genera ${target}. Puedes inspeccionar nombres, tipos, opcionalidad, evidencia de valores null y pistas semánticas antes de ejecutar el generador.`,
    notes: [
      'Un único IR alimenta todos los destinos compatibles.',
      'La misma entrada y las mismas opciones producen una salida equivalente byte a byte.',
      'No intervienen cuentas, servidores ni servicios de conversión con IA.',
    ],
    commonQuestions: 'Preguntas frecuentes',
    faq: [
      [
        '¿Mi JSON sale del navegador?',
        'No. El análisis, la inferencia, la edición y la generación de código se ejecutan localmente en el navegador.',
      ],
      [
        '¿Puedo revisar una inferencia incierta?',
        'Sí. Los arrays vacíos, campos que solo contienen null, evidencias mixtas y nombres normalizados permanecen visibles como diagnósticos.',
      ],
    ],
    relatedConverters: 'Conversores relacionados',
  },
  'pt-BR': {
    targets: {
      home: 'modelos de código',
      typescript: 'TypeScript',
      java: 'Java',
      spring: 'Spring Boot',
      csharp: 'C#',
      python: 'Python',
    },
    compilerNotes: 'NOTAS DO COMPILADOR',
    title: (target) => `Como o ModelForge compila JSON para ${target}`,
    body: (target) =>
      `O ModelForge primeiro converte JSON em um modelo intermediário universal e depois gera ${target}. Você pode inspecionar nomes, tipos, opcionalidade, evidências de valores null e dicas semânticas antes de executar o gerador.`,
    notes: [
      'Um único IR alimenta todos os destinos compatíveis.',
      'A mesma entrada e as mesmas opções produzem uma saída equivalente byte a byte.',
      'Nenhuma conta, servidor ou serviço de conversão por IA está envolvido.',
    ],
    commonQuestions: 'Perguntas frequentes',
    faq: [
      [
        'Meu JSON sai do navegador?',
        'Não. A análise, a inferência, a edição e a geração de código são executadas localmente no navegador.',
      ],
      [
        'Posso revisar uma inferência incerta?',
        'Sim. Arrays vazios, campos somente null, evidências mistas e nomes normalizados continuam visíveis como diagnósticos.',
      ],
    ],
    relatedConverters: 'Conversores relacionados',
  },
  de: {
    targets: {
      home: 'Codemodelle',
      typescript: 'TypeScript',
      java: 'Java',
      spring: 'Spring Boot',
      csharp: 'C#',
      python: 'Python',
    },
    compilerNotes: 'COMPILER-HINWEISE',
    title: (target) => `Wie ModelForge JSON für ${target} kompiliert`,
    body: (target) =>
      `ModelForge überführt JSON zuerst in ein universelles Zwischenmodell und erzeugt daraus anschließend ${target}. Namen, Typen, Optionalität, Null-Evidenz und semantische Hinweise können vor dem Generatorlauf geprüft werden.`,
    notes: [
      'Ein einziges IR versorgt alle unterstützten Ziele.',
      'Dieselbe Eingabe und dieselben Optionen erzeugen eine bytegleiche Ausgabe.',
      'Es sind weder Konto noch Server oder KI-Konvertierungsdienst beteiligt.',
    ],
    commonQuestions: 'Häufige Fragen',
    faq: [
      [
        'Verlässt mein JSON den Browser?',
        'Nein. Analyse, Inferenz, Bearbeitung und Codegenerierung laufen lokal im Browser.',
      ],
      [
        'Kann ich unsichere Inferenzen prüfen?',
        'Ja. Leere Arrays, reine Null-Felder, gemischte Evidenz und normalisierte Namen bleiben als Diagnosen sichtbar.',
      ],
    ],
    relatedConverters: 'Verwandte Konverter',
  },
  ru: {
    targets: {
      home: 'моделей кода',
      typescript: 'TypeScript',
      java: 'Java',
      spring: 'Spring Boot',
      csharp: 'C#',
      python: 'Python',
    },
    compilerNotes: 'ПРИМЕЧАНИЯ КОМПИЛЯТОРА',
    title: (target) => `Как ModelForge компилирует JSON для ${target}`,
    body: (target) =>
      `ModelForge сначала преобразует JSON в универсальную промежуточную модель, а затем генерирует ${target}. До запуска генератора можно проверить имена, типы, обязательность, сведения о null и семантические подсказки.`,
    notes: [
      'Единое IR используется всеми поддерживаемыми целевыми форматами.',
      'Одинаковые входные данные и параметры дают побайтово эквивалентный результат.',
      'Не требуются аккаунт, сервер или сервис преобразования на основе ИИ.',
    ],
    commonQuestions: 'Частые вопросы',
    faq: [
      [
        'Мой JSON покидает браузер?',
        'Нет. Разбор, вывод типов, редактирование и генерация кода выполняются локально в браузере.',
      ],
      [
        'Можно проверить неопределённый вывод типов?',
        'Да. Пустые массивы, поля только со значением null, смешанные данные и нормализованные имена остаются видимыми в диагностике.',
      ],
    ],
    relatedConverters: 'Связанные конвертеры',
  },
  'zh-CN': {
    targets: {
      home: '代码模型',
      typescript: 'TypeScript',
      java: 'Java',
      spring: 'Spring Boot',
      csharp: 'C#',
      python: 'Python',
    },
    compilerNotes: '编译器说明',
    title: (target) => `ModelForge 如何为 ${target} 编译 JSON`,
    body: (target) =>
      `ModelForge 先将 JSON 转换为通用中间模型，再生成 ${target}。在生成器运行之前，你可以检查名称、类型、可选性、null 证据和语义提示。`,
    notes: [
      '一个 IR 为所有受支持的目标提供输入。',
      '相同的输入和选项会产生字节等价的输出。',
      '整个过程不涉及账户、服务器或 AI 转换服务。',
    ],
    commonQuestions: '常见问题',
    faq: [
      [
        '我的 JSON 会离开浏览器吗？',
        '不会。解析、推断、编辑和代码生成都在浏览器本地运行。',
      ],
      [
        '我可以检查不确定的推断吗？',
        '可以。空数组、仅含 null 的字段、混合证据和规范化名称都会作为诊断信息保留。',
      ],
    ],
    relatedConverters: '相关转换器',
  },
  ja: {
    targets: {
      home: 'コードモデル',
      typescript: 'TypeScript',
      java: 'Java',
      spring: 'Spring Boot',
      csharp: 'C#',
      python: 'Python',
    },
    compilerNotes: 'コンパイラーノート',
    title: (target) =>
      `ModelForge が JSON を ${target} 向けにコンパイルする仕組み`,
    body: (target) =>
      `ModelForge は JSON を最初に汎用中間モデルへ変換し、その後 ${target} を生成します。ジェネレーターを実行する前に、名前、型、省略可能性、null の根拠、意味的なヒントを確認できます。`,
    notes: [
      '1つの IR がすべての対応ターゲットに使用されます。',
      '同じ入力とオプションからはバイト単位で同等の出力が生成されます。',
      'アカウント、サーバー、AI 変換サービスは使用しません。',
    ],
    commonQuestions: 'よくある質問',
    faq: [
      [
        'JSON はブラウザーの外へ送信されますか？',
        'いいえ。解析、推論、編集、コード生成はブラウザー内でローカルに実行されます。',
      ],
      [
        '不確かな推論を確認できますか？',
        'はい。空の配列、null だけのフィールド、混在する根拠、正規化された名前は診断として表示されます。',
      ],
    ],
    relatedConverters: '関連コンバーター',
  },
  ko: {
    targets: {
      home: '코드 모델',
      typescript: 'TypeScript',
      java: 'Java',
      spring: 'Spring Boot',
      csharp: 'C#',
      python: 'Python',
    },
    compilerNotes: '컴파일러 참고 사항',
    title: (target) => `ModelForge가 ${target}용 JSON을 컴파일하는 방식`,
    body: (target) =>
      `ModelForge는 먼저 JSON을 범용 중간 모델로 변환한 다음 ${target}을 생성합니다. 생성기를 실행하기 전에 이름, 타입, 선택 여부, null 근거와 의미적 힌트를 검토할 수 있습니다.`,
    notes: [
      '하나의 IR이 지원되는 모든 대상을 제공합니다.',
      '동일한 입력과 옵션은 바이트 단위로 동일한 출력을 생성합니다.',
      '계정, 서버 또는 AI 변환 서비스가 필요하지 않습니다.',
    ],
    commonQuestions: '자주 묻는 질문',
    faq: [
      [
        '내 JSON이 브라우저 밖으로 전송되나요?',
        '아니요. 구문 분석, 추론, 편집 및 코드 생성은 브라우저에서 로컬로 실행됩니다.',
      ],
      [
        '불확실한 추론을 검토할 수 있나요?',
        '예. 빈 배열, null만 있는 필드, 혼합된 근거 및 정규화된 이름은 진단으로 계속 표시됩니다.',
      ],
    ],
    relatedConverters: '관련 변환기',
  },
};

export function getLandingTranslation(
  kind: LandingKind,
  locale: Locale,
): LandingTranslation | null {
  if (locale === 'en') return null;
  const template = translations[locale];
  const target = template.targets[kind];
  return {
    compilerNotes: template.compilerNotes,
    title: template.title(target),
    body: template.body(target),
    notes: template.notes,
    commonQuestions: template.commonQuestions,
    faq: template.faq,
    relatedConverters: template.relatedConverters,
  };
}
