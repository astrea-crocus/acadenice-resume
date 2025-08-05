import { toInternationalFormat } from "@reactive-resume/utils";
import styled from "styled-components";

// Informations de contact centralisées pour l'école ou le référent.
// Modifie ces constantes pour personnaliser le contact affiché sur le CV.
const contactName = "Sara Djalaoui";
const contactEmail = "sara@acadenice.fr";
const contactPhone = "06 62 17 27 98";
const contactPhoneInternational = toInternationalFormat(contactPhone, "FR");

// Composant styled pour organiser le bloc contact dans la grille du CV.
// Personnalise ici l'apparence du bloc contact (centrage, marges, style du texte).
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

// Composants utilitaires pour générer les liens mail et téléphone.
// Permettent d'afficher les liens cliquables dans le bloc contact.
const LinkEmail = () => <a href={`mailto:${contactEmail}`}>{contactEmail}</a>;
const LinkTel = () => <a href={`tel:${contactPhoneInternational}`}>{contactPhone}</a>;

// Composant principal affiché sur le CV.
// Affiche le contact de l'école avec email, téléphone et nom.
// Personnalise le contenu ou le style en modifiant ContactDiv ou les constantes.
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

// Composant invisible pour l'accessibilité et le parsing ATS (robots, lecteurs d'écran).
// Permet d'intégrer les infos de contact dans le HTML sans les afficher visuellement.
// Utile pour les exports PDF ou la lecture automatique des données du CV.
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
