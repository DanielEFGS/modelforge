import type { Diagnostic } from '@modelforge/core';
import type { Locale } from './i18n';

type DiagnosticCopy = Record<string, string>;

const en: DiagnosticCopy = {
  INVALID_JSON_SYNTAX: 'The JSON syntax is invalid.',
  SOURCE_SIZE_LIMIT_EXCEEDED: 'The JSON exceeds the configured safety limit.',
  SOURCE_SIZE_WARNING: 'A large JSON input may affect browser responsiveness.',
  EMPTY_ARRAY_UNKNOWN_ELEMENT:
    'An empty array does not provide evidence for its element type.',
  HETEROGENEOUS_ARRAY: 'The array contains incompatible type evidence.',
  PROPERTY_NAME_NORMALIZED: 'The property name was normalized for the target.',
  PROPERTY_NAME_COLLISION:
    'The property name collided after normalization and was renamed.',
  NULL_ONLY_UNKNOWN_TYPE:
    'Only null was observed, so a concrete type cannot be inferred.',
  MAX_DEPTH_EXCEEDED: 'Inference reached the configured depth limit.',
  CONFLICTING_TYPE_EVIDENCE:
    'The observed values contain incompatible type evidence.',
  NO_TYPESCRIPT_OUTPUT:
    'The model contains no root type or object models to generate.',
  JAVA_UNION_MAPPED_TO_OBJECT:
    'Java cannot express this union directly, so it was mapped to Object.',
  INVALID_JAVA_PACKAGE: 'The Java package name is invalid.',
  NO_JAVA_MODELS: 'Java generation requires at least one object model.',
  INCOMPATIBLE_JAVA_VERSION:
    'The selected Java version is incompatible with this Spring Boot profile.',
  NO_ENTITY_MODEL: 'Spring generation requires an object model.',
  REPOSITORY_REQUIRES_ID:
    'Select a scalar entity identifier before generating a repository.',
  ENTITY_ID_NOT_SELECTED:
    'No entity identifier is selected; the entity is not verified.',
  UNSUPPORTED_SCHEMA_VERSION: 'This IR schema version is not supported.',
  DUPLICATE_MODEL_ID: 'A model identifier is duplicated.',
  DUPLICATE_FIELD_ID: 'A field identifier is duplicated.',
  UNRESOLVED_MODEL_REFERENCE: 'A model reference cannot be resolved.',
  CSHARP_UNION_MAPPED_TO_OBJECT:
    'C# cannot represent this union directly, so it was mapped to object.',
  INVALID_CSHARP_NAMESPACE: 'The C# namespace is invalid.',
  NO_CSHARP_MODELS: 'C# generation requires at least one object model.',
  PYTHON_COMPLEX_UNION_MAPPED_TO_ANY:
    'The Python union is too complex and was mapped to Any.',
  NO_PYTHON_MODELS: 'Python generation requires at least one object model.',
};

