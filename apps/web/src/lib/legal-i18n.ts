import type { Locale } from './i18n';

export type LegalKind = 'privacy' | 'cookies' | 'terms' | 'disclaimer';

export interface LegalDocument {
  eyebrow: string;
  title: string;
  status: string;
  sections: Array<{ heading: string; body: string }>;
}

const updated = {
  en: 'Working MVP policy · Updated September 2, 2026',
  es: 'Política provisional del MVP · Actualizada el 2 de septiembre de 2026',
  'pt-BR': 'Política provisória do MVP · Atualizada em 2 de setembro de 2026',
  de: 'Vorläufige MVP-Richtlinie · Aktualisiert am 2. September 2026',
  ru: 'Рабочая политика MVP · Обновлено 2 сентября 2026 г.',
  'zh-CN': 'MVP 暂行政策 · 更新于 2026 年 9 月 2 日',
  ja: 'MVP 暫定ポリシー · 2026年9月2日更新',
  ko: 'MVP 임시 정책 · 2026년 9월 2일 업데이트',
} satisfies Record<Locale, string>;

export const LEGAL_DOCUMENTS: Record<
  Locale,
  Record<LegalKind, LegalDocument>
> = {
  en: {
    privacy: {
      eyebrow: 'POLICY 01',
      title: 'Privacy policy',
      status: updated.en,
      sections: [
        {
          heading: 'Local converter data',
          body: 'Source JSON, inferred field and model data, and generated code are processed in your browser. ModelForge does not send this converter content to its servers or store it in a backend.',
        },
        {
          heading: 'Preferences',
          body: 'The light or dark theme and safe target preferences may use browser local storage. Raw source and generated code are not persisted by default.',
        },
        {
          heading: 'Analytics',
          body: 'ModelForge shows no advertising and integrates no ad network. That is a settled decision, not a pending one. The site does load Cloudflare Web Analytics, which counts visits in aggregate without cookies or persistent identifiers; source JSON, generated code, and field, model, and package names never reach it.',
        },
        {
          heading: 'Contact and changes',
          body: 'Questions about this policy go to danielgarsil.95@gmail.com. If what ModelForge processes ever changes, this page is updated before the change ships, and the date above changes with it.',
        },
      ],
    },
    cookies: {
      eyebrow: 'POLICY 02',
      title: 'Cookies and local storage',
      status: updated.en,
      sections: [
        {
          heading: 'Current MVP',
          body: 'ModelForge uses local storage for the selected visual theme and interface language. The converter does not store source JSON or generated code, and the site sets no cookies. The only third-party script is Cloudflare Web Analytics, which uses neither cookies nor persistent identifiers.',
        },
        {
          heading: 'What will not be added',
          body: 'Advertising is ruled out for ModelForge: no ad network, no ad script, no advertising cookies. If any other integration were ever to process personal data, it would sit behind a consent layer, and this page would name the provider, purpose, retention, and controls before it shipped.',
        },
      ],
    },
    terms: {
      eyebrow: 'POLICY 03',
      title: 'Terms of use',
      status: updated.en,
      sections: [
        {
          heading: 'Use of the tool',
          body: 'You remain responsible for the input you provide and for reviewing, testing, licensing, securing, and maintaining generated output. Do not rely on one JSON sample as a complete production schema.',
        },
        {
          heading: 'No warranty',
          body: 'The MVP and generated output are provided as-is without a guarantee of fitness for a particular system. Verified framework status applies only to the documented profiles and fixture matrix.',
        },
        {
          heading: 'Acceptable use',
          body: 'Do not use the site to violate law, rights, or service availability. These working terms require legal review and production contact details before public commercial launch.',
        },
      ],
    },
    disclaimer: {
      eyebrow: 'POLICY 04',
      title: 'Generated code disclaimer',
      status: updated.en,
      sections: [
        {
          heading: 'Sample inference is incomplete evidence',
          body: 'A sample cannot prove every nullable field, array element type, validation rule, database constraint, relationship, or identifier. ModelForge exposes uncertainty but cannot replace domain review.',
        },
        {
          heading: 'Review before production',
          body: 'Check validation, security, serialization, package naming, database assumptions, and all framework configuration. Compile verification confirms documented fixture compatibility; it does not certify your application architecture.',
        },
      ],
    },
  },
  es: {
    privacy: {
      eyebrow: 'POLÍTICA 01',
      title: 'Política de privacidad',
      status: updated.es,
      sections: [
        {
          heading: 'Datos del conversor local',
          body: 'El JSON de origen, los datos inferidos de campos y modelos y el código generado se procesan en tu navegador. ModelForge no envía este contenido a sus servidores ni lo almacena en un backend.',
        },
        {
          heading: 'Preferencias',
          body: 'El tema claro u oscuro, el idioma de la interfaz y las preferencias seguras del destino pueden usar el almacenamiento local del navegador. El origen sin procesar y el código generado no se guardan por defecto.',
        },
        {
          heading: 'Analítica',
          body: 'ModelForge no muestra publicidad ni integra ninguna red publicitaria. Es una decisión tomada, no algo pendiente. El sitio sí carga Cloudflare Web Analytics, que cuenta visitas de forma agregada sin cookies ni identificadores persistentes; el JSON de origen, el código generado y los nombres de campos, modelos y paquetes nunca llegan hasta él.',
        },
        {
          heading: 'Contacto y cambios',
          body: 'Las dudas sobre esta política se atienden en danielgarsil.95@gmail.com. Si alguna vez cambia lo que ModelForge procesa, esta página se actualiza antes de que el cambio se publique, y la fecha de arriba cambia con ella.',
        },
      ],
    },
    cookies: {
      eyebrow: 'POLÍTICA 02',
      title: 'Cookies y almacenamiento local',
      status: updated.es,
      sections: [
        {
          heading: 'MVP actual',
          body: 'ModelForge usa almacenamiento local para el tema visual y el idioma de interfaz seleccionados. El conversor no guarda el JSON de origen ni el código generado, y el sitio no pone ninguna cookie. El único script de terceros es Cloudflare Web Analytics, que no usa cookies ni identificadores persistentes.',
        },
        {
          heading: 'Lo que no se va a añadir',
          body: 'La publicidad queda descartada en ModelForge: ninguna red publicitaria, ningún script de anuncios, ninguna cookie publicitaria. Si alguna otra integración llegara a tratar datos personales, iría detrás de una capa de consentimiento, y esta página nombraría proveedor, finalidad, conservación y controles antes de publicarse.',
        },
      ],
    },
    terms: {
      eyebrow: 'POLÍTICA 03',
      title: 'Términos de uso',
      status: updated.es,
      sections: [
        {
          heading: 'Uso de la herramienta',
          body: 'Eres responsable de los datos que proporcionas y de revisar, probar, licenciar, proteger y mantener el resultado generado. No debes considerar una sola muestra JSON como un esquema de producción completo.',
        },
        {
          heading: 'Sin garantía',
          body: 'El MVP y el resultado generado se proporcionan tal cual, sin garantía de idoneidad para un sistema concreto. El estado verificado de un framework solo se aplica a los perfiles y fixtures documentados.',
        },
        {
          heading: 'Uso aceptable',
          body: 'No uses el sitio para infringir leyes, derechos o la disponibilidad del servicio. Estos términos provisionales requieren revisión legal y datos de contacto antes de un lanzamiento comercial público.',
        },
      ],
    },
    disclaimer: {
      eyebrow: 'POLÍTICA 04',
      title: 'Aviso sobre el código generado',
      status: updated.es,
      sections: [
        {
          heading: 'Una muestra aporta evidencia incompleta',
          body: 'Una muestra no puede demostrar todos los campos que admiten null, tipos de elementos de arrays, reglas de validación, restricciones de base de datos, relaciones o identificadores. ModelForge muestra la incertidumbre, pero no sustituye la revisión del dominio.',
        },
        {
          heading: 'Revisión antes de producción',
          body: 'Revisa la validación, seguridad, serialización, nombres de paquetes, supuestos de base de datos y toda la configuración del framework. La compilación confirma la compatibilidad de los fixtures documentados; no certifica la arquitectura de tu aplicación.',
        },
      ],
    },
  },
  'pt-BR': {
    privacy: {
      eyebrow: 'POLÍTICA 01',
      title: 'Política de privacidade',
      status: updated['pt-BR'],
      sections: [
        {
          heading: 'Dados do conversor local',
          body: 'O JSON de origem, os dados inferidos de campos e modelos e o código gerado são processados no seu navegador. O ModelForge não envia esse conteúdo aos seus servidores nem o armazena em um backend.',
        },
        {
          heading: 'Preferências',
          body: 'O tema claro ou escuro, o idioma da interface e as preferências seguras de destino podem usar o armazenamento local do navegador. A origem bruta e o código gerado não são persistidos por padrão.',
        },
        {
          heading: 'Análises',
          body: 'O ModelForge não exibe publicidade nem integra nenhuma rede de anúncios. É uma decisão tomada, não algo pendente. O site carrega o Cloudflare Web Analytics, que conta visitas de forma agregada, sem cookies nem identificadores persistentes; o JSON de origem, o código gerado e os nomes de campos, modelos e pacotes nunca chegam até ele.',
        },
        {
          heading: 'Contato e alterações',
          body: 'Dúvidas sobre esta política podem ser enviadas para danielgarsil.95@gmail.com. Se algum dia mudar o que o ModelForge processa, esta página será atualizada antes de a mudança entrar no ar, e a data acima muda junto.',
        },
      ],
    },
    cookies: {
      eyebrow: 'POLÍTICA 02',
      title: 'Cookies e armazenamento local',
      status: updated['pt-BR'],
      sections: [
        {
          heading: 'MVP atual',
          body: 'O ModelForge usa armazenamento local para o tema visual e o idioma da interface selecionados. O conversor não armazena o JSON de origem nem o código gerado, e o site não define nenhum cookie. O único script de terceiros é o Cloudflare Web Analytics, que não usa cookies nem identificadores persistentes.',
        },
        {
          heading: 'O que não será adicionado',
          body: 'A publicidade está descartada no ModelForge: nenhuma rede de anúncios, nenhum script de anúncios, nenhum cookie publicitário. Se alguma outra integração passasse a tratar dados pessoais, ficaria atrás de uma camada de consentimento, e esta página indicaria fornecedor, finalidade, retenção e controles antes de entrar no ar.',
        },
      ],
    },
    terms: {
      eyebrow: 'POLÍTICA 03',
      title: 'Termos de uso',
      status: updated['pt-BR'],
      sections: [
        {
          heading: 'Uso da ferramenta',
          body: 'Você continua responsável pelos dados fornecidos e por revisar, testar, licenciar, proteger e manter a saída gerada. Não considere uma única amostra JSON como um esquema de produção completo.',
        },
        {
          heading: 'Sem garantia',
          body: 'O MVP e a saída gerada são fornecidos no estado em que se encontram, sem garantia de adequação a um sistema específico. O status verificado de um framework aplica-se somente aos perfis e fixtures documentados.',
        },
        {
          heading: 'Uso aceitável',
          body: 'Não use o site para violar leis, direitos ou a disponibilidade do serviço. Estes termos provisórios exigem revisão jurídica e dados de contato antes de um lançamento comercial público.',
        },
      ],
    },
    disclaimer: {
      eyebrow: 'POLÍTICA 04',
      title: 'Aviso sobre o código gerado',
      status: updated['pt-BR'],
      sections: [
        {
          heading: 'Uma amostra fornece evidência incompleta',
          body: 'Uma amostra não pode comprovar todos os campos anuláveis, tipos de elementos de arrays, regras de validação, restrições de banco de dados, relações ou identificadores. O ModelForge mostra a incerteza, mas não substitui a revisão do domínio.',
        },
        {
          heading: 'Revisão antes da produção',
          body: 'Revise validação, segurança, serialização, nomes de pacotes, premissas de banco de dados e toda a configuração do framework. A compilação confirma a compatibilidade dos fixtures documentados; não certifica a arquitetura da sua aplicação.',
        },
      ],
    },
  },
  de: {
    privacy: {
      eyebrow: 'RICHTLINIE 01',
      title: 'Datenschutzerklärung',
      status: updated.de,
      sections: [
        {
          heading: 'Daten des lokalen Konverters',
          body: 'Quell-JSON, abgeleitete Feld- und Modelldaten sowie erzeugter Code werden in deinem Browser verarbeitet. ModelForge sendet diese Inhalte nicht an eigene Server und speichert sie nicht in einem Backend.',
        },
        {
          heading: 'Einstellungen',
          body: 'Darstellung, Oberflächensprache und sichere Zieleinstellungen können den lokalen Browserspeicher verwenden. Rohdaten und erzeugter Code werden standardmäßig nicht dauerhaft gespeichert.',
        },
        {
          heading: 'Analyse',
          body: 'ModelForge zeigt keine Werbung und bindet kein Werbenetzwerk ein. Das ist eine getroffene Entscheidung, keine offene. Geladen wird lediglich Cloudflare Web Analytics, das Besuche aggregiert zählt, ohne Cookies und ohne dauerhafte Kennungen; Quell-JSON, erzeugter Code sowie Feld-, Modell- und Paketnamen erreichen es nie.',
        },
        {
          heading: 'Kontakt und Änderungen',
          body: 'Fragen zu dieser Richtlinie gehen an danielgarsil.95@gmail.com. Ändert sich jemals, was ModelForge verarbeitet, wird diese Seite vor der Veröffentlichung angepasst, und das Datum oben ändert sich mit.',
        },
      ],
    },
    cookies: {
      eyebrow: 'RICHTLINIE 02',
      title: 'Cookies und lokaler Speicher',
      status: updated.de,
      sections: [
        {
          heading: 'Aktuelles MVP',
          body: 'ModelForge verwendet lokalen Speicher für Darstellung und Oberflächensprache. Quell-JSON und erzeugter Code werden nicht gespeichert, und die Website setzt keine Cookies. Das einzige Drittanbieter-Skript ist Cloudflare Web Analytics, das ohne Cookies und ohne dauerhafte Kennungen auskommt.',
        },
        {
          heading: 'Was nicht hinzukommt',
          body: 'Werbung ist für ModelForge ausgeschlossen: kein Werbenetzwerk, kein Anzeigenskript, keine Werbe-Cookies. Sollte eine andere Integration je personenbezogene Daten verarbeiten, läge sie hinter einer Einwilligungsschicht, und diese Seite würde Anbieter, Zwecke, Aufbewahrung und Kontrollmöglichkeiten nennen, bevor sie live geht.',
        },
      ],
    },
    terms: {
      eyebrow: 'RICHTLINIE 03',
      title: 'Nutzungsbedingungen',
      status: updated.de,
      sections: [
        {
          heading: 'Nutzung des Werkzeugs',
          body: 'Du bist für deine Eingaben sowie für Prüfung, Tests, Lizenzierung, Absicherung und Pflege der erzeugten Ausgabe verantwortlich. Eine einzelne JSON-Probe ist kein vollständiges Produktionsschema.',
        },
        {
          heading: 'Keine Gewährleistung',
          body: 'Das MVP und die erzeugte Ausgabe werden wie vorliegend ohne Eignungsgarantie für ein bestimmtes System bereitgestellt. Der verifizierte Framework-Status gilt nur für dokumentierte Profile und Fixtures.',
        },
        {
          heading: 'Zulässige Nutzung',
          body: 'Nutze die Website nicht zur Verletzung von Gesetzen, Rechten oder der Dienstverfügbarkeit. Diese vorläufigen Bedingungen benötigen vor einem öffentlichen kommerziellen Start rechtliche Prüfung und Kontaktdaten.',
        },
      ],
    },
    disclaimer: {
      eyebrow: 'RICHTLINIE 04',
      title: 'Hinweis zu erzeugtem Code',
      status: updated.de,
      sections: [
        {
          heading: 'Eine Probe liefert unvollständige Evidenz',
          body: 'Eine Probe kann nicht alle nullable Felder, Array-Elementtypen, Validierungsregeln, Datenbankbeschränkungen, Beziehungen oder Kennungen belegen. ModelForge zeigt Unsicherheit, ersetzt aber keine fachliche Prüfung.',
        },
        {
          heading: 'Prüfung vor dem Produktiveinsatz',
          body: 'Prüfe Validierung, Sicherheit, Serialisierung, Paketnamen, Datenbankannahmen und die gesamte Framework-Konfiguration. Die Kompilierung bestätigt die dokumentierte Fixture-Kompatibilität, zertifiziert aber nicht deine Anwendungsarchitektur.',
        },
      ],
    },
  },
  ru: {
    privacy: {
      eyebrow: 'ПОЛИТИКА 01',
      title: 'Политика конфиденциальности',
      status: updated.ru,
      sections: [
        {
          heading: 'Данные локального конвертера',
          body: 'Исходный JSON, выведенные данные полей и моделей, а также созданный код обрабатываются в браузере. ModelForge не отправляет этот контент на свои серверы и не хранит его в серверной системе.',
        },
        {
          heading: 'Настройки',
          body: 'Тема, язык интерфейса и безопасные настройки цели могут использовать локальное хранилище браузера. Исходные данные и созданный код по умолчанию не сохраняются.',
        },
        {
          heading: 'Аналитика',
          body: 'ModelForge не показывает рекламу и не подключает рекламные сети. Это принятое решение, а не отложенное. Сайт загружает только Cloudflare Web Analytics, который считает посещения в агрегированном виде, без файлов cookie и постоянных идентификаторов; исходный JSON, сгенерированный код и имена полей, моделей и пакетов туда никогда не попадают.',
        },
        {
          heading: 'Контакты и изменения',
          body: 'Вопросы по этой политике направляйте на danielgarsil.95@gmail.com. Если то, что обрабатывает ModelForge, когда-либо изменится, эта страница будет обновлена до выхода изменения, и дата выше изменится вместе с ней.',
        },
      ],
    },
    cookies: {
      eyebrow: 'ПОЛИТИКА 02',
      title: 'Cookies и локальное хранилище',
      status: updated.ru,
      sections: [
        {
          heading: 'Текущий MVP',
          body: 'ModelForge использует локальное хранилище для выбранной темы и языка интерфейса. Конвертер не сохраняет исходный JSON и сгенерированный код, а сайт не устанавливает файлы cookie. Единственный сторонний скрипт — Cloudflare Web Analytics, работающий без файлов cookie и постоянных идентификаторов.',
        },
        {
          heading: 'Что не будет добавлено',
          body: 'Реклама для ModelForge исключена: никаких рекламных сетей, скриптов и рекламных файлов cookie. Если какая-либо другая интеграция когда-нибудь начнёт обрабатывать персональные данные, она будет работать за слоем согласия, а эта страница назовёт поставщика, цели, сроки хранения и средства контроля до её запуска.',
        },
      ],
    },
    terms: {
      eyebrow: 'ПОЛИТИКА 03',
      title: 'Условия использования',
      status: updated.ru,
      sections: [
        {
          heading: 'Использование инструмента',
          body: 'Вы отвечаете за предоставленные данные, а также за проверку, тестирование, лицензирование, защиту и сопровождение созданного результата. Не считайте один образец JSON полной производственной схемой.',
        },
        {
          heading: 'Отсутствие гарантий',
          body: 'MVP и созданный результат предоставляются как есть без гарантии пригодности для конкретной системы. Статус проверенного фреймворка относится только к документированным профилям и fixtures.',
        },
        {
          heading: 'Допустимое использование',
          body: 'Не используйте сайт для нарушения закона, прав или доступности сервиса. До публичного коммерческого запуска эти рабочие условия требуют юридической проверки и публикации контактных данных.',
        },
      ],
    },
    disclaimer: {
      eyebrow: 'ПОЛИТИКА 04',
      title: 'Отказ от ответственности за созданный код',
      status: updated.ru,
      sections: [
        {
          heading: 'Образец предоставляет неполные сведения',
          body: 'Образец не может подтвердить все nullable-поля, типы элементов массивов, правила проверки, ограничения базы данных, связи или идентификаторы. ModelForge показывает неопределённость, но не заменяет предметную проверку.',
        },
        {
          heading: 'Проверка перед использованием в production',
          body: 'Проверьте валидацию, безопасность, сериализацию, имена пакетов, предположения о базе данных и всю конфигурацию фреймворка. Компиляция подтверждает совместимость документированных fixtures, но не сертифицирует архитектуру приложения.',
        },
      ],
    },
  },
  'zh-CN': {
    privacy: {
      eyebrow: '政策 01',
      title: '隐私政策',
      status: updated['zh-CN'],
      sections: [
        {
          heading: '本地转换器数据',
          body: '源 JSON、推断出的字段和模型数据以及生成的代码都在浏览器中处理。ModelForge 不会将这些内容发送到自己的服务器，也不会存储在后端。',
        },
        {
          heading: '偏好设置',
          body: '明暗主题、界面语言和安全的目标偏好可能使用浏览器本地存储。原始输入和生成代码默认不会持久保存。',
        },
        {
          heading: '分析',
          body: 'ModelForge 不展示广告，也不接入任何广告网络。这是既定决定，而非待办事项。站点仅加载 Cloudflare Web Analytics，它以聚合方式统计访问量，不使用 Cookie，也不创建持久标识符；源 JSON、生成的代码以及字段、模型和包名称都不会传给它。',
        },
        {
          heading: '联系与变更',
          body: '有关本政策的问题请发送至 danielgarsil.95@gmail.com。如果 ModelForge 处理的内容发生变化，本页面会在变更上线前更新，上方日期也会随之更新。',
        },
      ],
    },
    cookies: {
      eyebrow: '政策 02',
      title: 'Cookie 与本地存储',
      status: updated['zh-CN'],
      sections: [
        {
          heading: '当前 MVP',
          body: 'ModelForge 使用本地存储保存所选的视觉主题和界面语言。转换器不会存储源 JSON 或生成代码，站点也不设置任何 Cookie。唯一的第三方脚本是 Cloudflare Web Analytics，它不使用 Cookie，也不创建持久标识符。',
        },
        {
          heading: '不会加入的内容',
          body: 'ModelForge 已排除广告：没有广告网络，没有广告脚本，没有广告 Cookie。若将来有其他集成需要处理个人数据，它将置于同意层之后，并且本页面会在其上线前列明供应商、用途、保留期限和控制方式。',
        },
      ],
    },
    terms: {
      eyebrow: '政策 03',
      title: '使用条款',
      status: updated['zh-CN'],
      sections: [
        {
          heading: '工具的使用',
          body: '你应对所提供的输入以及生成结果的审查、测试、许可、安全和维护负责。不要将单个 JSON 示例视为完整的生产架构。',
        },
        {
          heading: '不提供保证',
          body: 'MVP 和生成结果按现状提供，不保证适用于任何特定系统。已验证的框架状态仅适用于文档中记录的配置文件和 fixtures。',
        },
        {
          heading: '可接受使用',
          body: '请勿使用本网站违反法律、权利或影响服务可用性。这些暂行条款在公开商业发布前需要经过法律审查并补充生产联系信息。',
        },
      ],
    },
    disclaimer: {
      eyebrow: '政策 04',
      title: '生成代码免责声明',
      status: updated['zh-CN'],
      sections: [
        {
          heading: '示例只能提供不完整的证据',
          body: '单个示例无法证明所有可为 null 的字段、数组元素类型、验证规则、数据库约束、关系或标识符。ModelForge 会显示不确定性，但不能替代领域审查。',
        },
        {
          heading: '用于生产前请先审查',
          body: '请检查验证、安全、序列化、包命名、数据库假设和所有框架配置。编译验证仅确认文档所列 fixtures 的兼容性，并不认证你的应用架构。',
        },
      ],
    },
  },
  ja: {
    privacy: {
      eyebrow: 'ポリシー 01',
      title: 'プライバシーポリシー',
      status: updated.ja,
      sections: [
        {
          heading: 'ローカルコンバーターのデータ',
          body: '元の JSON、推論されたフィールドとモデルのデータ、生成コードはブラウザー内で処理されます。ModelForge はこれらを自社サーバーへ送信せず、バックエンドにも保存しません。',
        },
        {
          heading: '設定',
          body: '表示テーマ、インターフェース言語、安全な出力先設定にはブラウザーのローカルストレージを使用する場合があります。元データと生成コードは既定では永続化されません。',
        },
        {
          heading: '分析',
          body: 'ModelForge は広告を表示せず、広告ネットワークも組み込みません。これは保留中の課題ではなく、決定事項です。読み込むのは Cloudflare Web Analytics のみで、Cookie も永続的な識別子も使わずに訪問数を集計します。ソース JSON、生成コード、フィールド名・モデル名・パッケージ名が渡ることはありません。',
        },
        {
          heading: '連絡先と変更',
          body: '本ポリシーに関するお問い合わせは danielgarsil.95@gmail.com までお願いします。ModelForge が処理する内容が変わる場合は、その変更を公開する前に本ページを更新し、上部の日付も併せて更新します。',
        },
      ],
    },
    cookies: {
      eyebrow: 'ポリシー 02',
      title: 'Cookie とローカルストレージ',
      status: updated.ja,
      sections: [
        {
          heading: '現在の MVP',
          body: 'ModelForge は選択された表示テーマとインターフェース言語をローカルストレージに保存します。変換器はソース JSON も生成コードも保存せず、サイトは Cookie を一切設定しません。第三者スクリプトは Cloudflare Web Analytics のみで、Cookie も永続的な識別子も使用しません。',
        },
        {
          heading: '追加しないもの',
          body: 'ModelForge では広告を採用しません。広告ネットワークも、広告スクリプトも、広告 Cookie もありません。将来ほかの連携が個人データを扱う場合は、同意レイヤーの背後に置き、公開前に本ページで事業者、目的、保存期間、管理方法を明示します。',
        },
      ],
    },
    terms: {
      eyebrow: 'ポリシー 03',
      title: '利用規約',
      status: updated.ja,
      sections: [
        {
          heading: 'ツールの利用',
          body: '入力内容と、生成結果の確認、テスト、ライセンス、安全性、保守については利用者が責任を負います。1つの JSON サンプルを完全な本番スキーマとして扱わないでください。',
        },
        {
          heading: '保証なし',
          body: 'MVP と生成結果は現状有姿で提供され、特定システムへの適合性は保証されません。検証済みフレームワークの状態は、文書化されたプロファイルと fixtures にのみ適用されます。',
        },
        {
          heading: '許容される利用',
          body: '法律、権利、サービスの可用性を侵害する目的で本サイトを使用しないでください。この暫定規約は、一般向け商用公開前に法務確認と連絡先情報を必要とします。',
        },
      ],
    },
    disclaimer: {
      eyebrow: 'ポリシー 04',
      title: '生成コードに関する免責事項',
      status: updated.ja,
      sections: [
        {
          heading: 'サンプルから得られる根拠は不完全です',
          body: 'サンプルだけでは、null 許容フィールド、配列要素型、検証規則、データベース制約、関係、識別子のすべてを証明できません。ModelForge は不確実性を表示しますが、ドメインレビューの代わりにはなりません。',
        },
        {
          heading: '本番利用前の確認',
          body: '検証、セキュリティ、シリアライズ、パッケージ名、データベースの前提、すべてのフレームワーク設定を確認してください。コンパイル検証は文書化された fixtures との互換性を確認するもので、アプリケーション構成を認証するものではありません。',
        },
      ],
    },
  },
  ko: {
    privacy: {
      eyebrow: '정책 01',
      title: '개인정보 처리방침',
      status: updated.ko,
      sections: [
        {
          heading: '로컬 변환기 데이터',
          body: '원본 JSON, 추론된 필드 및 모델 데이터와 생성 코드는 브라우저에서 처리됩니다. ModelForge는 이 콘텐츠를 자체 서버로 전송하거나 백엔드에 저장하지 않습니다.',
        },
        {
          heading: '환경설정',
          body: '화면 테마, 인터페이스 언어 및 안전한 대상 설정은 브라우저 로컬 저장소를 사용할 수 있습니다. 원본 입력과 생성 코드는 기본적으로 영구 저장되지 않습니다.',
        },
        {
          heading: '분석',
          body: 'ModelForge는 광고를 표시하지 않으며 어떤 광고 네트워크도 연동하지 않습니다. 이는 보류 중인 사항이 아니라 확정된 결정입니다. 사이트가 불러오는 것은 Cloudflare Web Analytics뿐이며, 쿠키나 영구 식별자 없이 방문 수를 집계합니다. 원본 JSON, 생성된 코드, 필드·모델·패키지 이름은 전달되지 않습니다.',
        },
        {
          heading: '연락처 및 변경',
          body: '이 정책에 관한 문의는 danielgarsil.95@gmail.com으로 보내주세요. ModelForge가 처리하는 내용이 바뀌면 변경 사항을 배포하기 전에 이 페이지를 갱신하고, 위의 날짜도 함께 갱신합니다.',
        },
      ],
    },
    cookies: {
      eyebrow: '정책 02',
      title: '쿠키 및 로컬 저장소',
      status: updated.ko,
      sections: [
        {
          heading: '현재 MVP',
          body: 'ModelForge는 선택한 화면 테마와 인터페이스 언어를 로컬 저장소에 저장합니다. 변환기는 원본 JSON이나 생성된 코드를 저장하지 않으며, 사이트는 쿠키를 설정하지 않습니다. 유일한 서드파티 스크립트는 Cloudflare Web Analytics이며 쿠키와 영구 식별자를 사용하지 않습니다.',
        },
        {
          heading: '추가하지 않을 것',
          body: 'ModelForge에서 광고는 배제되었습니다. 광고 네트워크도, 광고 스크립트도, 광고 쿠키도 없습니다. 앞으로 다른 연동이 개인 데이터를 처리하게 된다면 동의 계층 뒤에 두고, 배포 전에 이 페이지에 공급업체, 목적, 보존 기간, 통제 수단을 명시합니다.',
        },
      ],
    },
    terms: {
      eyebrow: '정책 03',
      title: '이용 약관',
      status: updated.ko,
      sections: [
        {
          heading: '도구 사용',
          body: '제공한 입력과 생성 결과의 검토, 테스트, 라이선스, 보안 및 유지관리는 사용자의 책임입니다. 단일 JSON 샘플을 완전한 운영 스키마로 간주하지 마십시오.',
        },
        {
          heading: '보증 없음',
          body: 'MVP와 생성 결과는 특정 시스템에 대한 적합성 보증 없이 현재 상태로 제공됩니다. 검증된 프레임워크 상태는 문서화된 프로필과 fixtures에만 적용됩니다.',
        },
        {
          heading: '허용되는 사용',
          body: '법률, 권리 또는 서비스 가용성을 침해하는 목적으로 사이트를 사용하지 마십시오. 이 임시 약관은 공개 상용 출시 전에 법률 검토와 운영 연락처 정보가 필요합니다.',
        },
      ],
    },
    disclaimer: {
      eyebrow: '정책 04',
      title: '생성 코드 면책 조항',
      status: updated.ko,
      sections: [
        {
          heading: '샘플은 불완전한 근거입니다',
          body: '하나의 샘플로 모든 null 허용 필드, 배열 요소 타입, 검증 규칙, 데이터베이스 제약, 관계 또는 식별자를 입증할 수 없습니다. ModelForge는 불확실성을 표시하지만 도메인 검토를 대체할 수 없습니다.',
        },
        {
          heading: '운영 적용 전 검토',
          body: '검증, 보안, 직렬화, 패키지 명명, 데이터베이스 가정 및 모든 프레임워크 설정을 확인하십시오. 컴파일 검증은 문서화된 fixtures와의 호환성만 확인하며 애플리케이션 아키텍처를 인증하지 않습니다.',
        },
      ],
    },
  },
};

export function getLegalDocument(
  kind: LegalKind,
  locale: Locale,
): LegalDocument {
  return LEGAL_DOCUMENTS[locale][kind];
}
