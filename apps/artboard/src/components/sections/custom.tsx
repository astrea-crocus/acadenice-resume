import type { CustomSection } from "@reactive-resume/schema";

import { useArtboardStore } from "@/artboard/store/artboard";

import { Section } from "./components";
import { LinkedEntity } from "./components/shared";

export const Custom = ({ id }: { id: string }) => {
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
