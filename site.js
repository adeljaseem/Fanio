'use strict';

// All interactions stay on this page. The request is a mailto draft, not a submission.
(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector('.theme-toggle');
  const updateThemeButton = () => {
    const dark = root.dataset.theme === 'dark';
    themeButton.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
    themeButton.setAttribute('aria-pressed', String(dark));
    themeButton.title = `Switch to ${dark ? 'light' : 'dark'} theme`;
  };
  themeButton.hidden = false;
  updateThemeButton();
  themeButton.addEventListener('click', () => {
    const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = theme;
    try { localStorage.setItem('fanio-marketing-theme', theme); } catch { /* optional */ }
    document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#101216' : '#f7f5f0';
    updateThemeButton();
  });

  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#main-navigation');
  menuButton.hidden = false;
  const closeMenu = ({ restoreFocus = false } = {}) => {
    navigation.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    if (restoreFocus) menuButton.focus();
  };
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    navigation.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    if (open) navigation.querySelector('a')?.focus();
  });
  navigation.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      closeMenu({ restoreFocus: true });
    }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header')) closeMenu();
  });
  const desktop = matchMedia('(min-width: 761px)');
  const resetMenuAtBreakpoint = () => closeMenu();
  if (desktop.addEventListener) desktop.addEventListener('change', resetMenuAtBreakpoint);
  root.classList.add('has-js');

  const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
  const activateTab = (tab, focus = false) => {
    tabs.forEach(item => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
    });
    if (focus) tab.focus();
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateTab(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      activateTab(tabs[next], true);
    });
  });

  const form = document.querySelector('#request-form');
  const emailLink = document.querySelector('#contact-email');
  // The address is inherited from the supplied website's public contact link.
  const recipient = emailLink.href.slice(7).split('?')[0];
  form.hidden = false;
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const name = document.querySelector('#request-name').value.trim();
    const device = document.querySelector('#request-device').value.trim();
    const message = document.querySelector('#request-message').value.trim();
    const lines = [
      'Hi Adil,', '',
      'I would like to try Fanio. Please share the Android APK and installation instructions.',
      'Please also let me know which features are enabled in this build.', '',
      ...(name ? [`Name: ${name}`] : []),
      ...(device ? [`Android device: ${device}`] : []),
      ...(message ? ['', message] : []),
      '', 'Thank you!',
    ];
    const draft = `mailto:${recipient}?subject=${encodeURIComponent('Fanio Android APK request')}&body=${encodeURIComponent(lines.join('\r\n'))}`;
    const status = document.querySelector('#request-status');
    status.replaceChildren(document.createTextNode('Opening your email app. Nothing has been sent yet. If no draft opens, '));
    const retry = document.createElement('a');
    retry.href = draft;
    // Keep the page and its direct-email fallback available if no mail handler exists.
    retry.target = '_blank';
    retry.rel = 'noopener noreferrer';
    retry.textContent = 'open the draft again';
    status.append(retry, document.createTextNode(' or use the address below.'));
    retry.click();
  });

  const copyButton = document.querySelector('#copy-email');
  const copyStatus = document.querySelector('#copy-status');
  copyButton.hidden = false;
  copyButton.addEventListener('click', async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(recipient);
      copyStatus.textContent = 'Email address copied.';
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(emailLink);
      selection.removeAllRanges();
      selection.addRange(range);
      emailLink.focus();
      copyStatus.textContent = 'Select and copy the email address above.';
    }
  });
  document.querySelector('#copyright-year').textContent = String(new Date().getFullYear());
})();
