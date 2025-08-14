import type { SoftSkill } from "@reactive-resume/schema";

import { useArtboardStore } from "@/preview/store/artboard";

import type { SectionClassNames } from "./components";
import { Section } from "./components";

export const SoftSkills = () => {
  const section = useArtboardStore((state) => state.resume.sections.softSkills);

  const classNames: SectionClassNames = {
    items: `gap-x-3 gap-y-1`,
    item: `tracking-[-0.05rem]`,
  };

  return (
    <Section<SoftSkill> section={section} classNames={classNames}>
      {(item) => <p className="text-center">{item.name}</p>}
    </Section>
  );
};
