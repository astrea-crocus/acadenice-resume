/* eslint-disable lingui/no-unlocalized-strings */
/* eslint-disable lingui/text-restrictions */
import { t } from "@lingui/macro";
import { defaultSections } from "@reactive-resume/schema";
import { RichInput } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";

import { AiActions } from "@/client/components/ai-actions";
import { useResumeStore } from "@/client/stores/resume";

import { SectionIcon } from "./shared/section-icon";
import { SectionOptions } from "./shared/section-options";

export const SummarySection = () => {
  const setValue = useResumeStore((state) => state.setValue);
  const section = useResumeStore(
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    (state) => state.resume.data.sections.summary ?? defaultSections.summary,
  );

  return (
    <section
      id="summary"
      className="grid gap-y-6"
      aria-labelledby="summary-title"
      aria-label={t`Section "Phrase d'Accroche" du CV`}
    >
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <SectionIcon
            id="summary"
            size={18}
            aria-label={t`Icône de la section "Phrase d'Accroche"`}
          />
          <h2 id="summary-title" className="line-clamp-1 text-2xl font-bold lg:text-3xl">
            {section.name}
          </h2>
        </div>

        <div className="flex items-center gap-x-2">
          <SectionOptions
            id="summary"
            aria-label={t`Options pour la section "Phrase d'Accroche"`}
          />
        </div>
      </header>

      <main
        className={cn(!section.visible && "opacity-50")}
        role="group"
        aria-label={t`Contenu éditable de la phrase d'accroche`}
      >
        <p className="mb-2 select-none text-sm leading-relaxed text-foreground">
          Résumez <strong>en quelques mots</strong> votre objectif professionnel ou ce que vous
          recherchez. Cette phrase doit être concise, précise et donner immédiatement une idée
          claire de votre projet ou de votre motivation.
          <br />
          <u>Exemple :</u>
          <br />
          <span className="select-none italic text-secondary-foreground">
            Étudiant en développement web à la recherche d'une alternance de 12 mois (4 jours en
            entreprise, 1 jour en cours) dès septembre.
          </span>
        </p>

        <RichInput
          content={section.content}
          aria-label={t`Éditeur de texte pour la phrase d'accroche`}
          footer={(editor) => (
            <AiActions
              value={editor.getText()}
              aria-label={t`Actions d'aide par intelligence artificielle pour la phrase d'accroche`}
              onChange={(value) => {
                editor.commands.setContent(value, true);
                setValue("sections.summary.content", value);
              }}
            />
          )}
          onChange={(value) => {
            setValue("sections.summary.content", value);
          }}
        />
      </main>
    </section>
  );
};
