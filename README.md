# Documentation

## Créer un nouveau template

### Comment nommer mon nouveau template ?

Les noms des templates d'AcadéNice proviennent des héros de Marvel.  
Pour la création d'un nouveau template, prenons "Spider Man" comme nom de nouveau template.

### Par quoi dois-je commencer ?

- D'abord, on créer un fichier `spiderman.tsx` dans [apps/artboard/src/templates/acadenice](apps/artboard/src/templates/acadenice).  
   Il est tout à fait possible de dupliquer un ancien template pour commencer. Ils ont souvent cette structure :
  ```tsx
  import type { Award, Certification, CustomSection, CustomSectionGroup, Interest, Language, Social, Project, Publication, Reference, SectionKey, SectionWithItem, Skill, URL, } from "@reactive-resume/schema";
  import { Education, Experience, Volunteer } from "@reactive-resume/schema";
  import { cn, isEmptyString, isUrl, sanitize } from "@reactive-resume/utils";
  import get from "lodash.get";
  import { Fragment } from "react";

  import { BrandIcon } from "../../components/brand-icon";
  import { Picture } from "../../components/picture";
  import { useArtboardStore } from "../../store/artboard";
  import type { TemplateProps } from "../../types/template";
  ```

---

- Templates d'AcadéNice : [apps/artboard/src/templates/acadenice](apps/artboard/src/templates/acadenice)
  - Ajouter un template :
    - [apps/artboard/src/templates/index.tsx](apps/artboard/src/templates/index.tsx)
    - [libs/utils/src/namespaces/template.ts](libs/utils/src/namespaces/template.ts)
- Modifier le tampon AcadéNice
  - [apps/artboard/src/templates/acadenice/component/contact.tsx](apps/artboard/src/templates/acadenice/component/contact.tsx)
  - [apps/artboard/src/templates/acadenice/component/seal.tsx](apps/artboard/src/templates/acadenice/component/seal.tsx)
- Ajouter une couleur dans la palette de couleurs des CVs :
  - [apps/client/src/constants/colors.ts](apps/client/src/constants/colors.ts)
- [libs/utils/src/normalized.ts](libs/utils/src/normalized.ts)
