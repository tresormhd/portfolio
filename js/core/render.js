// Génération du HTML à partir des dictionnaires et des données.
// Fonctions pures (aucun accès au DOM) : utilisées dans le navigateur ET par scripts/build.mjs.
import { icons } from './icons.js';
import { dictionaries } from './i18n.js';
import { skillGroups, experiences, education } from '../data/content.js';
import { projects } from '../data/projects.js';
import { config } from '../data/config.js';

export const CATEGORIES = ['web', 'mobile', 'data'];
const loc = (v, lang) => (v && typeof v === 'object' ? (v[lang] ?? v.fr) : v);
const container = 'mx-auto w-full max-w-5xl px-4 sm:px-6';

const section = (id, title, body, tone = 'bg-white dark:bg-slate-900') => `
  <section id="${id}" aria-labelledby="${id}-title" class="${tone} py-16 sm:py-20">
    <div class="${container}">
      <h2 id="${id}-title" class="reveal mb-10 text-2xl font-extrabold tracking-tight sm:text-3xl">
        <span class="mr-3 inline-block h-1 w-8 rounded bg-accent align-middle" aria-hidden="true"></span>${title}
      </h2>
      ${body}
    </div>
  </section>`;

export const hasProjects = () => projects.length > 0;

function header(t, lang) {
  const ids = ['about', 'skills', 'experience', 'education', ...(hasProjects() ? ['projects'] : []), 'contact'];
  const link = (id, cls) => `<a href="#${id}" class="${cls}">${t.nav[id]}</a>`;
  const desktop = ids.map((id) => link(id, 'rounded px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-accent-dark dark:hover:text-amber-300')).join('');
  const mobile = ids.map((id) => link(id, 'block rounded px-3 py-3 text-base font-medium text-slate-800 dark:text-slate-200')).join('');
  const langBtn = (code) =>
    `<button type="button" data-lang="${code}" aria-pressed="${code === lang}" lang="${code}" class="rounded px-2.5 py-1 text-xs font-bold uppercase ${code === lang ? 'bg-slate-900 text-white dark:bg-accent dark:text-slate-900' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700'}">${code}</button>`;
  return `
  <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-slate-900 focus:px-4 focus:py-2 focus:text-white">${t.skipLink}</a>
  <header class="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-700 dark:bg-slate-900/95">
    <div class="${container} flex h-16 items-center justify-between gap-4">
      <a href="#top" aria-label="${t.brandLabel}" class="flex items-center gap-2 text-lg font-extrabold text-slate-900 dark:text-slate-100">
        <img src="assets/images/tresor-dev-header.svg" alt="" width="364" height="150" class="h-11 w-auto dark:hidden" />
        <img src="assets/images/tresor-dev-header-sombre.svg" alt="" width="364" height="150" class="hidden h-11 w-auto dark:block" />
      </a>
      <nav aria-label="${t.navLabel}" class="hidden items-center gap-1 md:flex">${desktop}</nav>
      <div class="flex items-center gap-2">
        <div role="group" aria-label="${t.langLabel}" class="flex items-center rounded-lg border border-slate-200 p-0.5 dark:border-slate-600">${langBtn('fr')}${langBtn('en')}</div>
        <button type="button" id="theme-btn" aria-pressed="false" aria-label="${t.themeLabel}" class="rounded-lg p-2 text-slate-900 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-700"><span class="dark:hidden">${icons.moon}</span><span class="hidden dark:block">${icons.sun}</span></button>
        <button type="button" id="menu-btn" aria-expanded="false" aria-controls="mobile-menu" aria-label="${t.menuOpen}" data-open="${t.menuOpen}" data-close="${t.menuClose}" class="rounded-lg p-2 text-slate-900 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-700 md:hidden">${icons.menu}</button>
      </div>
    </div>
    <nav id="mobile-menu" aria-label="${t.navLabel}" class="hidden border-t border-slate-200 bg-white px-4 pb-3 dark:border-slate-700 dark:bg-slate-900 md:hidden">${mobile}</nav>
  </header>`;
}

