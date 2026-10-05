// Pré-rend le HTML français dans index.html (SEO, rendu instantané) et génère sitemap.xml / robots.txt.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderApp } from '../js/core/render.js';
import { dictionaries } from '../js/core/i18n.js';
import { config } from '../js/data/config.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const t = dictionaries.fr;
const photo = existsSync(join(root, config.photo));

const jsonld = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: t.hero.name,
  jobTitle: t.hero.title,
  email: config.email,
  address: { '@type': 'PostalAddress', addressLocality: 'Abidjan', addressCountry: 'CI' },
  sameAs: [config.linkedin, config.github],
});

const values = {
  photo: photo ? '1' : '0',
  title: t.meta.title,
  description: t.meta.description,
  ogLocale: t.meta.ogLocale,
  siteUrl: config.siteUrl,
  ogImage: config.ogImage,
  jsonld,
  app: renderApp('fr', { photo }),
};

const html = readFileSync(join(root, 'src/index.template.html'), 'utf8').replace(
  /\{\{(\w+)\}\}/g,
  (_, key) => values[key] ?? '',
);
writeFileSync(join(root, 'index.html'), html);

const today = new Date().toISOString().slice(0, 10);
writeFileSync(
  join(root, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${config.siteUrl}/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n`,
);
writeFileSync(join(root, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${config.siteUrl}/sitemap.xml\n`);

console.log(`index.html, sitemap.xml, robots.txt générés (photo: ${photo ? 'oui' : 'absente'}).`);
