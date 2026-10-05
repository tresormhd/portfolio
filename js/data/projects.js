/**
 * @typedef {Object} Project
 * @property {string|{fr:string,en:string}} title
 * @property {string|{fr:string,en:string}} description
 * @property {string[]} stack        Technologies utilisées
 * @property {string} [image]        Chemin d'image (ex. 'assets/projects/mon-projet.webp')
 * @property {string} [demoUrl]      Lien de démonstration
 * @property {string} [codeUrl]      Lien du code source
 * @property {'web'|'mobile'|'data'} category
 */

/** @type {Project[]} */
export const projects = [
  {
    title: { fr: 'Tableau de bord sinistres IARD', en: 'P&C claims dashboard' },
    description: {
      fr: "Projet personnel de démonstration : interface Angular de suivi des dossiers sinistres (filtres, statuts, détail d'un dossier, formulaires de déclaration validés) sur données simulées.",
      en: 'Personal demo project: an Angular interface to track insurance claims (filters, statuses, claim detail, validated declaration forms) using mock data.',
    },
    image: 'assets/projects/dashboard-sinistres.svg',
    stack: ['Angular', 'TypeScript', 'RxJS', 'Tailwind CSS'],
    category: 'web',
    codeUrl: '', // TODO: lien du projet (n'apparaît que s'il est renseigné)
  },
  {
    title: { fr: 'Analyse de la sinistralité auto', en: 'Motor claims analysis' },
    description: {
      fr: "Projet d'apprentissage en data science : exploration d'un jeu de données simulé de sinistres auto, nettoyage, visualisations et premier modèle de prédiction de la charge sinistre.",
      en: 'Data science learning project: exploration of a simulated motor claims dataset, cleaning, visualisations and a first claim cost prediction model.',
    },
    image: 'assets/projects/analyse-sinistralite.svg',
    stack: ['Python', 'pandas', 'scikit-learn', 'Jupyter'],
    category: 'data',
    codeUrl: '', // TODO: lien du projet (n'apparaît que s'il est renseigné)
  },
  {
    title: { fr: 'Application de déclaration de sinistre', en: 'Claim declaration app' },
    description: {
      fr: "Projet personnel de démonstration : application mobile (Ionic / Angular) pour déclarer un sinistre pas à pas, joindre des photos et suivre l'avancement du dossier.",
      en: 'Personal demo project: a mobile app (Ionic / Angular) to declare a claim step by step, attach photos and follow the file progress.',
    },
    image: 'assets/projects/app-declaration.svg',
    stack: ['Ionic', 'Angular', 'TypeScript', 'Capacitor'],
    category: 'mobile',
    codeUrl: '', // TODO: lien du projet (n'apparaît que s'il est renseigné)
  },
  {
    title: { fr: 'Outil de suivi de projet IT', en: 'IT project tracking tool' },
    description: {
      fr: "Projet personnel de démonstration : tableau Kanban pour piloter un projet IT (backlog, sprints, jalons), travaillé en lien avec ma montée en compétences en gestion de projet.",
      en: 'Personal demo project: a Kanban board to manage an IT project (backlog, sprints, milestones), built alongside my growth in project management.',
    },
    image: 'assets/projects/suivi-projet-it.svg',
    stack: ['Angular', 'TypeScript', 'Tailwind CSS'],
    category: 'web',
    codeUrl: '', // TODO: lien du projet (n'apparaît que s'il est renseigné)
  },
  {
    title: { fr: 'Scoring de sinistres : API et interface Angular', en: 'Claims scoring: API and Angular UI' },
    description: {
      fr: "Projet personnel de démonstration : un modèle de prédiction exposé par une API FastAPI et consommé par une interface Angular qui affiche le score et les facteurs qui l'expliquent.",
      en: 'Personal demo project: a prediction model exposed through a FastAPI API and consumed by an Angular interface showing the score and the factors behind it.',
    },
    image: 'assets/projects/api-scoring.svg',
    stack: ['FastAPI', 'scikit-learn', 'Angular', 'TypeScript'],
    category: 'data',
    codeUrl: '', // TODO: lien du projet (n'apparaît que s'il est renseigné)
  },
  {
    title: { fr: "Détection de fraude à l'assurance", en: 'Insurance fraud detection' },
    description: {
      fr: "Projet d'apprentissage : classification sur données simulées très déséquilibrées, avec rééquilibrage des classes et évaluation par précision, rappel et AUC-PR.",
      en: 'Learning project: classification on highly imbalanced simulated data, with class rebalancing and evaluation using precision, recall and AUC-PR.',
    },
    image: 'assets/projects/detection-fraude.svg',
    stack: ['Python', 'scikit-learn', 'imbalanced-learn', 'Jupyter'],
    category: 'data',
    codeUrl: '', // TODO: lien du projet (n'apparaît que s'il est renseigné)
  },
  {
    title: { fr: 'Pipeline ETL de données sinistres', en: 'Claims data ETL pipeline' },
    description: {
      fr: "Projet personnel de démonstration : extraction de fichiers CSV, nettoyage, contrôles de qualité et chargement dans une base SQL, exécutés par un script planifié.",
      en: 'Personal demo project: CSV extraction, cleaning, data quality checks and loading into a SQL database, run by a scheduled script.',
    },
    image: 'assets/projects/pipeline-etl.svg',
    stack: ['Python', 'pandas', 'SQL', 'PostgreSQL'],
    category: 'data',
    codeUrl: '', // TODO: lien du projet (n'apparaît que s'il est renseigné)
  },
  {
    title: { fr: 'Espace client assurance', en: 'Insurance customer portal' },
    description: {
      fr: "Projet personnel de démonstration : portail Angular où un assuré consulte ses contrats, ses attestations et ses échéances, avec authentification simulée et interface accessible.",
      en: 'Personal demo project: an Angular portal where a policyholder views contracts, certificates and due dates, with simulated authentication and an accessible interface.',
    },
    image: 'assets/projects/espace-client.svg',
    stack: ['Angular', 'TypeScript', 'Angular Material', 'RxJS'],
    category: 'web',
    codeUrl: '', // TODO: lien du projet (n'apparaît que s'il est renseigné)
  },
  {
    title: { fr: "Application d'inspection terrain", en: 'Field inspection app' },
    description: {
      fr: "Projet personnel de démonstration : application mobile pour un expert qui renseigne une checklist, prend des photos et enregistre ses constats, y compris sans connexion.",
      en: 'Personal demo project: a mobile app for an adjuster to fill a checklist, take photos and save findings, including offline.',
    },
    image: 'assets/projects/inspection-terrain.svg',
    stack: ['Ionic', 'Angular', 'Capacitor', 'IndexedDB'],
    category: 'mobile',
    codeUrl: '', // TODO: lien du projet (n'apparaît que s'il est renseigné)
  },
  {
    title: { fr: "Rappels d'échéances de contrats", en: 'Policy renewal reminders' },
    description: {
      fr: "Projet personnel de démonstration : application mobile qui affiche un calendrier des échéances de contrats et envoie des notifications avant chaque renouvellement.",
      en: 'Personal demo project: a mobile app showing a calendar of policy due dates and sending notifications before each renewal.',
    },
    image: 'assets/projects/rappels-echeances.svg',
    stack: ['Ionic', 'Angular', 'Capacitor', 'Notifications'],
    category: 'mobile',
    codeUrl: '', // TODO: lien du projet (n'apparaît que s'il est renseigné)
  },
];
