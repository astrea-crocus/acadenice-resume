#!/usr/bin/env bash

set -e

EXAMPLE_PATH="tools/compose/simple.example.yml"
TARGET_PATH="tools/compose/simple.yml"
LINK_PATH="compose.yml"

# Vérifie que l'exemple existe
if [ ! -f "$EXAMPLE_PATH" ]; then
  echo "❌ Fichier exemple introuvable : $EXAMPLE_PATH"
  exit 1
fi

# Vérifie que les fichiers cibles n'existent pas déjà
if [ -e "$TARGET_PATH" ]; then
  echo "❌ Le fichier $TARGET_PATH existe déjà. Suppression manuelle requise."
  exit 1
fi

if [ -e "$LINK_PATH" ]; then
  echo "❌ Le lien ou fichier $LINK_PATH existe déjà. Suppression manuelle requise."
  exit 1
fi

# Copie le fichier exemple
cp "$EXAMPLE_PATH" "$TARGET_PATH"
echo "✅ Copié : $EXAMPLE_PATH → $TARGET_PATH"

# Crée le lien symbolique
ln -s "$TARGET_PATH" "$LINK_PATH"
echo "✅ Lien symbolique créé : $LINK_PATH → $TARGET_PATH"
