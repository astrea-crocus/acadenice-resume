import styled from "styled-components";

import { Contact } from "./contact"; // Composant affichant les infos de contact du candidat

// Props optionnelles pour le conteneur du seal (logo + contact)
// Permet de définir la hauteur maximale du logo en rem
type SealProps = {
  maxheight?: number; // Hauteur max du logo en rem
};

// Composant styled pour organiser le logo et le contact dans une grille
const SealContainer = styled.div<SealProps>`
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 0.75rem;
  padding: 1rem;
  margin-left: auto;
  margin-right: auto;
  width: fit-content;
  align-items: center;

  img {
    max-height: ${({ maxheight }) => (maxheight ? `${maxheight}rem` : "7rem")};
    height: auto;
    user-select: none;
    pointer-events: none;
  }

  order: 999; // Permet de forcer l'ordre d'affichage dans un parent flex/grid
`;

// Props complètes attendues par le composant Seal de base
// - src : chemin du logo à afficher
// - colorClass : classe Tailwind pour la couleur du texte
// - id : identifiant HTML optionnel
type SealBaseProps = {
  src: string;
  colorClass: string;
  id?: string;
} & SealProps;

// Composant de base : affiche le logo et le contact dans le conteneur stylé
// Personnalise le logo via src et la couleur via colorClass
const Seal = ({ src, colorClass, maxheight, id }: SealBaseProps) => (
  <SealContainer id={id} maxheight={maxheight} className={colorClass}>
    <img src={src} alt="" aria-hidden="true" role="presentation" />
    <Contact />
  </SealContainer>
);

// Variantes prêtes à l'emploi du seal :
// - SealWhite : logo blanc, texte blanc
// - SealTeal : logo teal, texte couleur primaire
export const SealWhite = (props: SealProps & { id?: string }) => (
  <Seal src={`/logo/light.png`} colorClass="text-white" {...props} />
);

export const SealTeal = (props: SealProps & { id?: string }) => (
  <Seal src={`/logo/teal.png`} colorClass="text-primary" {...props} />
);

// Réexport du composant ContactATS pour utilisation externe

export { ContactATS } from "./contact";
