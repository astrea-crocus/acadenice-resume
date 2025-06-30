# Journal de bord

## 23 Juin 2025

### Côté Client

- Footer personnalisé
  - Ajout du logo de l'AcadéNice
  - Suppression de textes et images non utiles
- Modification de la favicon
- Ajustement des couleurs de thème
- Installation de la police `Josephin Sans`
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

---

## 24 Juin 2025

- Le site contenait encore du texte en anglais, donc modifications supplémentaires jusqu’à obtention de textes en français :
  - Modification de `lingui.config.ts` :
    ```ts
    sourceLocale: "fr-FR",
    ```
  - Modification de `apps/client/src/main.tsx` (sugérer par ChatGPT) :
    ```tsx
    dynamicActivate(defaultLocale)
      .then(() => {
        root.render(
          <StrictMode>
            <RouterProvider router={router} />
          </StrictMode>,
        );
      })
      // eslint-disable-next-line unicorn/prefer-top-level-await
      .catch((error: unknown) => {
        // eslint-disable-next-line no-console
        console.error("Erreur lors du chargement de la langue :", error);
        root.render(
          <StrictMode>
            <RouterProvider router={router} />
          </StrictMode>,
        );
      });
    ```
- Ajout des couleurs de l'AcadéNice dans la palette proposée dans le constructeur de CV
- Ajout de la police `Josefin Sans` dans les polices proposées dans le constructeur de CV
- Création de `routes-reactive-resume.md` pour garder une vue d'ensemble du projet>

## 25 Juin 2025

- Vérifications des `<title>` de toutes les pages
  - Changement de ``{t`Reactive Resume`}`` en ``{t`AcadéNice`}``
  - Compilation de Lingui
- Vérification des `alt=` des `<img>`
  - Suppression du contenu des `alt=` inutile pour une meilleur lecture des logiciels pour malvoyants
- Modification du contenu du mail envoyé pour réinitialiser le mot de passe
- Modification des textes sur les pages pour qu'ils puissent être traduisable plus tard, puis recompilation avec Lingui
- Ajout de nouveaux scripts :
  ```json
  "scripts": {
    "lingui:extract": "lingui extract",
    "lingui:compile": "lingui compile",
    "lingui:update": "lingui extract && lingui compile"
  }
  ```
- Petite personnalisation de la sidebar du builder de CV
- Léger ajustement du header pour que le logo ne soit plus au dessus de textes lorsque l'utilisateur scroll sur son pc

## 26 Juin 2025
- Ajustement de certains textes
- Modifications blocs de la sidebar de droite
  - Retrait du bloc "Statistique"
  - Modificatiom du bloc "Info"
- Template CV AcadéNice
  - Ajout d'un nouveau template AcadéNice
  - Le template AcadéNice est le template par défaut
  - Ajout du logo et d'informations de contact pour la référante d'entreprise

## 27 Juin 2025
- Fin personnalisation du premier template
- Ajout de 4 autres templates

## 28 Juin 2025
- Ajustement du template Euphorbia
- Ajustement de la couleur du texte du bloc de remarque sur OpenAI
- Amélioration de l'accéssibilité du site