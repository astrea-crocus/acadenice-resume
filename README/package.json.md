# Explications des scripts dans `package.json`

Ce document décrit les différents scripts définis dans le fichier `package.json` et leur rôle dans le projet.

---

## Scripts de développement

- `dev`  
  Lance tous les services de développement avec Nx (serve toutes les apps).

- `start`  
  Démarre l’application serveur compilée depuis `dist/apps/server/main`.

---

## Scripts de build

- `prebuild`  
  Génère les clients Prisma avant la compilation.

- `build`  
  Compile tous les projets via Nx.

- `prestart`  
  Applique les migrations Prisma sur la base de données avant le démarrage.

---

## Scripts de tests

- `test`  
  Lance les tests unitaires avec Vitest.

---

## Scripts de linting et formatage

- `lint`  
  Analyse la qualité du code sur tous les projets via Nx.

- `lint:fix`  
  Analyse et corrige automatiquement les erreurs de lint.

- `format`  
  Vérifie que les fichiers sont bien formatés avec Prettier.

- `format:fix`  
  Formate automatiquement les fichiers avec Prettier.
- `fix:all`  
  Exécute d’abord le formatage automatique (`format:fix`), puis corrige les erreurs de lint (`lint:fix`).  
  Utile pour appliquer en une seule commande toutes les corrections de style et linting.

---

## Scripts Prisma (base de données)

- `prisma:generate`  
  Génère le client Prisma.

- `prisma:migrate`  
  Applique les migrations Prisma en mode production.

- `prisma:migrate:dev`  
  Applique les migrations Prisma en mode développement (avec interactions).

---

## Scripts d’internationalisation (i18n)

- `messages:extract`  
  Extrait et nettoie les messages de traduction avec Lingui.

- `lingui:update`  
  Extrait et compile les messages Lingui.

---

## Scripts Docker

- `docker:restart`  
  Redémarre les conteneurs Docker en arrêtant, reconstruisant et relançant.

- `compose:init`  
  Initialise le fichier `docker-compose.yml` en copiant un template et créant un lien symbolique.

- `env:init`  
  Initialise le fichier `.env` à partir du fichier `.env.example`.

- `init:project`  
  Lance successivement `compose:init` puis `env:init` pour préparer l’environnement.

---

## Scripts Crowdin (traductions)

- `crowdin:sync`  
  Synchronise les fichiers de traduction avec Crowdin (push puis pull).

---

## Notes

- Les scripts `compose:init`, `env:init` et `init:project` sont des scripts personnalisés pour configurer l’environnement local sans versionner les fichiers sensibles.
- Nx est utilisé pour orchestrer les tâches sur plusieurs applications et bibliothèques du monorepo.

---

N’hésitez pas à consulter ce fichier lorsque vous souhaitez comprendre ou utiliser un script dans ce projet.
