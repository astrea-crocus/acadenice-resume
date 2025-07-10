## Gérer les templates

### Ajouter un nouveau template

1. Créer un fichier de composant React, par ex. :
   ```text
   apps/artboard/src/templates/acadenice/spiderman.tsx
   ```
2. Exemple minimal :
   ```tsx
   export const SpiderMan = ({ columns, isFirstPage = false }: TemplateProps) => {
     const [main, sidebar] = columns;
     return {
       /* Contenu du template */
     };
   };
   ```
3. L’importer dans [index.tsx](apps/artboard/src/templates/index.tsx) :
   ```tsx
   import { SpiderMan } from "./acadenice/spiderman";
   ```
4. Ajouter un case dans le switch :

   ```tsx
   case "Spider Man": {
   return SpiderMan;
   }
   ```

   ✅ Le texte du `case` doit correspondre à la version normalisée du nom.

### Supprimer un template

- Supprimer l’import correspondant.
- Supprimer le `case` associé.

### Changer le template par défaut

Modifier la partie `default` :

```tsx
default: {
  return AntMan;
}
```

Par exemple, pour utiliser `SpiderMan` :

```tsx
default: {
  return SpiderMan;
}
```

---

## 📁 apps/client/

### public/[templates](apps/client/public/templates)

Ce dossier contient les fichiers jpg, json et pdf des prévisualisations des templates disponibles dans l'application.  
**Important :** les noms de ces fichiers doivent être en minuscules, sans espaces, tirets, accents ni caractères spéciaux.

> [!TIP]
> Dans [`libs/utils/src/namespaces/template.ts`](libs/utils/src/namespaces/template.ts), tu peux nommer un template comme tu veux. Ensuite, la fonction `normalizeToFileName` de [`libs/utils/src/normalized.ts`](libs/utils/src/normalized.ts) permet de faire correspondre un template avec ses fichiers de prévisualisation.

## 📁 apps/artboard/

### src/templates/[index.tsx](apps/artboard/src/templates/index.tsx)

Ce fichier joue le rôle de routeur des templates de CV.

Quand l’application veut afficher un CV, elle appelle `getTemplate` avec le nom du template (ex. `Iron Man`, `pikachu`).

**Fonctionnement :**

1. Normalise le nom du template (`normalizeTemplateName`).
2. Compare ce nom à une liste prédéfinie.
3. Retourne le composant React correspondant (ex. `IronMan`, `Pikachu`).

**Résultat** : le design choisi du CV est affiché dans l’éditeur ou à l’export.

### src/libs/[date.ts](apps/artboard/src/libs/date.ts)

#### `calculateAge`

1. Prend une date de naissance sous forme de chaîne (ex. "2000-01-01").
2. Vérifie si la date est valide (grâce à dayjs).
3. Calcule la différence avec la date actuelle en années.

<ins>**Exemple :**</ins>

```text
"2000-01-01" → 25
"date-invalide" → null
undefined → null
```

**Utilité :**
Obtenir rapidement l’âge d’une personne à partir d’une date au format ISO ou "YYYY-MM-DD".

## 🧰 libs/utils/src/

### [normalized.ts](libs/utils/src/normalized.ts)

Contient deux fonctions utilitaires pour « nettoyer » les noms.

#### `normalizeToFileName`

1. Met tout en minuscules.
2. Supprime les accents.
3. Supprime espaces, tirets et underscores.

<ins>**Exemple :**</ins>

```text
"Fichier Démo-Test" → "fichierdemotest"
```

#### `normalizeTemplateName`

1. Supprime les accents.
2. Garde majuscules, espaces et autres caractères.

<ins>**Exemple :**</ins>

```text
"Template Démo" → "Template Demo"
```

### namespaces/[template.ts](libs/utils/src/namespaces/template.ts)

Contient :

- `templatesList` : liste fixe de noms de templates.
- `Template` : type TypeScript autorisant uniquement ces noms.

> [!TIP]
> Les templates ayant des noms de **super-héros** (_Iron Man_, _Thor_) ont été modifié pour l'**AcadéNice**.  
> Les templates ayant des noms de **Pokémon** (_pikachu_, _ditto_) sont les templates de base de **Reactive Resume**.

## Autres

Deux templates d’exemple sont en cours ([1](apps/artboard/src/templates/acadenice/_example.tsx), [2](apps/artboard/src/templates/acadenice/_example2.tsx)).
Ils servent de base pour créer facilement de nouveaux templates en copiant/collant.

[apps/client/src/constants/colors.ts](apps/client/src/constants/colors.ts)  
Contient les couleurs utilisées par les templates.
