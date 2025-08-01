import { t } from "@lingui/macro";
import { Plus, PlusCircle } from "@phosphor-icons/react";
import type {
  Award,
  Certification,
  CustomSection,
  Education,
  Experience,
  HardSkill,
  Interest,
  Language,
  Project,
  Publication,
  Reference,
  Social,
  SoftSkill,
  Volunteer,
} from "@reactive-resume/schema";
import { ScrollArea } from "@reactive-resume/ui";
import { Button, Separator } from "@reactive-resume/ui";
import { Fragment, useRef } from "react";

import { useResumeStore } from "@/client/stores/resume";

import { SectionBase } from "./shared/section-base";
import { SectionIcon as ResumeSectionIcon } from "./shared/section-icon";
import { SummarySection } from "./summary";

export const ResumeSectionsOption = () => {
  const containterRef = useRef<HTMLDivElement | null>(null);

  const addSection = useResumeStore((state) => state.addSection);
  const customSections = useResumeStore((state) => state.resume.data.sections.custom);

  const scrollIntoView = (selector: string) => {
    const section = containterRef.current?.querySelector(selector);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="hidden basis-12 flex-col items-center justify-between bg-primary-accent/25 py-4 sm:flex">
        <div />

        <div
          className="flex flex-col items-center justify-center gap-y-2"
          aria-label={t`Navigation des sections`}
        >
          <ResumeSectionIcon
            id="summary"
            name={t`Résumé`}
            aria-label={t`Aller à la section Résumé`}
            onClick={() => {
              scrollIntoView("#summary");
            }}
          />
          <ResumeSectionIcon
            id="socials"
            name={t`Réseaux Sociaux`}
            aria-label={t`Aller à la section Réseaux Sociaux`}
            onClick={() => {
              scrollIntoView("#socials");
            }}
          />
          <ResumeSectionIcon
            id="experience"
            name={t`Expériences`}
            aria-label={t`Aller à la section Expériences`}
            onClick={() => {
              scrollIntoView("#experience");
            }}
          />
          <ResumeSectionIcon
            id="education"
            name={t`Formations`}
            aria-label={t`Aller à la section Formations`}
            onClick={() => {
              scrollIntoView("#education");
            }}
          />
          <ResumeSectionIcon
            id="hardSkills"
            name={t`Savoirs-Faire`}
            aria-label={t`Aller à la section Savoirs-Faire`}
            onClick={() => {
              scrollIntoView("#hardSkills");
            }}
          />
          <ResumeSectionIcon
            id="softSkills"
            name={t`Savoirs-Être`}
            aria-label={t`Aller à la section Savoirs-Être`}
            onClick={() => {
              scrollIntoView("#softSkills");
            }}
          />
          <ResumeSectionIcon
            id="languages"
            name={t`Langues`}
            aria-label={t`Aller à la section Langues`}
            onClick={() => {
              scrollIntoView("#languages");
            }}
          />
          <ResumeSectionIcon
            id="awards"
            name={t`Récompenses`}
            aria-label={t`Aller à la section Récompenses`}
            onClick={() => {
              scrollIntoView("#awards");
            }}
          />
          <ResumeSectionIcon
            id="certifications"
            name={t`Certifications`}
            aria-label={t`Aller à la section Certifications`}
            onClick={() => {
              scrollIntoView("#certifications");
            }}
          />
          <ResumeSectionIcon
            id="interests"
            name={t`Centres d'intérêt`}
            aria-label={t`Aller à la section Centres d'intérêt`}
            onClick={() => {
              scrollIntoView("#interests");
            }}
          />
          <ResumeSectionIcon
            id="projects"
            name={t`Projets`}
            aria-label={t`Aller à la section Projets`}
            onClick={() => {
              scrollIntoView("#projects");
            }}
          />
          <ResumeSectionIcon
            id="publications"
            name={t`Publications`}
            aria-label={t`Aller à la section Publications`}
            onClick={() => {
              scrollIntoView("#publications");
            }}
          />
          <ResumeSectionIcon
            id="volunteer"
            name={t`Bénévolat`}
            aria-label={t`Aller à la section Bénévolat`}
            onClick={() => {
              scrollIntoView("#volunteer");
            }}
          />
          <ResumeSectionIcon
            id="references"
            name={t`Références`}
            aria-label={t`Aller à la section Références`}
            onClick={() => {
              scrollIntoView("#references");
            }}
          />

          <ResumeSectionIcon
            id="custom"
            variant="outline"
            name={t`Ajouter une nouvelle section`}
            icon={<Plus size={14} />}
            aria-label={t`Ajouter une nouvelle section personnalisée`}
            onClick={() => {
              addSection();
              // eslint-disable-next-line lingui/no-unlocalized-strings
              scrollIntoView("& > section:last-of-type");
            }}
          />
        </div>

        <div />
      </div>

      <ScrollArea orientation="vertical" className="h-full flex-1 px-6 py-2">
        <div ref={containterRef} className="grid gap-x-5 gap-y-10 @container/left">
          <SummarySection />
          <Separator />
          <SectionBase<Social>
            id="socials"
            title={(item) => item.network}
            description={(item) => item.username}
          />
          <Separator />
          <SectionBase<Experience>
            id="experience"
            title={(item) => item.company}
            description={(item) => item.position}
          />
          <Separator />
          <SectionBase<Education>
            id="education"
            title={(item) => item.institution}
            description={(item) => item.area}
          />
          <Separator />
          <SectionBase<HardSkill>
            id="hardSkills"
            title={(item) => item.name}
            description={(item) =>
              item.description ||
              (item.keywords.length > 0 ? `${item.keywords.length} mots-clés` : undefined)
            }
          />
          <Separator />
          <SectionBase<SoftSkill> id="softSkills" title={(item) => item.name} />
          <Separator />
          <SectionBase<Language>
            id="languages"
            title={(item) => item.name}
            description={(item) => item.description}
          />
          <Separator />
          <SectionBase<Award>
            id="awards"
            title={(item) => item.title}
            description={(item) => item.awarder}
          />
          <Separator />
          <SectionBase<Certification>
            id="certifications"
            title={(item) => item.name}
            description={(item) => item.issuer}
          />
          <Separator />
          <SectionBase<Interest>
            id="interests"
            title={(item) => item.name}
            description={(item) =>
              item.keywords.length > 0 ? `${item.keywords.length} mots-clés` : undefined
            }
          />
          <Separator />
          <SectionBase<Project>
            id="projects"
            title={(item) => item.name}
            description={(item) => item.description}
          />
          <Separator />
          <SectionBase<Publication>
            id="publications"
            title={(item) => item.name}
            description={(item) => item.publisher}
          />
          <Separator />
          <SectionBase<Volunteer>
            id="volunteer"
            title={(item) => item.organization}
            description={(item) => item.position}
          />
          <Separator />
          <SectionBase<Reference>
            id="references"
            title={(item) => item.name}
            description={(item) => item.description}
          />

          {/* Sections personnalisées */}
          {Object.values(customSections).map((section) => (
            <Fragment key={section.id}>
              <Separator />
              <SectionBase<CustomSection>
                id={`custom.${section.id}`}
                title={(item) => item.name}
                description={(item) => item.description}
              />
            </Fragment>
          ))}

          <Separator />

          <Button
            size="lg"
            variant="outline"
            className="bg-background text-foreground hover:bg-primary hover:text-white"
            aria-label={t`Ajouter une nouvelle section`}
            onClick={addSection}
          >
            <PlusCircle />
            <span className="ml-2">{t`Ajouter une nouvelle section`}</span>
          </Button>
        </div>
      </ScrollArea>
    </>
  );
};
