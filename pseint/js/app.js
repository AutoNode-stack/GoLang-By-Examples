// js/app.js - Lógica Interactiva Completa para PSeInt Lógica de Programación Pro (Edición Estática en Español)

document.addEventListener('DOMContentLoaded', () => {
  // 1. Estado de la Aplicación
  const state = {
    topics: window.PSEINT_TOPICS || window.TOPICS_DATA || [],
    categories: window.PSEINT_CATEGORIES || [
      { id: "fundamentos", name: "Fundamentos y Variables", icon: "terminal" },
      { id: "operadores", name: "Operadores y Expresiones", icon: "zap" },
      { id: "condicionales", name: "Estructuras Condicionales", icon: "git-branch" },
      { id: "bucles", name: "Estructuras Repetitivas", icon: "repeat" },
      { id: "modularizacion", name: "Modularización y Subprocesos", icon: "cpu" },
      { id: "arreglos-vectores", name: "Arreglos Unidimensionales (Vectores)", icon: "layers" },
      { id: "arreglos-matrices", name: "Arreglos Bidimensionales (Matrices)", icon: "grid" },
      { id: "cadenas-algoritmos", name: "Cadenas y Algoritmos Aplicados", icon: "code" }
    ],
    currentIndex: 0,
    currentTab: 'code',
    completed: new Set(JSON.parse(localStorage.getItem('pseint_completed') || '[]')),
    bookmarks: new Set(JSON.parse(localStorage.getItem('pseint_bookmarks') || '[]')),
    searchQuery: '',
    filterDifficulty: 'all',
    currentTheme: localStorage.getItem('pseint_theme') || 'slate',
    isZenMode: localStorage.getItem('pseint_zen') === 'true',
    cpSelectedIndex: 0,
    cpFilteredItems: []
  };

  // Enriquecer temas con Gotchas y Preguntas Algorítmicas si el módulo está cargado
  if (window.enrichTopicsWithGotchas) {
    window.enrichTopicsWithGotchas(state.topics);
  }

  // 2. Elementos del DOM
  const dom = {
    // Layout
    body: document.body,
    sidebar: document.getElementById('sidebar'),
    menuToggleBtn: document.getElementById('menuToggleBtn'),
    // Progreso Global
    progressCount: document.getElementById('progressCount'),
    progressBarFill: document.getElementById('progressBarFill'),
    // Búsqueda y Filtros
    sidebarSearchTrigger: document.getElementById('sidebarSearchTrigger'),
    searchInput: document.getElementById('searchInput'),
    filterChips: document.querySelectorAll('.chip-btn'),
    topicsNav: document.getElementById('topicsNav'),
    // Topbar y Herramientas
    themeButtons: document.querySelectorAll('.theme-btn'),
    btnShare: document.getElementById('btnShare'),
    btnStats: document.getElementById('btnStats'),
    btnBackup: document.getElementById('btnBackup'),
    btnToggleCompleted: document.getElementById('btnToggleCompleted'),
    btnToggleBookmark: document.getElementById('btnToggleBookmark'),
    btnOpenPlayground: document.getElementById('btnOpenPlayground'),
    // Breadcrumbs
    breadCategory: document.getElementById('breadCategory'),
    breadCurrent: document.getElementById('breadCurrent'),
    // Detalle del Tema
    topicNum: document.getElementById('topicNum'),
    topicBadgeDifficulty: document.getElementById('topicBadgeDifficulty'),
    topicBadgeCategory: document.getElementById('topicBadgeCategory'),
    topicTitle: document.getElementById('topicTitle'),
    topicTitleEn: document.getElementById('topicTitleEn'),
    topicSummary: document.getElementById('topicSummary'),
    // Pestañas
    tabButtons: document.querySelectorAll('.tab-btn'),
    tabContents: document.querySelectorAll('.tab-content'),
    // Código y Terminal Virtual
    codeContainer: document.getElementById('codeContainer'),
    terminalPanel: document.getElementById('terminalPanel'),
    terminalContainer: document.getElementById('terminalContainer'),
    btnRunTerminal: document.getElementById('btnRunTerminal'),
    btnStopTerminal: document.getElementById('btnStopTerminal'),
    btnClearTerminal: document.getElementById('btnClearTerminal'),
    btnCopyCode: document.getElementById('btnCopyCode'),
    btnCopyTerminal: document.getElementById('btnCopyTerminal'),
    terminalStatusBadge: document.getElementById('terminalStatusBadge'),
    terminalStatusText: document.getElementById('terminalStatusText'),
    originalDocText: document.getElementById('originalDocText'),
    // Niveles Explicativos
    basicTitle: document.getElementById('basicTitle'),
    basicContent: document.getElementById('basicContent'),
    basicKeypoints: document.getElementById('basicKeypoints'),
    interTitle: document.getElementById('interTitle'),
    interContent: document.getElementById('interContent'),
    interKeypoints: document.getElementById('interKeypoints'),
    expertTitle: document.getElementById('expertTitle'),
    expertContent: document.getElementById('expertContent'),
    expertKeypoints: document.getElementById('expertKeypoints'),
    // Gotchas & Entrevistas
    gotchasContainer: document.getElementById('gotchasContainer'),
    mentalModelBox: document.getElementById('mentalModelBox'),
    mentalModelContent: document.getElementById('mentalModelContent'),
    interviewsContainer: document.getElementById('interviewsContainer'),
    // Evaluación Práctica
    evalTitle: document.getElementById('evalTitle'),
    evalStatement: document.getElementById('evalStatement'),
    evalTextarea: document.getElementById('evalTextarea'),
    evalCursorPos: document.getElementById('evalCursorPos'),
    btnToggleHint: document.getElementById('btnToggleHint'),
    hintBox: document.getElementById('hintBox'),
    btnValidateCode: document.getElementById('btnValidateCode'),
    validationBox: document.getElementById('validationBox'),
    btnRevealSolution: document.getElementById('btnRevealSolution'),
    solutionBox: document.getElementById('solutionBox'),
    solutionCode: document.getElementById('solutionCode'),
    solutionExplanation: document.getElementById('solutionExplanation'),
    btnResetCode: document.getElementById('btnResetCode'),
    btnPlaygroundEval: document.getElementById('btnPlaygroundEval'),
    evalTerminalPanel: document.getElementById('evalTerminalPanel'),
    evalTerminalContainer: document.getElementById('evalTerminalContainer'),
    btnRunEvalTerminal: document.getElementById('btnRunEvalTerminal'),
    btnStopEvalTerminal: document.getElementById('btnStopEvalTerminal'),
    btnClearEvalTerminal: document.getElementById('btnClearEvalTerminal'),
    evalTerminalStatusBadge: document.getElementById('evalTerminalStatusBadge'),
    evalTerminalStatusText: document.getElementById('evalTerminalStatusText'),
    // Enlaces Externos
    externalLinksGrid: document.getElementById('externalLinksGrid'),
    // Navegación Inferior
    btnNavPrev: document.getElementById('btnNavPrev'),
    btnNavNext: document.getElementById('btnNavNext'),
    prevTitleText: document.getElementById('prevTitleText'),
    nextTitleText: document.getElementById('nextTitleText'),
    // Modales y Extras
    commandPaletteModal: document.getElementById('commandPaletteModal'),
    cpInput: document.getElementById('cpInput'),
    cpResults: document.getElementById('cpResults'),
    btnCpClose: document.getElementById('btnCpClose'),
    backupModal: document.getElementById('backupModal'),
    btnCloseBackup: document.getElementById('btnCloseBackup'),
    btnExportProgress: document.getElementById('btnExportProgress'),
    importFileInput: document.getElementById('importFileInput'),
    btnResetProgress: document.getElementById('btnResetProgress'),
    statsModal: document.getElementById('statsModal'),
    btnCloseStats: document.getElementById('btnCloseStats'),
    statCompletedNum: document.getElementById('statCompletedNum'),
    statPercentNum: document.getElementById('statPercentNum'),
    statBookmarksNum: document.getElementById('statBookmarksNum'),
    statEstHours: document.getElementById('statEstHours'),
    statsDiffBreakdown: document.getElementById('statsDiffBreakdown'),
    certUserName: document.getElementById('certUserName'),
    btnGenerateCert: document.getElementById('btnGenerateCert'),
    certCanvasWrap: document.getElementById('certCanvasWrap'),
    certCanvas: document.getElementById('certCanvas'),
    btnDownloadCert: document.getElementById('btnDownloadCert'),
    toastContainer: document.getElementById('toastContainer'),
    offlinePill: document.getElementById('offlinePill')
  };

  // 3. Notificaciones Toast
  function showToast(message, iconName = 'check') {
    if (!dom.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    const iconSvg = window.getSvgIcon ? window.getSvgIcon(iconName) : '';
    toast.innerHTML = `<span class="toast-icon-wrap">${iconSvg}</span><span>${message}</span>`;
    dom.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(12px)';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  // 4. Efecto de Confeti (Canvas Nativo)
  function triggerConfetti() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.inset = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '99999';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#10b981', '#34d399', '#059669', '#38bdf8', '#fbbf24', '#ffffff'];
    const particles = [];
    const count = 75;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 200,
        y: canvas.height / 3 + (Math.random() - 0.5) * 100,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.7) * 16,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10,
        opacity: 1
      });
    }

    let animationFrame;
    const startTime = Date.now();

    function render() {
      const elapsed = Date.now() - startTime;
      if (elapsed > 2400) {
        cancelAnimationFrame(animationFrame);
        canvas.remove();
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.4;
        p.vx *= 0.98;
        p.rotation += p.rotSpeed;
        p.opacity = Math.max(0, 1 - elapsed / 2400);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      });

      animationFrame = requestAnimationFrame(render);
    }

    render();
  }

  // 5. Resaltador de Sintaxis de PSeInt
  function highlightPseintSyntax(code) {
    if (!code) return '';
    
    let safe = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    const stringsAndComments = [];
    const placeholder = (idx) => `___TOK_${idx}___`;

    // Comentarios y cadenas
    safe = safe.replace(/(\/\/[^\n]*|\/\*[\s\S]*?\*\/|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/g, (match) => {
      const idx = stringsAndComments.length;
      let className = 'syn-str';
      if (match.startsWith('//') || match.startsWith('/*')) {
        className = 'syn-com';
      }
      stringsAndComments.push(`<span class="${className}">${match}</span>`);
      return placeholder(idx);
    });

    // Palabras Reservadas PSeInt
    const keywords = [
      'Algoritmo', 'FinAlgoritmo', 'Proceso', 'FinProceso',
      'SubProceso', 'FinSubProceso', 'SubAlgoritmo', 'FinSubAlgoritmo', 'Funcion', 'FinFuncion',
      'Definir', 'Como', 'Dimension',
      'Escribir', 'Leer', 'Sin Bajar',
      'Si', 'Entonces', 'Sino', 'FinSi',
      'Segun', 'Hacer', 'De Otro Modo', 'FinSegun',
      'Mientras', 'FinMientras', 'Repetir', 'Hasta Que',
      'Para', 'Hasta', 'Con Paso', 'FinPara',
      'Por Valor', 'Por Referencia',
      'Verdadero', 'Falso',
      'Y', 'O', 'NO', 'MOD'
    ];
    const kwRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'gi');
    safe = safe.replace(kwRegex, '<span class="syn-kwd">$1</span>');

    // Tipos de Datos PSeInt
    const types = [
      'Entero', 'Real', 'Caracter', 'Texto', 'Cadena', 'Logico', 'Booleano', 'Numerico'
    ];
    const typeRegex = new RegExp(`\\b(${types.join('|')})\\b`, 'gi');
    safe = safe.replace(typeRegex, '<span class="syn-typ">$1</span>');

    // Funciones Integradas
    const builtins = [
      'Longitud', 'Subcadena', 'Mayusculas', 'Minusculas',
      'ConvertirANumero', 'ConvertirATexto',
      'rc', 'raiz', 'abs', 'sen', 'cos', 'tan', 'atan', 'ln', 'exp',
      'trunc', 'redon', 'azar', 'aleatorio'
    ];
    const builtinRegex = new RegExp(`\\b(${builtins.join('|')})\\b`, 'gi');
    safe = safe.replace(builtinRegex, '<span class="syn-blt">$1</span>');

    // Números
    safe = safe.replace(/\b(\d+\.?\d*|\.\d+)\b/g, '<span class="syn-num">$1</span>');

    // Flecha de asignación <-
    safe = safe.replace(/&lt;-/g, '<span class="syn-kwd">&lt;-</span>');

    // Nombres de funciones invocadas
    safe = safe.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)(?=\()/g, '<span class="syn-fn">$1</span>');

    // Restaurar tokens protegidos
    stringsAndComments.forEach((tok, idx) => {
      safe = safe.replace(placeholder(idx), tok);
    });

    return safe;
  }

  // 6. Configurar Tema Visual
  function applyTheme(themeName) {
    state.currentTheme = themeName;
    localStorage.setItem('pseint_theme', themeName);

    // Aplicar clase de tema al body (igual que el curso de Go)
    dom.body.classList.remove('theme-sepia', 'theme-oled', 'theme-nord');
    if (themeName !== 'slate') {
      dom.body.classList.add(`theme-${themeName}`);
    }

    dom.themeButtons.forEach(btn => {
      const match = btn.getAttribute('data-theme') === themeName;
      btn.classList.toggle('active', match);
    });
  }

  applyTheme(state.currentTheme);

  dom.themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.getAttribute('data-theme');
      applyTheme(theme);
      showToast(`Tema visual cambiado a: ${btn.querySelector('.theme-name').textContent}`, 'palette');
    });
  });

  // 7. Modo Zen y Control de Barra Lateral
  const topbarEl = document.querySelector('.topbar');
  if (topbarEl) {
    topbarEl.addEventListener('scroll', () => { topbarEl.scrollLeft = 0; });
    window.addEventListener('resize', () => { topbarEl.scrollLeft = 0; });
  }

  function setZenMode(enabled) {
    state.isZenMode = enabled;
    localStorage.setItem('pseint_zen', enabled ? 'true' : 'false');
    dom.sidebar.classList.toggle('collapsed-desktop', enabled);
    dom.menuToggleBtn.innerHTML = window.getSvgIcon(enabled ? 'arrow-left' : 'arrow-right');
    dom.menuToggleBtn.title = enabled ? 'Mostrar barra lateral a la derecha (Ctrl+B)' : 'Ocultar barra lateral (Ctrl+B)';
    if (topbarEl) topbarEl.scrollLeft = 0;
  }

  if (window.innerWidth > 900 && state.isZenMode) {
    setZenMode(true);
  } else {
    setZenMode(false);
  }

  dom.menuToggleBtn.addEventListener('click', () => {
    if (window.innerWidth <= 900) {
      dom.sidebar.classList.toggle('open');
    } else {
      setZenMode(!state.isZenMode);
    }
  });

  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 900 && dom.sidebar.classList.contains('open')) {
      if (!dom.sidebar.contains(e.target) && !dom.menuToggleBtn.contains(e.target)) {
        dom.sidebar.classList.remove('open');
      }
    }
  });

  // 8. Renderizado del Sidebar con Estilo Exacto de Go (category-group, topic-nav-item)
  function renderSidebar() {
    dom.topicsNav.innerHTML = '';
    const q = state.searchQuery.toLowerCase().trim();

    state.categories.forEach(cat => {
      const catTopics = state.topics.filter(t => t.categorySlug === cat.id);
      
      const filteredTopics = catTopics.filter(t => {
        if (state.filterDifficulty !== 'all') {
          if (state.filterDifficulty === 'completados' && !state.completed.has(t.slug)) return false;
          if (state.filterDifficulty === 'pendientes' && state.completed.has(t.slug)) return false;
          if (state.filterDifficulty === 'favoritos' && !state.bookmarks.has(t.slug)) return false;
          if (['principiante', 'intermedio', 'avanzado'].includes(state.filterDifficulty)) {
            if (t.difficulty.toLowerCase() !== state.filterDifficulty) return false;
          }
        }
        if (q) {
          const matchTitle = t.titleEs.toLowerCase().includes(q) || t.title.toLowerCase().includes(q);
          const matchSumm = (t.summary || '').toLowerCase().includes(q);
          const matchCode = (t.code || '').toLowerCase().includes(q);
          return matchTitle || matchSumm || matchCode;
        }
        return true;
      });

      if (filteredTopics.length === 0) return;

      // Calcular temas completados de esta categoría
      const catCompletedCount = catTopics.filter(t => state.completed.has(t.slug)).length;
      const isCatAllDone = catTopics.length > 0 && catCompletedCount === catTopics.length;

      const groupEl = document.createElement('div');
      groupEl.className = 'category-group';

      const headerEl = document.createElement('div');
      headerEl.className = 'category-header';
      headerEl.innerHTML = `
        <div class="category-title-wrap">
          <span class="category-arrow">▼</span>
          ${window.getSvgIcon(cat.icon || 'folder', 'cat-icon')}<span>${cat.name}</span>
        </div>
        <div class="category-progress-wrap">
          <span class="category-ratio-badge ${isCatAllDone ? 'completed-all' : ''}">
            ${isCatAllDone ? window.getSvgIcon('check', 'cat-done-check') : ''}${catCompletedCount}/${catTopics.length}
          </span>
        </div>
      `;

      headerEl.addEventListener('click', () => {
        groupEl.classList.toggle('collapsed');
      });

      const itemsEl = document.createElement('div');
      itemsEl.className = 'category-items';

      filteredTopics.forEach(t => {
        const itemEl = document.createElement('div');
        const isCurrent = state.topics[state.currentIndex]?.slug === t.slug;
        const isDone = state.completed.has(t.slug);

        itemEl.className = `topic-nav-item ${isCurrent ? 'active' : ''} ${isDone ? 'completed' : ''}`;
        itemEl.innerHTML = `
          <div class="topic-nav-left">
            <span class="topic-status-icon" title="Alternar completado">${window.getSvgIcon('check', 'status-check')}</span>
            <span class="topic-num">${t.id}</span>
            <span class="topic-nav-title" title="${t.titleEs}">${t.titleEs}</span>
          </div>
          <span class="topic-badge-difficulty badge-${t.difficulty.toLowerCase()}">${t.difficulty[0]}</span>
        `;

        itemEl.addEventListener('click', (e) => {
          if (e.target.classList.contains('topic-status-icon') || e.target.closest('.topic-status-icon')) {
            e.stopPropagation();
            toggleCompleted(t.slug);
            return;
          }
          selectTopicBySlug(t.slug);
          if (window.innerWidth <= 900) {
            dom.sidebar.classList.remove('open');
          }
        });

        itemsEl.appendChild(itemEl);
      });

      groupEl.appendChild(headerEl);
      groupEl.appendChild(itemsEl);
      dom.topicsNav.appendChild(groupEl);
    });

    updateProgress();
  }

  // 9. Actualizar Barra de Progreso Global
  function updateProgress() {
    const total = state.topics.length;
    const count = state.completed.size;
    const percent = total > 0 ? Math.round((count / total) * 100) : 0;

    dom.progressCount.textContent = `${count} / ${total} (${percent}%)`;
    dom.progressBarFill.style.width = `${percent}%`;
  }

  // 10. Actualizar URL con Hash (#slug?tab=xyz)
  function updateUrlHash(slug, tab) {
    const currentTab = tab || state.currentTab;
    const cleanHash = `${slug}?tab=${currentTab}`;
    history.replaceState(null, '', `#${cleanHash}`);
  }

  // 11. Cargar y Renderizar el Tema Actual
  function renderCurrentTopic() {
    const t = state.topics[state.currentIndex];
    if (!t) return;

    // Actualizar URL
    updateUrlHash(t.slug, state.currentTab);

    // Breadcrumbs y Metadatos
    dom.breadCategory.textContent = t.category;
    dom.breadCurrent.textContent = t.titleEs;

    dom.topicNum.textContent = `#${t.id}`;
    dom.topicBadgeDifficulty.textContent = t.difficulty;
    dom.topicBadgeDifficulty.className = `topic-badge-difficulty badge-${t.difficulty.toLowerCase()}`;
    dom.topicBadgeCategory.innerHTML = `${window.getSvgIcon(t.categoryIcon || 'folder', 'topic-cat-icon')} <span>${t.category}</span>`;

    dom.topicTitle.textContent = t.titleEs;
    dom.topicTitleEn.textContent = `PSeInt Lógica: "${t.title}"`;
    dom.topicSummary.textContent = t.summary;

    // Estado de Botones Topbar
    const isDone = state.completed.has(t.slug);
    dom.btnToggleCompleted.classList.toggle('active-completed', isDone);
    dom.btnToggleCompleted.querySelector('.btn-label').textContent = isDone ? 'Completado' : 'Completar';

    const isFav = state.bookmarks.has(t.slug);
    dom.btnToggleBookmark.classList.toggle('active-favorite', isFav);
    dom.btnToggleBookmark.querySelector('.btn-label').textContent = isFav ? 'Guardado' : 'Favorito';

    // Pestaña 1: Código Original y Explicación
    dom.originalDocText.textContent = t.originalExpl;
    dom.codeContainer.innerHTML = `<pre><code>${highlightPseintSyntax(t.code)}</code></pre>`;
    if (activeVM && activeVM.isRunning) {
      activeVM.stop();
    }
    dom.terminalContainer.innerHTML = '';
    if (dom.terminalStatusBadge) {
      dom.terminalStatusBadge.className = 'terminal-status-badge';
      dom.terminalStatusText.textContent = 'Listo';
    }
    if (dom.btnRunTerminal) dom.btnRunTerminal.disabled = false;
    if (dom.btnStopTerminal) dom.btnStopTerminal.disabled = true;

    // Pestaña 2: Nivel Básico
    dom.basicTitle.textContent = t.basicExpl?.title || "Analogía del Mundo Real y Conceptos Clave";
    dom.basicContent.textContent = t.basicExpl?.content || t.basicExpl?.analogies || "";
    dom.basicKeypoints.innerHTML = (t.basicExpl?.keyPoints || []).map(p => `<li>${p}</li>`).join('');

    // Pestaña 3: Nivel Intermedio
    dom.interTitle.textContent = t.interExpl?.title || "Prueba de Escritorio y Mapeo de Memoria";
    dom.interContent.textContent = typeof t.intermediateExpl === 'string' ? t.intermediateExpl : (t.interExpl ? t.interExpl.content : '');
    const interPoints = (t.interExpl && t.interExpl.keyPoints) ? t.interExpl.keyPoints : [
      "Rastreo paso a paso de variables en cada ciclo de ejecución.",
      "Identificación de cambios de estado y condiciones lógicas.",
      "Validación de salidas y prevención de desbordamientos."
    ];
    dom.interKeypoints.innerHTML = interPoints.map(p => `<li>${p}</li>`).join('');

    // Pestaña 4: Nivel Experto
    dom.expertTitle.textContent = t.expertExpl?.title || "Complejidad Big-O y Fundamentos de Arquitectura";
    dom.expertContent.textContent = typeof t.expertExpl === 'string' ? t.expertExpl : (t.expertExpl?.content || '');
    const expertPoints = (t.expertExpl && t.expertExpl.keyPoints) ? t.expertExpl.keyPoints : [
      "Análisis asintótico formal: Mejor caso, caso promedio y peor caso.",
      "Localidad de memoria caché y optimización de acceso secuencial.",
      "Equivalencia e implementación en lenguajes profesionales (Go, C++, Python)."
    ];
    dom.expertKeypoints.innerHTML = expertPoints.map(p => `<li>${p}</li>`).join('');

    // Pestaña 5: Gotchas y Trampas de Producción
    renderGotchas(t);

    // Pestaña 6: Preguntas de Entrevista Algorítmica
    renderInterviews(t);

    // Pestaña 7: Evaluación Práctica
    const evalData = t.evaluation || {};
    dom.evalTitle.textContent = evalData.title || `Reto Práctico: ${t.titleEs}`;
    dom.evalStatement.textContent = evalData.statement || evalData.task || "Completa el algoritmo en pseudocódigo siguiendo las instrucciones indicadas.";
    dom.evalTextarea.value = evalData.starterCode || '// Escribe tu pseudocódigo en PSeInt aquí...\nAlgoritmo Reto\n    \nFinAlgoritmo\n';
    updateEditorCursorPos();

    // Resetear estados de evaluación
    dom.hintBox.style.display = 'none';
    dom.hintBox.innerHTML = `<strong>Pista:</strong> ${evalData.hint || 'Revisa la sintaxis de PSeInt, la definición de variables y la estructura del algoritmo.'}`;
    dom.btnToggleHint.innerHTML = `${window.getSvgIcon('lightbulb', 'icon-warning')} <span>Ver Pista</span>`;

    dom.validationBox.style.display = 'none';
    dom.validationBox.innerHTML = '';

    dom.solutionBox.style.display = 'none';
    dom.btnRevealSolution.innerHTML = `${window.getSvgIcon('check', 'icon-success')} <span>Revelar Solución Canónica</span>`;
    dom.solutionCode.innerHTML = `<pre><code>${highlightPseintSyntax(evalData.solution || '')}</code></pre>`;
    dom.solutionExplanation.innerHTML = `<strong>Análisis de la Solución Canónica:</strong><br>${evalData.explanation || 'Esta solución aplica el diseño estructurado canónico con control de flujo exacto.'}`;

    // Pestaña 8: Enlaces Externos
    dom.externalLinksGrid.innerHTML = '';
    (t.externalLinks || []).forEach(link => {
      const card = document.createElement('a');
      card.className = 'resource-card';
      card.href = link.url;
      card.target = '_blank';
      card.rel = 'noopener noreferrer';
      card.innerHTML = `
        <div class="resource-card-header">
          <div class="resource-card-icon">${window.getSvgIcon('globe')}</div>
          <div class="resource-card-domain">Documentación Externa</div>
        </div>
        <div class="resource-card-title">${link.title}</div>
        <div class="resource-card-desc">Consulta recursos oficiales, guías pedagógicas y artículos académicos sobre este tema.</div>
        <div class="resource-card-action">
          <span>Abrir referencia</span>
          ${window.getSvgIcon('arrow-right')}
        </div>
      `;
      dom.externalLinksGrid.appendChild(card);
    });

    // Barra de Navegación Inferior (Anterior / Siguiente)
    const prevIdx = state.currentIndex - 1;
    const nextIdx = state.currentIndex + 1;

    if (prevIdx >= 0) {
      dom.btnNavPrev.style.visibility = 'visible';
      dom.prevTitleText.textContent = state.topics[prevIdx].titleEs;
    } else {
      dom.btnNavPrev.style.visibility = 'hidden';
    }

    if (nextIdx < state.topics.length) {
      dom.btnNavNext.style.visibility = 'visible';
      dom.nextTitleText.textContent = state.topics[nextIdx].titleEs;
    } else {
      dom.btnNavNext.style.visibility = 'hidden';
    }

    // Actualizar sidebar activo
    renderSidebar();
    updateProgress();

    // Scroll to top del área de lectura
    const scrollable = document.querySelector('.content-scrollable');
    if (scrollable) scrollable.scrollTop = 0;
  }

  // 12. Renderizar Gotchas y Errores
  function renderGotchas(topic) {
    if (!dom.gotchasContainer) return;
    dom.gotchasContainer.innerHTML = '';
    const gotchas = topic.gotchas || [];

    if (gotchas.length === 0) {
      dom.gotchasContainer.innerHTML = '<p style="color: var(--text-muted); font-size: 14px;">No se registran anti-patrones críticos para este concepto elemental.</p>';
    } else {
      gotchas.forEach((g, idx) => {
        const item = document.createElement('div');
        item.className = 'gotcha-item';
        item.innerHTML = `
          <div class="gotcha-title">
            <span class="gotcha-badge">${idx + 1}</span>
            <span>${g.title}</span>
          </div>
          <div class="gotcha-grid">
            <div class="gotcha-code-box box-bad">
              <div class="gotcha-code-header">
                ${window.getSvgIcon('close', 'icon-danger')}
                <span>Error Típico / Anti-patrón</span>
              </div>
              <pre><code>${highlightPseintSyntax(g.codeBad)}</code></pre>
            </div>
            <div class="gotcha-code-box box-good">
              <div class="gotcha-code-header">
                ${window.getSvgIcon('check', 'icon-success')}
                <span>Forma Correcta y Robusta</span>
              </div>
              <pre><code>${highlightPseintSyntax(g.codeGood)}</code></pre>
            </div>
          </div>
          <div class="gotcha-exp"><strong>Explicación:</strong> ${g.explanation}</div>
          <div class="gotcha-impact"><strong>Impacto en Ejecución:</strong> ${g.impact}</div>
        `;
        dom.gotchasContainer.appendChild(item);
      });
    }

    // Modelo Mental
    if (topic.mentalModel) {
      dom.mentalModelBox.style.display = 'block';
      dom.mentalModelContent.textContent = topic.mentalModel;
    } else {
      dom.mentalModelBox.style.display = 'none';
    }
  }

  // 13. Renderizar Preguntas de Entrevista Algorítmica
  function renderInterviews(topic) {
    if (!dom.interviewsContainer) return;
    dom.interviewsContainer.innerHTML = '';
    const interviews = topic.interviewQuestions || [];

    if (interviews.length === 0) {
      dom.interviewsContainer.innerHTML = '<p style="color: var(--text-muted); font-size: 14px;">No hay preguntas de entrevista indexadas para este tema.</p>';
      return;
    }

    interviews.forEach(q => {
      const item = document.createElement('div');
      item.className = 'interview-item';
      item.innerHTML = `
        <div class="interview-q-header">
          <div class="interview-q-title">${q.question}</div>
          <div class="interview-q-meta">
            <span class="badge-company">${q.companyTag || 'Algoritmos'}</span>
            <span class="badge-diff badge-${(q.level || 'intermedio').toLowerCase()}">${q.level || 'Intermedio'}</span>
          </div>
        </div>
        <div class="interview-answer">
          ${q.answer.replace(/\n/g, '<br>')}
        </div>
      `;
      dom.interviewsContainer.appendChild(item);
    });
  }

  // 14. Navegación y Selección de Temas
  function selectTopicByIndex(index) {
    if (index < 0 || index >= state.topics.length) return;
    state.currentIndex = index;
    renderCurrentTopic();
  }

  function selectTopicBySlug(slug) {
    const idx = state.topics.findIndex(t => t.slug === slug);
    if (idx !== -1) {
      selectTopicByIndex(idx);
    }
  }

  // 15. Alternar Estado Completado y Favoritos
  function toggleCompleted(slug) {
    const targetSlug = slug || state.topics[state.currentIndex]?.slug;
    if (!targetSlug) return;

    let isDoneNow = false;
    if (state.completed.has(targetSlug)) {
      state.completed.delete(targetSlug);
      showToast('Tema desmarcado');
    } else {
      state.completed.add(targetSlug);
      isDoneNow = true;
      showToast('¡Tema completado con éxito!', 'check');
      triggerConfetti();
    }

    localStorage.setItem('pseint_completed', JSON.stringify(Array.from(state.completed)));
    renderSidebar();

    if (targetSlug === state.topics[state.currentIndex]?.slug) {
      dom.btnToggleCompleted.classList.toggle('active-completed', isDoneNow);
      dom.btnToggleCompleted.querySelector('.btn-label').textContent = isDoneNow ? 'Completado' : 'Completar';
    }
  }

  function toggleBookmark() {
    const slug = state.topics[state.currentIndex]?.slug;
    if (!slug) return;

    if (state.bookmarks.has(slug)) {
      state.bookmarks.delete(slug);
      showToast('Eliminado de favoritos');
    } else {
      state.bookmarks.add(slug);
      showToast('Guardado en favoritos', 'star');
    }

    localStorage.setItem('pseint_bookmarks', JSON.stringify(Array.from(state.bookmarks)));
    renderCurrentTopic();
  }

  dom.btnToggleCompleted.addEventListener('click', () => toggleCompleted());
  dom.btnToggleBookmark.addEventListener('click', () => toggleBookmark());

  // 16. Cambio de Pestañas (Tabs)
  function setActiveTab(tabId) {
    state.currentTab = tabId;

    dom.tabButtons.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
    });

    dom.tabContents.forEach(content => {
      content.classList.toggle('active', content.id === `tab-${tabId}`);
    });

    const currentTopic = state.topics[state.currentIndex];
    if (currentTopic) {
      updateUrlHash(currentTopic.slug, tabId);
    }
  }

  dom.tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      setActiveTab(tab);
    });
  });

  // 17. Parser de la URL Inicial (#slug?tab=xyz)
  function handleUrlHash() {
    const hash = window.location.hash.replace('#', '');
    if (!hash) {
      renderCurrentTopic();
      return;
    }

    const parts = hash.split('?');
    const slug = parts[0];
    const params = new URLSearchParams(parts[1] || '');
    const tab = params.get('tab') || 'code';

    const idx = state.topics.findIndex(t => t.slug === slug);
    if (idx !== -1) {
      state.currentIndex = idx;
    }

    state.currentTab = tab;
    setActiveTab(tab);
    renderCurrentTopic();
  }

  window.addEventListener('hashchange', handleUrlHash);

  // 18. Botones de Navegación Inferior
  dom.btnNavPrev.addEventListener('click', (e) => {
    e.preventDefault();
    if (state.currentIndex > 0) {
      selectTopicByIndex(state.currentIndex - 1);
    }
  });

  dom.btnNavNext.addEventListener('click', (e) => {
    e.preventDefault();
    if (state.currentIndex < state.topics.length - 1) {
      selectTopicByIndex(state.currentIndex + 1);
    }
  });

  // 19. Acciones de la Topbar
  dom.btnShare.addEventListener('click', async () => {
    const url = window.location.href;
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        showToast('Enlace directo copiado al portapapeles', 'share');
      } else {
        showToast('Enlace: ' + url, 'share');
      }
    } catch (err) {
      showToast('No se pudo copiar automáticamente', 'alert-triangle');
    }
  });

  // 19.1 Simulador Virtual de PSeInt
  let activeVM = null;

  function runCodeInTerminal(code, elements) {
    if (!window.PseintInterpreter) {
      showToast('Motor PSeInt no disponible', 'alert-triangle');
      return;
    }

    if (activeVM && activeVM.isRunning) {
      activeVM.stop();
    }

    activeVM = new window.PseintInterpreter.VM();

    const {
      container,
      statusBadge,
      statusText,
      btnRun,
      btnStop
    } = elements;

    container.innerHTML = '';

    function appendLine(className, text) {
      const line = document.createElement('div');
      line.className = className;
      line.textContent = text;
      container.appendChild(line);
      container.scrollTop = container.scrollHeight;
      return line;
    }

    let lastOutputLine = null;

    const io = {
      onStart: () => {
        if (statusBadge) statusBadge.className = 'terminal-status-badge status-running';
        if (statusText) statusText.textContent = 'Ejecutando...';
        if (btnRun) btnRun.disabled = true;
        if (btnStop) btnStop.disabled = false;
        appendLine('term-line-system', '*** Ejecución Iniciada ***');
      },
      onPrint: (text) => {
        lastOutputLine = appendLine('term-line-output', text);
      },
      onPrintSinBajar: (text) => {
        if (!lastOutputLine) {
          lastOutputLine = appendLine('term-line-output', text);
        } else {
          lastOutputLine.textContent += text;
          container.scrollTop = container.scrollHeight;
        }
      },
      onRequestInput: (varName, callback) => {
        lastOutputLine = null;
        const promptRow = document.createElement('div');
        promptRow.className = 'term-prompt-row';
        promptRow.innerHTML = `
          <span class="term-prompt-label">
            ${window.getSvgIcon('terminal')}
            <span>> Ingrese valor para <strong>${varName}</strong>:</span>
          </span>
          <input type="text" class="term-inline-input" placeholder="Escriba un valor y presione Enter..." autofocus />
          <button type="button" class="term-inline-submit">Ingresar</button>
        `;
        container.appendChild(promptRow);
        container.scrollTop = container.scrollHeight;

        const inputEl = promptRow.querySelector('.term-inline-input');
        const submitBtn = promptRow.querySelector('.term-inline-submit');

        setTimeout(() => inputEl.focus(), 60);

        function handleValueSubmit() {
          const val = inputEl.value.trim();
          promptRow.innerHTML = `> Ingrese valor para <strong>${varName}</strong>: <span style="color: #34d399; font-weight: bold;">${val || '(vacío)'}</span>`;
          lastOutputLine = null;
          callback(val);
        }

        inputEl.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleValueSubmit();
          }
        });

        submitBtn.addEventListener('click', (e) => {
          e.preventDefault();
          handleValueSubmit();
        });
      },
      onWaitInputState: (isWaiting) => {
        if (isWaiting) {
          if (statusBadge) statusBadge.className = 'terminal-status-badge status-waiting';
          if (statusText) statusText.textContent = 'Esperando entrada...';
        } else {
          if (statusBadge) statusBadge.className = 'terminal-status-badge status-running';
          if (statusText) statusText.textContent = 'Ejecutando...';
        }
      },
      onFinish: (exitCode) => {
        if (statusBadge) statusBadge.className = 'terminal-status-badge';
        if (statusText) statusText.textContent = 'Finalizado';
        if (btnRun) btnRun.disabled = false;
        if (btnStop) btnStop.disabled = true;
        appendLine('term-line-success', `*** Ejecución Finalizada (Código ${exitCode}) ***`);
      },
      onError: (errMsg) => {
        if (statusBadge) statusBadge.className = 'terminal-status-badge status-error';
        if (statusText) statusText.textContent = 'Error';
        if (btnRun) btnRun.disabled = false;
        if (btnStop) btnStop.disabled = true;
        appendLine('term-line-error', errMsg);
      },
      onCancel: () => {
        if (statusBadge) statusBadge.className = 'terminal-status-badge';
        if (statusText) statusText.textContent = 'Detenido';
        if (btnRun) btnRun.disabled = false;
        if (btnStop) btnStop.disabled = true;
        appendLine('term-line-system', '*** Ejecución detenida por el usuario ***');
      }
    };

    activeVM.execute(code, io);
  }

  dom.btnOpenPlayground.addEventListener('click', () => {
    const t = state.topics[state.currentIndex];
    if (!t) return;
    setActiveTab('code');
    showToast('Iniciando simulación en consola virtual...', 'terminal');
    if (dom.terminalPanel) {
      dom.terminalPanel.scrollIntoView({ behavior: 'smooth' });
    }
    runCodeInTerminal(t.code, {
      container: dom.terminalContainer,
      statusBadge: dom.terminalStatusBadge,
      statusText: dom.terminalStatusText,
      btnRun: dom.btnRunTerminal,
      btnStop: dom.btnStopTerminal
    });
  });

  if (dom.btnRunTerminal) {
    dom.btnRunTerminal.addEventListener('click', () => {
      const t = state.topics[state.currentIndex];
      if (!t) return;
      runCodeInTerminal(t.code, {
        container: dom.terminalContainer,
        statusBadge: dom.terminalStatusBadge,
        statusText: dom.terminalStatusText,
        btnRun: dom.btnRunTerminal,
        btnStop: dom.btnStopTerminal
      });
    });
  }

  if (dom.btnStopTerminal) {
    dom.btnStopTerminal.addEventListener('click', () => {
      if (activeVM) {
        activeVM.stop();
        showToast('Ejecución detenida', 'alert-triangle');
      }
    });
  }

  if (dom.btnClearTerminal) {
    dom.btnClearTerminal.addEventListener('click', () => {
      dom.terminalContainer.innerHTML = '<div class="term-line-system">*** Consola PSeInt Limpia ***</div>';
      if (dom.terminalStatusBadge) {
        dom.terminalStatusBadge.className = 'terminal-status-badge';
        dom.terminalStatusText.textContent = 'Listo';
      }
      if (dom.btnRunTerminal) dom.btnRunTerminal.disabled = false;
      if (dom.btnStopTerminal) dom.btnStopTerminal.disabled = true;
    });
  }

  dom.btnCopyCode.addEventListener('click', () => {
    const t = state.topics[state.currentIndex];
    if (!t) return;
    navigator.clipboard.writeText(t.code).then(() => {
      showToast('Pseudocódigo copiado al portapapeles', 'copy');
    });
  });

  dom.btnCopyTerminal.addEventListener('click', () => {
    const text = dom.terminalContainer.innerText || dom.terminalContainer.textContent || '';
    navigator.clipboard.writeText(text).then(() => {
      showToast('Salida de consola copiada al portapapeles', 'copy');
    });
  });

  // 20. Filtros de Búsqueda y Chips en Sidebar
  dom.searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    renderSidebar();
  });

  dom.filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      dom.filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.filterDifficulty = chip.getAttribute('data-filter');
      renderSidebar();
    });
  });

  // 21. Editor de Evaluación Práctica
  function updateEditorCursorPos() {
    if (!dom.evalCursorPos || !dom.evalTextarea) return;
    const text = dom.evalTextarea.value.substring(0, dom.evalTextarea.selectionStart);
    const lines = text.split('\n');
    const lineNum = lines.length;
    const colNum = lines[lines.length - 1].length + 1;
    dom.evalCursorPos.textContent = `Línea ${lineNum}, Col ${colNum} | ${dom.evalTextarea.value.length} caracteres`;
  }

  dom.evalTextarea.addEventListener('keyup', updateEditorCursorPos);
  dom.evalTextarea.addEventListener('click', updateEditorCursorPos);
  dom.evalTextarea.addEventListener('input', updateEditorCursorPos);

  dom.evalTextarea.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = dom.evalTextarea.selectionStart;
      const end = dom.evalTextarea.selectionEnd;
      dom.evalTextarea.value = dom.evalTextarea.value.substring(0, start) + '    ' + dom.evalTextarea.value.substring(end);
      dom.evalTextarea.selectionStart = dom.evalTextarea.selectionEnd = start + 4;
      updateEditorCursorPos();
    } else if (e.key === '(' || e.key === '[' || e.key === '"') {
      const pairs = { '(': ')', '[': ']', '"': '"' };
      const start = dom.evalTextarea.selectionStart;
      const end = dom.evalTextarea.selectionEnd;
      const closing = pairs[e.key];
      dom.evalTextarea.value = dom.evalTextarea.value.substring(0, start) + e.key + closing + dom.evalTextarea.value.substring(end);
      dom.evalTextarea.selectionStart = dom.evalTextarea.selectionEnd = start + 1;
      e.preventDefault();
      updateEditorCursorPos();
    }
  });

  dom.btnToggleHint.addEventListener('click', () => {
    const isHidden = dom.hintBox.style.display === 'none';
    dom.hintBox.style.display = isHidden ? 'block' : 'none';
    dom.btnToggleHint.innerHTML = isHidden
      ? `${window.getSvgIcon('lightbulb', 'icon-warning')} <span>Ocultar Pista</span>`
      : `${window.getSvgIcon('lightbulb', 'icon-warning')} <span>Ver Pista</span>`;
  });

  dom.btnValidateCode.addEventListener('click', () => {
    const t = state.topics[state.currentIndex];
    if (!t) return;
    const userCode = dom.evalTextarea.value;
    const evalData = t.evaluation || {};

    let passed = false;
    let feedback = '';

    if (typeof evalData.testRunner === 'string') {
      try {
        const runnerFn = new Function('return ' + evalData.testRunner)();
        const simulatedOutput = userCode;
        const res = runnerFn(userCode, simulatedOutput);
        passed = res.passed;
        feedback = res.feedback;
      } catch (err) {
        passed = false;
        feedback = 'Error al ejecutar las pruebas de validación: ' + err.message;
      }
    } else {
      const hasAlgoritmo = /Algoritmo/i.test(userCode) && /FinAlgoritmo/i.test(userCode);
      passed = hasAlgoritmo && userCode.length > 30;
      feedback = passed
        ? '¡Estructura de algoritmo válida y verificada con éxito!'
        : 'Asegúrate de incluir los bloques Algoritmo y FinAlgoritmo con la lógica requerida.';
    }

    dom.validationBox.style.display = 'block';
    if (passed) {
      dom.validationBox.className = 'validation-box val-success';
      dom.validationBox.innerHTML = `
        <div style="font-weight: 700; margin-bottom: 4px; display: flex; align-items: center; gap: 6px;">
          ${window.getSvgIcon('check', 'icon-success')}
          <span>¡Reto Superado Exitosamente!</span>
        </div>
        <div>${feedback}</div>
      `;
      triggerConfetti();

      if (!state.completed.has(t.slug)) {
        state.completed.add(t.slug);
        localStorage.setItem('pseint_completed', JSON.stringify(Array.from(state.completed)));
        renderCurrentTopic();
      }
    } else {
      dom.validationBox.className = 'validation-box val-error';
      dom.validationBox.innerHTML = `
        <div style="font-weight: 700; margin-bottom: 4px; display: flex; align-items: center; gap: 6px;">
          ${window.getSvgIcon('alert-triangle', 'icon-danger')}
          <span>Discrepancia en la Evaluación</span>
        </div>
        <div>${feedback}</div>
      `;
    }
  });

  dom.btnRevealSolution.addEventListener('click', () => {
    const isHidden = dom.solutionBox.style.display === 'none';
    dom.solutionBox.style.display = isHidden ? 'block' : 'none';
    dom.btnRevealSolution.innerHTML = isHidden
      ? `${window.getSvgIcon('check', 'icon-success')} <span>Ocultar Solución</span>`
      : `${window.getSvgIcon('check', 'icon-success')} <span>Revelar Solución Canónica</span>`;
  });

  dom.btnResetCode.addEventListener('click', () => {
    const t = state.topics[state.currentIndex];
    if (!t) return;
    const starter = (t.evaluation && t.evaluation.starterCode) || '// Escribe tu pseudocódigo en PSeInt aquí...\nAlgoritmo Reto\n    \nFinAlgoritmo\n';
    dom.evalTextarea.value = starter;
    dom.validationBox.style.display = 'none';
    updateEditorCursorPos();
    showToast('Plantilla inicial del reto restaurada', 'refresh');
  });

  dom.btnPlaygroundEval.addEventListener('click', () => {
    const userCode = dom.evalTextarea.value;
    if (!userCode || !userCode.trim()) {
      showToast('Escribe tu pseudocódigo en el editor antes de simular', 'alert-triangle');
      return;
    }
    if (dom.evalTerminalPanel) {
      dom.evalTerminalPanel.style.display = 'block';
      dom.evalTerminalPanel.scrollIntoView({ behavior: 'smooth' });
    }
    showToast('Ejecutando reto en consola de pruebas...', 'terminal');
    runCodeInTerminal(userCode, {
      container: dom.evalTerminalContainer,
      statusBadge: dom.evalTerminalStatusBadge,
      statusText: dom.evalTerminalStatusText,
      btnRun: dom.btnRunEvalTerminal,
      btnStop: dom.btnStopEvalTerminal
    });
  });

  if (dom.btnRunEvalTerminal) {
    dom.btnRunEvalTerminal.addEventListener('click', () => {
      const userCode = dom.evalTextarea.value;
      if (!userCode || !userCode.trim()) return;
      runCodeInTerminal(userCode, {
        container: dom.evalTerminalContainer,
        statusBadge: dom.evalTerminalStatusBadge,
        statusText: dom.evalTerminalStatusText,
        btnRun: dom.btnRunEvalTerminal,
        btnStop: dom.btnStopEvalTerminal
      });
    });
  }

  if (dom.btnStopEvalTerminal) {
    dom.btnStopEvalTerminal.addEventListener('click', () => {
      if (activeVM) {
        activeVM.stop();
        showToast('Ejecución del reto detenida', 'alert-triangle');
      }
    });
  }

  if (dom.btnClearEvalTerminal) {
    dom.btnClearEvalTerminal.addEventListener('click', () => {
      dom.evalTerminalContainer.innerHTML = '<div class="term-line-system">*** Consola de Reto Limpia ***</div>';
      if (dom.evalTerminalStatusBadge) {
        dom.evalTerminalStatusBadge.className = 'terminal-status-badge';
        dom.evalTerminalStatusText.textContent = 'Listo';
      }
      if (dom.btnRunEvalTerminal) dom.btnRunEvalTerminal.disabled = false;
      if (dom.btnStopEvalTerminal) dom.btnStopEvalTerminal.disabled = true;
    });
  }

  // 22. Paleta de Comandos (Ctrl+K)
  function openCommandPalette() {
    dom.commandPaletteModal.style.display = 'flex';
    dom.cpInput.value = '';
    state.cpSelectedIndex = 0;
    renderCommandPaletteResults('');
    dom.cpInput.focus();
  }

  function closeCommandPalette() {
    dom.commandPaletteModal.style.display = 'none';
  }

  function renderCommandPaletteResults(query) {
    dom.cpResults.innerHTML = '';
    const q = query.toLowerCase().trim();

    state.cpFilteredItems = state.topics.filter(t => {
      if (!q) return true;
      return t.titleEs.toLowerCase().includes(q) || t.summary.toLowerCase().includes(q) || t.category.toLowerCase().includes(q);
    }).slice(0, 12);

    if (state.cpFilteredItems.length === 0) {
      dom.cpResults.innerHTML = '<div class="cp-no-results">No se encontraron temas coincidentes.</div>';
      return;
    }

    state.cpFilteredItems.forEach((t, idx) => {
      const row = document.createElement('div');
      row.className = 'cp-item';
      if (idx === state.cpSelectedIndex) row.classList.add('selected');

      const isDone = state.completed.has(t.slug);

      row.innerHTML = `
        <div class="cp-item-icon">
          ${isDone ? window.getSvgIcon('check', 'icon-success') : window.getSvgIcon(t.categoryIcon || 'folder')}
        </div>
        <div class="cp-item-info">
          <div class="cp-item-title">#${t.id} · ${t.titleEs}</div>
          <div class="cp-item-cat">${t.category}</div>
        </div>
        <span class="badge-diff badge-${t.difficulty.toLowerCase()}">${t.difficulty}</span>
      `;

      row.addEventListener('click', () => {
        selectTopicBySlug(t.slug);
        closeCommandPalette();
      });

      dom.cpResults.appendChild(row);
    });
  }

  dom.sidebarSearchTrigger.addEventListener('click', openCommandPalette);
  dom.btnCpClose.addEventListener('click', closeCommandPalette);

  dom.commandPaletteModal.addEventListener('click', (e) => {
    if (e.target === dom.commandPaletteModal) closeCommandPalette();
  });

  dom.cpInput.addEventListener('input', (e) => {
    state.cpSelectedIndex = 0;
    renderCommandPaletteResults(e.target.value);
  });

  dom.cpInput.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (state.cpFilteredItems.length > 0) {
        state.cpSelectedIndex = (state.cpSelectedIndex + 1) % state.cpFilteredItems.length;
        renderCommandPaletteResults(dom.cpInput.value);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (state.cpFilteredItems.length > 0) {
        state.cpSelectedIndex = (state.cpSelectedIndex - 1 + state.cpFilteredItems.length) % state.cpFilteredItems.length;
        renderCommandPaletteResults(dom.cpInput.value);
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = state.cpFilteredItems[state.cpSelectedIndex];
      if (selected) {
        selectTopicBySlug(selected.slug);
        closeCommandPalette();
      }
    } else if (e.key === 'Escape') {
      closeCommandPalette();
    }
  });

  // 23. Modal de Respaldo (Exportar / Importar)
  dom.btnBackup.addEventListener('click', () => {
    dom.backupModal.style.display = 'flex';
  });

  dom.btnCloseBackup.addEventListener('click', () => {
    dom.backupModal.style.display = 'none';
  });

  dom.backupModal.addEventListener('click', (e) => {
    if (e.target === dom.backupModal) dom.backupModal.style.display = 'none';
  });

  dom.btnExportProgress.addEventListener('click', () => {
    const backupData = {
      course: 'pseint-logica-pro',
      version: '2.6',
      exportedAt: new Date().toISOString(),
      completed: Array.from(state.completed),
      bookmarks: Array.from(state.bookmarks)
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pseint-progreso-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Archivo de progreso descargado exitosamente', 'download');
  });

  dom.importFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (data.completed && Array.isArray(data.completed)) {
          state.completed = new Set(data.completed);
          localStorage.setItem('pseint_completed', JSON.stringify(data.completed));
        }
        if (data.bookmarks && Array.isArray(data.bookmarks)) {
          state.bookmarks = new Set(data.bookmarks);
          localStorage.setItem('pseint_bookmarks', JSON.stringify(data.bookmarks));
        }
        renderCurrentTopic();
        dom.backupModal.style.display = 'none';
        showToast('Progreso restaurado correctamente desde el archivo', 'check');
      } catch (err) {
        showToast('El archivo de respaldo no es un JSON válido', 'alert-triangle');
      }
    };
    reader.readAsText(file);
  });

  dom.btnResetProgress.addEventListener('click', () => {
    if (confirm('¿Estás seguro de que deseas borrar todo tu avance del curso de PSeInt?')) {
      state.completed.clear();
      state.bookmarks.clear();
      localStorage.removeItem('pseint_completed');
      localStorage.removeItem('pseint_bookmarks');
      renderCurrentTopic();
      dom.backupModal.style.display = 'none';
      showToast('Se ha reiniciado el progreso del curso', 'refresh');
    }
  });

  // 24. Modal de Métricas y Generación de Diploma
  dom.btnStats.addEventListener('click', () => {
    const total = state.topics.length;
    const completed = state.completed.size;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    const bookmarks = state.bookmarks.size;
    const estHours = (completed * 0.75).toFixed(1);

    dom.statCompletedNum.textContent = `${completed} / ${total}`;
    dom.statPercentNum.textContent = `${percent}%`;
    dom.statBookmarksNum.textContent = `${bookmarks}`;
    dom.statEstHours.textContent = `${estHours} h`;

    let pCount = 0, iCount = 0, aCount = 0;
    let pDone = 0, iDone = 0, aDone = 0;

    state.topics.forEach(t => {
      const diff = t.difficulty.toLowerCase();
      const isDone = state.completed.has(t.slug);
      if (diff === 'principiante') { pCount++; if (isDone) pDone++; }
      else if (diff === 'intermedio') { iCount++; if (isDone) iDone++; }
      else if (diff === 'avanzado') { aCount++; if (isDone) aDone++; }
    });

    dom.statsDiffBreakdown.innerHTML = `
      <div style="margin-bottom: 12px; font-weight: 700; font-size: 13px; color: var(--text-muted); text-transform: uppercase;">
        Progreso por Nivel de Dificultad
      </div>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <div>
          <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 4px;">
            <span>Principiante</span>
            <span>${pDone} / ${pCount} (${pCount > 0 ? Math.round((pDone/pCount)*100) : 0}%)</span>
          </div>
          <div class="progress-bar-bg" style="height: 6px;"><div class="progress-bar-fill" style="width: ${pCount > 0 ? (pDone/pCount)*100 : 0}%; background: var(--accent-success);"></div></div>
        </div>
        <div>
          <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 4px;">
            <span>Intermedio</span>
            <span>${iDone} / ${iCount} (${iCount > 0 ? Math.round((iDone/iCount)*100) : 0}%)</span>
          </div>
          <div class="progress-bar-bg" style="height: 6px;"><div class="progress-bar-fill" style="width: ${iCount > 0 ? (iDone/iCount)*100 : 0}%; background: var(--accent-warning);"></div></div>
        </div>
        <div>
          <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 4px;">
            <span>Avanzado</span>
            <span>${aDone} / ${aCount} (${aCount > 0 ? Math.round((aDone/aCount)*100) : 0}%)</span>
          </div>
          <div class="progress-bar-bg" style="height: 6px;"><div class="progress-bar-fill" style="width: ${aCount > 0 ? (aDone/aCount)*100 : 0}%; background: var(--accent-purple);"></div></div>
        </div>
      </div>
    `;

    dom.statsModal.style.display = 'flex';
  });

  dom.btnCloseStats.addEventListener('click', () => {
    dom.statsModal.style.display = 'none';
  });

  dom.statsModal.addEventListener('click', (e) => {
    if (e.target === dom.statsModal) dom.statsModal.style.display = 'none';
  });

  dom.btnGenerateCert.addEventListener('click', () => {
    const studentName = dom.certUserName.value.trim() || 'Estudiante Sobresaliente';
    const canvas = dom.certCanvas;
    const ctx = canvas.getContext('2d');

    const bgGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    bgGrad.addColorStop(0, '#0a1017');
    bgGrad.addColorStop(1, '#0e1e19');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 4;
    ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

    ctx.strokeStyle = '#34d399';
    ctx.lineWidth = 1;
    ctx.strokeRect(38, 38, canvas.width - 76, canvas.height - 76);

    ctx.textAlign = 'center';
    ctx.font = '600 16px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#34d399';
    ctx.fillText('CERTIFICADO DE FINALIZACIÓN Y DOMINIO TÉCNICO', canvas.width / 2, 90);

    ctx.font = '800 36px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('LÓGICA DE PROGRAMACIÓN Y ALGORITMOS', canvas.width / 2, 140);

    ctx.font = '500 16px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Se otorga la presente distinción con honores a:', canvas.width / 2, 195);

    ctx.font = '700 42px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#10b981';
    ctx.fillText(studentName, canvas.width / 2, 260);

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 200, 280);
    ctx.lineTo(canvas.width / 2 + 200, 280);
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.font = '400 16px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#cbd5e1';
    ctx.fillText('Por haber completado satisfactoriamente los 40 temas canónicos del programa,', canvas.width / 2, 330);
    ctx.fillText('dominando pruebas de escritorio, modularización, vectores, matrices y análisis Big-O.', canvas.width / 2, 355);

    const today = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    ctx.font = '500 14px "JetBrains Mono", monospace';
    ctx.fillStyle = '#64748b';
    ctx.fillText(`Fecha de emisión: ${today} · Código de Verificación: PSC-${Math.random().toString(36).substring(2, 10).toUpperCase()}`, canvas.width / 2, 450);

    ctx.font = '600 13px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#10b981';
    ctx.fillText('PSeInt Lógica de Programación Pro · Sistema de Certificación de Código', canvas.width / 2, 480);

    dom.certCanvasWrap.style.display = 'block';
    triggerConfetti();
    showToast('¡Diploma generado con éxito!', 'badge-check');
  });

  dom.btnDownloadCert.addEventListener('click', () => {
    const studentName = dom.certUserName.value.trim() || 'Estudiante';
    const a = document.createElement('a');
    a.href = dom.certCanvas.toDataURL('image/png');
    a.download = `Diploma_PSeInt_${studentName.replace(/\s+/g, '_')}.png`;
    a.click();
    showToast('Descargando diploma en alta definición', 'download');
  });

  // 25. Atajos de Teclado Globales
  document.addEventListener('keydown', (e) => {
    const isEditing = ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName);

    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openCommandPalette();
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
      e.preventDefault();
      dom.menuToggleBtn.click();
    } else if (!isEditing) {
      if (e.altKey && e.key === 'ArrowLeft') {
        e.preventDefault();
        dom.btnNavPrev.click();
      } else if (e.altKey && e.key === 'ArrowRight') {
        e.preventDefault();
        dom.btnNavNext.click();
      } else if (['1', '2', '3', '4', '5', '6', '7', '8'].includes(e.key)) {
        const tabsMap = ['code', 'basic', 'inter', 'expert', 'gotchas', 'interview', 'eval', 'links'];
        const targetTab = tabsMap[parseInt(e.key) - 1];
        if (targetTab) {
          e.preventDefault();
          setActiveTab(targetTab);
        }
      }
    }
  });

  // 26. Registro de Service Worker para PWA Offline
  if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
    navigator.serviceWorker.register('sw.js').then(reg => {
      console.log('PSeInt Pro: Service Worker registrado exitosamente.', reg.scope);
    }).catch(err => {
      console.warn('PSeInt Pro: Error al registrar Service Worker:', err);
    });

    window.addEventListener('online', () => {
      dom.offlinePill.style.display = 'none';
      showToast('Conexión a internet restablecida', 'globe');
    });

    window.addEventListener('offline', () => {
      dom.offlinePill.style.display = 'flex';
      showToast('Sin conexión. Funcionando en modo offline local.', 'wifi-off');
    });
  }

  // 27. Inicialización Final
  handleUrlHash();
});
