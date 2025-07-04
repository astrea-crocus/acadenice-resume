import styled from "styled-components";

// Informations de contact centralisées
const contactName = "Sara Djalaoui";
const contactEmail = "sara@acadenice.fr";
const contactPhone = "06 62 17 27 98";
const contactPhoneInternational = "+33662172798";

// Styled component pour le conteneur du bloc contact
const ContactDiv = styled.div`
  grid-column: span 2;
  margin-top: auto;
  margin-bottom: auto;
  height: fit-content;
  text-align: center;

  p {
    line-height: 1.3 !important;
    font-size: 15px !important;
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

// Composants utilitaires pour générer les liens mail et téléphone
const LinkEmail = () => <a href={`mailto:${contactEmail}`}>{contactEmail}</a>;
const LinkTel = () => <a href={`tel:${contactPhoneInternational}`}>{contactPhone}</a>;

// Composant principal visible
export const Contact = () => (
  <ContactDiv>
    <p>Contact École</p>
    <p>
      <LinkEmail />
    </p>
    <p>
      <LinkTel />
    </p>
    <p>{contactName}</p>
  </ContactDiv>
);

// Composant pour l'accessibilité et le parsing ATS (invisible à l'affichage)
export const ContactATS = () => (
  <section className="sr-only" role="contentinfo" aria-labelledby="ref-acad-label">
    <h2 id="ref-acad-label">Référent AcadéNice</h2>
    <address>
      <p>{contactName}</p>
      <p>
        Email : <LinkEmail />
      </p>
      <p>
        Téléphone : <LinkTel />
      </p>
    </address>
  </section>
);
