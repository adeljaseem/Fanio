/* Match the app's light default, with a separate website-only preference. */
(() => {
  let theme = 'light';
  try {
    const saved = localStorage.getItem('fanio-marketing-theme');
    if (saved === 'dark' || saved === 'light') theme = saved;
  } catch { /* The site works when browser storage is blocked. */ }
  document.documentElement.dataset.theme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = theme === 'dark' ? '#101216' : '#f7f5f0';
})();