function hero(t, { photo }) {
  const h = t.hero;
  const photoHtml = photo
    ? `<div class="reveal order-first md:order-last md:justify-self-end">
        <img src="${config.photo}" alt="${h.photoAlt}" width="320" height="400" fetchpriority="high" decoding="async"
          onerror="this.parentElement.remove()"
          class="h-64 w-52 rounded-2xl border-4 border-white object-cover dark:border-slate-800 object-top shadow-xl ring-4 ring-accent sm:h-80 sm:w-64" />
      </div>`
    : '';
  return `
  <section id="top" aria-labelledby="hero-title" class="relative overflow-hidden bg-gradient-to-b from-accent-soft to-white dark:from-slate-800 dark:to-slate-900">
    <div class="${container} grid items-center gap-10 py-16 sm:py-24 ${photo ? 'md:grid-cols-[1fr_auto]' : ''}">
      <div>
        <p class="reveal mb-3 text-sm font-semibold uppercase tracking-widest text-accent-dark dark:text-accent">${h.greeting}</p>
        <h1 id="hero-title" class="reveal text-4xl font-extrabold tracking-tight sm:text-6xl">${h.name}</h1>
        <p class="reveal mt-4 max-w-2xl text-lg font-semibold text-slate-800 dark:text-slate-200 sm:text-xl">${h.title}</p>
        <p class="reveal mt-4 max-w-2xl text-lg text-slate-700 dark:text-slate-300">${h.tagline}</p>
        <div class="reveal mt-8 flex flex-wrap gap-3">
          <a href="#contact" class="btn btn-primary">${h.ctaContact}${icons.arrow}</a>
          <a href="${config.cvPath}" download class="btn btn-secondary">${icons.download}${h.ctaCv}</a>
        </div>
        <p class="reveal mt-6 flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">${icons.pin}${h.location}</p>
      </div>
      ${photoHtml}
    </div>
  </section>`;
}

function about(t) {
  const a = t.about;
  const facts = a.facts
    .map((f) => `<div class="card"><dt class="text-xs font-semibold uppercase tracking-wider text-accent-dark dark:text-accent">${f.label}</dt><dd class="mt-1 font-semibold text-slate-900 dark:text-slate-100">${f.value}</dd></div>`)
    .join('');
  return section(
    'about',
    a.title,
    `<div class="grid gap-10 md:grid-cols-[3fr_2fr]">
      <div class="reveal space-y-4 text-lg leading-relaxed">${a.paragraphs.map((p) => `<p>${p}</p>`).join('')}</div>
      <dl class="reveal grid gap-4">${facts}</dl>
    </div>`,
  );
}

function skillChip(item, t) {
  if (typeof item === 'string') return `<li class="chip">${item}</li>`;
  if (item.key) return `<li class="chip">${t.skills.labels[item.key]}</li>`;
  return `<li class="chip">${item.label} <span class="ml-1 rounded-full bg-accent-soft px-2 py-0.5 dark:bg-slate-700 text-xs font-semibold text-accent-dark dark:text-accent">${t.skills.training}</span></li>`;
}

function skills(t) {
  const cards = skillGroups
    .map(
      (g) => `<div class="card reveal"><h3 class="mb-4 text-lg font-bold">${t.skills.groups[g.id]}</h3>
        <ul class="flex flex-wrap gap-2">${g.items.map((i) => skillChip(i, t)).join('')}</ul></div>`,
    )
    .join('');
  return section('skills', t.skills.title, `<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">${cards}</div>`, 'bg-slate-50 dark:bg-slate-950');
}

