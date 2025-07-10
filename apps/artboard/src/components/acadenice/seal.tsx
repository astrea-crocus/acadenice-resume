import styled from "styled-components";

import { Contact } from "./contact"; // Import du composant de contact et réexport plus bas

// Type pour les props optionnelles du conteneur du seal (maxHeight en rem)
type SealProps = {
  maxHeight?: number; // en rem
};

// Styled component pour le conteneur du seal (logo + contact)
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
    max-height: ${({ maxHeight }) => (maxHeight ? `${maxHeight}rem` : "7rem")};
    height: auto;
    user-select: none;
    pointer-events: none;
  }

  order: 999; // permet de forcer l'ordre d'affichage si besoin dans un parent flex ou grid
`;

// Type des props complètes attendues par le composant Seal de base
type SealBaseProps = {
  src: string; // chemin du logo
  colorClass: string; // classe Tailwind pour la couleur du texte
  id?: string; // identifiant optionnel
} & SealProps;

// Composant de base qui affiche un logo et le contact
const Seal = ({ src, colorClass, maxHeight, id }: SealBaseProps) => (
  <SealContainer id={id} maxHeight={maxHeight} className={colorClass}>
    <img src={src} alt="" aria-hidden="true" role="presentation" />
    <Contact />
  </SealContainer>
);

// Variantes prêtes à l'emploi avec logo blanc ou teal
export const SealWhite = (props: SealProps & { id?: string }) => (
  <Seal src="logo/light.png" colorClass="text-white" {...props} />
);

export const SealTeal = (props: SealProps & { id?: string }) => (
  <Seal src="logo/teal.png" colorClass="text-primary" {...props} />
);

// Réexport de ContactATS pour le rendre accessible depuis ce module
export { ContactATS } from "./contact";
