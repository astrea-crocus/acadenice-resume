import type { HardSkill } from "@reactive-resume/schema";

import { useArtboardStore } from "@/artboard/store/artboard";

import { Section } from "./components";

export const HardSkills = () => {
  const section = useArtboardStore((state) => state.resume.sections.hardSkills);

  return (
    <Section<HardSkill> section={section} levelKey="level" keywordsKey="keywords">
      {(item) => (
        <div className="flex">
          <h5 className="mr-auto font-bold">{item.name}</h5>
          <p>{item.description}</p>
        </div>
      )}
    </Section>
  );
};
