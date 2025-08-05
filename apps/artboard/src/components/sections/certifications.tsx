import type { Certification } from "@reactive-resume/schema";

import { useArtboardStore } from "@/artboard/store/artboard";

import { Section } from "./components";
import { LinkedEntity } from "./components/shared";

export const Certifications = () => {
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
