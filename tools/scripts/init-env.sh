#!/usr/bin/env bash

set -e

EXAMPLE_FILE=".env.example"
ENV_FILE=".env"

# Vérifie que .env.example existe
if [ ! -f "$EXAMPLE_FILE" ]; then
  echo "❌ Fichier $EXAMPLE_FILE introuvable."
  exit 1
fi

# Vérifie que .env n'existe pas
if [ -f "$ENV_FILE" ]; then
  echo "❌ Le fichier $ENV_FILE existe déjà. Suppression manuelle requise si vous souhaitez le régénérer."
  exit 1
fi

# Copie le fichier
cp "$EXAMPLE_FILE" "$ENV_FILE"
echo "✅ Fichier .env généré à partir de $EXAMPLE_FILE"
