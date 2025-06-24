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
