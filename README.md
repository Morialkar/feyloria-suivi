# Feyloria · journal de bord

Le suivi public du développement de [Feyloria](https://morialkar.github.io/feyloria-suivi/), un jeu mobile de décoration magique : ce qui a été fait chaque jour, ce qui est en cours, et la suite.

Site statique fait avec [Astro](https://astro.build), au look Aurore du jeu.

## Comment il se met à jour

- Le journal vit dans le dépôt du jeu (privé), dans `JOURNAL.md` ; ses images du jour dans `journal/AAAA-MM-JJ.jpg` (ou `.png`, `.webp`).
- Une fois par jour (6 h, heure de l'Est), et à chaque push ici, le workflow `Journal` recopie ces fichiers (`scripts/sync-journal.sh`, par une clé de déploiement en lecture seule : le secret `FEYLORIA_DEPLOY_KEY`), garde la nouvelle version dans `journal/` et `public/jours/`, construit le site et le publie sur GitHub Pages.
- On peut aussi le lancer à la main : onglet Actions → Journal → Run workflow.

## Développer

```sh
npm install
npm run dev        # http://localhost:4321/feyloria-suivi/
npm run build      # dans dist/
npm run sync       # recopie le journal du jeu (accès au dépôt privé requis)
```

- `src/lib/journal.ts` lit `journal/JOURNAL.md` : une section par jour (`## AAAA-MM-JJ — titre`), un résumé, puis `### Fait`, `### Commencé`, `### À suivre` et `Commits : N`.
- `src/pages/index.astro` : l'accueil (le dernier jour, la frise de tous les jours, le Palais de Nacre).
- `src/pages/jour/[date].astro` : une page par jour.
- Une image du jour, si elle existe (`public/jours/AAAA-MM-JJ.*`), remplace la pièce du jeu affichée par défaut.

Polices : Baloo 2, Bagel Fat One et Kavoon (licence SIL Open Font, voir `src/assets/fonts/`). Images : © Feyloria.
