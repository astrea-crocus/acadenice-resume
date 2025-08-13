/**
 * Normalise une chaîne pour en faire un nom de fichier « propre ».
 * Transforme en minuscules, enlève les accents et supprime les espaces, underscores et tirets.
 *
 * @param name Chaîne d'entrée à normaliser (ex. "Fichier Démo-Test")
 * @returns Chaîne normalisée sans accents ni séparateurs (ex. "fichierdemotest")
 */
export const normalizeToFileName = (name: string) => {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036F]/g, "")
    .replace(/[\s_-]/g, "");
};

/**
 * Normalise une chaîne pour en faire un segment d'URL « propre ».
 * Transforme en minuscules, enlève les accents et remplace les espaces par un tiret.
 *
 * @param str Chaîne d'entrée à normaliser (ex. "Mon Exemple Démo")
 * @returns Chaîne normalisée pour URL (ex. "mon-exemple-demo")
 */
export const normalizeToUrlPath = (str: string) => {
  return str
    .toLowerCase()
    .normalize("NFD") // sépare lettres et accents
    .replace(/[\u0300-\u036F]/g, "") // supprime les accents
    .replace(/\s+/g, "-") // remplace les espaces par des tirets
    .replace(/-+/g, "-") // évite les tirets multiples
    .replace(/^-|-$/g, ""); // supprime tirets en début/fin
};

/**
 * Normalise une chaîne pour supprimer uniquement les accents,
 * tout en gardant la casse, les espaces et autres caractères spéciaux.
 *
 * @param name Chaîne d'entrée à normaliser (ex. "Template Démo")
 * @returns Chaîne normalisée sans accents mais lisible (ex. "Template Demo")
 */
export const normalizeTemplateName = (name: string) => {
  return name.normalize("NFD").replace(/[\u0300-\u036F]/g, "");
};
