import type { SoftSkill } from "@reactive-resume/schema";

import { useArtboardStore } from "@/artboard/store/artboard";

import { Section } from "./components";

export const SoftSkills = () => {
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
