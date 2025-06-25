/* eslint-disable lingui/text-restrictions */
import { t } from "@lingui/macro";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";

import { useLanguages } from "@/client/services/resume/translation";

const Question1 = () => (
  <AccordionItem value="1">
    <AccordionTrigger className="text-left leading-relaxed">
      {t`Comment créer mon CV avec ce site ?`}
    </AccordionTrigger>
    <AccordionContent className="prose max-w-none dark:prose-invert">
      <p>
        {t`Une fois connecté(e), vous pouvez cliquer sur le bouton "Créer un nouveau CV" depuis votre tableau de bord. Vous choisirez un modèle, ajouterez vos informations personnelles, expériences, formations, compétences, etc. Toutes les sections sont modifiables à tout moment.`}
      </p>
      <p>
        {t`Le site sauvegarde automatiquement votre travail. Une fois votre CV prêt, vous pouvez le télécharger en PDF ou le partager via un lien.`}
      </p>
    </AccordionContent>
  </AccordionItem>
);

const Question2 = () => (
  <AccordionItem value="2">
    <AccordionTrigger className="text-left leading-relaxed">
      {t`Puis-je personnaliser le design de mon CV ?`}
    </AccordionTrigger>
    <AccordionContent className="prose max-w-none dark:prose-invert">
      <p>
        {t`Oui ! Vous pouvez changer les couleurs, la typographie, l’agencement des sections et même le modèle utilisé. Il existe plusieurs modèles que vous pouvez tester à tout moment.`}
      </p>
      <p>{t`Les modifications sont visibles en temps réel grâce à l’aperçu interactif du CV.`}</p>
    </AccordionContent>
  </AccordionItem>
);

const Question3 = () => {
  const { languages } = useLanguages();

  return (
    <AccordionItem value="3">
      <AccordionTrigger className="text-left leading-relaxed">
        {t`Puis-je traduire mon CV dans une autre langue ?`}
      </AccordionTrigger>
      <AccordionContent className="prose max-w-none dark:prose-invert">
        <p>
          {t`Oui. Ce site prend en charge plusieurs langues. Vous pouvez créer différentes versions de votre CV dans la langue de votre choix.`}
        </p>

        <p>{t`Langues actuellement disponibles :`}</p>

        <div className="flex flex-wrap items-start justify-start gap-x-2 gap-y-4">
          {languages.map((language) => (
            <a
              key={language.id}
              className="no-underline"
              href={`https://crowdin.com/translate/reactive-resume/all/en-${language.editorCode}`}
              target="_blank"
              rel="noreferrer"
            >
              <div className="relative bg-secondary-accent font-medium transition-colors hover:bg-primary hover:text-background">
                <span className="px-2 py-1">{language.name}</span>

                {language.progress !== undefined && (
                  <span
                    className={cn(
                      "inset-0 bg-warning px-1.5 py-1 text-xs text-white",
                      language.progress < 40 && "bg-error",
                      language.progress > 80 && "bg-success",
                    )}
                  >
                    {language.progress}%
                  </span>
                )}
              </div>
            </a>
          ))}
        </div>

        <p>
          {t`Si une langue manque ou si vous souhaitez contribuer à une traduction, vous pouvez le faire sur notre espace de traduction.`}
        </p>
      </AccordionContent>
    </AccordionItem>
  );
};

const Question4 = () => (
  <AccordionItem value="4">
    <AccordionTrigger className="text-left leading-relaxed">
      {t`Est-ce que mes données sont stockées en sécurité ?`}
    </AccordionTrigger>
    <AccordionContent className="prose max-w-none dark:prose-invert">
      <p>
        {t`Oui. Vos données sont stockées en toute sécurité et ne sont jamais partagées sans votre consentement. Vous pouvez exporter ou supprimer vos données à tout moment depuis les paramètres de votre compte.`}
      </p>
      <p>
        {t`Aucune publicité ni traçage n’est intégré à l’application. Votre vie privée est respectée.`}
      </p>
    </AccordionContent>
  </AccordionItem>
);

const Question5 = () => (
  <AccordionItem value="5">
    <AccordionTrigger className="text-left leading-relaxed">
      {t`Qu'est-ce qu'AcadéNice ?`}
    </AccordionTrigger>
    <AccordionContent className="prose max-w-none dark:prose-invert">
      <p>
        {t`AcadéNice est un centre de formation basé à Nice, spécialisé dans les parcours de remise à niveau, de reconversion et de montée en compétences, en particulier dans les domaines du numérique.`}
      </p>
      <p>
        {t`Ce site a été adapté pour accompagner les apprenants d’AcadéNice dans la création d’un CV professionnel, en phase avec les standards actuels du recrutement.`}
      </p>
      <p>
        {t`Pour en savoir plus sur AcadéNice, visitez`}{" "}
        <a
          href="https://acadenice.fr/a-propos-de-nous-acadenice-centre-de-formation-nice/"
          target="_blank"
          rel="noreferrer"
        >
          {t`leur site web`}
        </a>
        .
      </p>
    </AccordionContent>
  </AccordionItem>
);

export const FAQSection = () => (
  <section id="faq" className="container relative py-24 sm:py-32">
    <div className="grid gap-12 lg:grid-cols-3">
      <div className="space-y-6">
        <h2 className="text-4xl font-bold">{t`Foire aux questions`}</h2>
        <p className="text-base leading-loose">
          {t`Voici les réponses aux questions fréquentes sur l’utilisation de ce site.`}
        </p>
      </div>

      <div className="col-span-2">
        <Accordion collapsible type="single">
          <Question1 />
          <Question2 />
          <Question3 />
          <Question4 />
          <Question5 />
        </Accordion>
      </div>
    </div>
  </section>
);
