# 📝 Reactive Resume AcadéNice

Bienvenue dans le projet **Reactive Resume AcadéNice** !  
Ce guide t’explique comment gérer les templates de CV, personnaliser l’application et contribuer facilement.

---

## 🚀 Sommaire

- [🎨 Gérer les templates](#-gérer-les-templates)
  - [➕ Ajouter un nouveau template](#-ajouter-un-nouveau-template)
  - [🗑️ Supprimer un template](#️-supprimer-un-template)
  - [⭐ Changer le template par défaut](#-changer-le-template-par-défaut)
- [📁 Explications de certains fichiers](#-explications-de-certains-fichiers)
- [❓ FAQ](#-faq)

---

## 🎨 Gérer les templates

### ➕ Ajouter un nouveau template

1. **Créer un composant React** dans `apps/artboard/src/templates/acadenice/`, par exemple : `spiderman.tsx`

   ```tsx
   export const SpiderMan = ({ columns, isFirstPage = false }: TemplateProps) => {
     const [main, sidebar] = columns;
     return {
       /* Contenu du template */
     };
   };
   ```

   > [!NOTE]
   > Deux templates d’exemple sont disponibles ([_example.tsx_](apps/artboard/src/templates/example.tsx), [_example2.tsx_](apps/artboard/src/templates/example2.tsx)).  
   > Ils servent de base pour créer facilement de nouveaux templates : il suffit de les copier et d’adapter leur contenu selon tes besoins.

2. **Importer le composant** dans `apps/artboard/src/templates/acadenice/index.tsx` :
   ```tsx
   import * from "./spiderman";
   ```
3. **Importer le composant** dans `apps/artboard/src/templates/index.tsx` :
   ```tsx
   import { /* Liste des templates importées*/ , SpiderMan } from "./acadenice";
   ```
4. **Ajouter un case dans le switch** :
   ```tsx
   case "Spider Man": {
     return SpiderMan;
   }
   ```
   > ✅ Le texte du `case` doit correspondre à la version normalisée du nom.

---

### 🗑️ Supprimer un template

- Supprimer l’import correspondant.
- Supprimer le `case` associé dans le switch.

---

### ⭐ Changer le template par défaut

Modifie la partie `default` du switch :

```tsx
default: {
  return AntMan;
}
```

Pour utiliser `SpiderMan` :

```tsx
default: {
  return SpiderMan;
}
```

---

### Modifier le contact AcadéNice affiché sur le CV

Le composant de contact se trouve dans :  
`apps/artboard/src/components/acadenice/contact.tsx`

Pour personnaliser le nom, l’email ou le téléphone affichés sur les templates, modifie les constantes suivantes :

```tsx
const contactName = "nom";
const contactEmail = "email";
const contactPhone = "phone";
const contactPhoneInternational = "international";
```

Ces informations sont utilisées à la fois pour l’affichage visuel sur le CV et pour l’accessibilité (ATS, export PDF).

> [!TIP]
> Tu peux aussi personnaliser le style du bloc contact en modifiant le composant `ContactDiv` dans ce même fichier.

---

> [!NOTE]
> Utilise les commandes suivantes avec `pnpm run <commande>` pour automatiser le build et la gestion des traductions :
>
> - **Redémarrer Docker** :
>   ```json
>   "docker:restart": "docker compose down && docker compose build && docker compose up -d"
>   ```
> - **Extraire les chaînes à traduire** :
>   ```json
>   "lingui:extract": "lingui extract"
>   ```
> - **Compiler les traductions** :
>   ```json
>   "lingui:compile": "lingui compile"
>   ```
> - **Mettre à jour toutes les traductions** :
>   ```json
>   "lingui:update": "lingui extract && lingui compile"
>   ```

---

## 📁 Explications de certains fichiers

### `apps/client/`

- **`public/templates`** : Fichiers jpg, json et pdf des prévisualisations.

  > ⚠️ Noms en minuscules, sans espaces, accents ou caractères spéciaux.

- **`src/constants/colors.ts`** : Palette de couleurs utilisée dans le builder.

### `apps/artboard/`

- **`src/templates/index.tsx`** : Routeur des templates de CV.  
  Appelle `getTemplate` avec le nom du template, normalise le nom, compare à la liste et retourne le composant React.

- **`src/libs/date.ts`** :  
  Fonction `calculateAge` pour calculer l’âge à partir d’une date de naissance.

### `libs/utils/src/`

- **`normalized.ts`** :  
  Fonctions utilitaires pour nettoyer les noms (`normalizeToFileName`, `normalizeTemplateName`).

- **`namespaces/template.ts`** :
  - `templatesList` : Liste fixe de noms de templates.
  - `Template` : Type TypeScript autorisant uniquement ces noms.

> [!TIP]
> Les templates de **super-héros** (_Iron Man_, _Thor_) ont été adaptés pour l'**AcadéNice**.  
> Les templates de **Pokémon** (_pikachu_, _ditto_) sont ceux de base de **Reactive Resume**.

---

## ❓ FAQ

### Comment ajouter un nouveau template de CV ?

Voir la section [Ajouter un nouveau template](#-ajouter-un-nouveau-template).

### Pourquoi mon template n’apparaît pas dans l’application ?

- Vérifie l’import et le `case` dans `index.tsx`.
- Assure-toi que le nom est bien normalisé.
- Redémarre l’environnement Docker ou le serveur local.

### Comment changer le template par défaut ?

Modifie le bloc `default` dans le switch du fichier `index.tsx`.

### Où placer les fichiers de prévisualisation (jpg, pdf, json) ?

Dans `apps/client/public/templates`.  
Respecte la règle de nommage : tout en minuscules, sans espaces, accents ou caractères spéciaux.

### Comment ajouter une nouvelle couleur à la palette ?

Ajoute la couleur dans `apps/client/src/constants/colors.ts`.

### Que faire si une commande Docker ou pnpm ne fonctionne pas ?

- Vérifie que Docker et pnpm sont bien installés.
- Consulte les logs pour plus d’informations.
- Redémarre l’environnement avec `pnpm run docker:restart`.

### Comment mettre à jour les traductions ?

Utilise la commande :

```bash
pnpm run lingui:update
```

### Où trouver des exemples de templates ?

Dans `apps/artboard/src/templates/acadenice/_example.tsx` et `_example2.tsx`.

### À quoi servent les fonctions de normalisation ?

Elles uniformisent les noms de fichiers et de templates pour éviter les erreurs de correspondance.

### Puis-je utiliser des noms personnalisés pour mes templates ?

Oui, mais respecte la normalisation et ajoute le nom dans la liste des templates autorisés si nécessaire.

---

🎉 Bon développement sur Reactive Resume AcadéNice !
