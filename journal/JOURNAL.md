# Journal de bord de Feyloria

Ce qui se fait sur le projet, jour par jour, depuis le premier commit (mardi 10 novembre 2026). Les jours suivent l'heure de l'Est. Ce fichier est public : il alimente le site de suivi (dépôt `feyloria-suivi`, mis à jour une fois par jour).

Format, pour que le site le lise :

- une section par jour, `## AAAA-MM-JJ — titre du jour` ;
- un paragraphe de résumé ;
- `### Fait`, `### Commencé`, `### À suivre` : des puces, chacune commençant par l'heure quand on la connaît (`- 21:10 — …`) ;
- `Commits : N` sur sa propre ligne.

## 2026-11-10 — La coquille et la première pièce

Le projet démarre le soir : un jeu mobile en Go avec Ebitengine, qui tourne sur macOS et iOS. Dans la même soirée, on décore déjà une première chambre océane : les meubles sont découpés au pixel, puis recolorés en gardant la nacre du rendu blanc.

### Fait

- 21:10 — Coquille du jeu : Go + Ebitengine, fenêtre au format téléphone sur Mac, build iOS.
- 21:51 — Prototype de l'étape 1 : une chambre océane à décorer.
- 22:08 — Découpe des meubles au pixel avec SAM 2.1 (un masque par meuble).
- 22:22 — Recoloration en carte de dégradé, avec la nacre du rendu blanc.
- 23:04 — Collection « Méduses enchantées » : 6 pièces verticales découpées.
- 23:08 — Matériaux « cousus » : la peinture des abysses (de Thomas) posée sur un meuble et ajustable au doigt.
- 23:47 — Zones fines par catégorie dans les 6 pièces.

Commits : 7

## 2026-11-11 — Le Palais des méduses prend forme

Une journée sur la qualité de la décoration et sur l'interface. Les masques deviennent précis (un par objet, aucun débordement) et la couleur passe en OKLab. Le premier look du Palais des méduses arrive, avec ses bulles de verre, son menu et Aria. Le moteur de rendu passe au GPU, et le jeu vise les 60 images/s sur iPhone.

### Fait

- 00:26 — Salon : original intact, rendu natif, couleur OKLab, masques précis ; un masque par objet.
- 00:41 — Les pièces commencent blanches ; « Nacre » est l'original ; tout remettre en blanc.
- 00:56 — Panneau des zones en bulles (ZonePanel), 12 zones regroupées.
- 07:28 — Lustre méduse découpé finement (cloche, festons, tentacules).
- 09:47 — Palette unique de 56 couleurs ; recoloration à la résolution de l'écran.
- 10:19 — Chambre : 10 zones découpées.
- 11:09 — Interface du projet visuel : thèmes de collection, bulles, menu et Aria.
- 11:29 — Les pièces et la collection sont décrites par des manifestes : une pièce s'ajoute sans code.
- 12:56 — Peintre GPU : formes arrondies par distance signée, banc de mesure.
- 13:08 — Pièces préparées en arrière-plan, voisines prêtes avant d'y aller ; mémoire bornée.
- 13:11 — Bus d'événements du cœur, pour brancher les succès plus tard.
- 13:18 — Banc de mesure sur iPhone (`make ios-bench`).
- 14:50 — Menu des couleurs v2 en plein écran, motif posé avec Valider.
- 15:54 — Zonage avec ChatGPT et découpe automatique ; déco à l'individuel, murs et plafond réunis.
- 17:32 — Palais des méduses : 14 pièces.
- 23:12 — Vérification automatique des images Midjourney (format, clarté, blanc chaud, coins sombres, objets déjà colorés).
- 23:18 — Prompt Midjourney complet à chaque fois, tiré du zonage.
- 23:38 — Nouvelle chambre de la reine méduse (Midjourney), 22 zones.

Commits : 38

## 2026-11-12 — Les matières et les styles

Les couleurs gagnent du relief, et les matières font leur entrée : pierres, métaux, marbres, velours, mousses, bois. Elles suivent la forme des meubles, et les sols se posent en perspective. Les premiers styles « dessinés » arrivent : une pièce redessinée par l'IA d'images dans une matière qu'une texture ne peut pas imiter. Le soir, Naomi apporte la collection coquillage, qui deviendra le Palais de Nacre.

### Fait

