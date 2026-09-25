// js/app.js - Lógica Interactiva para Go by Example Pro (Español)

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
    currentTheme: localStorage.getItem('gobe_theme') || 'slate'
  };

  // 2. Elementos del DOM
  const dom = {
    // Layout
    body: document.body,
    sidebar: document.getElementById('sidebar'),
    menuToggleBtn: document.getElementById('menuToggleBtn'),
    // Progreso
    progressCount: document.getElementById('progressCount'),
    progressBarFill: document.getElementById('progressBarFill'),
    // Búsqueda y Filtros
    searchInput: document.getElementById('searchInput'),
    filterChips: document.querySelectorAll('.chip-btn'),
    topicsNav: document.getElementById('topicsNav'),
    // Topbar y Temas
    themeButtons: document.querySelectorAll('.theme-btn'),
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
    originalDocText: document.getElementById('originalDocText'),
    // Niveles
    basicTitle: document.getElementById('basicTitle'),
    basicContent: document.getElementById('basicContent'),
    basicKeypoints: document.getElementById('basicKeypoints'),
    interTitle: document.getElementById('interTitle'),
    interContent: document.getElementById('interContent'),
    interKeypoints: document.getElementById('interKeypoints'),
    expertTitle: document.getElementById('expertTitle'),
    expertContent: document.getElementById('expertContent'),
    expertKeypoints: document.getElementById('expertKeypoints'),
    // Evaluación
    evalTitle: document.getElementById('evalTitle'),
    evalStatement: document.getElementById('evalStatement'),
    evalTextarea: document.getElementById('evalTextarea'),
    btnToggleHint: document.getElementById('btnToggleHint'),
    hintBox: document.getElementById('hintBox'),
    btnRevealSolution: document.getElementById('btnRevealSolution'),
    solutionBox: document.getElementById('solutionBox'),
    solutionCode: document.getElementById('solutionCode'),
    solutionExplanation: document.getElementById('solutionExplanation'),
    btnPlaygroundEval: document.getElementById('btnPlaygroundEval'),
    // Recursos
    externalLinksGrid: document.getElementById('externalLinksGrid'),
    // Navegación inferior
    btnNavPrev: document.getElementById('btnNavPrev'),
    btnNavNext: document.getElementById('btnNavNext'),
    prevTitleText: document.getElementById('prevTitleText'),
    nextTitleText: document.getElementById('nextTitleText')
  };

  // 3. Resaltador de Sintaxis de Go Liviano y Ultrarrápido
  function highlightGoSyntax(code) {
    if (!code) return '';
    
    // Escapar HTML básico
    let safe = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Guardar strings y comentarios en placeholders para evitar colisiones
    const stringsAndComments = [];
    const placeholder = (idx) => `___TOK_${idx}___`;

    // Reemplazar strings (`...` o "..." o '...')
    safe = safe.replace(/(\/\/[^\n]*|\/\*[\s\S]*?\*\/|`[^`]*`|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/g, (match) => {
      const idx = stringsAndComments.length;
      let className = 'syn-str';
      if (match.startsWith('//') || match.startsWith('/*')) {
        className = 'syn-com';
      }
      stringsAndComments.push(`<span class="${className}">${match}</span>`);
      return placeholder(idx);
    });

    // Palabras Clave de Go
    const keywords = [
      'package', 'import', 'func', 'var', 'const', 'type', 'struct',
      'interface', 'map', 'chan', 'select', 'go', 'defer', 'return',
      'if', 'else', 'switch', 'case', 'default', 'fallthrough',
      'for', 'range', 'break', 'continue', 'goto'
    ];
    const kwRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
    safe = safe.replace(kwRegex, '<span class="syn-kwd">$1</span>');

    // Tipos Primitivos y Nativos
    const types = [
      'int', 'int8', 'int16', 'int32', 'int64',
      'uint', 'uint8', 'uint16', 'uint32', 'uint64', 'uintptr',
      'float32', 'float64', 'complex64', 'complex128',
      'string', 'bool', 'byte', 'rune', 'any', 'error'
    ];
    const typeRegex = new RegExp(`\\b(${types.join('|')})\\b`, 'g');
    safe = safe.replace(typeRegex, '<span class="syn-typ">$1</span>');

    // Builtins comunes (make, new, len, cap, append, etc.)
    const builtins = ['make', 'new', 'len', 'cap', 'append', 'copy', 'close', 'delete', 'panic', 'recover', 'min', 'max', 'clear'];
    const builtinRegex = new RegExp(`\\b(${builtins.join('|')})\\b`, 'g');
    safe = safe.replace(builtinRegex, '<span class="syn-blt">$1</span>');

    // Números (enteros, hexadecimales, floats)
    safe = safe.replace(/\b(0x[0-9a-fA-F]+|0b[01]+|\d+\.?\d*|\.\d+)\b/g, '<span class="syn-num">$1</span>');

    // Nombres de funciones invocadas (identificador seguido de '(')
    safe = safe.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)(?=\()/g, '<span class="syn-fn">$1</span>');

    // Restaurar strings y comentarios
    safe = safe.replace(/___TOK_(\d+)___/g, (_, idx) => stringsAndComments[parseInt(idx, 10)]);

    return safe;
  }

  // 4. Gestión de Temas Antifatiga
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

  // 5. Renderizado del Sidebar y Filtros
  function renderSidebar() {
    dom.topicsNav.innerHTML = '';
    const q = state.searchQuery.toLowerCase().trim();

    state.categories.forEach(cat => {
      // Filtrar temas de esta categoría
      const catTopics = state.topics.filter(t => t.categorySlug === cat.id);
      
      const filteredTopics = catTopics.filter(t => {
        // Filtro de dificultad
        if (state.filterDifficulty !== 'all') {
          if (state.filterDifficulty === 'completados' && !state.completed.has(t.slug)) return false;
          if (state.filterDifficulty === 'pendientes' && state.completed.has(t.slug)) return false;
          if (state.filterDifficulty === 'favoritos' && !state.bookmarks.has(t.slug)) return false;
          if (['principiante', 'intermedio', 'avanzado'].includes(state.filterDifficulty)) {
            if (t.difficulty.toLowerCase() !== state.filterDifficulty) return false;
          }
        }
        // Filtro de texto
        if (q) {
          const matchTitle = t.titleEs.toLowerCase().includes(q) || t.title.toLowerCase().includes(q);
          const matchSumm = t.summary.toLowerCase().includes(q);
          const matchCode = t.code.toLowerCase().includes(q);
          return matchTitle || matchSumm || matchCode;
        }
        return true;
      });

      if (filteredTopics.length === 0) return;

      // Crear grupo de categoría
      const groupEl = document.createElement('div');
      groupEl.className = 'category-group';

      const headerEl = document.createElement('div');
      headerEl.className = 'category-header';
      headerEl.innerHTML = `
        <div class="category-title-wrap">
          <span class="category-arrow">▼</span>
          <span>${cat.icon} ${cat.name}</span>
        </div>
        <span class="category-count">${filteredTopics.length}</span>
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
            <span class="topic-status-icon">✓</span>
            <span class="topic-num">${t.id}</span>
            <span class="topic-nav-title" title="${t.titleEs} (${t.title})">${t.titleEs}</span>
          </div>
          <span class="topic-badge-difficulty badge-${t.difficulty.toLowerCase()}">${t.difficulty[0]}</span>
        `;

        itemEl.addEventListener('click', (e) => {
          // Si hace clic en el circulito de check, alternar completado
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

  // 6. Actualizar Widget de Progreso
  function updateProgress() {
    const total = state.topics.length;
    const count = state.completed.size;
    const percent = total > 0 ? Math.round((count / total) * 100) : 0;

    dom.progressCount.textContent = `${count} / ${total} (${percent}%)`;
    dom.progressBarFill.style.width = `${percent}%`;
  }

  // 7. Cargar y Renderizar el Tema Actual
  function renderCurrentTopic() {
    const t = state.topics[state.currentIndex];
    if (!t) return;

    // Actualizar URL hash
    window.location.hash = t.slug;

    // Breadcrumbs y Metadatos
    dom.breadCategory.textContent = t.category;
    dom.breadCurrent.textContent = t.titleEs;

    dom.topicNum.textContent = `#${t.id}`;
    dom.topicBadgeDifficulty.textContent = t.difficulty;
    dom.topicBadgeDifficulty.className = `topic-badge-difficulty badge-${t.difficulty.toLowerCase()}`;
    dom.topicBadgeCategory.textContent = `${t.categoryIcon} ${t.category}`;

    dom.topicTitle.textContent = t.titleEs;
    dom.topicTitleEn.textContent = `Original: "${t.title}" (Go by Example)`;
    dom.topicSummary.textContent = t.summary;

    // Estado de Botones (Completado y Favorito)
    const isDone = state.completed.has(t.slug);
    dom.btnToggleCompleted.classList.toggle('active-completed', isDone);
    dom.btnToggleCompleted.querySelector('.btn-label').textContent = isDone ? 'Completado ✓' : 'Marcar como Completado';

    const isFav = state.bookmarks.has(t.slug);
    dom.btnToggleBookmark.classList.toggle('active-completed', isFav);
    dom.btnToggleBookmark.querySelector('.btn-label').textContent = isFav ? 'Guardado ★' : 'Favorito';

    // Pestaña 1: Código Original y Explicación
    dom.originalDocText.textContent = t.originalExpl;
    dom.codeContainer.innerHTML = `<pre><code>${highlightGoSyntax(t.code)}</code></pre>`;
    dom.terminalContainer.textContent = t.output || '$ go run ' + t.slug + '.go\n(Ejecución completada sin salida)';

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

    // Pestaña 5: Evaluación
    dom.evalTitle.textContent = t.evaluation.title;
    dom.evalStatement.textContent = t.evaluation.statement;
    dom.evalTextarea.value = t.evaluation.starterCode || '// Escribe tu solución en Go aquí...\npackage main\n\nfunc main() {\n    \n}\n';

    // Resetear estados de evaluación
    dom.hintBox.style.display = 'none';
    dom.hintBox.textContent = `💡 Pista: ${t.evaluation.hint}`;
    dom.btnToggleHint.textContent = '💡 Ver Pista';

    dom.solutionBox.style.display = 'none';
    dom.btnRevealSolution.textContent = '✅ Revelar Solución y Análisis';
    dom.solutionCode.innerHTML = `<pre><code>${highlightGoSyntax(t.evaluation.solution)}</code></pre>`;
    dom.solutionExplanation.innerHTML = `<strong>Análisis de la Solución:</strong><br>${t.evaluation.explanation}`;

    // Pestaña 6: Enlaces Externos
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

    // Navegación Inferior (Anterior y Siguiente)
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

    // Scroll to top del contenido
    document.querySelector('.content-scrollable').scrollTo({ top: 0, behavior: 'smooth' });

    // Actualizar items activos en sidebar
    document.querySelectorAll('.topic-nav-item').forEach((el, idx) => {
      const isActive = state.topics[state.currentIndex]?.slug === el.querySelector('.topic-nav-title')?.textContent;
    });
    renderSidebar();
  }

  // 8. Navegación por Slugs
  function navigateToTopicSlug(slug) {
    const idx = state.topics.findIndex(t => t.slug === slug);
    if (idx !== -1) {
      state.currentIndex = idx;
      renderCurrentTopic();
    }
  }

  // 9. Alternar Estado Completado / Favorito
  function toggleCompleted(slug) {
    const targetSlug = slug || state.topics[state.currentIndex]?.slug;
    if (!targetSlug) return;

    if (state.completed.has(targetSlug)) {
      state.completed.delete(targetSlug);
    } else {
      state.completed.add(targetSlug);
    }

    localStorage.setItem('gobe_completed', JSON.stringify(Array.from(state.completed)));
    renderSidebar();
    
    // Si es el tema actual, actualizar botón de cabecera
    if (targetSlug === state.topics[state.currentIndex]?.slug) {
      const isDone = state.completed.has(targetSlug);
      dom.btnToggleCompleted.classList.toggle('active-completed', isDone);
      dom.btnToggleCompleted.querySelector('.btn-label').textContent = isDone ? 'Completado ✓' : 'Marcar como Completado';
    }
  }

  function toggleBookmark() {
    const slug = state.topics[state.currentIndex]?.slug;
    if (!slug) return;

    if (state.bookmarks.has(slug)) {
      state.bookmarks.delete(slug);
    } else {
      state.bookmarks.add(slug);
    }

    localStorage.setItem('gobe_bookmarks', JSON.stringify(Array.from(state.bookmarks)));
    renderCurrentTopic();
  }

  // 10. Gestión de Pestañas
  function switchTab(tabId) {
    state.currentTab = tabId;
    dom.tabButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tabId));
    dom.tabContents.forEach(content => content.classList.toggle('active', content.id === `tab-${tabId}`));
  }

  dom.tabButtons.forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // 11. Botones y Eventos de Interacción
  dom.btnToggleCompleted.addEventListener('click', () => toggleCompleted());
  dom.btnToggleBookmark.addEventListener('click', toggleBookmark);

  // Copiar Código al Portapapeles
  dom.btnCopyCode.addEventListener('click', () => {
    const code = state.topics[state.currentIndex]?.code;
    if (code) {
      navigator.clipboard.writeText(code).then(() => {
        const originalText = dom.btnCopyCode.innerHTML;
        dom.btnCopyCode.innerHTML = '✓ ¡Copiado!';
        setTimeout(() => { dom.btnCopyCode.innerHTML = originalText; }, 2000);
      });
    }
  });

  // Abrir en Go Playground
  function openInPlayground(codeToOpen) {
    const code = codeToOpen || state.topics[state.currentIndex]?.code || '';
    // Enlace universal con carga o fallback
    const playUrl = 'https://go.dev/play/';
    navigator.clipboard.writeText(code).then(() => {
      window.open(playUrl, '_blank');
    }).catch(() => {
      window.open(playUrl, '_blank');
    });
  }

  dom.btnOpenPlayground.addEventListener('click', () => openInPlayground());
  dom.btnPlaygroundEval.addEventListener('click', () => {
    const userCode = dom.evalTextarea.value;
    openInPlayground(userCode);
  });

  // Pista de Evaluación
  dom.btnToggleHint.addEventListener('click', () => {
    const isVisible = dom.hintBox.style.display === 'block';
    dom.hintBox.style.display = isVisible ? 'none' : 'block';
    dom.btnToggleHint.textContent = isVisible ? '💡 Ver Pista' : '🙈 Ocultar Pista';
  });

  // Revelar Solución
  dom.btnRevealSolution.addEventListener('click', () => {
    const isVisible = dom.solutionBox.style.display === 'block';
    dom.solutionBox.style.display = isVisible ? 'none' : 'block';
    dom.btnRevealSolution.textContent = isVisible ? '✅ Revelar Solución y Análisis' : 'Ocultar Solución';
  });

  // Navegación Inferior
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

  // Filtros de Dificultad (Chips)
  dom.filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      dom.filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.filterDifficulty = chip.dataset.filter;
      renderSidebar();
    });
  });

  // Búsqueda en Tiempo Real
  dom.searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    renderSidebar();
  });

  // Atajos de Teclado Globales
  window.addEventListener('keydown', (e) => {
    // Si está escribiendo en el textarea o input de búsqueda, no interceptar flechas
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      if (e.key === 'Escape') {
        document.activeElement.blur();
      }
      return;
    }

    // Ctrl+K o / para enfocar búsqueda
    if ((e.ctrlKey && e.key === 'k') || e.key === '/') {
      e.preventDefault();
      dom.searchInput.focus();
      return;
    }

    // Flecha Izquierda: Tema anterior
    if (e.key === 'ArrowLeft') {
      if (state.currentIndex > 0) {
        state.currentIndex--;
        renderCurrentTopic();
      }
    }

    // Flecha Derecha: Tema siguiente
    if (e.key === 'ArrowRight') {
      if (state.currentIndex < state.topics.length - 1) {
        state.currentIndex++;
        renderCurrentTopic();
      }
    }
  });

  // Menú Toggle en Móvil
  dom.menuToggleBtn.addEventListener('click', () => {
    dom.sidebar.classList.toggle('open');
  });

  // Cerrar sidebar al hacer clic fuera en móvil
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 900 && dom.sidebar.classList.contains('open')) {
      if (!dom.sidebar.contains(e.target) && !dom.menuToggleBtn.contains(e.target)) {
        dom.sidebar.classList.remove('open');
      }
    }
  });

  // 12. Inicialización por Hash o Primer Tema
  function init() {
    const hash = window.location.hash.replace('#', '').trim();
    if (hash) {
      const foundIdx = state.topics.findIndex(t => t.slug === hash);
      if (foundIdx !== -1) {
        state.currentIndex = foundIdx;
      }
    }
    renderSidebar();
    renderCurrentTopic();
  }

  init();
});