function experience(t) {
  const items = experiences
    .map((e) => {
      const x = t.experience.items[e.id];
      return `<li class="reveal relative pb-10 pl-8 last:pb-0">
        <span aria-hidden="true" class="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-4 border-white dark:border-slate-900 ${e.current ? 'bg-accent ring-2 ring-accent' : 'bg-slate-400'}"></span>
        <p class="text-sm font-semibold text-accent-dark dark:text-accent">${x.period}${e.current ? ` <span class="ml-2 rounded-full bg-accent-soft px-2 py-0.5 dark:bg-slate-700 text-xs">${t.experience.current}</span>` : ''}</p>
        <h3 class="mt-1 text-xl font-bold">${x.role}</h3>
        <p class="font-semibold text-slate-700 dark:text-slate-300">${x.company}</p>
        <p class="mt-2 max-w-2xl">${x.description}</p>
      </li>`;
    })
    .join('');
  return section('experience', t.experience.title, `<ol class="ml-2 border-l-2 border-slate-200 dark:border-slate-700">${items}</ol>`);
}

function educationSection(t) {
  const cards = education
    .map((e) => {
      const x = t.education.items[e.id];
      return `<div class="card reveal"><p class="text-sm font-semibold text-accent-dark dark:text-accent">${x.period}</p>
        <h3 class="mt-1 text-lg font-bold">${x.title}</h3>${x.school ? `<p class="mt-1 text-slate-700 dark:text-slate-300">${x.school}</p>` : ''}</div>`;
    })
    .join('');
  return section('education', t.education.title, `<div class="grid gap-6 md:grid-cols-3">${cards}</div>`, 'bg-slate-50 dark:bg-slate-950');
}

export function projectCards(t, lang, filter = 'all') {
  const list = projects.filter((p) => filter === 'all' || p.category === filter);
  if (!list.length) return `<p class="text-slate-700 dark:text-slate-300">${t.projects.empty}</p>`;
  const link = (url, label) =>
    url
      ? `<a href="${url}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-dark dark:text-accent hover:underline">${label}${icons.external}</a>`
      : '';
  const cards = list
    .map((p) => {
      const img = p.image
        ? `<img src="${p.image}" alt="" loading="lazy" decoding="async" width="640" height="360" class="aspect-video w-full object-cover" />`
        : `<div aria-hidden="true" class="aspect-video w-full bg-gradient-to-br from-accent-soft to-slate-100 dark:from-slate-700 dark:to-slate-800"></div>`;
      return `<article class="card flex flex-col overflow-hidden !p-0">
        ${img}
        <div class="flex flex-1 flex-col p-6">
          <p class="text-xs font-semibold uppercase tracking-wider text-accent-dark dark:text-accent">${t.projects.categories[p.category]}</p>
          <h3 class="mt-1 text-lg font-bold">${loc(p.title, lang)}</h3>
          <p class="mt-2 flex-1">${loc(p.description, lang)}</p>
          <ul class="mt-4 flex flex-wrap gap-2">${(p.stack ?? []).map((s) => `<li class="chip">${s}</li>`).join('')}</ul>
          <div class="mt-4 flex gap-4">${link(p.demoUrl, t.projects.demo)}${link(p.codeUrl, t.projects.code)}</div>
        </div></article>`;
    })
    .join('');
  return `<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">${cards}</div>`;
}

export function projectFilters(t, active = 'all') {
  return ['all', ...CATEGORIES]
    .map((c) => {
      const on = c === active;
      return `<button type="button" data-filter="${c}" aria-pressed="${on}" class="rounded-full border px-4 py-1.5 text-sm font-semibold ${on ? 'border-slate-900 bg-slate-900 text-white dark:border-accent dark:bg-accent dark:text-slate-900' : 'border-slate-300 bg-white text-slate-800 hover:border-accent-dark dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-accent'}">${c === 'all' ? t.projects.all : t.projects.categories[c]}</button>`;
    })
    .join('');
}

