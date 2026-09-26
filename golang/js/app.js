// js/app.js - Lógica Interactiva Completa para Go by Example Pro (Edición Estática en Español)

document.addEventListener('DOMContentLoaded', () => {
  // 1. Estado de la Aplicación
  const state = {
    topics: window.GO_TOPICS || [],
    categories: window.GO_CATEGORIES || [],
    currentIndex: 0,
    currentTab: 'code',
    completed: new Set(JSON.parse(localStorage.getItem('gobe_completed') || '[]')),
    bookmarks: new Set(JSON.parse(localStorage.getItem('gobe_bookmarks') || '[]')),
    searchQuery: '',
    filterDifficulty: 'all',
    currentTheme: localStorage.getItem('gobe_theme') || 'slate',
    isZenMode: localStorage.getItem('gobe_zen') === 'true',
    cpSelectedIndex: 0,
    cpFilteredItems: []
  };

  // Enriquecer temas con Gotchas y Preguntas FAANG si el módulo está cargado
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
    // Código y Terminal
    codeContainer: document.getElementById('codeContainer'),
    terminalContainer: document.getElementById('terminalContainer'),
    btnCopyCode: document.getElementById('btnCopyCode'),
    btnCopyTerminal: document.getElementById('btnCopyTerminal'),
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
    // Nuevos Niveles: Gotchas & FAANG
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

  // 3. Sistema de Notificaciones Toast
  function showToast(message, iconName = 'check') {
    if (!dom.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    const iconSvg = window.getSvgIcon ? window.getSvgIcon(iconName) : "";
    toast.innerHTML = `<span class="toast-icon-wrap">${iconSvg}</span><span>${message}</span>`;
    dom.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(12px)';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  // 4. Efecto de Celebración con Confeti (Canvas Nativo)
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

    const colors = ['#38bdf8', '#34d399', '#fbbf24', '#f472b6', '#a78bfa', '#ffffff'];
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
        p.vy += 0.4; // Gravedad
        p.vx *= 0.98; // Resistencia
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

  // 5. Resaltador de Sintaxis de Go Liviano y Ultrarrápido
  function highlightGoSyntax(code) {
    if (!code) return '';
    
    let safe = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    const stringsAndComments = [];
    const placeholder = (idx) => `___TOK_${idx}___`;

    safe = safe.replace(/(\/\/[^\n]*|\/\*[\s\S]*?\*\/|`[^`]*`|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/g, (match) => {
      const idx = stringsAndComments.length;
      let className = 'syn-str';
      if (match.startsWith('//') || match.startsWith('/*')) {
        className = 'syn-com';
      }
      stringsAndComments.push(`<span class="${className}">${match}</span>`);
      return placeholder(idx);
    });

    const keywords = [
      'package', 'import', 'func', 'var', 'const', 'type', 'struct',
      'interface', 'map', 'chan', 'select', 'go', 'defer', 'return',
      'if', 'else', 'switch', 'case', 'default', 'fallthrough',
      'for', 'range', 'break', 'continue', 'goto'
    ];
    const kwRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
    safe = safe.replace(kwRegex, '<span class="syn-kwd">$1</span>');

    const types = [
      'int', 'int8', 'int16', 'int32', 'int64',
      'uint', 'uint8', 'uint16', 'uint32', 'uint64', 'uintptr',
      'float32', 'float64', 'complex64', 'complex128',
      'string', 'bool', 'byte', 'rune', 'any', 'error'
    ];
    const typeRegex = new RegExp(`\\b(${types.join('|')})\\b`, 'g');
    safe = safe.replace(typeRegex, '<span class="syn-typ">$1</span>');

    const builtins = ['make', 'new', 'len', 'cap', 'append', 'copy', 'close', 'delete', 'panic', 'recover', 'min', 'max', 'clear'];
    const builtinRegex = new RegExp(`\\b(${builtins.join('|')})\\b`, 'g');
    safe = safe.replace(builtinRegex, '<span class="syn-blt">$1</span>');

    safe = safe.replace(/\b(0x[0-9a-fA-F]+|0b[01]+|\d+\.?\d*|\.\d+)\b/g, '<span class="syn-num">$1</span>');
    safe = safe.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)(?=\()/g, '<span class="syn-fn">$1</span>');

    safe = safe.replace(/___TOK_(\d+)___/g, (_, idx) => stringsAndComments[parseInt(idx, 10)]);

    return safe;
  }

  // 6. Gestión de Temas Antifatiga
  function applyTheme(themeName) {
    state.currentTheme = themeName;
    localStorage.setItem('gobe_theme', themeName);

    dom.body.classList.remove('theme-sepia', 'theme-oled', 'theme-nord');
    if (themeName !== 'slate') {
      dom.body.classList.add(`theme-${themeName}`);
    }

    dom.themeButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.theme === themeName);
    });
  }

  dom.themeButtons.forEach(btn => {
    btn.addEventListener('click', () => applyTheme(btn.dataset.theme));
  });
  applyTheme(state.currentTheme);

  // 7. Modo Zen (Colapso del Sidebar a la derecha en Desktop)
  const topbarEl = document.querySelector('.topbar');
  if (topbarEl) {
    topbarEl.addEventListener('scroll', () => { topbarEl.scrollLeft = 0; });
    window.addEventListener('resize', () => { topbarEl.scrollLeft = 0; });
  }

  function setZenMode(enabled) {
    state.isZenMode = enabled;
    localStorage.setItem('gobe_zen', enabled ? 'true' : 'false');
    dom.sidebar.classList.toggle('collapsed-desktop', enabled);
    dom.menuToggleBtn.innerHTML = window.getSvgIcon(enabled ? 'arrow-left' : 'arrow-right');
    dom.menuToggleBtn.title = enabled ? 'Mostrar barra lateral a la derecha (Ctrl+B)' : 'Ocultar barra lateral (Ctrl+B)';
    if (topbarEl) topbarEl.scrollLeft = 0;
  }

  // Inicializar estado del sidebar (abierto y visible a la derecha)
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

  // Cerrar sidebar al hacer clic fuera en móvil
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 900 && dom.sidebar.classList.contains('open')) {
      if (!dom.sidebar.contains(e.target) && !dom.menuToggleBtn.contains(e.target)) {
        dom.sidebar.classList.remove('open');
      }
    }
  });

  // 8. Renderizado del Sidebar con Progreso por Categoría
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
          const matchSumm = t.summary.toLowerCase().includes(q);
          const matchCode = t.code.toLowerCase().includes(q);
          return matchTitle || matchSumm || matchCode;
        }
        return true;
      });

      if (filteredTopics.length === 0) return;

      // Calcular completados de esta categoría
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
            <span class="topic-nav-title" title="${t.titleEs} (${t.title})">${t.titleEs}</span>
          </div>
          <span class="topic-badge-difficulty badge-${t.difficulty.toLowerCase()}">${t.difficulty[0]}</span>
        `;

        itemEl.addEventListener('click', (e) => {
          if (e.target.classList.contains('topic-status-icon')) {
            e.stopPropagation();
            toggleCompleted(t.slug);
            return;
          }
          navigateToTopicSlug(t.slug);
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

  // 10. Actualizar URL con Deep Linking (#slug?tab=xyz)
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
    dom.topicTitleEn.textContent = `Título original: "${t.title}" (Go by Example)`;
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
    dom.codeContainer.innerHTML = `<pre><code>${highlightGoSyntax(t.code)}</code></pre>`;
    dom.terminalContainer.textContent = t.output || '$ go run ' + t.slug + '.go\n(Ejecución completada sin salida en consola)';

    // Pestaña 2: Nivel Básico
    dom.basicTitle.textContent = t.basicExpl.title;
    dom.basicContent.textContent = t.basicExpl.content;
    dom.basicKeypoints.innerHTML = t.basicExpl.keyPoints.map(p => `<li>${p}</li>`).join('');

    // Pestaña 3: Nivel Intermedio
    dom.interTitle.textContent = t.interExpl.title;
    dom.interContent.textContent = t.interExpl.content;
    dom.interKeypoints.innerHTML = t.interExpl.keyPoints.map(p => `<li>${p}</li>`).join('');

    // Pestaña 4: Nivel Experto
    dom.expertTitle.textContent = t.expertExpl.title;
    dom.expertContent.textContent = t.expertExpl.content;
    dom.expertKeypoints.innerHTML = t.expertExpl.keyPoints.map(p => `<li>${p}</li>`).join('');

    // Pestaña 5: Gotchas y Trampas de Producción
    renderGotchas(t);

    // Pestaña 6: Preguntas de Entrevista FAANG
    renderInterviews(t);

    // Pestaña 7: Evaluación Práctica
    dom.evalTitle.textContent = t.evaluation.title;
    dom.evalStatement.textContent = t.evaluation.statement;
    dom.evalTextarea.value = t.evaluation.starterCode || '// Escribe tu solución en Go aquí...\npackage main\n\nfunc main() {\n    \n}\n';
    updateEditorCursorPos();

    // Resetear estados de evaluación
    dom.hintBox.style.display = 'none';
    dom.hintBox.innerHTML = `<strong>Pista:</strong> ${t.evaluation.hint}`;
    dom.btnToggleHint.innerHTML = `${window.getSvgIcon('lightbulb', 'icon-warning')} <span>Ver Pista</span>`;

    dom.validationBox.style.display = 'none';
    dom.validationBox.innerHTML = '';

    dom.solutionBox.style.display = 'none';
    dom.btnRevealSolution.innerHTML = `${window.getSvgIcon('check', 'icon-success')} <span>Revelar Solución Canónica</span>`;
    dom.solutionCode.innerHTML = `<pre><code>${highlightGoSyntax(t.evaluation.solution)}</code></pre>`;
    dom.solutionExplanation.innerHTML = `<strong>Análisis de la Solución Canónica:</strong><br>${t.evaluation.explanation}`;

    // Pestaña 8: Enlaces Externos
    dom.externalLinksGrid.innerHTML = '';
    (t.externalLinks || []).forEach(link => {
      const card = document.createElement('a');
      card.className = 'resource-card';
      card.href = link.url;
      card.target = '_blank';
      card.rel = 'noopener noreferrer';
      card.innerHTML = `
        <div>
          <div class="resource-type">${link.type || 'Documentación Oficial'}</div>
          <div class="resource-title">${link.title} ↗</div>
          <div class="resource-desc">${link.description}</div>
        </div>
      `;
      dom.externalLinksGrid.appendChild(card);
    });

    // Navegación Inferior (Anterior / Siguiente)
    if (state.currentIndex > 0) {
      const prevTopic = state.topics[state.currentIndex - 1];
      dom.btnNavPrev.style.visibility = 'visible';
      dom.prevTitleText.textContent = `← ${prevTopic.titleEs}`;
    } else {
      dom.btnNavPrev.style.visibility = 'hidden';
    }

    if (state.currentIndex < state.topics.length - 1) {
      const nextTopic = state.topics[state.currentIndex + 1];
      dom.btnNavNext.style.visibility = 'visible';
      dom.nextTitleText.textContent = `${nextTopic.titleEs} →`;
    } else {
      dom.btnNavNext.style.visibility = 'hidden';
    }

    document.querySelector('.content-scrollable').scrollTo({ top: 0, behavior: 'smooth' });
    renderSidebar();
  }

  // 12. Renderizado de Gotchas y Modelo Mental
  function renderGotchas(topic) {
    if (!dom.gotchasContainer) return;
    dom.gotchasContainer.innerHTML = '';

    const gotchas = topic.gotchas || [];
    if (gotchas.length === 0) {
      dom.gotchasContainer.innerHTML = '<p style="color: var(--text-muted);">No hay trampas críticas registradas para este tema.</p>';
    } else {
      gotchas.forEach(g => {
        const card = document.createElement('div');
        card.className = 'gotcha-card';
        card.innerHTML = `
          <div class="gotcha-title">
            ${window.getSvgIcon('alert-triangle', 'icon-warning')} <span>${g.title}</span>
          </div>
          <div class="gotcha-expl">${g.explanation}</div>
          <div class="gotcha-diff-grid">
            <div class="gotcha-box-bad">
              <div class="gotcha-box-header gotcha-header-bad">${window.getSvgIcon('close', 'icon-danger')} Código Peligroso / Incorrecto</div>
              <pre class="gotcha-code">${highlightGoSyntax(g.codeBad)}</pre>
            </div>
            <div class="gotcha-box-good">
              <div class="gotcha-box-header gotcha-header-good">${window.getSvgIcon('check', 'icon-success')} Solución Idiomática Segura</div>
              <pre class="gotcha-code">${highlightGoSyntax(g.codeGood)}</pre>
            </div>
          </div>
          <div class="gotcha-impact">
            <span class="gotcha-impact-tag">${window.getSvgIcon('zap', 'icon-warning')} Impacto:</span> <span>${g.impact}</span>
          </div>
        `;
        dom.gotchasContainer.appendChild(card);
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

  // 13. Renderizado de Preguntas de Entrevista FAANG
  function renderInterviews(topic) {
    if (!dom.interviewsContainer) return;
    dom.interviewsContainer.innerHTML = '';

    const list = topic.interviewQuestions || [];
    if (list.length === 0) {
      dom.interviewsContainer.innerHTML = '<p style="color: var(--text-muted);">No hay preguntas de entrevista disponibles.</p>';
    } else {
      list.forEach((item, idx) => {
        const card = document.createElement('div');
        card.className = 'interview-card';
        card.innerHTML = `
          <div class="interview-q">
            <div><strong>#${idx + 1}.</strong> ${item.question}</div>
            <div class="interview-badges">
              <span class="interview-company">${item.companyTag || 'FAANG'}</span>
              <span class="interview-tag">${item.level || 'Senior'}</span>
            </div>
          </div>
          <div class="interview-ans">
            <strong style="color: var(--accent-primary);">Respuesta Canónica de Ingeniería:</strong><br>
            ${item.answer}
          </div>
        `;
        dom.interviewsContainer.appendChild(card);
      });
    }
  }

  // 14. Navegación por Slug
  function navigateToTopicSlug(slug, tab) {
    const idx = state.topics.findIndex(t => t.slug === slug);
    if (idx !== -1) {
      state.currentIndex = idx;
      if (tab) {
        switchTab(tab, false);
      }
      renderCurrentTopic();
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

    localStorage.setItem('gobe_completed', JSON.stringify(Array.from(state.completed)));
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

    localStorage.setItem('gobe_bookmarks', JSON.stringify(Array.from(state.bookmarks)));
    renderCurrentTopic();
  }

  dom.btnToggleCompleted.addEventListener('click', () => toggleCompleted());
  dom.btnToggleBookmark.addEventListener('click', () => toggleBookmark());

  // 16. Gestión de Pestañas con Deep Linking
  function switchTab(tabId, updateUrl = true) {
    state.currentTab = tabId;
    dom.tabButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tabId));
    dom.tabContents.forEach(content => content.classList.toggle('active', content.id === `tab-${tabId}`));

    if (updateUrl && state.topics[state.currentIndex]) {
      updateUrlHash(state.topics[state.currentIndex].slug, tabId);
    }
  }

  dom.tabButtons.forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // 17. Ergonomía del Editor de Evaluación (Tabulación y Auto-cierre)
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
    const textarea = dom.evalTextarea;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const val = textarea.value;

    // Manejo de la tecla TAB (Indent / Dedent)
    if (e.key === 'Tab') {
      e.preventDefault();
      const tabStr = '    '; // 4 espacios estándar en Go

      if (start === end) {
        if (!e.shiftKey) {
          textarea.value = val.substring(0, start) + tabStr + val.substring(end);
          textarea.selectionStart = textarea.selectionEnd = start + tabStr.length;
        }
      } else {
        // Bloque seleccionado multilínea
        const lineStart = val.lastIndexOf('\n', start - 1) + 1;
        const lineEnd = val.indexOf('\n', end);
        const actualEnd = lineEnd === -1 ? val.length : lineEnd;
        const selectedLines = val.substring(lineStart, actualEnd).split('\n');

        let modified;
        if (!e.shiftKey) {
          modified = selectedLines.map(l => tabStr + l).join('\n');
        } else {
          modified = selectedLines.map(l => l.startsWith(tabStr) ? l.substring(tabStr.length) : (l.startsWith('\t') ? l.substring(1) : l)).join('\n');
        }

        textarea.value = val.substring(0, lineStart) + modified + val.substring(actualEnd);
        textarea.selectionStart = lineStart;
        textarea.selectionEnd = lineStart + modified.length;
      }
      updateEditorCursorPos();
      return;
    }

    // Auto-indentación al presionar ENTER
    if (e.key === 'Enter') {
      e.preventDefault();
      const lineStart = val.lastIndexOf('\n', start - 1) + 1;
      const currentLine = val.substring(lineStart, start);
      const matchIndent = currentLine.match(/^\s*/);
      let indent = matchIndent ? matchIndent[0] : '';

      // Si la línea anterior termina en '{', añadir 4 espacios
      if (currentLine.trim().endsWith('{')) {
        indent += '    ';
      }

      textarea.value = val.substring(0, start) + '\n' + indent + val.substring(end);
      textarea.selectionStart = textarea.selectionEnd = start + 1 + indent.length;
      updateEditorCursorPos();
      return;
    }

    // Auto-cierre de pares: (), {}, [], "", '', ``
    const pairs = {
      '(': ')',
      '{': '}',
      '[': ']',
      '"': '"',
      '`': '`'
    };

    if (pairs[e.key] && start === end) {
      e.preventDefault();
      const closeChar = pairs[e.key];
      textarea.value = val.substring(0, start) + e.key + closeChar + val.substring(end);
      textarea.selectionStart = textarea.selectionEnd = start + 1;
      updateEditorCursorPos();
      return;
    }
  });

  // 18. Validador Inteligente de Código Go (Análisis Semántico y Estructural Estático)
  dom.btnValidateCode.addEventListener('click', () => {
    const userCode = dom.evalTextarea.value.trim();
    const t = state.topics[state.currentIndex];
    if (!t) return;

    dom.validationBox.style.display = 'block';

    const checks = [];
    let score = 100;

    // 1. Declaración de package main
    if (!userCode.includes('package main')) {
      checks.push(`${window.getSvgIcon('close', 'icon-danger')} Falta declarar <code>package main</code>.`);
      score -= 25;
    } else {
      checks.push(`${window.getSvgIcon('check', 'icon-success')} Declaración de paquete <code>package main</code> presente.`);
    }

    // 2. Punto de entrada func main
    if (!userCode.includes('func main()')) {
      checks.push(`${window.getSvgIcon('close', 'icon-danger')} Falta definir la función principal <code>func main()</code>.`);
      score -= 25;
    } else {
      checks.push(`${window.getSvgIcon('check', 'icon-success')} Función <code>func main()</code> implementada correctamente.`);
    }

    // 3. Balance de llaves y paréntesis
    const openBraces = (userCode.match(/{/g) || []).length;
    const closeBraces = (userCode.match(/}/g) || []).length;
    if (openBraces !== closeBraces) {
      checks.push(`${window.getSvgIcon('close', 'icon-danger')} Desbalance de llaves: ${openBraces} abiertas vs ${closeBraces} cerradas.`);
      score -= 20;
    }

    const openParens = (userCode.match(/\(/g) || []).length;
    const closeParens = (userCode.match(/\)/g) || []).length;
    if (openParens !== closeParens) {
      checks.push(`${window.getSvgIcon('close', 'icon-danger')} Desbalance de paréntesis: ${openParens} abiertos vs ${closeParens} cerrados.`);
      score -= 15;
    }

    // 4. Verificación de conceptos clave esperados según la solución canónica
    const canonical = t.evaluation.solution || '';
    const keyCandidates = ['for', 'if', 'switch', 'make', 'chan', 'go ', 'defer', 'select', 'sync', 'struct', 'interface', 'map', 'append', 'range'];
    const requiredInTopic = keyCandidates.filter(k => canonical.includes(k));

    let missedKeywords = [];
    requiredInTopic.forEach(k => {
      if (!userCode.includes(k)) {
        missedKeywords.push(`<code>${k}</code>`);
      }
    });

    if (missedKeywords.length > 0) {
      checks.push(`${window.getSvgIcon('lightbulb', 'icon-warning')} Sugerencia técnica: Considera incorporar ${missedKeywords.join(', ')} para este tipo de desafío.`);
      score -= 10 * missedKeywords.length;
    } else if (requiredInTopic.length > 0) {
      checks.push(`${window.getSvgIcon('check', 'icon-success')} Estructuras idiomáticas esperadas detectadas en tu código.`);
    }

    score = Math.max(0, Math.min(100, score));

    let headerBadge = '';
    let boxClass = 'validation-warning';

    if (score >= 80) {
      headerBadge = `${window.getSvgIcon('badge-check', 'icon-success')} ¡Excelente Trabajo! Tu código cumple los estándares canónicos.`;
      boxClass = 'validation-success';
      triggerConfetti();
    } else if (score >= 50) {
      headerBadge = `${window.getSvgIcon('zap', 'icon-warning')} Buen avance. Revisa las recomendaciones a continuación:`;
      boxClass = 'validation-warning';
    } else {
      headerBadge = `${window.getSvgIcon('alert-triangle', 'icon-danger')} Tu solución requiere ajustes estructurales antes de compilar:`;
      boxClass = 'validation-warning';
    }

    dom.validationBox.className = `validation-box ${boxClass}`;
    dom.validationBox.innerHTML = `
      <div style="font-weight: 700; margin-bottom: 8px; font-size: 15px;">${headerBadge} (Puntaje estimado: ${score}/100)</div>
      <ul style="padding-left: 20px; margin: 8px 0; line-height: 1.6;">
        ${checks.map(c => `<li>${c}</li>`).join('')}
      </ul>
      <div style="margin-top: 10px; font-size: 13px; color: var(--text-dim);">
        Para una ejecución exacta con salida de consola, pulsa <strong>Área de pruebas</strong>.
      </div>
    `;
  });

  // 19. Restaurar Código Inicial del Reto
  dom.btnResetCode.addEventListener('click', () => {
    const t = state.topics[state.currentIndex];
    if (t && confirm('¿Deseas reiniciar tu código al estado inicial?')) {
      dom.evalTextarea.value = t.evaluation.starterCode || '// Escribe tu solución en Go aquí...\npackage main\n\nfunc main() {\n    \n}\n';
      dom.validationBox.style.display = 'none';
      updateEditorCursorPos();
      showToast('Código inicial restaurado');
    }
  });

  // 20. Copiar Código y Salida al Portapapeles
  dom.btnCopyCode.addEventListener('click', () => {
    const code = state.topics[state.currentIndex]?.code;
    if (code) {
      navigator.clipboard.writeText(code).then(() => {
        showToast('Código copiado al portapapeles');
      });
    }
  });

  if (dom.btnCopyTerminal) {
    dom.btnCopyTerminal.addEventListener('click', () => {
      const out = dom.terminalContainer.textContent;
      navigator.clipboard.writeText(out).then(() => {
        showToast('Salida copiada al portapapeles');
      });
    });
  }

  // 21. Compartir Enlace Directo
  dom.btnShare.addEventListener('click', () => {
    const t = state.topics[state.currentIndex];
    if (!t) return;
    const url = `${window.location.origin}${window.location.pathname}#${t.slug}?tab=${state.currentTab}`;
    navigator.clipboard.writeText(url).then(() => {
      showToast('¡Enlace directo copiado al portapapeles!', 'share');
    });
  });

  // 22. Apertura en Go Playground Oficial
  function openInPlayground(codeToOpen) {
    const code = codeToOpen || state.topics[state.currentIndex]?.code || '';
    const playUrl = 'https://go.dev/play/';
    navigator.clipboard.writeText(code).then(() => {
      showToast('¡Código copiado! Pégalo (Ctrl+V) en el área de pruebas oficial de Go', 'terminal');
      window.open(playUrl, '_blank');
    }).catch(() => {
      window.open(playUrl, '_blank');
    });
  }

  dom.btnOpenPlayground.addEventListener('click', () => openInPlayground());
  dom.btnPlaygroundEval.addEventListener('click', () => openInPlayground(dom.evalTextarea.value));

  // 23. Botones de Pistas y Solución
  dom.btnToggleHint.addEventListener('click', () => {
    const isVisible = dom.hintBox.style.display === 'block';
    dom.hintBox.style.display = isVisible ? 'none' : 'block';
    dom.btnToggleHint.innerHTML = `${window.getSvgIcon('lightbulb', 'icon-warning')} <span>${isVisible ? 'Ver Pista' : 'Ocultar Pista'}</span>`;
  });

  dom.btnRevealSolution.addEventListener('click', () => {
    const isVisible = dom.solutionBox.style.display === 'block';
    dom.solutionBox.style.display = isVisible ? 'none' : 'block';
    dom.btnRevealSolution.innerHTML = `${window.getSvgIcon('check', 'icon-success')} <span>${isVisible ? 'Revelar Solución Canónica' : 'Ocultar Solución'}</span>`;
  });

  // 24. Navegación Anterior / Siguiente
  dom.btnNavPrev.addEventListener('click', (e) => {
    e.preventDefault();
    if (state.currentIndex > 0) {
      state.currentIndex--;
      renderCurrentTopic();
    }
  });

  dom.btnNavNext.addEventListener('click', (e) => {
    e.preventDefault();
    if (state.currentIndex < state.topics.length - 1) {
      state.currentIndex++;
      renderCurrentTopic();
    }
  });

  // 25. Filtros de Dificultad (Chips)
  dom.filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      dom.filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.filterDifficulty = chip.dataset.filter;
      renderSidebar();
    });
  });

  // 26. Buscador del Sidebar
  dom.searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    renderSidebar();
  });

  // 27. COMMAND PALETTE (Ctrl+K / Cmd+K)
  function openCommandPalette() {
    dom.commandPaletteModal.style.display = 'flex';
    dom.cpInput.value = '';
    state.cpSelectedIndex = 0;
    renderCommandPaletteResults('');
    setTimeout(() => dom.cpInput.focus(), 50);
  }

  function closeCommandPalette() {
    dom.commandPaletteModal.style.display = 'none';
  }

  function renderCommandPaletteResults(query) {
    const q = query.toLowerCase().trim();
    dom.cpResults.innerHTML = '';

    const actions = [
      { id: 'theme-slate', title: 'Cambiar tema a Calma Nocturna (Pizarra oscura)', icon: 'moon', type: 'action', run: () => applyTheme('slate') },
      { id: 'theme-sepia', title: 'Cambiar tema a Sepia / Papel Cálido (Filtro de luz azul)', icon: 'coffee', type: 'action', run: () => applyTheme('sepia') },
      { id: 'theme-oled', title: 'Cambiar tema a OLED (Negro absoluto)', icon: 'contrast', type: 'action', run: () => applyTheme('oled') },
      { id: 'theme-nord', title: 'Cambiar tema a Gris Nórdico (Paleta Nord)', icon: 'snowflake', type: 'action', run: () => applyTheme('nord') },
      { id: 'act-random', title: 'Ir a un tema aleatorio (¡Sorpréndeme!)', icon: 'zap', type: 'action', run: () => {
        const randIdx = Math.floor(Math.random() * state.topics.length);
        state.currentIndex = randIdx;
        renderCurrentTopic();
      }},
      { id: 'act-toggle-complete', title: 'Alternar completado del tema actual', icon: 'check', type: 'action', run: () => toggleCompleted() },
      { id: 'act-toggle-fav', title: 'Guardar tema actual en favoritos', icon: 'star', type: 'action', run: () => toggleBookmark() },
      { id: 'act-export', title: 'Descargar respaldo de progreso en JSON', icon: 'download', type: 'action', run: () => exportProgress() },
      { id: 'act-stats', title: 'Ver métricas de estudio y diploma', icon: 'trophy', type: 'action', run: () => openStatsModal() }
    ];

    const matchedActions = actions.filter(a => !q || a.title.toLowerCase().includes(q));

    const matchedTopics = state.topics.filter(t => {
      if (!q) return true;
      return t.titleEs.toLowerCase().includes(q) || t.title.toLowerCase().includes(q) || t.summary.toLowerCase().includes(q);
    }).slice(0, 30); // Limitar a los mejores 30 resultados para agilidad

    const combined = [
      ...matchedActions.map(a => ({ ...a, isAction: true })),
      ...matchedTopics.map(t => ({ ...t, isTopic: true }))
    ];

    state.cpFilteredItems = combined;

    if (combined.length === 0) {
      dom.cpResults.innerHTML = '<div style="padding: 24px; text-align: center; color: var(--text-dim);">No se encontraron temas ni comandos coincidentes.</div>';
      return;
    }

    if (state.cpSelectedIndex >= combined.length) {
      state.cpSelectedIndex = 0;
    }

    if (matchedActions.length > 0 && !q) {
      const actGroup = document.createElement('div');
      actGroup.className = 'cp-group-title';
      actGroup.textContent = 'Acciones y Comandos Rápidos';
      dom.cpResults.appendChild(actGroup);
    }

    combined.forEach((item, idx) => {
      if (item.isTopic && idx === matchedActions.length) {
        const topGroup = document.createElement('div');
        topGroup.className = 'cp-group-title';
        topGroup.textContent = 'Temas de Go by Example';
        dom.cpResults.appendChild(topGroup);
      }

      const itemEl = document.createElement('div');
      itemEl.className = `cp-item ${idx === state.cpSelectedIndex ? 'selected' : ''}`;

      if (item.isAction) {
        itemEl.innerHTML = `
          <div class="cp-item-left">
            ${window.getSvgIcon(item.icon || 'terminal', 'cp-item-icon')}
            <span>${item.title}</span>
          </div>
          <span style="font-size: 11px; color: var(--accent-primary); font-weight: 600;">Comando</span>
        `;
      } else {
        itemEl.innerHTML = `
          <div class="cp-item-left">
            <span class="cp-item-num">#${item.id}</span>
            <span>${item.titleEs} <span style="font-size: 12px; color: var(--text-dim);">(${item.title})</span></span>
          </div>
          <span class="topic-badge-difficulty badge-${item.difficulty.toLowerCase()}">${item.difficulty}</span>
        `;
      }

      itemEl.addEventListener('click', () => {
        executeCpItem(item);
      });

      dom.cpResults.appendChild(itemEl);
    });
  }

  function executeCpItem(item) {
    closeCommandPalette();
    if (item.isAction) {
      item.run();
    } else {
      navigateToTopicSlug(item.slug);
    }
  }

  dom.cpInput.addEventListener('input', (e) => {
    state.cpSelectedIndex = 0;
    renderCommandPaletteResults(e.target.value);
  });

  dom.cpInput.addEventListener('keydown', (e) => {
    const total = state.cpFilteredItems.length;
    if (total === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      state.cpSelectedIndex = (state.cpSelectedIndex + 1) % total;
      renderCommandPaletteResults(dom.cpInput.value);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      state.cpSelectedIndex = (state.cpSelectedIndex - 1 + total) % total;
      renderCommandPaletteResults(dom.cpInput.value);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = state.cpFilteredItems[state.cpSelectedIndex];
      if (selected) executeCpItem(selected);
    } else if (e.key === 'Escape') {
      closeCommandPalette();
    }
  });

  dom.btnCpClose.addEventListener('click', closeCommandPalette);
  dom.commandPaletteModal.addEventListener('click', (e) => {
    if (e.target === dom.commandPaletteModal) closeCommandPalette();
  });

  dom.sidebarSearchTrigger.addEventListener('click', () => {
    openCommandPalette();
  });

  // 28. Atajos de Teclado Globales
  window.addEventListener('keydown', (e) => {
    // Si la paleta está abierta y presiona Esc
    if (dom.commandPaletteModal.style.display === 'flex' && e.key === 'Escape') {
      closeCommandPalette();
      return;
    }

    // Ctrl+K o Cmd+K para abrir Command Palette
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openCommandPalette();
      return;
    }

    // Ctrl+B para alternar Zen Mode (sidebar en desktop)
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
      e.preventDefault();
      dom.menuToggleBtn.click();
      return;
    }

    // No interceptar navegación con flechas si está editando en un textarea o input
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      if (e.key === 'Escape') document.activeElement.blur();
      return;
    }

    if (e.key === 'ArrowLeft' && state.currentIndex > 0) {
      state.currentIndex--;
      renderCurrentTopic();
    } else if (e.key === 'ArrowRight' && state.currentIndex < state.topics.length - 1) {
      state.currentIndex++;
      renderCurrentTopic();
    }
  });

  // 29. Modal de Respaldo (Exportar / Importar JSON)
  function exportProgress() {
    const backupData = {
      app: "Go by Example Pro (Español)",
      version: "1.0",
      exportDate: new Date().toISOString(),
      completed: Array.from(state.completed),
      bookmarks: Array.from(state.bookmarks),
      theme: state.currentTheme
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `progreso-golang-pro-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Archivo de respaldo descargado');
  }

  dom.btnBackup.addEventListener('click', () => {
    dom.backupModal.style.display = 'flex';
  });

  dom.btnCloseBackup.addEventListener('click', () => {
    dom.backupModal.style.display = 'none';
  });

  dom.backupModal.addEventListener('click', (e) => {
    if (e.target === dom.backupModal) dom.backupModal.style.display = 'none';
  });

  dom.btnExportProgress.addEventListener('click', exportProgress);

  dom.importFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (Array.isArray(data.completed) && Array.isArray(data.bookmarks)) {
          state.completed = new Set(data.completed);
          state.bookmarks = new Set(data.bookmarks);
          localStorage.setItem('gobe_completed', JSON.stringify(data.completed));
          localStorage.setItem('gobe_bookmarks', JSON.stringify(data.bookmarks));
          if (data.theme) applyTheme(data.theme);

          renderSidebar();
          renderCurrentTopic();
          dom.backupModal.style.display = 'none';
          showToast('¡Progreso restaurado con éxito!', 'refresh');
          triggerConfetti();
        } else {
          alert('El archivo JSON no tiene el formato de respaldo válido de Go by Example Pro.');
        }
      } catch (err) {
        alert('Error al leer el archivo de respaldo: ' + err.message);
      }
    };
    reader.readAsText(file);
  });

  dom.btnResetProgress.addEventListener('click', () => {
    if (confirm('¿Estás seguro de que deseas reiniciar TODO tu progreso? Esta acción no se puede deshacer.')) {
      state.completed.clear();
      state.bookmarks.clear();
      localStorage.removeItem('gobe_completed');
      localStorage.removeItem('gobe_bookmarks');
      renderSidebar();
      renderCurrentTopic();
      dom.backupModal.style.display = 'none';
      showToast('Progreso reiniciado correctamente');
    }
  });

  // 30. Modal de Métricas y Certificado Digital
  function openStatsModal() {
    const total = state.topics.length;
    const completed = state.completed.size;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    const bookmarks = state.bookmarks.size;
    const estHours = (completed * 0.25).toFixed(1); // ~15 min por tema

    dom.statCompletedNum.textContent = `${completed} / ${total}`;
    dom.statPercentNum.textContent = `${percent}%`;
    dom.statBookmarksNum.textContent = bookmarks;
    dom.statEstHours.textContent = `${estHours} h`;

    // Desglose por dificultad
    const diffs = ['Principiante', 'Intermedio', 'Avanzado'];
    const diffColors = {
      'Principiante': 'var(--accent-success)',
      'Intermedio': 'var(--accent-warning)',
      'Avanzado': 'var(--accent-danger)'
    };

    dom.statsDiffBreakdown.innerHTML = '<div style="font-weight: 700; font-size: 13px; margin-bottom: 6px;">Progreso por Nivel de Complejidad:</div>';

    diffs.forEach(diff => {
      const diffTopics = state.topics.filter(t => t.difficulty.toLowerCase() === diff.toLowerCase());
      const doneDiff = diffTopics.filter(t => state.completed.has(t.slug)).length;
      const pct = diffTopics.length > 0 ? Math.round((doneDiff / diffTopics.length) * 100) : 0;

      const row = document.createElement('div');
      row.className = 'diff-row';
      row.innerHTML = `
        <span style="width: 90px; font-weight: 600;">${diff}</span>
        <div class="diff-bar-bg">
          <div class="diff-bar-fill" style="width: ${pct}%; background: ${diffColors[diff]};"></div>
        </div>
        <span style="font-family: var(--font-mono); font-size: 12px; width: 65px; text-align: right;">${doneDiff}/${diffTopics.length} (${pct}%)</span>
      `;
      dom.statsDiffBreakdown.appendChild(row);
    });

    dom.statsModal.style.display = 'flex';
  }

  dom.btnStats.addEventListener('click', openStatsModal);
  dom.btnCloseStats.addEventListener('click', () => dom.statsModal.style.display = 'none');
  dom.statsModal.addEventListener('click', (e) => {
    if (e.target === dom.statsModal) dom.statsModal.style.display = 'none';
  });

  // Generador de Diploma en Canvas (960x540)
  dom.btnGenerateCert.addEventListener('click', () => {
    const name = dom.certUserName.value.trim() || 'Estudiante de Go';
    const canvas = dom.certCanvas;
    const ctx = canvas.getContext('2d');

    // Fondo
    ctx.fillStyle = '#0e131b';
    ctx.fillRect(0, 0, 960, 540);

    // Patrón decorativo suave
    const grad = ctx.createLinearGradient(0, 0, 960, 540);
    grad.addColorStop(0, '#131923');
    grad.addColorStop(1, '#0e131b');
    ctx.fillStyle = grad;
    ctx.fillRect(20, 20, 920, 500);

    // Marco exterior cian
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.strokeRect(30, 30, 900, 480);

    // Marco interior dorado fino
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 1;
    ctx.strokeRect(38, 38, 884, 464);

    // Logo Go Gopher
    ctx.font = 'bold 36px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.textAlign = 'center';
    ctx.fillText('Go by Example Pro (Español)', 480, 95);

    // Título Principal
    ctx.font = '800 28px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('CERTIFICADO DE LOGRO Y FINALIZACIÓN', 480, 150);

    ctx.font = '16px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Se certifica que', 480, 200);

    // Nombre del Alumno
    ctx.font = 'bold 34px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText(name, 480, 255);

    // Línea bajo el nombre
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(280, 275);
    ctx.lineTo(680, 275);
    ctx.stroke();

    // Texto de acreditación
    ctx.font = '15px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText('Ha dominado los 85 temas oficiales del lenguaje Go (Golang), incluyendo', 480, 320);
    ctx.fillText('Concurrencia con Goroutines y Canales, Sincronización Avanzada, Punteros,', 480, 345);
    ctx.fillText('Trampas de Producción, Arquitectura Interna del Runtime y Desafíos Técnicos de Evaluación.', 480, 370);

    // Fecha y Verificación
    const dateStr = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    ctx.font = '13px "JetBrains Mono", monospace';
    ctx.fillStyle = '#64748b';
    ctx.fillText(`Emisión: ${dateStr} · Código Verificación: GOBE-PRO-${Math.random().toString(36).substring(2, 9).toUpperCase()}`, 480, 440);

    // Sello Oficial
    ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#fbbf24';
    ctx.fillText('EDICIÓN OFICIAL CERTIFICADA EN ESPAÑOL', 480, 470);

    dom.certCanvasWrap.style.display = 'block';
    showToast('¡Diploma generado con éxito!', 'trophy');
  });

  dom.btnDownloadCert.addEventListener('click', () => {
    const a = document.createElement('a');
    a.download = `Certificado-Go-by-Example-${(dom.certUserName.value.trim() || 'Alumno').replace(/\s+/g, '_')}.png`;
    a.href = dom.certCanvas.toDataURL('image/png');
    a.click();
  });

  // 31. PWA & Registro de Service Worker para Modo Offline
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then(() => {
      console.log('ServiceWorker registrado correctamente para Go by Example Pro.');
    }).catch(err => {
      console.warn('Error al registrar ServiceWorker:', err);
    });
  }

  // Detección de Estado de Conexión
  function updateOnlineStatus() {
    if (!dom.offlinePill) return;
    if (!navigator.onLine) {
      dom.offlinePill.style.display = 'block';
      showToast('Modo sin conexión activado (trabajando en almacenamiento local)', 'wifi-off');
    } else {
      dom.offlinePill.style.display = 'none';
    }
  }

  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  updateOnlineStatus();

  // 32. Inicialización por Hash (con soporte para tab param: #slug?tab=xyz)
  function init() {
    const rawHash = window.location.hash.replace('#', '').trim();
    if (rawHash) {
      const parts = rawHash.split('?');
      const slug = parts[0];
      const params = new URLSearchParams(parts[1] || '');
      const tabParam = params.get('tab');

      const foundIdx = state.topics.findIndex(t => t.slug === slug);
      if (foundIdx !== -1) {
        state.currentIndex = foundIdx;
      }
      if (tabParam && ['code', 'basic', 'inter', 'expert', 'gotchas', 'interview', 'eval', 'links'].includes(tabParam)) {
        state.currentTab = tabParam;
        switchTab(tabParam, false);
      }
    }
    renderSidebar();
    renderCurrentTopic();
  }

  window.addEventListener('hashchange', init);
  init();
});
