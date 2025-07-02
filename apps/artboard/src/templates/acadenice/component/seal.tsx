import styled from "styled-components";

type SealProps = {
  maxHeight?: number; // en rem
};

const SealContainer = styled.div<SealProps>`
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 0.75rem; /* équivalent à space-x-3 */
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

  order: 999;
`;

const ContactDiv = styled.div`
  grid-column: span 2;
  margin-top: auto;
  margin-bottom: auto;
  height: fit-content;
  text-align: center;

  p {
    line-height: 1.3;
    margin: 0;

    &:first-child {
      font-weight: bold;
    }

    a {
      text-decoration: none !important;
      color: inherit;
    }
  }
`;

const Contact = () => (
  <ContactDiv>
    <p>Contact École</p>
    <p>
      <a href="mailto:sara@acadenice.fr">sara@acadenice.fr</a>
    </p>
    <p>
      <a href="tel:+33662172798">06 62 17 27 98</a>
    </p>
    <p>Sara Djalaoui</p>
  </ContactDiv>
);

export const ContactATS = () => (
  <section className="sr-only" role="contentinfo" aria-labelledby="ref-acad-label">
    <h2 id="ref-acad-label">Référent AcadéNice</h2>
    <address>
      <p>Sara Djalaoui</p>
      <p>
        Email : <a href="mailto:sara@acadenice.fr">sara@acadenice.fr</a>
      </p>
      <p>
        Téléphone : <a href="tel:+33662172798">06 62 17 27 98</a>
      </p>
    </address>
  </section>
);

type SealBaseProps = {
  src: string;
  colorClass: string; // tailwind className pour la couleur du texte
  id?: string;
} & SealProps;

const Seal = ({ src, colorClass, maxHeight, id }: SealBaseProps) => {
  return (
    <SealContainer id={id} maxHeight={maxHeight} className={colorClass}>
      <img src={src} alt="" aria-hidden="true" role="presentation" />
      <Contact />
    </SealContainer>
  );
};

export const SealWhite = (props: SealProps & { id?: string }) => (
  <Seal src="logo/light.png" colorClass="text-white" {...props} />
);

export const SealTeal = (props: SealProps & { id?: string }) => (
  <Seal src="logo/teal.png" colorClass="text-primary" {...props} />
);
