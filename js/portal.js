// js/portal.js - Lógica interactiva del Catálogo de Cursos Pro

document.addEventListener('DOMContentLoaded', () => {
  // 1. Redirección inteligente de hash retrocompatible
  // Si un usuario accede con un enlace antiguo como index.html#variables?tab=code
  const hash = window.location.hash.trim();
  if (hash && hash !== '#' && hash !== '#cursos') {
    // Si el hash parece pertenecer a Go, redirigir a ./golang/index.html
    window.location.replace('./golang/index.html' + hash);
    return;
  }

  // 2. Gestión de Temas Visuales (Sincronizado con los cursos)
  const themeBtns = document.querySelectorAll('.theme-btn');
  const savedTheme = localStorage.getItem('gobe_theme') || 'slate';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('gobe_theme', theme);
    themeBtns.forEach(btn => {
      if (btn.dataset.theme === theme) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  applyTheme(savedTheme);

  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.dataset.theme;
      applyTheme(theme);
    });
  });

  // 3. Cargar y Reflejar Progreso de Estudio
  function updateProgress() {
    // Progreso del Curso de Go (85 temas)
    try {
      const goDone = JSON.parse(localStorage.getItem('gobe_pro_completed') || '[]');
      const goCount = Array.isArray(goDone) ? goDone.length : 0;
      const goPct = Math.round((goCount / 85) * 100);
      
      const goPctEl = document.getElementById('goProgressPct');
      const goCountEl = document.getElementById('goProgressCount');
      const goBarEl = document.getElementById('goProgressBar');

      if (goPctEl) goPctEl.textContent = `${goPct}%`;
      if (goCountEl) goCountEl.textContent = `${goCount} / 85 temas`;
      if (goBarEl) goBarEl.style.width = `${goPct}%`;
    } catch (e) {
      console.error('Error al cargar progreso de Go:', e);
    }

    // Progreso del Curso de PSeInt (40 temas)
    try {
      const pseintDone = JSON.parse(localStorage.getItem('pseint_pro_completed') || '[]');
      const pseintCount = Array.isArray(pseintDone) ? pseintDone.length : 0;
      const pseintTotal = 40;
      const pseintPct = Math.round((pseintCount / pseintTotal) * 100);

      const pseintPctEl = document.getElementById('pseintProgressPct');
      const pseintCountEl = document.getElementById('pseintProgressCount');
      const pseintBarEl = document.getElementById('pseintProgressBar');

      if (pseintPctEl) pseintPctEl.textContent = `${pseintPct}%`;
      if (pseintCountEl) pseintCountEl.textContent = `${pseintCount} / ${pseintTotal} temas`;
      if (pseintBarEl) pseintBarEl.style.width = `${pseintPct}%`;
    } catch (e) {
      console.error('Error al cargar progreso de PSeInt:', e);
    }
  }

  updateProgress();

  // 4. Atajos de teclado accesibles
  window.addEventListener('keydown', (e) => {
    // Si no está escribiendo en un input
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

    if (e.key === '1') {
      window.location.href = './golang/index.html';
    } else if (e.key === '2') {
      window.location.href = './pseint/index.html';
    }
  });
});
