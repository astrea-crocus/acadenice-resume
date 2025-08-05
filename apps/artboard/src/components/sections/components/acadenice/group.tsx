import styled from "styled-components";

/**
 * Group
 *
 * Composant conteneur basé sur CSS Grid pour organiser verticalement des éléments dans une colonne.
 * - Remplit toute la hauteur disponible (`height: 100%`).
 * - Sépare les éléments avec un maximum d'espace entre eux (`align-content: space-between`).
 * - Aligne chaque élément en bas de sa cellule (`align-items: end`).
 * - Centre horizontalement chaque élément (`justify-items: center`).
 *
 * Utilisation recommandée :
 * - Pour placer un bloc en haut (ex : sections principales) et un bloc en bas (ex : cachet ou signature) dans une sidebar ou une colonne.
 * - Permet d'obtenir une disposition élégante et équilibrée, même si le contenu varie en hauteur.
 */

export const Group = styled.div`
  height: 100%;
  display: grid;
  align-content: space-between;
  align-items: end;
  justify-items: center;
`;
