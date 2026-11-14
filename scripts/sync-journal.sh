#!/bin/sh
# Recopie le journal de bord depuis le dépôt du jeu (privé) : JOURNAL.md, et
# les images du jour qu'il range dans journal/ (AAAA-MM-JJ.jpg, .png, .webp).
# En CI, l'accès passe par une clé de déploiement en lecture seule.
set -eu
REPO="${FEYLORIA_REPO:-git@github.com:Morialkar/Feyloria.git}"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
git clone --quiet --depth 1 --filter=blob:none --sparse "$REPO" "$tmp/jeu"
git -C "$tmp/jeu" sparse-checkout set --no-cone /JOURNAL.md '/journal/'
cp "$tmp/jeu/JOURNAL.md" journal/JOURNAL.md
if [ -d "$tmp/jeu/journal" ]; then
  find "$tmp/jeu/journal" -maxdepth 1 -type f \( -name '20*.jpg' -o -name '20*.jpeg' -o -name '20*.png' -o -name '20*.webp' \) -exec cp {} public/jours/ \;
fi
echo "journal: $(grep -c '^## 20' journal/JOURNAL.md) jours"
