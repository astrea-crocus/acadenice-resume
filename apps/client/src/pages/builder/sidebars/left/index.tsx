import { t } from "@lingui/macro";
import { Plus, PlusCircle } from "@phosphor-icons/react";
import type {
  Award,
  Certification,
  CustomSection,
  Education,
  Experience,
  Interest,
  Language,
  Profile,
  Project,
  Publication,
  Reference,
  Skill,
  Volunteer,
} from "@reactive-resume/schema";
import { Button, ScrollArea, Separator } from "@reactive-resume/ui";
import { Fragment, useRef } from "react";
import { Link } from "react-router";

import { Icon } from "@/client/components/icon";
import { UserAvatar } from "@/client/components/user-avatar";
import { UserOptions } from "@/client/components/user-options";
import { useResumeStore } from "@/client/stores/resume";

import { BasicsSection } from "./sections/basics";
import { SectionBase } from "./sections/shared/section-base";
import { SectionIcon } from "./sections/shared/section-icon";
import { SummarySection } from "./sections/summary";

export const LeftSidebar = () => {
  const containterRef = useRef<HTMLDivElement | null>(null);

  const addSection = useResumeStore((state) => state.addSection);
  const customSections = useResumeStore((state) => state.resume.data.sections.custom);

  const scrollIntoView = (selector: string) => {
    const section = containterRef.current?.querySelector(selector);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="flex bg-secondary-accent/30"
      role="complementary"
      aria-label={t`Barre latérale de l'éditeur de CV`}
    >
      <div className="hidden basis-12 flex-col items-center justify-between bg-primary-accent/25 py-4 sm:flex">
        <Button
          asChild
          size="icon"
          variant="ghost"
          className="size-8 rounded-full"
          aria-label={t`Aller au tableau de bord`}
        >
          <Link to="/dashboard">
            <Icon size={14} />
          </Link>
        </Button>

        <div
          className="flex flex-col items-center justify-center gap-y-2"
          aria-label={t`Navigation des sections`}
        >
          <SectionIcon
            id="basics"
            name={t`Informations de base`}
            aria-label={t`Aller à la section Informations de base`}
            onClick={() => {
              scrollIntoView("#basics");
            }}
          />
          <SectionIcon
            id="summary"
            name={t`Résumé`}
            aria-label={t`Aller à la section Résumé`}
            onClick={() => {
              scrollIntoView("#summary");
            }}
          />
          <SectionIcon
            id="profiles"
            name={t`Profils`}
            aria-label={t`Aller à la section Profils`}
            onClick={() => {
              scrollIntoView("#profiles");
            }}
          />
          <SectionIcon
            id="experience"
            name={t`Expériences`}
            aria-label={t`Aller à la section Expériences`}
            onClick={() => {
              scrollIntoView("#experience");
            }}
          />
          <SectionIcon
            id="education"
            name={t`Formations`}
            aria-label={t`Aller à la section Formations`}
            onClick={() => {
              scrollIntoView("#education");
            }}
          />
          <SectionIcon
            id="skills"
            name={t`Compétences`}
            aria-label={t`Aller à la section Compétences`}
            onClick={() => {
              scrollIntoView("#skills");
            }}
          />
          <SectionIcon
            id="languages"
            name={t`Langues`}
            aria-label={t`Aller à la section Langues`}
            onClick={() => {
              scrollIntoView("#languages");
            }}
          />
          <SectionIcon
            id="awards"
            name={t`Récompenses`}
            aria-label={t`Aller à la section Récompenses`}
            onClick={() => {
              scrollIntoView("#awards");
            }}
          />
          <SectionIcon
            id="certifications"
            name={t`Certifications`}
            aria-label={t`Aller à la section Certifications`}
            onClick={() => {
              scrollIntoView("#certifications");
            }}
          />
          <SectionIcon
            id="interests"
            name={t`Centres d'intérêt`}
            aria-label={t`Aller à la section Centres d'intérêt`}
            onClick={() => {
              scrollIntoView("#interests");
            }}
          />
          <SectionIcon
            id="projects"
            name={t`Projets`}
            aria-label={t`Aller à la section Projets`}
            onClick={() => {
              scrollIntoView("#projects");
            }}
          />
          <SectionIcon
            id="publications"
            name={t`Publications`}
            aria-label={t`Aller à la section Publications`}
            onClick={() => {
              scrollIntoView("#publications");
            }}
          />
          <SectionIcon
            id="volunteer"
            name={t`Bénévolat`}
            aria-label={t`Aller à la section Bénévolat`}
            onClick={() => {
              scrollIntoView("#volunteer");
            }}
          />
          <SectionIcon
            id="references"
            name={t`Références`}
            aria-label={t`Aller à la section Références`}
            onClick={() => {
              scrollIntoView("#references");
            }}
          />

          <SectionIcon
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

        <UserOptions>
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full"
            aria-label={t`Options utilisateur`}
          >
            <UserAvatar size={28} />
          </Button>
        </UserOptions>
      </div>

      <ScrollArea orientation="vertical" className="h-screen flex-1 pb-16 lg:pb-0">
        <div ref={containterRef} className="grid gap-y-10 p-6 @container/left">
          <BasicsSection />
          <Separator />
          <SummarySection />
          <Separator />
          <SectionBase<Profile>
            id="profiles"
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
          <SectionBase<Skill>
            id="skills"
            title={(item) => item.name}
            description={(item) =>
              item.description ||
              (item.keywords.length > 0 ? `${item.keywords.length} mots-clés` : undefined)
            }
          />
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
            aria-label={t`Ajouter une nouvelle section`}
            onClick={addSection}
          >
            <PlusCircle />
            <span className="ml-2">{t`Ajouter une nouvelle section`}</span>
          </Button>
        </div>
      </ScrollArea>
    </div>
  );
};
