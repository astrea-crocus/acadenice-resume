import styled from "styled-components";

/**
 * Group
 *
 * Conteneur stylisé utilisant CSS Grid.
 * Il remplit toute la hauteur disponible (`height: 100%`),
 * organise ses enfants en grille avec :
 * - `align-content: space-between` : espace maximal entre les éléments sur l'axe vertical,
 * - `align-items: end` : aligne chaque élément au bas de sa cellule,
 * - `justify-items: center` : centre horizontalement chaque élément dans sa cellule.
 *
 * Usage typique : permettre d’avoir deux blocs (ex. sections + cachet) répartis verticalement,
 * l’un en haut (par espace), l’autre fixé en bas (grâce à `align-items: end`).
 */

export const Group = styled.div`
  height: 100%;
  display: grid;
  align-content: space-between;
  align-items: end;
  justify-items: center;
`;
