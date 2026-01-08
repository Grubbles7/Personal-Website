// script.js - Dark mode toggle (defensive, works even if element missing)

// Wrap everything in DOMContentLoaded to ensure the DOM exists
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('dark-toggle');

  // applyTheme updates body class AND the toggle icon (if toggle exists)
  function applyTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.add('dark');
      if (toggleBtn) toggleBtn.textContent = '☀️'; // sun
    } else {
      document.body.classList.remove('dark');
      if (toggleBtn) toggleBtn.textContent = '🌙'; // moon
    }
  }

  // read stored preference (or respect user OS preference as fallback)
  const stored = localStorage.getItem('theme');
  if (stored) {
    applyTheme(stored);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // follow OS preference by default
    applyTheme('dark');
  } else {
    applyTheme('light');
  }

  // If toggle button exists, wire it up
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark');
      const newTheme = isDark ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      applyTheme(newTheme);
    });
  } else {
    // helpful console message if the toggle button isn't present
    // (this is not an error; it helps diagnose missing id / missing button)
    console.info('Dark mode toggle button not found (#dark-toggle). If you want the toggle, add a button with id="dark-toggle".');
  }
});