- 00:05 — Couleurs avec du relief : contraste selon le blanc de chaque zone.
- 00:36 — Format des pièces fixé à 3:5 (1320 × 2200), la pièce entière au-dessus du panneau.
- 01:13 — 12 nouveaux matériaux : pierres, métaux, marbres, velours ; mousse de corail en relief.
- 01:18 — Logo Feyloria à l'ouverture, icône de l'app.
- 12:10 — 3 mousses (sauvage, vive, tendre), matières sans grésillement.
- 12:52 — Sols et tapis en perspective dans les 14 pièces.
- 13:46 — Chambre du récif : le lit dessiné en mousse par Midjourney (« Mousse vivante »).
- 14:30 — Section Styles au menu ; Salon des vagues en hologramme, bois et pierre.
- 15:21 — Outil « répliquer un style » : extraire, comparer et répliquer un style dessiné dans toutes les pièces.
- 15:35 — 9 matières tirées des styles de la Salle de jeux (chrome, cuivre rosé, marbre craquelé, fourrure, nacre irisée…).
- 16:02 — Bois flotté par catégorie : sièges, meubles, textiles et décorations ont chacun leur texture.
- 17:53 — Salle de bain des perles, 17ᵉ pièce.
- 18:05 — « Mes pièces » : chaque pièce soumise est gardée, à voir en grand et à télécharger dans Photos.
- 18:55 — Textures recréées depuis les originaux en une passe (`rebuild.sh`), à leur taille réelle.
- 20:37 — Menu des couleurs : 5 par rangée, familles, catégories repliables.
- 20:56 — Nouveau logo à l'ouverture, nouvelle icône de l'app.
- 22:43 — Collection coquillage de Naomi : salle de bain, salon, cuisine, salle à manger, chambre des maîtres, bureau.

Commits : 47

## 2026-11-13 — Le jeu autour de la décoration

La plus grosse journée. Autour de la décoration, tout le jeu se construit :
- défis quotidiens sur 14 jours ;
- boutique, éclats et géodes, pass du mois et abonnement VIP ;
- profil, avatars et Aria ;
- collection de cartes, équipes du monde ;
- utilisations limitées des styles.

Le thème Nuit magique de Thomas arrive, puis la direction visuelle Aurore. Le Palais de Nacre reçoit une quinzaine de styles exclusifs dessinés. Le soir, le profil du joueur devient un vrai coffre scellé et sauvegardé à chaque achat, et les pages s'assemblent à partir de composants communs.

### Fait

- 00:54 — Page Défis : une carte par pièce avec JOUER ; collection Palais de Nacre et sa couleur holographique.
- 01:25 — Boutique (factice) : paquets d'éclats et offres groupées.
- 12:08 — Profil : avatar holographique, niveau, statistiques, Mes pièces ; photo de profil avec modération.
- 14:47 — Style Palais irisé, tiré de l'image de référence.
- 14:54 — Palettes premium en boutique et dans le pass VIP.
- 14:58 — Aria, la mascotte, son coffret et ses 5 looks dans le profil.
- 15:04 — Pass « Réussite du Mois » : 50 niveaux, VIP et gratuit, section Gold.
- 15:32 — Collection de cartes (paquets, séries, prix) et Équipes du monde, avec leurs défis de la semaine.
- 16:58 — Thème Nuit magique de Thomas : ciel étoilé, néons, polices Baloo 2 et Bagel Fat One.
- 17:01 — Les gemmes deviennent des géodes.
- 17:44 — Se connecter avec Apple, profil dans iCloud (à activer).
- 18:09 — Utilisations des styles : 4 au départ, rachetables en éclats, dépensées seulement à la soumission.
- 18:20 — Défis sur 14 jours, un par jour, minuit heure de l'Est ; pack de fin de collection pour les défis manqués.
- 19:47 — Tableau des récompenses en 5 paliers, avec un effet animé sur chacun.
- 20:21 — Interface plus grande partout (largeur logique 500).
- 20:37 — Police Kavoon pour le Palais de Nacre.
- 20:54 — Avatars du jeu à la place des photos (Aria Trans par défaut, puis Sirya, Warma).
- 21:00 — Styles dessinés exclusifs : Classique réaliste, Forêt enchantée, Palais de givre, Sirène, Bonbon gommeux, Goth velours, Queer, Marin bleu, Industriel violet, Douceur tamisée, Automne, Pierre glacée, Cozy bois, Nature douce, Luxe intense, Château de pierre, Rouge velours.
- 23:07 — Look nacré clair du Palais de Nacre.
- 23:22 — Direction Aurore sur la page Défis (fond vivant, boutons en relief, carte irisée, menu ondulé), « Réduire les animations ».
- 22:26 — Profil du joueur : tout ce qu'il possède, scellé (HMAC) et sauvegardé à chaque achat.
- 22:42 — Composants d'interface communs (cartes, boutons, tons), boutons qui s'enfoncent sous le doigt.

