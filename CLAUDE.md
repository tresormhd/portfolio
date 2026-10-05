# Portfolio de Mohamed Tresor ZAN-BI

Site one-page bilingue (FR par défaut, EN) en HTML, Tailwind CSS 3 et JavaScript (modules ES), sans framework.
Déployé sur GitHub Pages : https://tresormhd.github.io/portfolio/

## Commandes
- `npm run build` : génère `dist/style.css`, `index.html` (pré-rendu FR), `sitemap.xml`, `robots.txt`
- `npm start` : serveur local sur http://localhost:3000
- `npm run css:watch` : recompile Tailwind pendant le développement
- `npm run package` : build, puis copie les fichiers à publier dans `public/`

## Règles importantes
- Ne jamais éditer `index.html`, `sitemap.xml` ni `robots.txt` à la main : ils sont générés par `scripts/build.mjs` à partir de `src/index.template.html`.
- Lancer `npm run build` après toute modification, et avant tout commit : les fichiers générés sont versionnés pour GitHub Pages.
- Aucun texte en dur dans les templates ni dans `render.js` : tout le texte vit dans `js/data/fr.js` et `js/data/en.js`. Toute nouvelle clé s'ajoute dans les deux langues.
- `js/core/render.js` doit rester pur (aucun accès au DOM ni à `localStorage`) : il est aussi exécuté par Node au build.
- N'inventer aucune expérience, chiffre ni client. Les infos manquantes sont des placeholders `TODO`.

## Architecture
- `js/data/` : textes (fr/en), `content.js` (structure compétences / expériences / formation), `config.js` (liens, URL du site, endpoint du formulaire), `projects.js` (vide)
- `js/core/` : `i18n.js`, `render.js`, `reveal.js`, `icons.js`
- `js/main.js` : événements (langue, menu, filtre projets, formulaire)
- La section Projets et son lien de menu n'apparaissent que si `projects.js` n'est pas vide.

## Design et qualité
- Accent orange `#F7931E`. Texte orange sur fond clair : `accent-dark` (#B45309) pour le contraste AA. Texte sombre sur les boutons orange, jamais blanc.
- Police : Plus Jakarta Sans. Animations discrètes, désactivées avec `prefers-reduced-motion`.
- Objectif Lighthouse ≥ 95 partout (dernier audit : 100/100/100/100). Pas de `reveal` sur le hero (cela retarderait le LCP).

## Formulaire de contact
FormSubmit (`formEndpoint` dans `config.js`). L'activation se fait par adresse de site : à refaire pour chaque nouveau domaine.

## À compléter
`assets/CV-Mohamed-Tresor-ZAN-BI.pdf` (PDF provisoire), `assets/og-image.png` (absente).