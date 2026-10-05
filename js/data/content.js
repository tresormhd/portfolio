// Structure du contenu. Les textes traduits sont dans fr.js / en.js (mêmes identifiants).
// Un élément de compétence est soit une chaîne affichée telle quelle,
// soit { key } (libellé traduit), soit { label, training: true } (badge « en formation »).
export const skillGroups = [
  { id: 'front', items: ['Angular 19', 'TypeScript', 'RxJS', 'PrimeNG', 'Angular Material', 'Bootstrap', 'SCSS'] },
  { id: 'back', items: ['API REST', 'Spring Boot (intégration)', 'NestJS', 'PostgreSQL'] },
  { id: 'mobile', items: ['Flutter'] },
  { id: 'data', items: ['Python', { label: 'Machine Learning', training: true }, 'Excel / SheetJS / openpyxl'] },
  { id: 'tools', items: ['Git', 'Docker', 'Postman', 'Claude Code'] },
  { id: 'domain', items: [{ key: 'iard' }, { key: 'cima' }] },
];

export const experiences = [
  { id: 'gna', current: true },
  { id: 'sds' },
  { id: 'blooraid' },
  { id: 'ace' },
];

export const education = [{ id: 'licence' }, { id: 'nan' }, { id: 'data' }];
