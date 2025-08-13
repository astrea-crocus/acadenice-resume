import type { Language } from "@reactive-resume/schema";

import { useArtboardStore } from "@/preview/store/artboard";

import { Section } from "./components";

export const Languages = () => {
  const section = useArtboardStore((state) => state.resume.sections.languages);

  return (
    <Section<Language> section={section} levelKey="level">
      {(item) => (
        <div className="flex">
          <h5 className="mr-auto font-bold">{item.name}</h5>
          <p>{item.description}</p>
        </div>
      )}
    </Section>
  );
};
