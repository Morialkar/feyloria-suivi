# Feyloria · journal de bord

Le suivi public du développement de [Feyloria](https://morialkar.github.io/feyloria-suivi/), un jeu mobile de décoration magique : ce qui a été fait chaque jour, ce qui est en cours, et la suite.

Site statique fait avec [Astro](https://astro.build), au look Aurore du jeu.

## Comment il se met à jour

Le journal vit dans le dépôt du jeu (privé) : `JOURNAL.md`, et une image par jour dans `journal/`. Une fois par jour, le Mac de l'équipe lance `tools/journal/publier.sh` (dans le dépôt du jeu) : il refait l'image du jour, recopie le journal et les images ici (`journal/`, `public/jours/`) et pousse. Chaque push fait construire et publier le site par GitHub Actions (on peut aussi le relancer à la main : Actions → Journal → Run workflow).

## Développer

```sh
npm install
npm run dev        # http://localhost:4321/feyloria-suivi/
npm run build      # dans dist/
```

- `src/lib/journal.ts` lit `journal/JOURNAL.md` : une section par jour (`## AAAA-MM-JJ — titre`), un résumé, puis `### Fait`, `### Commencé`, `### À suivre` et `Commits : N`.
- `src/pages/index.astro` : l'accueil (le dernier jour, la frise de tous les jours, le Palais de Nacre).
- `src/pages/jour/[date].astro` : une page par jour.
- Une image du jour, si elle existe (`public/jours/AAAA-MM-JJ.*`), remplace la pièce du jeu affichée par défaut.

Polices : Baloo 2, Bagel Fat One et Kavoon (licence SIL Open Font, voir `src/assets/fonts/`). Images : © Feyloria.