Commits : 92

## 2026-11-14 — Le serveur dans le jeu, le multijoueur jouable

Dans la nuit, l'interface Aurore s'étend à toutes les pages ; les créatures du Palais de Nacre et leurs cartes officielles arrivent.

Le matin, les specs de peaufinage des systèmes sont approuvées, et les lots 1 à 5 sont faits dans la journée :
- le serveur complet roule dans l'app, écrit en commandes Lambda pour passer sur AWS plus tard sans rien réécrire ;
- les classements sont en pourcentages, avec une population de joueurs simulés ;
- les duels se votent en paquets ;
- les likes sociaux ont leur budget quotidien ;
- l'accueil propose en ligne ou hors ligne, et les parties hors ligne s'exportent et s'importent ;
- les achats sont vérifiés.

L'après-midi est consacrée à la fluidité (60 images/s sur l'élan de la boutique) et à l'ouverture de ce journal de bord.

### Fait

- 00:17 — Créatures Darium, Nacrelle, Floraé, Sylirus, Fernestra ; avatar Aria Galaxy.
- 00:25 — Interface Aurore sur toutes les pages ; le Palais de Nacre garde son look nacré.
- 00:38 — Les 12 cartes officielles du Palais de Nacre.
- 00:54 — Thème global Aurore : cadres lumineux, boutons en verre bombé.
- 07:44 — `core` : jours en heure de l'Est, paliers en pourcentages (top 1, 5, 10, 25 %), note de qualité d'une pièce, joueurs simulés déterministes, budget de likes.
- 07:57 — Serveur interne en commandes Lambda : base locale signée, duels en paquets de 20, likes, classements, achats vérifiés (App Store, Google Play), export hors ligne ; rattrapage de 5 jours avec 10 000 joueurs simulés en 0,2 s.
- 08:07 — La partie du téléphone : profil dans la base du serveur, migration de l'ancienne sauvegarde, accueil « Jouer en ligne » / « Jouer hors ligne ».
- 08:15 — Écrans du cycle multijoueur : classements, duels, palier en direct, résultats et récompenses, likes.
- 08:17 — iOS : identifiant et jeton dans le Keychain, StoreKit 2, partage et import de parties.
- 09:09 — Boutique fluide sur son élan (de 32 à 60 images/s).
- 09:12 — Profil : l'en-tête se replie en résumé quand on fait défiler ses pièces.
- 09:13 — Outil de calibrage : des journées simulées avec 1 à 5000 vrais joueurs.
- 09:16 — Éclats et géodes dessinés une fois par taille.
- 10:13 — Aurore plus fidèle à la maquette : courants en S autour du logo, cadres roses en relief, onglets pastel.
- 10:25 — La plaque du menu et les étincelles dessinées une fois : un tiers de moins de dessin par page.
- 10:39 — Cartes pleine image, série « Merveilles », nacre sur la page de décoration.
- 10:52 — Écran de chargement : le jeu se construit en arrière-plan sous le logo.
- 10:59 — Palais de Nacre marin : perles, volutes de vagues, étoiles de mer, coquillages.
- 11:10 — Une carte touchée jaillit de sa place en très grand, puis y retourne.

### Commencé

- Journal de bord du projet (ce fichier) et site de suivi public (dépôt `feyloria-suivi`, Astro, GitHub Pages, mis à jour chaque jour).

### À suivre

- Calibrage des joueurs simulés : les vrais joueurs dépassent presque partout la cible « top 25 % une fois sur deux », et les récompenses montent à environ 1300 éclats par jour. À régler avec l'économie.
- Hébergement du serveur sur AWS (lots 6 et 7 des specs).
- Écrans du cycle multijoueur : design à faire (minimum fonctionnel pour l'instant).

Commits : 30
