// Copie uniquement les fichiers à publier dans ./public (à glisser-déposer sur l'hébergeur).
import { cpSync, rmSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'public');

rmSync(out, { recursive: true, force: true });
mkdirSync(out);
for (const item of ['index.html', 'favicon.svg', 'robots.txt', 'sitemap.xml', 'dist', 'js', 'assets']) {
  if (existsSync(join(root, item))) cpSync(join(root, item), join(out, item), { recursive: true });
}
console.log('Dossier prêt à publier : public/');
