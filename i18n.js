/**
 * X Tweet Extractor - 国际化模块 (i18n)
 * 支持语言: 中文(zh), English(en), 日本語(ja), العربية(ar), Español(es),
 *           Italiano(it), Français(fr), Deutsch(de), Português(pt),
 *           Русский(ru), 한국어(ko), हिन्दी(hi), ภาษาไทย(th), Tiếng Việt(vi)
 */

const I18N = {
  // ====== 语言定义 ======
  languages: {
    zh: { name: '简体中文', flag: '🇨🇳' },
    en: { name: 'English', flag: '🇺🇸' },
    ja: { name: '日本語', flag: '🇯🇵' },
    ar: { name: 'العربية', flag: '🇸🇦' },
    es: { name: 'Español', flag: '🇪🇸' },
    it: { name: 'Italiano', flag: '🇮🇹' },
    fr: { name: 'Français', flag: '🇫🇷' },
    de: { name: 'Deutsch', flag: '🇩🇪' },
    pt: { name: 'Português', flag: '🇵🇹' },
    ru: { name: 'Русский', flag: '🇷🇺' },
    ko: { name: '한국어', flag: '🇰🇷' },
    hi: { name: 'हिन्दी', flag: '🇮🇳' },
    th: { name: 'ภาษาไทย', flag: '🇹🇭' },
    vi: { name: 'Tiếng Việt', flag: '🇻🇳' }
  },

  // 默认语言
  currentLang: 'zh',

  // RTL (从右到左) 语言
  rtlLangs: ['ar'],

  // ====== 翻译文本 ======
  messages: {
    // ===== 通用 =====
    appTitle: {
      zh: 'X Tweet Extractor', en: 'X Tweet Extractor', ja: 'X Tweet Extractor',
      ar: 'مستخرج تغريدات X', es: 'X Tweet Extractor', it: 'X Tweet Extractor',
      fr: 'X Tweet Extractor', de: 'X Tweet Extractor', pt: 'X Tweet Extractor',
      ru: 'X Tweet Extractor', ko: 'X Tweet Extractor', hi: 'X Tweet Extractor',
      th: 'X Tweet Extractor', vi: 'X Tweet Extractor'
    },
    subtitle: {
      zh: '提取当前页面用户的推文',
      en: 'Extract tweets from the current page user',
      ja: '現在のページのユーザーのツイートを抽出',
      ar: 'استخراج تغريدات المستخدم من الصفحة الحالية',
      es: 'Extraer tweets del usuario de la página actual',
      it: 'Estrai tweet dall\'utente della pagina corrente',
      fr: 'Extraire les tweets de l\'utilisateur de la page actuelle',
      de: 'Tweets des Benutzers der aktuellen Seite extrahieren',
      pt: 'Extrair tweets do usuário da página atual',
      ru: 'Извлечь твиты пользователя текущей страницы',
      ko: '현재 페이지 사용자의 트윗 추출',
      hi: 'वर्तमान पृष्ठ उपयोगकर्ता से ट्वीट निकालें',
      th: 'ดึงทวีตจากผู้ใช้ในหน้าปัจจุบัน',
      vi: 'Trích xuất tweet từ người dùng trang hiện tại'
    },
    ready: {
      zh: '准备就绪', en: 'Ready', ja: '準備完了',
      ar: 'جاهز', es: 'Listo', it: 'Pronto',
      fr: 'Prêt', de: 'Bereit', pt: 'Pronto',
      ru: 'Готово', ko: '준비됨', hi: 'तैयार',
      th: 'พร้อม', vi: 'Sẵn sàng'
    },
    langLabel: {
      zh: '语言', en: 'Language', ja: '言語',
      ar: 'اللغة', es: 'Idioma', it: 'Lingua',
      fr: 'Langue', de: 'Sprache', pt: 'Idioma',
      ru: 'Язык', ko: '언어', hi: 'भाषा',
      th: 'ภาษา', vi: 'Ngôn ngữ'
    },

    // ===== 用户输入 =====
    usernameLabel: {
      zh: 'X 用户名', en: 'X Username', ja: 'X ユーザー名',
      ar: 'اسم مستخدم X', es: 'Usuario de X', it: 'Nome utente X',
      fr: 'Nom d\'utilisateur X', de: 'X Benutzername', pt: 'Usuário X',
      ru: 'Имя пользователя X', ko: 'X 사용자명', hi: 'X उपयोगकर्ता नाम',
      th: 'ชื่อผู้ใช้ X', vi: 'Tên người dùng X'
    },
    usernamePlaceholder: {
      zh: '输入用户名，如 elonmusk',
      en: 'Enter username, e.g. elonmusk',
      ja: 'ユーザー名を入力、例: elonmusk',
      ar: 'أدخل اسم المستخدم، مثال: elonmusk',
      es: 'Ingrese usuario, ej: elonmusk',
      it: 'Inserisci utente, es: elonmusk',
      fr: 'Entrez le nom, ex: elonmusk',
      de: 'Benutzername eingeben, z.B. elonmusk',
      pt: 'Digite o usuário, ex: elonmusk',
      ru: 'Введите имя, напр. elonmusk',
      ko: '사용자명 입력, 예: elonmusk',
      hi: 'उपयोगकर्ता नाम दर्ज करें, जैसे elonmusk',
      th: 'ป้อนชื่อผู้ใช้ เช่น elonmusk',
      vi: 'Nhập tên người dùng, vd: elonmusk'
    },
    usernameHint: {
      zh: '留空则提取当前打开页面的用户推文',
      en: 'Leave empty to extract from current page',
      ja: '空欄の場合は現在のページから抽出',
      ar: 'اتركه فارغًا للاستخراج من الصفحة الحالية',
      es: 'Dejar vacío para extraer de la página actual',
      it: 'Lascia vuoto per estrarre dalla pagina corrente',
      fr: 'Laisser vide pour extraire de la page actuelle',
      de: 'Leer lassen, um von aktueller Seite zu extrahieren',
      pt: 'Deixe vazio para extrair da página atual',
      ru: 'Оставьте пустым для извлечения с текущей страницы',
      ko: '비우면 현재 페이지에서 추출',
      hi: 'वर्तमान पृष्ठ से निकालने के लिए खाली छोड़ें',
      th: 'เว้นว่างเพื่อดึงจากหน้าปัจจุบัน',
      vi: 'Để trống để trích xuất từ trang hiện tại'
    },

    // ===== 提取参数 =====
    settingsTitle: {
      zh: '提取参数', en: 'Extraction Settings', ja: '抽出設定',
      ar: 'إعدادات الاستخراج', es: 'Ajustes de extracción', it: 'Impostazioni estrazione',
      fr: 'Paramètres d\'extraction', de: 'Extraktionseinstellungen', pt: 'Configurações de extração',
      ru: 'Настройки извлечения', ko: '추출 설정', hi: 'निष्कर्षण सेटिंग्स',
      th: 'การตั้งค่าการดึงข้อมูล', vi: 'Cài đặt trích xuất'
    },
    maxTweets: {
      zh: '最大推文数', en: 'Max Tweets', ja: '最大ツイート数',
      ar: 'أقصى عدد للتغريدات', es: 'Máx. tweets', it: 'Max tweet',
      fr: 'Max tweets', de: 'Max. Tweets', pt: 'Máx. tweets',
      ru: 'Макс. твитов', ko: '최대 트윗 수', hi: 'अधिकतम ट्वीट',
      th: 'ทวีตสูงสุด', vi: 'Tweet tối đa'
    },
    maxScrolls: {
      zh: '最大滚动次数', en: 'Max Scrolls', ja: '最大スクロール回数',
      ar: 'أقصى عدد للتمرير', es: 'Máx. desplazamientos', it: 'Max scorrimenti',
      fr: 'Max défilements', de: 'Max. Scrolls', pt: 'Máx. rolagens',
      ru: 'Макс. прокруток', ko: '최대 스크롤 수', hi: 'अधिकतम स्क्रॉल',
      th: 'เลื่อนสูงสุด', vi: 'Cuộn tối đa'
    },
    scrollDelay: {
      zh: '滚动间隔 (毫秒)', en: 'Scroll Delay (ms)', ja: 'スクロール間隔 (ms)',
      ar: 'تأخير التمرير (مللي ثانية)', es: 'Retraso de scroll (ms)', it: 'Ritardo scorrimento (ms)',
      fr: 'Délai défilement (ms)', de: 'Scroll-Verzögerung (ms)', pt: 'Atraso de rolagem (ms)',
      ru: 'Задержка прокрутки (мс)', ko: '스크롤 지연 (ms)', hi: 'स्क्रॉल देरी (ms)',
      th: 'ความหน่วงเลื่อน (ms)', vi: 'Độ trễ cuộn (ms)'
    },
    settingsHint: {
      zh: '滚动次数越大提取越多但越慢；间隔太短可能加载不全',
      en: 'More scrolls = more tweets but slower; too short delay may miss content',
      ja: 'スクロール回数が多いほど多く抽出できますが遅くなります',
      ar: 'المزيد من التمرير = المزيد من التغريدات ولكن أبطأ',
      es: 'Más desplazamientos = más tweets pero más lento',
      it: 'Più scorrimenti = più tweet ma più lento',
      fr: 'Plus de défilements = plus de tweets mais plus lent',
      de: 'Mehr Scrolls = mehr Tweets aber langsamer',
      pt: 'Mais rolagens = mais tweets mas mais lento',
      ru: 'Больше прокруток = больше твитов, но медленнее',
      ko: '스크롤이 많을수록 트윗이 많아지지만 느려집니다',
      hi: 'अधिक स्क्रॉल = अधिक ट्वीट लेकिन धीमा',
      th: 'เลื่อนมาก = ทวีตมากแต่ช้ากว่า',
      vi: 'Cuộn nhiều = tweet nhiều nhưng chậm hơn'
    },

    // ===== 信息面板 =====
    labelUser: {
      zh: '用户:', en: 'User:', ja: 'ユーザー:',
      ar: 'المستخدم:', es: 'Usuario:', it: 'Utente:',
      fr: 'Utilisateur:', de: 'Benutzer:', pt: 'Usuário:',
      ru: 'Пользователь:', ko: '사용자:', hi: 'उपयोगकर्ता:',
      th: 'ผู้ใช้:', vi: 'Người dùng:'
    },
    labelHandle: {
      zh: '@用户名:', en: '@Handle:', ja: '@ハンドル:',
      ar: '@المعرف:', es: '@Usuario:', it: '@Handle:',
      fr: '@Pseudo:', de: '@Handle:', pt: '@Usuário:',
      ru: '@Ник:', ko: '@핸들:', hi: '@हैंडल:',
      th: '@แฮนเดิล:', vi: '@Tài khoản:'
    },
    labelExtracted: {
      zh: '已提取:', en: 'Extracted:', ja: '抽出済み:',
      ar: 'تم الاستخراج:', es: 'Extraído:', it: 'Estratti:',
      fr: 'Extrait:', de: 'Extrahiert:', pt: 'Extraído:',
      ru: 'Извлечено:', ko: '추출됨:', hi: 'निकाला गया:',
      th: 'ดึงแล้ว:', vi: 'Đã trích xuất:'
    },
    tweetCount: {
      zh: '{n} 条推文', en: '{n} tweets', ja: '{n} 件のツイート',
      ar: '{n} تغريدة', es: '{n} tweets', it: '{n} tweet',
      fr: '{n} tweets', de: '{n} Tweets', pt: '{n} tweets',
      ru: '{n} твитов', ko: '{n}개 트윗', hi: '{n} ट्वीट',
      th: '{n} ทวีต', vi: '{n} tweet'
    },

    // ===== 按钮 =====
    btnExtract: {
      zh: '开始提取推文', en: 'Start Extraction', ja: '抽出を開始',
      ar: 'بدء الاستخراج', es: 'Iniciar extracción', it: 'Avvia estrazione',
      fr: 'Démarrer l\'extraction', de: 'Extraktion starten', pt: 'Iniciar extração',
      ru: 'Начать извлечение', ko: '추출 시작', hi: 'निष्कर्षण शुरू करें',
      th: 'เริ่มดึงข้อมูล', vi: 'Bắt đầu trích xuất'
    },
    btnStop: {
      zh: '停止提取', en: 'Stop Extraction', ja: '抽出を停止',
      ar: 'إيقاف الاستخراج', es: 'Detener extracción', it: 'Ferma estrazione',
      fr: 'Arrêter l\'extraction', de: 'Extraktion stoppen', pt: 'Parar extração',
      ru: 'Остановить извлечение', ko: '추출 중지', hi: 'निष्कर्षण रोकें',
      th: 'หยุดดึงข้อมูล', vi: 'Dừng trích xuất'
    },
    btnClear: {
      zh: '清除数据', en: 'Clear Data', ja: 'データを消去',
      ar: 'مسح البيانات', es: 'Borrar datos', it: 'Cancella dati',
      fr: 'Effacer les données', de: 'Daten löschen', pt: 'Limpar dados',
      ru: 'Очистить данные', ko: '데이터 삭제', hi: 'डेटा साफ़ करें',
      th: 'ล้างข้อมูล', vi: 'Xóa dữ liệu'
    },

    // ===== 导出 =====
    exportTitle: {
      zh: '导出数据', en: 'Export Data', ja: 'データをエクスポート',
      ar: 'تصدير البيانات', es: 'Exportar datos', it: 'Esporta dati',
      fr: 'Exporter les données', de: 'Daten exportieren', pt: 'Exportar dados',
      ru: 'Экспортировать данные', ko: '데이터 내보내기', hi: 'डेटा निर्यात करें',
      th: 'ส่งออกข้อมูล', vi: 'Xuất dữ liệu'
    },
    btnExport: {
      zh: '导出', en: 'Export', ja: 'エクスポート',
      ar: 'تصدير', es: 'Exportar', it: 'Esporta',
      fr: 'Exporter', de: 'Exportieren', pt: 'Exportar',
      ru: 'Экспорт', ko: '내보내기', hi: 'निर्यात',
      th: 'ส่งออก', vi: 'Xuất'
    },
    exportHintDefault: {
      zh: '选择格式后点击导出',
      en: 'Select a format then click Export',
      ja: '形式を選択してエクスポートをクリック',
      ar: 'اختر تنسيقًا ثم انقر على تصدير',
      es: 'Seleccione un formato y haga clic en Exportar',
      it: 'Seleziona un formato e clicca Esporta',
      fr: 'Sélectionnez un format puis cliquez Exporter',
      de: 'Format wählen dann auf Exportieren klicken',
      pt: 'Selecione um formato e clique em Exportar',
      ru: 'Выберите формат и нажмите Экспорт',
      ko: '형식을 선택한 후 내보내기 클릭',
      hi: 'प्रारूप चुनें फिर निर्यात क्लिक करें',
      th: 'เลือกรูปแบบแล้วคลิกส่งออก',
      vi: 'Chọn định dạng rồi nhấp Xuất'
    },
    formatJson: {
      zh: 'JSON 格式 (.json)', en: 'JSON Format (.json)', ja: 'JSON形式 (.json)',
      ar: 'صيغة JSON (.json)', es: 'Formato JSON (.json)', it: 'Formato JSON (.json)',
      fr: 'Format JSON (.json)', de: 'JSON-Format (.json)', pt: 'Formato JSON (.json)',
      ru: 'Формат JSON (.json)', ko: 'JSON 형식 (.json)', hi: 'JSON प्रारूप (.json)',
      th: 'รูปแบบ JSON (.json)', vi: 'Định dạng JSON (.json)'
    },
    formatCsv: {
      zh: 'CSV 格式 (.csv)', en: 'CSV Format (.csv)', ja: 'CSV形式 (.csv)',
      ar: 'صيغة CSV (.csv)', es: 'Formato CSV (.csv)', it: 'Formato CSV (.csv)',
      fr: 'Format CSV (.csv)', de: 'CSV-Format (.csv)', pt: 'Formato CSV (.csv)',
      ru: 'Формат CSV (.csv)', ko: 'CSV 형식 (.csv)', hi: 'CSV प्रारूप (.csv)',
      th: 'รูปแบบ CSV (.csv)', vi: 'Định dạng CSV (.csv)'
    },
    formatTxt: {
      zh: 'TXT 纯文本 (.txt)', en: 'TXT Plain Text (.txt)', ja: 'TXTプレーンテキスト (.txt)',
      ar: 'نص TXT (.txt)', es: 'Texto TXT (.txt)', it: 'Testo TXT (.txt)',
      fr: 'Texte TXT (.txt)', de: 'TXT-Text (.txt)', pt: 'Texto TXT (.txt)',
      ru: 'Текст TXT (.txt)', ko: 'TXT 텍스트 (.txt)', hi: 'TXT पाठ (.txt)',
      th: 'ข้อความ TXT (.txt)', vi: 'Văn bản TXT (.txt)'
    },
    formatHtml: {
      zh: 'HTML 网页 (.html)', en: 'HTML Web Page (.html)', ja: 'HTMLウェブページ (.html)',
      ar: 'صفحة HTML (.html)', es: 'Página HTML (.html)', it: 'Pagina HTML (.html)',
      fr: 'Page HTML (.html)', de: 'HTML-Seite (.html)', pt: 'Página HTML (.html)',
      ru: 'HTML-страница (.html)', ko: 'HTML 페이지 (.html)', hi: 'HTML पेज (.html)',
      th: 'หน้า HTML (.html)', vi: 'Trang HTML (.html)'
    },
    formatMd: {
      zh: 'Markdown (.md)', en: 'Markdown (.md)', ja: 'Markdown (.md)',
      ar: 'ماركداون (.md)', es: 'Markdown (.md)', it: 'Markdown (.md)',
      fr: 'Markdown (.md)', de: 'Markdown (.md)', pt: 'Markdown (.md)',
      ru: 'Markdown (.md)', ko: 'Markdown (.md)', hi: 'Markdown (.md)',
      th: 'Markdown (.md)', vi: 'Markdown (.md)'
    },
    hintJson: {
      zh: 'JSON 格式：保留完整结构化数据，适合程序处理',
      en: 'JSON: Complete structured data, for programming',
      ja: 'JSON: 完全な構造化データ、プログラム用',
      ar: 'JSON: بيانات منظمة كاملة، للبرمجة',
      es: 'JSON: Datos estructurados completos, para programación',
      it: 'JSON: Dati strutturati completi, per programmazione',
      fr: 'JSON: Données structurées complètes, pour programmation',
      de: 'JSON: Vollständige strukturierte Daten, für Programmierung',
      pt: 'JSON: Dados estruturados completos, para programação',
      ru: 'JSON: Полные структурированные данные, для программирования',
      ko: 'JSON: 완전한 구조화 데이터, 프로그래밍용',
      hi: 'JSON: पूर्ण संरचित डेटा, प्रोग्रामिंग के लिए',
      th: 'JSON: ข้อมูลโครงสร้างครบถ้วน สำหรับการเขียนโปรแกรม',
      vi: 'JSON: Dữ liệu cấu trúc đầy đủ, cho lập trình'
    },
    hintCsv: {
      zh: 'CSV 格式：表格形式，可用 Excel 打开',
      en: 'CSV: Tabular format, openable in Excel',
      ja: 'CSV: 表形式、Excelで開けます',
      ar: 'CSV: تنسيق جدولي، يفتح في Excel',
      es: 'CSV: Formato tabular, abre en Excel',
      it: 'CSV: Formato tabellare, apribile in Excel',
      fr: 'CSV: Format tabulaire, ouvrable dans Excel',
      de: 'CSV: Tabellarisches Format, in Excel öffnbar',
      pt: 'CSV: Formato tabular, abrível no Excel',
      ru: 'CSV: Табличный формат, открывается в Excel',
      ko: 'CSV: 표 형식, Excel에서 열기 가능',
      hi: 'CSV: तालिका प्रारूप, Excel में खोलने योग्य',
      th: 'CSV: รูปแบบตาราง เปิดใน Excel ได้',
      vi: 'CSV: Định dạng bảng, mở được trong Excel'
    },
    hintTxt: {
      zh: 'TXT 格式：纯文本，每条推文一段',
      en: 'TXT: Plain text, one section per tweet',
      ja: 'TXT: プレーンテキスト、ツイートごとに段落',
      ar: 'TXT: نص عادي، قسم لكل تغريدة',
      es: 'TXT: Texto plano, una sección por tweet',
      it: 'TXT: Testo semplice, una sezione per tweet',
      fr: 'TXT: Texte simple, une section par tweet',
      de: 'TXT: Klartext, ein Abschnitt pro Tweet',
      pt: 'TXT: Texto simples, uma seção por tweet',
      ru: 'TXT: Простой текст, раздел на твит',
      ko: 'TXT: 일반 텍스트, 트윗당 한 섹션',
      hi: 'TXT: सादा पाठ, प्रति ट्वीट एक अनुभाग',
      th: 'TXT: ข้อความธรรมดา ทวีตละส่วน',
      vi: 'TXT: Văn bản thuần, một mục mỗi tweet'
    },
    hintHtml: {
      zh: 'HTML 格式：带样式的网页，可直接浏览',
      en: 'HTML: Styled web page, viewable in browser',
      ja: 'HTML: スタイル付きウェブページ、ブラウザで閲覧可',
      ar: 'HTML: صفحة ويب منسقة، قابلة للعرض في المتصفح',
      es: 'HTML: Página web con estilos, visible en navegador',
      it: 'HTML: Pagina web stilizzata, visibile nel browser',
      fr: 'HTML: Page web stylisée, visualisable dans navigateur',
      de: 'HTML: Gestylte Webseite, im Browser ansehbar',
      pt: 'HTML: Página web estilizada, visível no navegador',
      ru: 'HTML: Стилизованная веб-страница, просмотр в браузере',
      ko: 'HTML: 스타일이 있는 웹페이지, 브라우저에서 보기 가능',
      hi: 'HTML: स्टाइल वाला वेबपेज, ब्राउज़र में देखने योग्य',
      th: 'HTML: หน้าเว็บที่มีสไตล์ ดูในเบราว์เซอร์ได้',
      vi: 'HTML: Trang web có kiểu dáng, xem trong trình duyệt'
    },
    hintMd: {
      zh: 'Markdown 格式：适合文档和笔记应用',
      en: 'Markdown: For docs and note apps',
      ja: 'Markdown: ドキュメントやノートアプリ向け',
      ar: 'ماركداون: للتطبيقات التوثيقية والملاحظات',
      es: 'Markdown: Para documentos y apps de notas',
      it: 'Markdown: Per documenti e app di note',
      fr: 'Markdown: Pour documents et apps de notes',
      de: 'Markdown: Für Dokumente und Notiz-Apps',
      pt: 'Markdown: Para documentos e apps de notas',
      ru: 'Markdown: Для документов и заметок',
      ko: 'Markdown: 문서 및 노트 앱용',
      hi: 'Markdown: दस्तावेज़ और नोट ऐप्स के लिए',
      th: 'Markdown: สำหรับเอกสารและแอปจดบันทึก',
      vi: 'Markdown: Cho tài liệu và ứng dụng ghi chú'
    },

    // ===== 进度 =====
    progressInit: {
      zh: '初始化...', en: 'Initializing...', ja: '初期化中...',
      ar: 'جاري التهيئة...', es: 'Inicializando...', it: 'Inizializzazione...',
      fr: 'Initialisation...', de: 'Initialisierung...', pt: 'Inicializando...',
      ru: 'Инициализация...', ko: '초기화 중...', hi: 'प्रारंभ हो रहा है...',
      th: 'กำลังเริ่มต้น...', vi: 'Đang khởi tạo...'
    },
    progressExtracting: {
      zh: '正在提取推文...', en: 'Extracting tweets...', ja: 'ツイートを抽出中...',
      ar: 'جاري استخراج التغريدات...', es: 'Extrayendo tweets...', it: 'Estrazione tweet...',
      fr: 'Extraction des tweets...', de: 'Tweets werden extrahiert...', pt: 'Extraindo tweets...',
      ru: 'Извлечение твитов...', ko: '트윗 추출 중...', hi: 'ट्वीट निकाले जा रहे हैं...',
      th: 'กำลังดึงทวีต...', vi: 'Đang trích xuất tweet...'
    },
    progressText: {
      zh: '已提取 {count} 条推文 (滚动 {scroll} 次)',
      en: 'Extracted {count} tweets ({scroll} scrolls)',
      ja: '{count}件抽出（{scroll}回スクロール）',
      ar: 'تم استخراج {count} تغريدة ({scroll} تمرير)',
      es: 'Extraídos {count} tweets ({scroll} desplazamientos)',
      it: 'Estratti {count} tweet ({scroll} scorrimenti)',
      fr: 'Extrait {count} tweets ({scroll} défilements)',
      de: '{count} Tweets extrahiert ({scroll} Scrolls)',
      pt: 'Extraídos {count} tweets ({scroll} rolagens)',
      ru: 'Извлечено {count} твитов ({scroll} прокруток)',
      ko: '{count}개 추출 ({scroll}회 스크롤)',
      hi: '{count} ट्वीट निकाले ({scroll} स्क्रॉल)',
      th: 'ดึงแล้ว {count} ทวีต ({scroll} เลื่อน)',
      vi: 'Đã trích xuất {count} tweet ({scroll} cuộn)'
    },
    progressStopping: {
      zh: '正在停止...', en: 'Stopping...', ja: '停止中...',
      ar: 'جاري الإيقاف...', es: 'Deteniendo...', it: 'Arresto in corso...',
      fr: 'Arrêt en cours...', de: 'Wird gestoppt...', pt: 'Parando...',
      ru: 'Остановка...', ko: '중지 중...', hi: 'रोका जा रहा है...',
      th: 'กำลังหยุด...', vi: 'Đang dừng...'
    },
    pageLoading: {
      zh: '页面加载完成，正在连接提取脚本...',
      en: 'Page loaded, connecting to script...',
      ja: 'ページ読み込み完了、スクリプトに接続中...',
      ar: 'تم تحميل الصفحة، جاري الاتصال بالبرنامج النصي...',
      es: 'Página cargada, conectando al script...',
      it: 'Pagina caricata, connessione allo script...',
      fr: 'Page chargée, connexion au script...',
      de: 'Seite geladen, verbinde mit Skript...',
      pt: 'Página carregada, conectando ao script...',
      ru: 'Страница загружена, подключение к скрипту...',
      ko: '페이지 로드 완료, 스크립트 연결 중...',
      hi: 'पृष्ठ लोड हो गया, स्क्रिप्ट से कनेक्ट हो रहा है...',
      th: 'โหลดหน้าเว็บแล้ว กำลังเชื่อมต่อสคริปต์...',
      vi: 'Đã tải trang, đang kết nối script...'
    },
    navigating: {
      zh: '正在跳转到 @{user} 的主页...',
      en: 'Navigating to @{user}\'s profile...',
      ja: '@{user}のプロフィールに移動中...',
      ar: 'الانتقال إلى ملف @{user}...',
      es: 'Navegando al perfil de @{user}...',
      it: 'Navigazione al profilo di @{user}...',
      fr: 'Navigation vers le profil de @{user}...',
      de: 'Weiterleitung zum Profil von @{user}...',
      pt: 'Navegando para o perfil de @{user}...',
      ru: 'Переход к профилю @{user}...',
      ko: '@{user} 프로필로 이동 중...',
      hi: '@{user} की प्रोफ़ाइल पर जा रहे हैं...',
      th: 'กำลังไปยังโปรไฟล์ @{user}...',
      vi: 'Đang chuyển đến trang @{user}...'
    },

    // ===== 状态消息 =====
    msgComplete: {
      zh: '提取完成！共 {n} 条推文',
      en: 'Extraction complete! {n} tweets total',
      ja: '抽出完了！合計{n}件',
      ar: 'اكتمل الاستخراج! {n} تغريدة',
      es: '¡Extracción completa! {n} tweets en total',
      it: 'Estrazione completata! {n} tweet totali',
      fr: 'Extraction terminée ! {n} tweets au total',
      de: 'Extraktion abgeschlossen! {n} Tweets gesamt',
      pt: 'Extração concluída! {n} tweets no total',
      ru: 'Извлечение завершено! Всего {n} твитов',
      ko: '추출 완료! 총 {n}개 트윗',
      hi: 'निष्कर्षण पूर्ण! कुल {n} ट्वीट',
      th: 'ดึงข้อมูลเสร็จสิ้น! รวม {n} ทวีต',
      vi: 'Trích xuất hoàn tất! Tổng cộng {n} tweet'
    },
    msgStopped: {
      zh: '已停止！共提取 {n} 条推文',
      en: 'Stopped! {n} tweets extracted',
      ja: '停止しました！{n}件抽出',
      ar: 'تم الإيقاف! تم استخراج {n} تغريدة',
      es: '¡Detenido! {n} tweets extraídos',
      it: 'Fermito! {n} tweet estratti',
      fr: 'Arrêté ! {n} tweets extraits',
      de: 'Gestoppt! {n} Tweets extrahiert',
      pt: 'Parado! {n} tweets extraídos',
      ru: 'Остановлено! Извлечено {n} твитов',
      ko: '중지됨! {n}개 추출됨',
      hi: 'रुक गया! {n} ट्वीट निकाले गए',
      th: 'หยุดแล้ว! ดึงแล้ว {n} ทวีต',
      vi: 'Đã dừng! Đã trích xuất {n} tweet'
    },
    msgLoaded: {
      zh: '已加载 {n} 条推文',
      en: 'Loaded {n} tweets',
      ja: '{n}件のツイートを読み込みました',
      ar: 'تم تحميل {n} تغريدة',
      es: 'Cargados {n} tweets',
      it: 'Caricati {n} tweet',
      fr: '{n} tweets chargés',
      de: '{n} Tweets geladen',
      pt: 'Carregados {n} tweets',
      ru: 'Загружено {n} твитов',
      ko: '{n}개 트윗 로드됨',
      hi: '{n} ट्वीट लोड किए गए',
      th: 'โหลดแล้ว {n} ทวีต',
      vi: 'Đã tải {n} tweet'
    },
    msgCleared: {
      zh: '数据已清除', en: 'Data cleared', ja: 'データを消去しました',
      ar: 'تم مسح البيانات', es: 'Datos borrados', it: 'Dati cancellati',
      fr: 'Données effacées', de: 'Daten gelöscht', pt: 'Dados limpos',
      ru: 'Данные очищены', ko: '데이터가 삭제되었습니다', hi: 'डेटा साफ़ किया गया',
      th: 'ล้างข้อมูลแล้ว', vi: 'Đã xóa dữ liệu'
    },
    msgExportSuccess: {
      zh: '{format} 导出成功！共 {n} 条推文',
      en: '{format} export success! {n} tweets',
      ja: '{format}エクスポート成功！{n}件',
      ar: 'نجح تصدير {format}! {n} تغريدة',
      es: '¡Exportación {format} exitosa! {n} tweets',
      it: 'Esportazione {format} riuscita! {n} tweet',
      fr: 'Export {format} réussi ! {n} tweets',
      de: '{format} Export erfolgreich! {n} Tweets',
      pt: 'Exportação {format} bem-sucedida! {n} tweets',
      ru: 'Экспорт {format} успешен! {n} твитов',
      ko: '{format} 내보내기 성공! {n}개',
      hi: '{format} निर्यात सफल! {n} ट्वीट',
      th: 'ส่งออก {format} สำเร็จ! {n} ทวีต',
      vi: 'Xuất {format} thành công! {n} tweet'
    },
    msgNoData: {
      zh: '没有可导出的数据，请先提取推文',
      en: 'No data to export, please extract first',
      ja: 'エクスポートするデータがありません。先に抽出してください',
      ar: 'لا توجد بيانات للتصدير، يرجى الاستخراج أولاً',
      es: 'Sin datos para exportar, extraiga primero',
      it: 'Nessun dato da esportare, estrai prima',
      fr: 'Pas de données à exporter, extraire d\'abord',
      de: 'Keine Daten zum Exportieren, bitte zuerst extrahieren',
      pt: 'Sem dados para exportar, extraia primeiro',
      ru: 'Нет данных для экспорта, сначала извлеките',
      ko: '내보낼 데이터가 없습니다. 먼저 추출하세요',
      hi: 'निर्यात करने का डेटा नहीं, पहले निकालें',
      th: 'ไม่มีข้อมูลส่งออก กรุณาดึงก่อน',
      vi: 'Không có dữ liệu để xuất, vui lòng trích xuất trước'
    },
    msgStartPage: {
      zh: '输入用户名或打开 X 页面后开始',
      en: 'Enter a username or open an X page to start',
      ja: 'ユーザー名を入力するかXページを開いてください',
      ar: 'أدخل اسم مستخدم أو افتح صفحة X للبدء',
      es: 'Ingrese un usuario o abra una página X para empezar',
      it: 'Inserisci un utente o apri una pagina X per iniziare',
      fr: 'Entrez un nom ou ouvrez une page X pour démarrer',
      de: 'Benutzername eingeben oder X-Seite öffnen zum Starten',
      pt: 'Digite um usuário ou abra uma página X para começar',
      ru: 'Введите имя или откройте страницу X для начала',
      ko: '사용자명을 입력하거나 X 페이지를 여세요',
      hi: 'उपयोगकर्ता नाम दर्ज करें या X पेज खोलें',
      th: 'ป้อนชื่อผู้ใช้หรือเปิดหน้า X เพื่อเริ่ม',
      vi: 'Nhập tên người dùng hoặc mở trang X để bắt đầu'
    },

    // ===== 错误 =====
    errNoTab: {
      zh: '无法获取当前标签页',
      en: 'Cannot get current tab',
      ja: '現在のタブを取得できません',
      ar: 'تعذر الحصول على التبويب الحالي',
      es: 'No se puede obtener la pestaña actual',
      it: 'Impossibile ottenere la scheda corrente',
      fr: 'Impossible d\'obtenir l\'onglet actuel',
      de: 'Aktueller Tab kann nicht abgerufen werden',
      pt: 'Não é possível obter a aba atual',
      ru: 'Не удалось получить текущую вкладку',
      ko: '현재 탭을 가져올 수 없습니다',
      hi: 'वर्तमान टैब नहीं मिल सका',
      th: 'ไม่สามารถรับแท็บปัจจุบันได้',
      vi: 'Không thể lấy tab hiện tại'
    },
    errNotXPage: {
      zh: '请在 X (Twitter) 页面使用此扩展',
      en: 'Please use this extension on an X (Twitter) page',
      ja: 'X (Twitter) ページでご使用ください',
      ar: 'يرجى استخدام هذه الإضافة على صفحة X (Twitter)',
      es: 'Use esta extensión en una página de X (Twitter)',
      it: 'Usa questa estensione su una pagina X (Twitter)',
      fr: 'Veuillez utiliser cette extension sur une page X (Twitter)',
      de: 'Bitte diese Erweiterung auf einer X (Twitter) Seite verwenden',
      pt: 'Use esta extensão em uma página do X (Twitter)',
      ru: 'Используйте это расширение на странице X (Twitter)',
      ko: 'X (Twitter) 페이지에서 이 확장을 사용하세요',
      hi: 'कृपया X (Twitter) पेज पर इस एक्सटेंशन का उपयोग करें',
      th: 'กรุณาใช้ส่วนขยายนี้บนหน้า X (Twitter)',
      vi: 'Vui lòng sử dụng tiện ích này trên trang X (Twitter)'
    },
    errNoScript: {
      zh: '无法连接到页面脚本，请确认已在 X 页面并刷新后重试',
      en: 'Cannot connect to page script. Ensure you are on an X page and refresh',
      ja: 'ページスクリプトに接続できません。Xページで更新してください',
      ar: 'تعذر الاتصال ببرنامج الصفحة. تأكد من أنك على صفحة X وقم بالتحديث',
      es: 'No se puede conectar al script. Asegúrate de estar en X y refresca',
      it: 'Impossibile connettersi allo script. Assicurati di essere su X e aggiorna',
      fr: 'Impossible de se connecter au script. Assurez-vous d\'être sur X et rafraîchir',
      de: 'Keine Verbindung zum Skript. X-Seite öffnen und aktualisieren',
      pt: 'Não é possível conectar ao script. Abra uma página X e atualize',
      ru: 'Не удалось подключиться к скрипту. Откройте страницу X и обновите',
      ko: '스크립트에 연결할 수 없습니다. X 페이지에서 새로고침하세요',
      hi: 'स्क्रिप्ट से कनेक्ट नहीं हो सका। X पेज पर रीफ्रेश करें',
      th: 'เชื่อมต่อสคริปต์ไม่ได้ รีเฟรชหน้า X แล้วลองใหม่',
      vi: 'Không thể kết nối script. Mở trang X và tải lại'
    },
    errNoScriptCurrent: {
      zh: '无法连接到页面脚本，请确认当前是 X 页面并刷新后重试',
      en: 'Cannot connect to page script. Refresh the current X page and retry',
      ja: 'ページスクリプトに接続できません。現在のXページを更新してください',
      ar: 'تعذر الاتصال. تحقق من أنك على صفحة X وقم بالتحديث',
      es: 'No se puede conectar. Actualiza la página X actual',
      it: 'Impossibile connettersi. Aggiorna la pagina X corrente',
      fr: 'Impossible de se connecter. Rafraîchissez la page X actuelle',
      de: 'Keine Verbindung. Aktuelle X-Seite aktualisieren',
      pt: 'Não é possível conectar. Atualize a página X atual',
      ru: 'Не удалось подключиться. Обновите текущую страницу X',
      ko: '연결할 수 없습니다. 현재 X 페이지를 새로고침하세요',
      hi: 'कनेक्ट नहीं हो सका। वर्तमान X पेज रीफ्रेश करें',
      th: 'เชื่อมต่อไม่ได้ รีเฟรชหน้า X ปัจจุบัน',
      vi: 'Không thể kết nối. Tải lại trang X hiện tại'
    },
    errStartFailed: {
      zh: '启动提取失败',
      en: 'Failed to start extraction',
      ja: '抽出の開始に失敗しました',
      ar: 'فشل بدء الاستخراج',
      es: 'Error al iniciar la extracción',
      it: 'Avvio estrazione fallito',
      fr: 'Échec du démarrage de l\'extraction',
      de: 'Extraktion konnte nicht gestartet werden',
      pt: 'Falha ao iniciar extração',
      ru: 'Не удалось запустить извлечение',
      ko: '추출 시작 실패',
      hi: 'निष्कर्षण शुरू करने में विफल',
      th: 'เริ่มดึงข้อมูลไม่สำเร็จ',
      vi: 'Khởi động trích xuất thất bại'
    },
    errExtract: {
      zh: '提取出错', en: 'Extraction error', ja: '抽出エラー',
      ar: 'خطأ في الاستخراج', es: 'Error de extracción', it: 'Errore di estrazione',
      fr: 'Erreur d\'extraction', de: 'Extraktionsfehler', pt: 'Erro de extração',
      ru: 'Ошибка извлечения', ko: '추출 오류', hi: 'निष्कर्षण त्रुटि',
      th: 'ข้อผิดพลาดการดึงข้อมูล', vi: 'Lỗi trích xuất'
    },
    errStop: {
      zh: '停止出错', en: 'Stop error', ja: '停止エラー',
      ar: 'خطأ في الإيقاف', es: 'Error al detener', it: 'Errore di arresto',
      fr: 'Erreur d\'arrêt', de: 'Stoppen fehlgeschlagen', pt: 'Erro ao parar',
      ru: 'Ошибка остановки', ko: '중지 오류', hi: 'रोकने में त्रुटि',
      th: 'ข้อผิดพลาดการหยุด', vi: 'Lỗi dừng'
    },
    errExport: {
      zh: '导出失败', en: 'Export failed', ja: 'エクスポート失敗',
      ar: 'فشل التصدير', es: 'Exportación fallida', it: 'Esportazione fallita',
      fr: 'Échec de l\'export', de: 'Export fehlgeschlagen', pt: 'Exportação falhou',
      ru: 'Ошибка экспорта', ko: '내보내기 실패', hi: 'निर्यात विफल',
      th: 'ส่งออกล้มเหลว', vi: 'Xuất thất bại'
    },
    errExportGen: {
      zh: '导出出错: {msg}',
      en: 'Export error: {msg}',
      ja: 'エクスポートエラー: {msg}',
      ar: 'خطأ التصدير: {msg}',
      es: 'Error de exportación: {msg}',
      it: 'Errore di esportazione: {msg}',
      fr: 'Erreur d\'export: {msg}',
      de: 'Exportfehler: {msg}',
      pt: 'Erro de exportação: {msg}',
      ru: 'Ошибка экспорта: {msg}',
      ko: '내보내기 오류: {msg}',
      hi: 'निर्यात त्रुटि: {msg}',
      th: 'ข้อผิดพลาดส่งออก: {msg}',
      vi: 'Lỗi xuất: {msg}'
    },
    errAlreadyExtracting: {
      zh: '正在提取中，请稍候...',
      en: 'Extraction in progress, please wait...',
      ja: '抽出中です。お待ちください...',
      ar: 'جاري الاستخراج، يرجى الانتظار...',
      es: 'Extracción en progreso, espere...',
      it: 'Estrazione in corso, attendere...',
      fr: 'Extraction en cours, veuillez patienter...',
      de: 'Extraktion läuft, bitte warten...',
      pt: 'Extração em andamento, aguarde...',
      ru: 'Извлечение выполняется, подождите...',
      ko: '추출 중입니다. 잠시만 기다려주세요...',
      hi: 'निष्कर्षण जारी है, कृपया प्रतीक्षा करें...',
      th: 'กำลังดึงข้อมูล กรุณารอ...',
      vi: 'Đang trích xuất, vui lòng đợi...'
    },
    errUnknownAction: {
      zh: '未知操作', en: 'Unknown action', ja: '不明な操作',
      ar: 'إجراء غير معروف', es: 'Acción desconocida', it: 'Azione sconosciuta',
      fr: 'Action inconnue', de: 'Unbekannte Aktion', pt: 'Ação desconhecida',
      ru: 'Неизвестное действие', ko: '알 수 없는 작업', hi: 'अज्ञात क्रिया',
      th: 'การกระทำที่ไม่รู้จัก', vi: 'Hành động không xác định'
    },

    // ===== 预览 =====
    previewTitle: {
      zh: '预览 (最近5条)', en: 'Preview (Latest 5)', ja: 'プレビュー（最新5件）',
      ar: 'معاينة (آخر 5)', es: 'Vista previa (Últimos 5)', it: 'Anteprima (Ultimi 5)',
      fr: 'Aperçu (5 derniers)', de: 'Vorschau (Letzte 5)', pt: 'Pré-visualização (Últimos 5)',
      ru: 'Предпросмотр (последние 5)', ko: '미리보기 (최신 5)', hi: 'पूर्वावलोकन (अंतिम 5)',
      th: 'ดูตัวอย่าง (ล่าสุด 5)', vi: 'Xem trước (5 mới nhất)'
    },
    noText: {
      zh: '(无文本内容)', en: '(No text content)', ja: '(テキストなし)',
      ar: '(لا يوجد نص)', es: '(Sin contenido)', it: '(Nessun testo)',
      fr: '(Pas de texte)', de: '(Kein Text)', pt: '(Sem texto)',
      ru: '(Нет текста)', ko: '(텍스트 없음)', hi: '(कोई पाठ नहीं)',
      th: '(ไม่มีข้อความ)', vi: '(Không có nội dung)'
    },
    likes: {
      zh: '赞', en: 'Likes', ja: 'いいね',
      ar: 'إعجابات', es: 'Me gusta', it: 'Mi piace',
      fr: 'J\'aime', de: 'Gefällt mir', pt: 'Curtidas',
      ru: 'Нравится', ko: '좋아요', hi: 'पसंद',
      th: 'ถูกใจ', vi: 'Thích'
    },

    // ===== 导出文件内容 =====
    exportFileTitle: {
      zh: '{handle} 的推文', en: '{handle}\'s Tweets', ja: '{handle}のツイート',
      ar: 'تغريدات {handle}', es: 'Tweets de {handle}', it: 'Tweet di {handle}',
      fr: 'Tweets de {handle}', de: 'Tweets von {handle}', pt: 'Tweets de {handle}',
      ru: 'Твиты {handle}', ko: '{handle}의 트윗', hi: '{handle} के ट्वीट',
      th: 'ทวีตของ {handle}', vi: 'Tweet của {handle}'
    },
    exportTime: {
      zh: '导出时间', en: 'Exported at', ja: 'エクスポート日時',
      ar: 'تصدير في', es: 'Exportado el', it: 'Esportato il',
      fr: 'Exporté le', de: 'Exportiert am', pt: 'Exportado em',
      ru: 'Экспортировано', ko: '내보낸 시간', hi: 'निर्यात समय',
      th: 'ส่งออกเมื่อ', vi: 'Xuất lúc'
    },
    exportTotal: {
      zh: '共 {n} 条推文', en: '{n} tweets total', ja: '合計{n}件',
      ar: 'إجمالي {n} تغريدة', es: '{n} tweets en total', it: '{n} tweet totali',
      fr: '{n} tweets au total', de: '{n} Tweets gesamt', pt: '{n} tweets no total',
      ru: 'Всего {n} твитов', ko: '총 {n}개 트윗', hi: 'कुल {n} ट्वीट',
      th: 'รวม {n} ทวีต', vi: 'Tổng cộng {n} tweet'
    },
    exportOriginal: {
      zh: '原创 {n} 条 | 转发 {m} 条',
      en: '{n} original | {m} retweets',
      ja: 'オリジナル{n}件 | リツイート{m}件',
      ar: '{n} أصلي | {m} إعادة تغريد',
      es: '{n} originales | {m} retweets',
      it: '{n} originali | {m} retweet',
      fr: '{n} originaux | {m} retweets',
      de: '{n} Original | {m} Retweets',
      pt: '{n} originais | {m} retweets',
      ru: '{n} оригиналов | {m} ретвитов',
      ko: '원본 {n} | 리트윗 {m}',
      hi: '{n} मूल | {m} रीट्वीट',
      th: 'ต้นฉบับ {n} | รีทวีต {m}',
      vi: '{n} gốc | {m} retweet'
    },
    viewOriginal: {
      zh: '查看原文', en: 'View Original', ja: '原文を見る',
      ar: 'عرض الأصلي', es: 'Ver original', it: 'Vedi originale',
      fr: 'Voir l\'original', de: 'Original ansehen', pt: 'Ver original',
      ru: 'Открыть оригинал', ko: '원문 보기', hi: 'मूल देखें',
      th: 'ดูต้นฉบับ', vi: 'Xem gốc'
    },
    badgeMedia: {
      zh: '媒体', en: 'Media', ja: 'メディア',
      ar: 'وسائط', es: 'Media', it: 'Media',
      fr: 'Média', de: 'Medien', pt: 'Mídia',
      ru: 'Медиа', ko: '미디어', hi: 'मीडिया',
      th: 'สื่อ', vi: 'Phương tiện'
    },
    badgeRetweet: {
      zh: '转发', en: 'Retweet', ja: 'リツイート',
      ar: 'إعادة تغريد', es: 'Retweet', it: 'Retweet',
      fr: 'Retweet', de: 'Retweet', pt: 'Retweet',
      ru: 'Ретвит', ko: '리트윗', hi: 'रीट्वीट',
      th: 'รีทวีต', vi: 'Retweet'
    },
    tagRetweet: {
      zh: '转发', en: 'Retweet', ja: 'リツイート',
      ar: 'إعادة تغريد', es: 'Retweet', it: 'Retweet',
      fr: 'Retweet', de: 'Retweet', pt: 'Retweet',
      ru: 'Ретвит', ko: '리트윗', hi: 'रीट्वीट',
      th: 'รีทวีต', vi: 'Retweet'
    },
    tagMedia: {
      zh: '含媒体', en: 'With Media', ja: 'メディア付き',
      ar: 'مع وسائط', es: 'Con media', it: 'Con media',
      fr: 'Avec média', de: 'Mit Medien', pt: 'Com mídia',
      ru: 'С медиа', ko: '미디어 포함', hi: 'मीडिया के साथ',
      th: 'มีสื่อ', vi: 'Có phương tiện'
    },
    metaLikes: {
      zh: '赞', en: 'Likes', ja: 'いいね',
      ar: 'إعجابات', es: 'Me gusta', it: 'Mi piace',
      fr: 'J\'aime', de: 'Likes', pt: 'Curtidas',
      ru: 'Нравится', ko: '좋아요', hi: 'पसंद',
      th: 'ถูกใจ', vi: 'Thích'
    },
    metaRetweets: {
      zh: '转发', en: 'Retweets', ja: 'リツイート',
      ar: 'إعادة تغريد', es: 'Retweets', it: 'Retweet',
      fr: 'Retweets', de: 'Retweets', pt: 'Retweets',
      ru: 'Ретвиты', ko: '리트윗', hi: 'रीट्वीट',
      th: 'รีทวีต', vi: 'Retweet'
    },
    metaReplies: {
      zh: '回复', en: 'Replies', ja: 'リプライ',
      ar: 'ردود', es: 'Respuestas', it: 'Risposte',
      fr: 'Réponses', de: 'Antworten', pt: 'Respostas',
      ru: 'Ответы', ko: '답글', hi: 'जवाब',
      th: 'ตอบกลับ', vi: 'Trả lời'
    },
    exportTweetExport: {
      zh: 'X 推文导出 - @{handle}',
      en: 'X Tweet Export - @{handle}',
      ja: 'Xツイートエクスポート - @{handle}',
      ar: 'تصدير تغريدات X - @{handle}',
      es: 'Exportación de tweets X - @{handle}',
      it: 'Esportazione tweet X - @{handle}',
      fr: 'Export tweets X - @{handle}',
      de: 'X Tweet Export - @{handle}',
      pt: 'Exportação de tweets X - @{handle}',
      ru: 'Экспорт твитов X - @{handle}',
      ko: 'X 트윗 내보내기 - @{handle}',
      hi: 'X ट्वीट निर्यात - @{handle}',
      th: 'ส่งออกทวีต X - @{handle}',
      vi: 'Xuất tweet X - @{handle}'
    },
    containsMedia: {
      zh: '[含图片/视频]',
      en: '[Contains image/video]',
      ja: '[画像/動画を含む]',
      ar: '[يحتوي على صورة/فيديو]',
      es: '[Contiene imagen/video]',
      it: '[Contiene immagine/video]',
      fr: '[Contient image/vidéo]',
      de: '[Enthält Bild/Video]',
      pt: '[Contém imagem/vídeo]',
      ru: '[Содержит изображение/видео]',
      ko: '[이미지/동영상 포함]',
      hi: '[छवि/वीडियो शामिल]',
      th: '[มีรูปภาพ/วิดีโอ]',
      vi: '[Có ảnh/video]'
    },
    linkLabel: {
      zh: '链接', en: 'Link', ja: 'リンク',
      ar: 'رابط', es: 'Enlace', it: 'Link',
      fr: 'Lien', de: 'Link', pt: 'Link',
      ru: 'Ссылка', ko: '링크', hi: 'लिंक',
      th: 'ลิงก์', vi: 'Liên kết'
    }
  },

  // ====== 核心方法 ======

  t(key, params = {}) {
    const msg = this.messages[key];
    if (!msg) return key;

    let text = msg[this.currentLang] || msg['en'] || msg['zh'] || key;

    if (params && typeof params === 'object') {
      for (const [k, v] of Object.entries(params)) {
        text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
      }
    }

    return text;
  },

  setLang(lang) {
    if (this.languages[lang]) {
      this.currentLang = lang;
      this.saveLang(lang);
    }
  },

  getLang() {
    return this.currentLang;
  },

  isRTL() {
    return this.rtlLangs.includes(this.currentLang);
  },

  async saveLang(lang) {
    try {
      await chrome.storage.local.set({ __extractorLang: lang });
    } catch (e) {}
  },

  async loadLang() {
    try {
      const result = await chrome.storage.local.get('__extractorLang');
      if (result && result.__extractorLang && this.languages[result.__extractorLang]) {
        this.currentLang = result.__extractorLang;
      } else {
        const browserLang = (navigator.language || 'en').toLowerCase();
        if (browserLang.startsWith('zh')) this.currentLang = 'zh';
        else if (browserLang.startsWith('ja')) this.currentLang = 'ja';
        else if (browserLang.startsWith('ar')) this.currentLang = 'ar';
        else if (browserLang.startsWith('es')) this.currentLang = 'es';
        else if (browserLang.startsWith('it')) this.currentLang = 'it';
        else if (browserLang.startsWith('fr')) this.currentLang = 'fr';
        else if (browserLang.startsWith('de')) this.currentLang = 'de';
        else if (browserLang.startsWith('pt')) this.currentLang = 'pt';
        else if (browserLang.startsWith('ru')) this.currentLang = 'ru';
        else if (browserLang.startsWith('ko')) this.currentLang = 'ko';
        else if (browserLang.startsWith('hi')) this.currentLang = 'hi';
        else if (browserLang.startsWith('th')) this.currentLang = 'th';
        else if (browserLang.startsWith('vi')) this.currentLang = 'vi';
        else this.currentLang = 'en';
      }
    } catch (e) {
      this.currentLang = 'en';
    }
    return this.currentLang;
  },

  applyToDOM(root = document) {
    root.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const params = el.getAttribute('data-i18n-params');
      const paramObj = params ? JSON.parse(params) : {};
      el.textContent = this.t(key, paramObj);
    });

    root.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.placeholder = this.t(key);
    });

    document.documentElement.lang = this.currentLang === 'zh' ? 'zh-CN' : this.currentLang;
    document.documentElement.dir = this.isRTL() ? 'rtl' : 'ltr';
  }
};

if (typeof window !== 'undefined') {
  window.I18N = I18N;
}
