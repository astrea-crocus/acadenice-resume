<div align="center">

# 📝 Reactive Resume AcadéNice

![Static Badge](https://img.shields.io/badge/Reactive%20Resume-%2309090b?style=for-the-badge&label=Based%20on&labelColor=%233f3f46&link=https%3A%2F%2Frxresu.me%2F)
![Static Badge](https://img.shields.io/badge/Acad%C3%A9Nice-%234CCCB8?style=for-the-badge&label=Edited%20by&link=https%3A%2F%2Facadenice.fr%2F)
![Static Badge](https://img.shields.io/badge/You%20!-%23fda100?style=for-the-badge&label=For)

</div>

Bienvenue sur la version _AcadéNice_ de [**Reactive Resume**](https://rxresu.me/) !

Elle propose des templates de CV **ATS-friendly** pensés pour les étudiants et étudiantes d’**AcadéNice** (Web / Marketing), avec des couleurs harmonisées et un cachet contenant les informations d’un référent de formation.

Ce guide t’explique comment gérer les templates de CV, personnaliser l’application et contribuer facilement.

---

## 🚀 Sommaire

- [⚙️ Installation rapide](#-installation-rapide)
  - [Prérequis](#prérequis)
  - [Cloner le projet et installer les dépendances](#cloner-le-projet-et-installer-les-dépendances)
  - [Lancer l’application](#lancer-lapplication)
- [🎨 Gérer les templates](#-gérer-les-templates)
  - [➕ Ajouter un nouveau template](#-ajouter-un-nouveau-template)
  - [🗑️ Supprimer un template](#-supprimer-un-template)
  - [⭐ Changer le template par défaut](#-changer-le-template-par-défaut)
  - [🔍 `example.tsx` & `example2.tsx`](#-exampletsx--example2tsx)
- [🤝 Contribuer](#-contribuer)
  - [🚀 Créer ta branche](#-créer-ta-branche)
  - [🛠 Développer et tester localement](#-développer-et-tester-localement)
  - [✅ Vérifier le code et le style](#-vérifier-le-code-et-le-style)
  - [📦 Commit et push](#-commit-et-push)
- [📁 Explications de certains fichiers](#-explications-de-certains-fichiers)
- [❓ FAQ](#-faq)

---

## ⚙️ Installation rapide

### Prérequis

- [Node.js](https://nodejs.org/) (version ≥ 20)
- [pnpm](https://pnpm.io/) (ex. : `npm install -g pnpm`)
- [Docker](https://www.docker.com/)

### Cloner le projet et installer les dépendances

```bash
git clone https://github.com/ton-org/reactive-resume-acadenice.git
cd reactive-resume-acadenice
pnpm install
```

### Lancer l’application

```bash
pnpm run docker:restart
```

Ensuite, tu peux accéder à l’application sur http://localhost:3000
et commencer à créer ou modifier des templates.
En production, on utilise Docker Compose pour tout déployer facilement. Voir le fichier `compose.yml`.

---

## 🎨 Gérer les templates

### Structure

```bash
reactive-resume/
└── apps/
    ├── artboard/
    │   └── src/templates/
    │       ├── acadenice/
    │       │   ├── new-template.tsx   # Nouveau composant React du template
    │       │   └── index.tsx          # Fichier où tu ajoutes l'import et l'export des templates de l'AcadéNice
    │       └── index.tsx              # Fichier où tu ajoutes l'import et l'export de tous les templates
    ├── client/
    │   └── public/templates/
    │       ├── jpg/
    │       │   └── newtemplate.jpg    # Preview du template
    │       ├── json/
    │       │   └── newtemplate.json   # JSON de configuration du template
    │       └── pdf/
    │           └── newtemplate.pdf    # Exemple PDF du rendu
    └── server/

```

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

2. **Importer le composant** dans `apps/artboard/src/templates/acadenice/index.tsx` :
   ```tsx
   export * from "./spiderman";
   ```
3. **Importer le composant** dans `apps/artboard/src/templates/index.tsx` :
   ```tsx
   import { /* Liste des templates importées*/ , SpiderMan } from "./acadenice";
   ```
4. **Ajouter un case dans le switch** de `apps/artboard/src/templates/index.tsx` :
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

### 🔍 `example.tsx` & `example2.tsx`

Deux templates d’exemple sont disponibles ([_example.tsx_](apps/artboard/src/templates/example.tsx), [_example2.tsx_](apps/artboard/src/templates/example2.tsx)).  
Ils servent de base pour créer facilement de nouveaux templates : il suffit de les copier et d’adapter leur contenu selon tes besoins.

#### 📝 Comparaison détaillée

|                                                              | `example.tsx`                                                                                                                                                                                                              | `example2.tsx`                                                                                                                                 |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **Nom du composant exporté**                                 | `Example`                                                                                                                                                                                                                  | `ExampleA`                                                                                                                                     |
| **Texte affiché dans le JSX (placeholder)**                  | `example`                                                                                                                                                                                                                  | `example 2`                                                                                                                                    |
| **Types importés depuis `@reactive-resume/schema`**          | Plus nombreux : `Award`, `Certification`, `CustomSection`, `CustomSectionGroup`, `HardSkill`, `Interest`, `Language`, `Project`, `Publication`, `Reference`, `SectionKey`, `SectionWithItem`, `Social`, `SoftSkill`, `URL` | Moins nombreux : mêmes types, mais **sans** `CustomSectionGroup`, `SectionWithItem`, `URL`                                                     |
| **Composants React importés depuis `@/artboard/components`** | 5 composants seulement : `BrandIcon`, `ContactATS`, `Group`, `Picture`, `SealWhite`                                                                                                                                        | Beaucoup plus : ces 5 + `CustomFieldItem`, `Headline`, `InfoItem`, `Link`, `LinkedEntity`, `Name`, `Section`, `SectionContent`, `SectionTitle` |
| **Utilitaires importés**                                     | `cn`, `isEmptyString`, `isUrl`, `sanitize`, `get` (lodash), `calculateAge`                                                                                                                                                 | idem                                                                                                                                           |
| **Store**                                                    | utilise `useArtboardStore`                                                                                                                                                                                                 | idem                                                                                                                                           |

---

#### 🧠 **Ce que ça implique pour créer un template de CV**

✅ **`example.tsx`**

- Plus complet et flexible côté **types de données**.
- Adapté si tu veux gérer beaucoup de types et sections personnalisées.
- Moins d’aide côté structure visuelle (peu de composants importés).

✅ **`example2.tsx`**

- Plus minimal côté types.
- Plus riche côté structure et design grâce à de nombreux composants déjà prêts.
- Idéal pour partir vite d’une base visuelle solide.

---

#### 📦 **En résumé :**

|                                                     | `example.tsx`           | `example2.tsx`         |
| --------------------------------------------------- | ----------------------- | ---------------------- |
| 🧩 **Richesse des types / données**                 | ✅ plus complet         | moins                  |
| 🖼️ **Richesse visuelle / composants réutilisables** | moins                   | ✅ plus riche          |
| 🏗️ **Approche**                                     | base technique flexible | base design structurée |

---

> ✏️ Pour créer ton propre template, copie l’un des deux fichiers, renomme-le et adapte-le selon tes besoins (design, sections, données, etc.).

---

## 🤝 Contribuer

Tu veux ajouter un nouveau template, améliorer un existant ou corriger un bug ? Super !
Voici le petit workflow recommandé pour contribuer sans rien casser :

### 🚀 Créer ta branche

```bash
git checkout -b feat/nom-de-mon-template
```

### 🛠 Développer et tester localement

- Ajoute ou modifie ton template comme expliqué plus haut.
- Assure-toi que Docker Desktop est ouvert et lancé.
- Redémarre proprement l’environnement avec :

  ```bash
  pnpm run docker:restart
  ```

  > Cette commande :
  >
  > - arrête les conteneurs
  > - reconstruit les images
  > - relance tout en arrière-plan.

  On a ajouté cette commande pour simplifier la relance des conteneurs sans avoir à se souvenir des commandes Docker manuelles. Elle est utile dès qu’on ajoute/modifie un template. 

- Accède ensuite à l’application (en général sur http://localhost:3000) pour vérifier que :
  - Le template apparaît et s’affiche correctement.
  - L’export PDF fonctionne.
  - Aucun message d’erreur ne s’affiche dans les logs ou la console du navigateur.

### ✅ Vérifier le code et le style

- Nom du composant commençant par une majuscule.
- Nom du template normalisé avec `normalizeTemplateName` (voir `libs/utils/src/normalized.ts`) .
- Fichiers de prévisualisation (jpg, pdf, json) en minuscules, sans espaces ni accents.
- Exporte bien ton composant et ajoute-le dans le `switch` du routeur des templates.

### 📦 Commit et push

```bash
git add .
git commit -m "feat: ajouter le template SpiderMan pour AcadéNice"
git push origin feat/nom-de-mon-template
```

### 🔄 Ouvrir une pull request

- Explique ce que tu as fait.
- Ajoute une capture d’écran ou un PDF du rendu.
- Précise s’il s’agit d’un nouveau template, d’une amélioration ou d’un correctif.

> 🧠 Astuce bonus : si tu modifies du texte ou ajoutes de nouvelles chaînes, pense à mettre à jour les traductions :
>
> ```bash
> pnpm run lingui:update
> ```

---

### ✏️ Modifier le contact AcadéNice affiché sur le CV

Le composant de contact se trouve dans :  
`apps/artboard/src/components/acadenice/contact.tsx`

Pour personnaliser le nom, l’email ou le téléphone affichés sur les templates, modifie les constantes suivantes :

```tsx
const contactName = "John Doe";
const contactEmail = "johndoe@email.fr";
const contactPhone = "06 05 04 03 02";
const contactPhoneInternational = toInternationalFormat(contactPhone, "FR");
```

Ces informations sont utilisées à la fois pour l’affichage visuel sur le CV et pour l’accessibilité (ATS, export PDF).

#### 📦 Comment fonctionne `toInternationalFormat`

La fonction `toInternationalFormat` permet de convertir automatiquement un numéro de téléphone écrit au format national (ex. « 06 05 04 03 02 ») en un format international normalisé (ex. `+33605040302`).

Elle prend deux arguments :

- `phone` : le numéro au format national
- `country` : le code pays ISO 3166-1 alpha-2 (par ex. `"FR"` pour la France)

Exemple :

```tsx
const phone = "06 05 04 03 02";
const phoneInternational = toInternationalFormat(phone, "FR");
// Résultat : "+33605040302"
```

Ce format est pratique pour générer des liens cliquables (`href="tel:+33605040302"`) compatibles sur mobile et pour l’export PDF ATS-friendly.

### Automatisation du build et gestion des traductions

Pour faciliter le développement, utilise les commandes suivantes avec pnpm run <commande> afin d'automatiser le build et la gestion des traductions :

- **Redémarrer Docker**  
  Cette commande arrête les containers, reconstruit les images, puis relance les containers en arrière-plan :
  ```json
  "docker:restart": "docker compose down && docker compose build && docker compose up -d"
  ```
- **Extraire les chaînes à traduire**  
  Cette commande extrait automatiquement les chaînes de texte à traduire dans le code source :
  ```json
  "lingui:extract": "lingui extract"
  ```
- **Compiler les traductions**
  Compile les fichiers de traduction après modification :
  ```json
  "lingui:compile": "lingui compile"
  ```
- **Mettre à jour toutes les traductions**
  Effectue l'extraction et la compilation en une seule commande :
  ```json
  "lingui:update": "lingui extract && lingui compile"
  ```

Elles sont normalement déjà dans `package.json`, donc si ça ne marche pas, regarde si quelqu'un ne les as pas effacées par mégarde ~~et non par méchanceté~~.

---

## 📁 Explications de certains fichiers

Ce projet est organisé sous forme de monorepo avec plusieurs applications et librairies partagées. Les templates se trouvent principalement dans `apps/artboard`, tandis que l’interface utilisateur est dans `apps/client` et le backend dans `apps/server`.

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

Dans `apps/artboard/src/templates/acadenice/example.tsx` et `example2.tsx`.

### À quoi servent les fonctions de normalisation ?

Elles uniformisent les noms de fichiers et de templates pour éviter les erreurs de correspondance.

### Puis-je utiliser des noms personnalisés pour mes templates ?

Oui, mais respecte la normalisation et ajoute le nom dans la liste des templates autorisés si nécessaire.