const messages: Record<Locale, DiagnosticCopy> = {
  en,
  es: {
    INVALID_JSON_SYNTAX: 'La sintaxis del JSON no es válida.',
    SOURCE_SIZE_LIMIT_EXCEEDED:
      'El JSON supera el límite de seguridad configurado.',
    SOURCE_SIZE_WARNING:
      'Un JSON grande puede afectar la respuesta del navegador.',
    EMPTY_ARRAY_UNKNOWN_ELEMENT:
      'Un arreglo vacío no aporta evidencia sobre el tipo de sus elementos.',
    HETEROGENEOUS_ARRAY:
      'El arreglo contiene evidencia de tipos incompatibles.',
    PROPERTY_NAME_NORMALIZED:
      'El nombre de la propiedad se normalizó para el destino.',
    PROPERTY_NAME_COLLISION:
      'El nombre de la propiedad colisionó tras normalizarse y fue renombrado.',
    NULL_ONLY_UNKNOWN_TYPE:
      'Solo se observó null, por lo que no se puede inferir un tipo concreto.',
    MAX_DEPTH_EXCEEDED:
      'La inferencia alcanzó el límite de profundidad configurado.',
    CONFLICTING_TYPE_EVIDENCE:
      'Los valores observados contienen evidencia de tipos incompatibles.',
    NO_TYPESCRIPT_OUTPUT:
      'El modelo no contiene un tipo raíz ni objetos para generar.',
    JAVA_UNION_MAPPED_TO_OBJECT:
      'Java no puede expresar esta unión directamente; se convirtió a Object.',
    INVALID_JAVA_PACKAGE: 'El nombre del paquete Java no es válido.',
    NO_JAVA_MODELS: 'La generación Java requiere al menos un modelo de objeto.',
    INCOMPATIBLE_JAVA_VERSION:
      'La versión de Java elegida no es compatible con este perfil de Spring Boot.',
    NO_ENTITY_MODEL: 'La generación Spring requiere un modelo de objeto.',
    REPOSITORY_REQUIRES_ID:
      'Selecciona un identificador escalar antes de generar un repositorio.',
    ENTITY_ID_NOT_SELECTED:
      'No se eligió un identificador; la entidad no está verificada.',
    UNSUPPORTED_SCHEMA_VERSION: 'Esta versión del esquema IR no es compatible.',
    DUPLICATE_MODEL_ID: 'Hay un identificador de modelo duplicado.',
    DUPLICATE_FIELD_ID: 'Hay un identificador de campo duplicado.',
    UNRESOLVED_MODEL_REFERENCE:
      'No se puede resolver una referencia de modelo.',
    CSHARP_UNION_MAPPED_TO_OBJECT:
      'C# no puede expresar esta unión directamente; se convirtió a object.',
    INVALID_CSHARP_NAMESPACE: 'El namespace de C# no es válido.',
    NO_CSHARP_MODELS: 'La generación C# requiere al menos un modelo de objeto.',
    PYTHON_COMPLEX_UNION_MAPPED_TO_ANY:
      'La unión de Python es demasiado compleja y se convirtió a Any.',
    NO_PYTHON_MODELS:
      'La generación Python requiere al menos un modelo de objeto.',
  },
  'pt-BR': {
    ...en,
    INVALID_JSON_SYNTAX: 'A sintaxe do JSON é inválida.',
    PROPERTY_NAME_NORMALIZED:
      'O nome da propriedade foi normalizado para o destino.',
    PROPERTY_NAME_COLLISION:
      'O nome da propriedade colidiu após a normalização e foi renomeado.',
    NULL_ONLY_UNKNOWN_TYPE:
      'Apenas null foi observado; não é possível inferir um tipo concreto.',
    EMPTY_ARRAY_UNKNOWN_ELEMENT:
      'Um array vazio não fornece evidência sobre o tipo de seus elementos.',
    HETEROGENEOUS_ARRAY: 'O array contém evidências de tipos incompatíveis.',
    INCOMPATIBLE_JAVA_VERSION:
      'A versão Java selecionada é incompatível com este perfil do Spring Boot.',
    REPOSITORY_REQUIRES_ID:
      'Selecione um identificador escalar antes de gerar um repositório.',
    ENTITY_ID_NOT_SELECTED:
      'Nenhum identificador foi selecionado; a entidade não está verificada.',
    SOURCE_SIZE_LIMIT_EXCEEDED:
      'O JSON excede o limite de segurança configurado.',
    SOURCE_SIZE_WARNING: 'Um JSON grande pode afetar a resposta do navegador.',
    MAX_DEPTH_EXCEEDED:
      'A inferência atingiu o limite de profundidade configurado.',
    CONFLICTING_TYPE_EVIDENCE:
      'Os valores observados contêm evidências de tipos incompatíveis.',
    NO_TYPESCRIPT_OUTPUT:
      'O modelo não contém um tipo raiz nem modelos de objeto para gerar.',
    JAVA_UNION_MAPPED_TO_OBJECT:
      'Java não expressa esta união diretamente; ela foi convertida em Object.',
    INVALID_JAVA_PACKAGE: 'O nome do pacote Java é inválido.',
    NO_JAVA_MODELS: 'A geração Java exige ao menos um modelo de objeto.',
    NO_ENTITY_MODEL: 'A geração Spring exige um modelo de objeto.',
    UNSUPPORTED_SCHEMA_VERSION: 'Esta versão do esquema IR não é compatível.',
    DUPLICATE_MODEL_ID: 'Há um identificador de modelo duplicado.',
    DUPLICATE_FIELD_ID: 'Há um identificador de campo duplicado.',
    UNRESOLVED_MODEL_REFERENCE:
      'Não foi possível resolver uma referência de modelo.',
    CSHARP_UNION_MAPPED_TO_OBJECT:
      'C# não representa esta união diretamente; ela foi convertida em object.',
    INVALID_CSHARP_NAMESPACE: 'O namespace C# é inválido.',
    NO_CSHARP_MODELS: 'A geração C# exige ao menos um modelo de objeto.',
    PYTHON_COMPLEX_UNION_MAPPED_TO_ANY:
      'A união Python é complexa demais e foi convertida em Any.',
    NO_PYTHON_MODELS: 'A geração Python exige ao menos um modelo de objeto.',
  },
  de: {
    ...en,
    INVALID_JSON_SYNTAX: 'Die JSON-Syntax ist ungültig.',
    PROPERTY_NAME_NORMALIZED:
      'Der Eigenschaftsname wurde für das Ziel normalisiert.',
    PROPERTY_NAME_COLLISION:
      'Der Eigenschaftsname kollidierte nach der Normalisierung und wurde umbenannt.',
    NULL_ONLY_UNKNOWN_TYPE:
      'Es wurde nur null beobachtet; ein konkreter Typ ist nicht ableitbar.',
    EMPTY_ARRAY_UNKNOWN_ELEMENT:
      'Ein leeres Array liefert keinen Hinweis auf seinen Elementtyp.',
    HETEROGENEOUS_ARRAY: 'Das Array enthält unvereinbare Typinformationen.',
    INCOMPATIBLE_JAVA_VERSION:
      'Die gewählte Java-Version ist mit diesem Spring-Boot-Profil nicht kompatibel.',
    REPOSITORY_REQUIRES_ID:
      'Vor dem Erzeugen eines Repositorys muss eine skalare Kennung gewählt werden.',
    ENTITY_ID_NOT_SELECTED:
      'Keine Entitätskennung gewählt; die Entität ist nicht verifiziert.',
    SOURCE_SIZE_LIMIT_EXCEEDED:
      'Das JSON überschreitet die konfigurierte Sicherheitsgrenze.',
    SOURCE_SIZE_WARNING:
      'Eine große JSON-Eingabe kann die Reaktionsfähigkeit des Browsers beeinträchtigen.',
    MAX_DEPTH_EXCEEDED:
      'Die Inferenz hat die konfigurierte Tiefengrenze erreicht.',
    CONFLICTING_TYPE_EVIDENCE:
      'Die beobachteten Werte enthalten unvereinbare Typinformationen.',
    NO_TYPESCRIPT_OUTPUT:
      'Das Modell enthält keinen Stammtyp und keine Objektmodelle zum Erzeugen.',
    JAVA_UNION_MAPPED_TO_OBJECT:
      'Java kann diese Union nicht direkt darstellen; sie wurde zu Object abgebildet.',
    INVALID_JAVA_PACKAGE: 'Der Java-Paketname ist ungültig.',
    NO_JAVA_MODELS:
      'Die Java-Generierung benötigt mindestens ein Objektmodell.',
    NO_ENTITY_MODEL: 'Die Spring-Generierung benötigt ein Objektmodell.',
    UNSUPPORTED_SCHEMA_VERSION:
      'Diese IR-Schemaversion wird nicht unterstützt.',
    DUPLICATE_MODEL_ID: 'Eine Modellkennung ist doppelt vorhanden.',
    DUPLICATE_FIELD_ID: 'Eine Feldkennung ist doppelt vorhanden.',
    UNRESOLVED_MODEL_REFERENCE:
      'Eine Modellreferenz kann nicht aufgelöst werden.',
    CSHARP_UNION_MAPPED_TO_OBJECT:
      'C# kann diese Union nicht direkt darstellen; sie wurde zu object abgebildet.',
    INVALID_CSHARP_NAMESPACE: 'Der C#-Namespace ist ungültig.',
    NO_CSHARP_MODELS:
      'Die C#-Generierung benötigt mindestens ein Objektmodell.',
    PYTHON_COMPLEX_UNION_MAPPED_TO_ANY:
      'Die Python-Union ist zu komplex und wurde zu Any abgebildet.',
    NO_PYTHON_MODELS:
      'Die Python-Generierung benötigt mindestens ein Objektmodell.',
  },
  ru: {
    ...en,
    INVALID_JSON_SYNTAX: 'Синтаксис JSON недействителен.',
    PROPERTY_NAME_NORMALIZED: 'Имя свойства нормализовано для целевого языка.',
    PROPERTY_NAME_COLLISION:
      'После нормализации имена совпали, поэтому свойство переименовано.',
    NULL_ONLY_UNKNOWN_TYPE:
      'Наблюдалось только null, поэтому конкретный тип определить нельзя.',
    EMPTY_ARRAY_UNKNOWN_ELEMENT:
      'Пустой массив не дает данных о типе элементов.',
    HETEROGENEOUS_ARRAY: 'Массив содержит несовместимые данные о типах.',
    INCOMPATIBLE_JAVA_VERSION:
      'Выбранная версия Java несовместима с этим профилем Spring Boot.',
    REPOSITORY_REQUIRES_ID:
      'Перед созданием репозитория выберите скалярный идентификатор.',
    ENTITY_ID_NOT_SELECTED:
      'Идентификатор сущности не выбран; сущность не проверена.',
    SOURCE_SIZE_LIMIT_EXCEEDED:
      'JSON превышает настроенный предел безопасности.',
    SOURCE_SIZE_WARNING: 'Большой JSON может снизить отзывчивость браузера.',
    MAX_DEPTH_EXCEEDED: 'Достигнут настроенный предел глубины вывода.',
    CONFLICTING_TYPE_EVIDENCE:
      'Наблюдаемые значения содержат несовместимые данные о типах.',
    NO_TYPESCRIPT_OUTPUT:
      'В модели нет корневого типа или объектов для генерации.',
    JAVA_UNION_MAPPED_TO_OBJECT:
      'Java не может выразить это объединение напрямую; оно преобразовано в Object.',
    INVALID_JAVA_PACKAGE: 'Недопустимое имя пакета Java.',
    NO_JAVA_MODELS:
      'Для генерации Java требуется хотя бы одна объектная модель.',
    NO_ENTITY_MODEL: 'Для генерации Spring требуется объектная модель.',
    UNSUPPORTED_SCHEMA_VERSION: 'Эта версия схемы IR не поддерживается.',
    DUPLICATE_MODEL_ID: 'Идентификатор модели повторяется.',
    DUPLICATE_FIELD_ID: 'Идентификатор поля повторяется.',
    UNRESOLVED_MODEL_REFERENCE: 'Не удается разрешить ссылку на модель.',
    CSHARP_UNION_MAPPED_TO_OBJECT:
      'C# не может выразить это объединение напрямую; оно преобразовано в object.',
    INVALID_CSHARP_NAMESPACE: 'Недопустимое пространство имен C#.',
    NO_CSHARP_MODELS:
      'Для генерации C# требуется хотя бы одна объектная модель.',
    PYTHON_COMPLEX_UNION_MAPPED_TO_ANY:
      'Объединение Python слишком сложное и преобразовано в Any.',
    NO_PYTHON_MODELS:
      'Для генерации Python требуется хотя бы одна объектная модель.',
  },
  'zh-CN': {
    ...en,
    INVALID_JSON_SYNTAX: 'JSON 语法无效。',
    PROPERTY_NAME_NORMALIZED: '属性名已针对目标语言进行规范化。',
    PROPERTY_NAME_COLLISION: '属性名在规范化后发生冲突，已重命名。',
    NULL_ONLY_UNKNOWN_TYPE: '只观察到 null，无法推断具体类型。',
    EMPTY_ARRAY_UNKNOWN_ELEMENT: '空数组无法提供元素类型依据。',
    HETEROGENEOUS_ARRAY: '数组包含不兼容的类型依据。',
    INCOMPATIBLE_JAVA_VERSION: '所选 Java 版本与此 Spring Boot 配置不兼容。',
    REPOSITORY_REQUIRES_ID: '生成仓库前请选择标量实体标识符。',
    ENTITY_ID_NOT_SELECTED: '未选择实体标识符；实体尚未验证。',
    SOURCE_SIZE_LIMIT_EXCEEDED: 'JSON 超出配置的安全限制。',
    SOURCE_SIZE_WARNING: '较大的 JSON 输入可能影响浏览器响应速度。',
    MAX_DEPTH_EXCEEDED: '推断已达到配置的深度限制。',
    CONFLICTING_TYPE_EVIDENCE: '观察值包含不兼容的类型依据。',
    NO_TYPESCRIPT_OUTPUT: '模型不包含可生成的根类型或对象模型。',
    JAVA_UNION_MAPPED_TO_OBJECT:
      'Java 无法直接表示此联合类型，已映射为 Object。',
    INVALID_JAVA_PACKAGE: 'Java 包名无效。',
    NO_JAVA_MODELS: 'Java 生成至少需要一个对象模型。',
    NO_ENTITY_MODEL: 'Spring 生成需要对象模型。',
    UNSUPPORTED_SCHEMA_VERSION: '不支持此 IR 架构版本。',
    DUPLICATE_MODEL_ID: '模型标识符重复。',
    DUPLICATE_FIELD_ID: '字段标识符重复。',
    UNRESOLVED_MODEL_REFERENCE: '无法解析模型引用。',
    CSHARP_UNION_MAPPED_TO_OBJECT:
      'C# 无法直接表示此联合类型，已映射为 object。',
    INVALID_CSHARP_NAMESPACE: 'C# 命名空间无效。',
    NO_CSHARP_MODELS: 'C# 生成至少需要一个对象模型。',
    PYTHON_COMPLEX_UNION_MAPPED_TO_ANY:
      'Python 联合类型过于复杂，已映射为 Any。',
    NO_PYTHON_MODELS: 'Python 生成至少需要一个对象模型。',
  },
  ja: {
    ...en,
    INVALID_JSON_SYNTAX: 'JSON の構文が無効です。',
    PROPERTY_NAME_NORMALIZED: 'プロパティ名をターゲット向けに正規化しました。',
    PROPERTY_NAME_COLLISION:
      '正規化後にプロパティ名が衝突したため、名前を変更しました。',
    NULL_ONLY_UNKNOWN_TYPE:
      'null しか観測されていないため、具体的な型を推論できません。',
    EMPTY_ARRAY_UNKNOWN_ELEMENT: '空の配列からは要素型の根拠を得られません。',
    HETEROGENEOUS_ARRAY: '配列に互換性のない型の根拠があります。',
    INCOMPATIBLE_JAVA_VERSION:
      '選択した Java バージョンはこの Spring Boot プロファイルと互換性がありません。',
    REPOSITORY_REQUIRES_ID:
      'リポジトリを生成する前にスカラーのエンティティ識別子を選択してください。',
    ENTITY_ID_NOT_SELECTED:
      'エンティティ識別子が未選択のため、エンティティは検証済みではありません。',
    SOURCE_SIZE_LIMIT_EXCEEDED: 'JSON が設定された安全上限を超えています。',
    SOURCE_SIZE_WARNING:
      '大きな JSON 入力はブラウザの応答性に影響する可能性があります。',
    MAX_DEPTH_EXCEEDED: '推論が設定された深さの上限に達しました。',
    CONFLICTING_TYPE_EVIDENCE: '観測値に互換性のない型の根拠があります。',
    NO_TYPESCRIPT_OUTPUT:
      '生成できるルート型またはオブジェクトモデルがありません。',
    JAVA_UNION_MAPPED_TO_OBJECT:
      'Java ではこの Union を直接表せないため Object に変換しました。',
    INVALID_JAVA_PACKAGE: 'Java パッケージ名が無効です。',
    NO_JAVA_MODELS:
      'Java の生成にはオブジェクトモデルが少なくとも1つ必要です。',
    NO_ENTITY_MODEL: 'Spring の生成にはオブジェクトモデルが必要です。',
    UNSUPPORTED_SCHEMA_VERSION:
      'この IR スキーマバージョンはサポートされていません。',
    DUPLICATE_MODEL_ID: 'モデル識別子が重複しています。',
    DUPLICATE_FIELD_ID: 'フィールド識別子が重複しています。',
    UNRESOLVED_MODEL_REFERENCE: 'モデル参照を解決できません。',
    CSHARP_UNION_MAPPED_TO_OBJECT:
      'C# ではこの Union を直接表せないため object に変換しました。',
    INVALID_CSHARP_NAMESPACE: 'C# 名前空間が無効です。',
    NO_CSHARP_MODELS:
      'C# の生成にはオブジェクトモデルが少なくとも1つ必要です。',
    PYTHON_COMPLEX_UNION_MAPPED_TO_ANY:
      'Python の Union が複雑すぎるため Any に変換しました。',
    NO_PYTHON_MODELS:
      'Python の生成にはオブジェクトモデルが少なくとも1つ必要です。',
  },
  ko: {
    ...en,
    INVALID_JSON_SYNTAX: 'JSON 구문이 올바르지 않습니다.',
    PROPERTY_NAME_NORMALIZED: '대상 언어에 맞게 속성 이름을 정규화했습니다.',
    PROPERTY_NAME_COLLISION:
      '정규화 후 속성 이름이 충돌하여 이름을 변경했습니다.',
    NULL_ONLY_UNKNOWN_TYPE:
      'null만 관찰되어 구체적인 타입을 추론할 수 없습니다.',
    EMPTY_ARRAY_UNKNOWN_ELEMENT:
      '빈 배열에서는 요소 타입의 근거를 얻을 수 없습니다.',
    HETEROGENEOUS_ARRAY: '배열에 호환되지 않는 타입 근거가 있습니다.',
    INCOMPATIBLE_JAVA_VERSION:
      '선택한 Java 버전은 이 Spring Boot 프로필과 호환되지 않습니다.',
    REPOSITORY_REQUIRES_ID:
      '리포지토리를 생성하기 전에 스칼라 엔터티 식별자를 선택하세요.',
    ENTITY_ID_NOT_SELECTED:
      '엔터티 식별자가 선택되지 않아 엔터티가 검증되지 않았습니다.',
    SOURCE_SIZE_LIMIT_EXCEEDED: 'JSON이 설정된 안전 제한을 초과합니다.',
    SOURCE_SIZE_WARNING:
      '큰 JSON 입력은 브라우저 응답성에 영향을 줄 수 있습니다.',
    MAX_DEPTH_EXCEEDED: '추론이 설정된 깊이 제한에 도달했습니다.',
    CONFLICTING_TYPE_EVIDENCE:
      '관찰된 값에 호환되지 않는 타입 근거가 있습니다.',
    NO_TYPESCRIPT_OUTPUT: '생성할 루트 타입이나 객체 모델이 없습니다.',
    JAVA_UNION_MAPPED_TO_OBJECT:
      'Java에서 이 유니온을 직접 표현할 수 없어 Object로 매핑했습니다.',
    INVALID_JAVA_PACKAGE: 'Java 패키지 이름이 올바르지 않습니다.',
    NO_JAVA_MODELS: 'Java 생성에는 하나 이상의 객체 모델이 필요합니다.',
    NO_ENTITY_MODEL: 'Spring 생성에는 객체 모델이 필요합니다.',
    UNSUPPORTED_SCHEMA_VERSION: '이 IR 스키마 버전은 지원되지 않습니다.',
    DUPLICATE_MODEL_ID: '모델 식별자가 중복되었습니다.',
    DUPLICATE_FIELD_ID: '필드 식별자가 중복되었습니다.',
    UNRESOLVED_MODEL_REFERENCE: '모델 참조를 확인할 수 없습니다.',
    CSHARP_UNION_MAPPED_TO_OBJECT:
      'C#에서 이 유니온을 직접 표현할 수 없어 object로 매핑했습니다.',
    INVALID_CSHARP_NAMESPACE: 'C# 네임스페이스가 올바르지 않습니다.',
    NO_CSHARP_MODELS: 'C# 생성에는 하나 이상의 객체 모델이 필요합니다.',
    PYTHON_COMPLEX_UNION_MAPPED_TO_ANY:
      'Python 유니온이 너무 복잡하여 Any로 매핑했습니다.',
    NO_PYTHON_MODELS: 'Python 생성에는 하나 이상의 객체 모델이 필요합니다.',
  },
};

export function translateDiagnostic(
  diagnostic: Diagnostic,
  locale: Locale,
): string {
  const translated = messages[locale][diagnostic.code] ?? diagnostic.message;
  if (translated === diagnostic.message) return translated;

  const identifiers = diagnostic.message.match(/"[^"]+"/g);
  return identifiers?.length
    ? `${translated} ${identifiers.join(' → ')}`
    : translated;
}
