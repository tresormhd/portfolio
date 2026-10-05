import { dictionaries, getInitialLang, saveLang, applyDocumentLang } from './core/i18n.js';
import { renderApp, projectCards, projectFilters } from './core/render.js';
import { initReveal } from './core/reveal.js';

const app = document.getElementById('app');
let lang = getInitialLang();

function render() {
  // Conserve la saisie du formulaire et la position de scroll lors d'un changement de langue
  const saved = {};
  app.querySelectorAll('#contact-form [name]').forEach((el) => (saved[el.name] = el.value));
  const y = window.scrollY;

  applyDocumentLang(lang);
  app.innerHTML = renderApp(lang, { photo: document.documentElement.dataset.photo === '1' });

  app.querySelectorAll('#contact-form [name]').forEach((el) => {
    if (saved[el.name] !== undefined) el.value = saved[el.name];
  });
  window.scrollTo(0, y);
  initReveal(app);
}

app.addEventListener('click', (e) => {
  const langBtn = e.target.closest('[data-lang]');
  if (langBtn) {
    if (langBtn.dataset.lang !== lang) {
      lang = langBtn.dataset.lang;
      saveLang(lang);
      render();
      app.querySelector(`[data-lang="${lang}"]`)?.focus();
    }
    return;
  }
  const menuBtn = e.target.closest('#menu-btn');
  if (menuBtn) {
    const open = document.getElementById('mobile-menu').classList.toggle('hidden') === false;
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? menuBtn.dataset.close : menuBtn.dataset.open);
    return;
  }
  if (e.target.closest('#mobile-menu a')) {
    document.getElementById('mobile-menu').classList.add('hidden');
    document.getElementById('menu-btn').setAttribute('aria-expanded', 'false');
    return;
  }
  const filterBtn = e.target.closest('[data-filter]');
  if (filterBtn) {
    const filter = filterBtn.dataset.filter;
    const t = dictionaries[lang];
    document.getElementById('project-filters').innerHTML = projectFilters(t, filter);
    document.getElementById('project-grid').innerHTML = projectCards(t, lang, filter);
    document.querySelector(`[data-filter="${filter}"]`)?.focus();
  }
});

app.addEventListener('submit', async (e) => {
  if (e.target.id !== 'contact-form') return;
  e.preventDefault();
  const form = e.target;
  const status = form.querySelector('#form-status');
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  status.textContent = form.dataset.sending;
  status.className = 'text-sm font-semibold text-slate-700';
  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    });
    // FormSubmit peut répondre 200 avec { success: "false" } (ex. formulaire non activé)
    const data = await res.json().catch(() => ({}));
    if (!res.ok || String(data.success) === 'false') throw new Error(data.message || String(res.status));
    form.reset();
    status.textContent = form.dataset.success;
    status.className = 'text-sm font-semibold text-green-800';
  } catch {
    status.textContent = form.dataset.error;
    status.className = 'text-sm font-semibold text-red-800';
  }
});

// Le HTML est pré-rendu en français au build : on ne re-rend que si la langue enregistrée diffère.
if (document.documentElement.lang !== lang) render();
else initReveal(app);
