# Journal de bord

## 23 Juin 2025

### Côté Client
- Footer personnalisé
  - Ajout du logo de l'AcadéNice
  - Suppression de textes et images non utiles
- Modification de la favicon
- Ajustement des couleurs de thème
- Installation de la font `Josephin Sans`
- Modification de `apps/client/src/libs/lingui.ts` pour mettre le site en `fr-FR` par défaut
- Modification du Gradient de `apps/client/src/pages/home/sections/hero/decoration.tsx` pour utiliser les couleurs de l'AcadéNice

### Github
- Création d'un fork sur [AcadéNice](https://github.com/AcadeNice)

### Autre
- Modification du README.md pour en faire un journal de bord (l'original a été renommé en `rx.README.md`)
- Ajout d'une fonction `pnpm docker:restart` qui exécute les commandes suivantes :
  ```bash
  docker compose down
  docker compose build
  docker compose up -d
  ```
