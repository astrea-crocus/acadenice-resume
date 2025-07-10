import type {
  Award,
  Certification,
  CustomSection,
  HardSkill,
  Interest,
  Language,
  Project,
  Publication,
  Reference,
  SectionKey,
  Social,
  SoftSkill,
} from "@reactive-resume/schema";
import { Education, Experience, Volunteer } from "@reactive-resume/schema";
import { cn, isEmptyString, isUrl, sanitize } from "@reactive-resume/utils";
import { Fragment } from "react";

import { CustomFieldItem, Headline, InfoItem, Name } from "@/artboard/components/acadenice";
import { Section, SectionContent, SectionTitle } from "@/artboard/components/acadenice";
import { Group } from "@/artboard/components/acadenice/group";
import { ContactATS, SealWhite } from "@/artboard/components/acadenice/seal";
import { Link, LinkedEntity } from "@/artboard/components/acadenice/shared";
import { BrandIcon } from "@/artboard/components/brand-icon";
import { Picture } from "@/artboard/components/picture";
import { calculateAge } from "@/artboard/libs/date";
import { useArtboardStore } from "@/artboard/store/artboard";
import type { TemplateProps } from "@/artboard/types/template";

const Header = () => {
  const basics = useArtboardStore((state) => state.resume.basics);
  const age = calculateAge(basics.birthday);

  return (
    <div className="flex items-center space-x-4">
      <Picture />

      <div className="space-y-2">
        <div>
          <Name>{basics.name}</Name>
          <Headline>{basics.headline}</Headline>
        </div>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm">
          {basics.location && (
            <InfoItem icon="map-pin">
              <div>{basics.location}</div>
            </InfoItem>
          )}
          {age && (
            <InfoItem icon="cake">
              <div>{age} ans</div>
            </InfoItem>
          )}
          {basics.phone && (
            <InfoItem icon="phone">
              <a href={`tel:${basics.phone}`} target="_blank" rel="noreferrer">
                {basics.phone}
              </a>
            </InfoItem>
          )}
          {basics.email && (
            <InfoItem icon="at">
              <a href={`mailto:${basics.email}`} target="_blank" rel="noreferrer">
                {basics.email}
              </a>
            </InfoItem>
          )}
          <Link url={basics.portfolio} />
          {basics.customFields.map((item) => (
            <CustomFieldItem key={item.id} icon={item.icon} name={item.name} value={item.value} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Summary = () => {
  const section = useArtboardStore((state) => state.resume.sections.summary);

  if (!section.visible || isEmptyString(section.content)) return null;

  return (
    <section id={section.id}>
      <SectionTitle>{section.name}</SectionTitle>

      <SectionContent columns={section.columns}>
        <div dangerouslySetInnerHTML={{ __html: sanitize(section.content) }} className="wysiwyg" />
      </SectionContent>
    </section>
  );
};

const Experience = () => {
  const section = useArtboardStore((state) => state.resume.sections.experience);

  return (
    <Section<Experience> section={section} urlKey="url" summaryKey="summary">
      {(item) => (
        <div className="flex items-start justify-between group-[.sidebar]:flex-col group-[.sidebar]:items-start">
          <div className="text-left">
            <LinkedEntity
              name={item.company}
              url={item.url}
              separateLinks={section.separateLinks}
              className="font-bold"
            />
            <div>{item.position}</div>
          </div>

          <div className="shrink-0 text-right">
            <div className="font-bold">{item.date}</div>
            <div>{item.location}</div>
          </div>
        </div>
      )}
    </Section>
  );
};

const Education = () => {
  const section = useArtboardStore((state) => state.resume.sections.education);

  return (
    <Section<Education> section={section} urlKey="url" summaryKey="summary">
      {(item) => (
        <div className="flex items-start justify-between group-[.sidebar]:flex-col group-[.sidebar]:items-start">
          <div className="text-left">
            <LinkedEntity
              name={item.institution}
              url={item.url}
              separateLinks={section.separateLinks}
              className="font-bold"
            />
            <div>{item.area}</div>
            <div>{item.score}</div>
          </div>

          <div className="shrink-0 text-right">
            <div className="font-bold">{item.date}</div>
            <div>{item.studyType}</div>
          </div>
        </div>
      )}
    </Section>
  );
};

const Socials = () => {
  const section = useArtboardStore((state) => state.resume.sections.socials);

  return (
    <Section<Social> section={section}>
      {(item) => (
        <div>
          {isUrl(item.url.href) ? (
            <Link url={item.url} label={item.username} icon={<BrandIcon slug={item.icon} />} />
          ) : (
            <p>{item.username}</p>
          )}
          {!item.icon && <p className="text-sm">{item.network}</p>}
        </div>
      )}
    </Section>
  );
};

const Awards = () => {
  const section = useArtboardStore((state) => state.resume.sections.awards);

  return (
    <Section<Award> section={section} urlKey="url" summaryKey="summary">
      {(item) => (
        <div className="flex items-start justify-between group-[.sidebar]:flex-col group-[.sidebar]:items-start">
          <div className="text-left">
            <div className="font-bold">{item.title}</div>
            <LinkedEntity
              name={item.awarder}
              url={item.url}
              separateLinks={section.separateLinks}
            />
          </div>

          <div className="shrink-0 text-right">
            <div className="font-bold">{item.date}</div>
          </div>
        </div>
      )}
    </Section>
  );
};

const Certifications = () => {
  const section = useArtboardStore((state) => state.resume.sections.certifications);

  return (
    <Section<Certification> section={section} urlKey="url" summaryKey="summary">
      {(item) => (
        <div className="flex items-start justify-between group-[.sidebar]:flex-col group-[.sidebar]:items-start">
          <div className="text-left">
            <div className="font-bold">{item.name}</div>
            <LinkedEntity name={item.issuer} url={item.url} separateLinks={section.separateLinks} />
            <div className="font-bold">{item.date}</div>
          </div>
        </div>
      )}
    </Section>
  );
};

const HardSkills = () => {
  const section = useArtboardStore((state) => state.resume.sections.hardSkills);

  return (
    <Section<HardSkill> section={section} levelKey="level" keywordsKey="keywords">
      {(item) => (
        <div>
          <div className="font-bold">{item.name}</div>
          <div>{item.description}</div>
        </div>
      )}
    </Section>
  );
};

const SoftSkills = () => {
  const section = useArtboardStore((state) => state.resume.sections.softSkills);

  return (
    <Section<SoftSkill> section={section}>
      {(item) => (
        <div>
          <div>{item.name}</div>
        </div>
      )}
    </Section>
  );
};

const Interests = () => {
  const section = useArtboardStore((state) => state.resume.sections.interests);

  return (
    <Section<Interest> section={section} keywordsKey="keywords" className="space-y-0.5">
      {(item) => <div className="font-bold">{item.name}</div>}
    </Section>
  );
};

const Publications = () => {
  const section = useArtboardStore((state) => state.resume.sections.publications);

  return (
    <Section<Publication> section={section} urlKey="url" summaryKey="summary">
      {(item) => (
        <div className="flex items-start justify-between group-[.sidebar]:flex-col group-[.sidebar]:items-start">
          <div className="text-left">
            <LinkedEntity
              name={item.name}
              url={item.url}
              separateLinks={section.separateLinks}
              className="font-bold"
            />
            <div>{item.publisher}</div>
          </div>

          <div className="shrink-0 text-right">
            <div className="font-bold">{item.date}</div>
          </div>
        </div>
      )}
    </Section>
  );
};

const Volunteer = () => {
  const section = useArtboardStore((state) => state.resume.sections.volunteer);

  return (
    <Section<Volunteer> section={section} urlKey="url" summaryKey="summary">
      {(item) => (
        <div className="flex items-start justify-between group-[.sidebar]:flex-col group-[.sidebar]:items-start">
          <div className="text-left">
            <LinkedEntity
              name={item.organization}
              url={item.url}
              separateLinks={section.separateLinks}
              className="font-bold"
            />
            <div>{item.position}</div>
          </div>

          <div className="shrink-0 text-right">
            <div className="font-bold">{item.date}</div>
            <div>{item.location}</div>
          </div>
        </div>
      )}
    </Section>
  );
};

const Languages = () => {
  const section = useArtboardStore((state) => state.resume.sections.languages);

  return (
    <Section<Language> section={section} levelKey="level">
      {(item) => (
        <div className="space-y-0.5">
          <div className="font-bold">{item.name}</div>
          <div>{item.description}</div>
        </div>
      )}
    </Section>
  );
};

const Projects = () => {
  const section = useArtboardStore((state) => state.resume.sections.projects);

  return (
    <Section<Project> section={section} urlKey="url" summaryKey="summary" keywordsKey="keywords">
      {(item) => (
        <div className="flex items-start justify-between group-[.sidebar]:flex-col group-[.sidebar]:items-start">
          <div className="text-left">
            <LinkedEntity
              name={item.name}
              url={item.url}
              separateLinks={section.separateLinks}
              className="font-bold"
            />
            <div>{item.description}</div>
          </div>

          <div className="shrink-0 text-right">
            <div className="font-bold">{item.date}</div>
          </div>
        </div>
      )}
    </Section>
  );
};

const References = () => {
  const section = useArtboardStore((state) => state.resume.sections.references);

  return (
    <Section<Reference> section={section} urlKey="url" summaryKey="summary">
      {(item) => (
        <div>
          <LinkedEntity
            name={item.name}
            url={item.url}
            separateLinks={section.separateLinks}
            className="font-bold"
          />
          <div>{item.description}</div>
        </div>
      )}
    </Section>
  );
};

const Custom = ({ id }: { id: string }) => {
  const section = useArtboardStore((state) => state.resume.sections.custom[id]);

  return (
    <Section<CustomSection>
      section={section}
      urlKey="url"
      summaryKey="summary"
      keywordsKey="keywords"
    >
      {(item) => (
        <div className="flex items-start justify-between group-[.sidebar]:flex-col group-[.sidebar]:items-start">
          <div className="text-left">
            <LinkedEntity
              name={item.name}
              url={item.url}
              separateLinks={section.separateLinks}
              className="font-bold"
            />
            <div>{item.description}</div>
          </div>

          <div className="shrink-0 text-right">
            <div className="font-bold">{item.date}</div>
            <div>{item.location}</div>
          </div>
        </div>
      )}
    </Section>
  );
};

const mapSectionToComponent = (section: SectionKey) => {
  switch (section) {
    case "socials": {
      return <Socials />;
    }
    case "summary": {
      return <Summary />;
    }
    case "experience": {
      return <Experience />;
    }
    case "education": {
      return <Education />;
    }
    case "awards": {
      return <Awards />;
    }
    case "certifications": {
      return <Certifications />;
    }
    case "hardSkills": {
      return <HardSkills />;
    }
    case "softSkills": {
      return <SoftSkills />;
    }
    case "interests": {
      return <Interests />;
    }
    case "publications": {
      return <Publications />;
    }
    case "volunteer": {
      return <Volunteer />;
    }
    case "languages": {
      return <Languages />;
    }
    case "projects": {
      return <Projects />;
    }
    case "references": {
      return <References />;
    }
    default: {
      if (section.startsWith("custom.")) return <Custom id={section.split(".")[1]} />;

      return null;
    }
  }
};

export const ExampleA = ({ columns, isFirstPage = false }: TemplateProps) => {
  const [main, sidebar] = columns;

  return (
    <div className="grid min-h-[inherit] grid-cols-3">
      <div
        className={cn(
          "main p-custom group space-y-4",
          sidebar.length > 0 ? "col-span-2" : "col-span-3",
        )}
      >
        {isFirstPage && <Header />}

        {main.map((section) => (
          <Fragment key={section}>{mapSectionToComponent(section)}</Fragment>
        ))}
      </div>

      <div
        className={cn(
          "sidebar p-custom group h-full space-y-4 bg-primary text-background",
          sidebar.length === 0 && "hidden",
        )}
      >
        <Group>
          <div>
            {sidebar.map((section) => (
              <Fragment key={section}>{mapSectionToComponent(section)}</Fragment>
            ))}
          </div>

          <SealWhite />
        </Group>
      </div>
      <ContactATS />
    </div>
  );
};