function projectsSection(t, lang) {
  if (!hasProjects()) return '';
  return section(
    'projects',
    t.projects.title,
    `<div id="project-filters" role="group" aria-label="${t.projects.filterLabel}" class="mb-8 flex flex-wrap gap-2">${projectFilters(t)}</div>
     <div id="project-grid" aria-live="polite">${projectCards(t, lang)}</div>`,
  );
}

function contact(t) {
  const c = t.contact;
  const f = c.form;
  const linkCls =
    'break-all font-semibold text-slate-900 dark:text-slate-100 underline decoration-accent decoration-2 underline-offset-4 hover:text-accent-dark dark:hover:text-amber-300';
  const row = (icon, label, value, href) => `<li class="flex items-start gap-3"><span class="mt-0.5 text-accent-dark dark:text-accent">${icon}</span>
      <div><p class="text-sm font-semibold text-slate-700 dark:text-slate-300">${label}</p>
      ${
        href
          ? `<a href="${href}" ${href.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''} class="${linkCls}">${value}</a>`
          : `<p class="font-semibold text-slate-900 dark:text-slate-100">${value}</p>`
      }</div></li>`;
  const field = (id, label, control) =>
    `<div><label for="f-${id}" class="mb-1.5 block text-sm font-semibold text-slate-900 dark:text-slate-100">${label}</label>${control}</div>`;
  return section(
    'contact',
    c.title,
    `<div class="grid gap-10 md:grid-cols-2">
      <div class="reveal"><p class="mb-6 text-lg">${c.intro}</p>
        <ul class="space-y-5">
          ${row(icons.mail, c.email, config.email, `mailto:${config.email}`)}
          ${row(icons.linkedin, c.linkedin, decodeURIComponent(config.linkedin.replace('https://', '')), config.linkedin)}
          ${row(icons.github, c.github, config.github.replace('https://', ''), config.github)}
          ${row(icons.pin, c.location, c.locationValue)}
        </ul></div>
      <form id="contact-form" class="reveal space-y-4" novalidate
        action="${config.formEndpoint}" method="POST"
        data-sending="${f.sending}" data-success="${f.success}" data-error="${f.error}">
        ${field('name', f.name, '<input id="f-name" name="name" type="text" autocomplete="name" required class="field" />')}
        ${field('email', f.email, '<input id="f-email" name="email" type="email" autocomplete="email" required class="field" />')}
        ${field('message', f.message, '<textarea id="f-message" name="message" rows="5" required class="field"></textarea>')}
        <input type="hidden" name="_subject" value="Message depuis le portfolio" /><input type="hidden" name="_captcha" value="false" />
        <input type="text" name="_honey" tabindex="-1" autocomplete="off" class="hidden" aria-hidden="true" />
        <button type="submit" class="btn btn-primary">${f.send}${icons.arrow}</button>
        <p id="form-status" role="status" aria-live="polite" class="text-sm font-semibold"></p>
      </form>
    </div>`,
  );
}

function footer(t, year) {
  return `<footer class="border-t border-slate-800 bg-slate-900 py-8 text-slate-300 dark:bg-slate-950">
    <div class="${container} flex flex-wrap items-center justify-between gap-3 text-sm">
      <img src="assets/images/tresor-dev-logo-sombre.png" alt="" width="1600" height="927" loading="lazy" decoding="async" class="h-20 w-auto" />
      <p>© ${year} ${t.hero.name}. ${t.footer.rights}</p>
      <a href="#top" class="font-semibold text-white underline decoration-accent decoration-2 underline-offset-4 hover:text-accent">${t.footer.top}</a>
    </div></footer>`;
}

/** Page complète (header, main, footer) pour une langue donnée. */
export function renderApp(lang, { year = new Date().getFullYear(), photo = true } = {}) {
  const t = dictionaries[lang];
  return `${header(t, lang)}
  <main id="main">${hero(t, { photo })}${about(t)}${skills(t)}${experience(t)}${educationSection(t)}${projectsSection(t, lang)}${contact(t)}</main>
  ${footer(t, year)}`;
}
