# Portfolio de Mohamed Tresor ZAN-BI

Site one-page bilingue (FR par défaut / EN) en **HTML, Tailwind CSS et JavaScript**, sans framework.

## Lancer en local

```bash
npm install
npm run build    # génère dist/style.css, index.html (pré-rendu FR), sitemap.xml, robots.txt
npm start        # http://localhost:3000
```

Pendant que vous modifiez les classes Tailwind : `npm run css:watch` dans un second terminal.
Après toute modification de contenu ou de données : `npm run build`.

## Structure

| Chemin | Rôle |
|---|---|
| `src/index.template.html` | Squelette HTML (meta, Open Graph, JSON-LD). **Ne pas éditer `index.html`** : il est généré. |
| `src/input.css` | Tailwind + styles communs (focus, animations, `prefers-reduced-motion`) |
| `js/data/fr.js`, `js/data/en.js` | **Tous les textes** du site, par langue |
| `js/data/content.js` | Compétences, expériences, formations (structure ; les textes sont dans fr/en) |
| `js/data/config.js` | E-mail, LinkedIn, GitHub, endpoint du formulaire, URL du site, chemins CV / photo |
| `js/data/projects.js` | Liste des projets (vide pour l'instant) |
| `js/core/` | `i18n.js` (langue), `render.js` (génération du HTML), `reveal.js` (animations au scroll) |
| `assets/` | CV PDF, photo, image Open Graph |

## Modifier le contenu

- **Un texte** : éditez la clé correspondante dans `js/data/fr.js` **et** `js/data/en.js`, puis `npm run build`.
- **Ajouter une compétence** : ajoutez-la dans le groupe voulu de `js/data/content.js`.
- **Ajouter une expérience** : ajoutez `{ id: 'mon-id' }` dans `experiences` (`content.js`) puis un bloc `experience.items['mon-id']` (`role`, `company`, `period`, `description`) dans `fr.js` et `en.js`. Même principe pour `education`.
- **Couleur d'accent** : `tailwind.config.js` (`accent`). Le texte orange sur fond clair utilise `accent-dark` (#B45309) pour respecter le contraste AA.

## À compléter (placeholders TODO)

- `js/data/config.js` : `siteUrl` (domaine final).
- `assets/CV-Mohamed-Tresor-ZAN-BI.pdf` : remplacez le PDF provisoire par votre CV.
- `assets/photo.webp` : votre portrait (idéalement 640×800 px, moins de 100 Ko). S'il est absent, le hero s'affiche sans photo.
- `assets/og-image.png` : image de partage 1200×630 px.

## Ajouter un projet

Dans `js/data/projects.js`, ajoutez un objet au tableau :

```js
{
  title: { fr: 'Mon projet', en: 'My project' }, // ou une simple chaîne
  description: { fr: 'Description courte.', en: 'Short description.' },
  stack: ['Angular', 'TypeScript'],
  image: 'assets/projects/mon-projet.webp', // optionnel
  demoUrl: 'https://…',                      // optionnel
  codeUrl: 'https://github.com/…',           // optionnel
  category: 'web',                           // 'web' | 'mobile' | 'data'
}
```

Puis `npm run build`. Dès que le tableau n'est plus vide, la section « Projets » (cartes et filtre par catégorie) et son lien de menu apparaissent automatiquement.

## Formulaire de contact

Le formulaire envoie les messages par e-mail via [FormSubmit](https://formsubmit.co), sans compte. Destinataire : `formEndpoint` dans `js/data/config.js` (changez l adresse à la fin de l URL). **Activation unique** : le premier message envoyé depuis le site déclenche un e-mail de confirmation à l adresse destinataire ; cliquez sur le lien, ensuite tout arrive normalement.

## Déployer

Le site est statique. Déployez la racine du dépôt après `npm run build`, en incluant `index.html`, `dist/`, `js/`, `assets/`, `favicon.svg`, `robots.txt` et `sitemap.xml`.

- **Netlify / Cloudflare Pages / Vercel** : commande de build `npm run build`, dossier de publication `.` (racine).
- **GitHub Pages** : poussez le dépôt (avec `dist/style.css` et `index.html` générés) et activez Pages sur la branche principale.

N'oubliez pas de mettre le vrai domaine dans `siteUrl` avant le build : il alimente la balise canonical, Open Graph, `sitemap.xml` et `robots.txt`.

## Audit Lighthouse

```bash
npm start                                  # dans un terminal
npx lighthouse http://localhost:3000 --view
```
