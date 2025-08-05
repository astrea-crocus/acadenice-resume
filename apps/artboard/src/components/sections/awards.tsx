import type { Award } from "@reactive-resume/schema";

import { useArtboardStore } from "@/artboard/store/artboard";

import { Section } from "./components";
import { LinkedEntity } from "./components/shared";

export const Awards = () => {
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
