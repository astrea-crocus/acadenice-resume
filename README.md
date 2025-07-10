- [Questions](#questions)
  - [Où sont les templates de l'AcadéNice ?](#où-sont-les-templates-de-lacadénice-)
  - [Comment créer un template ?](#comment-créer-un-template-)
- [Notes](#notes)

---

## Questions

### Où sont les templates de l'AcadéNice ?

[apps/artboard/src/templates/acadenice](apps/artboard/src/templates/acadenice)

### Comment créer un template ?

Prenons conne nom de template "Spider Man"

1. Créez un fichier dans [apps/artboard/src/templates/acadenice](apps/artboard/src/templates/acadenice)  
   Dans notre example, nous aurons donc un `spiderman.tsx` qui exportera son template ainsi :
   ```tsx
   export const SpiderMan = ({ columns, isFirstPage = false }: TemplateProps) => {
    const [main, sidebar] = columns;
    
    return (
      /*La mise en page du template*/
      );
    };
    ```

---

- [apps/artboard/src/templates/index.tsx](apps/artboard/src/templates/index.tsx)  
- [libs/utils/src/namespaces/template.ts](libs/utils/src/namespaces/template.ts)

---

## Notes

Un template d'[example de CV](apps/artboard/src/templates/acadenice/_example.tsx) est en construction, qui permettra la customization facile des différentes parties. Il pourra ainsi être copié/collé pour de futur templates.   
- Ajouter une couleur dans la palette de couleurs des CVs : [apps/client/src/constants/colors.ts](apps/client/src/constants/colors.ts) 
- [libs/utils/src/normalized.ts](libs/utils/src/normalized.ts)
