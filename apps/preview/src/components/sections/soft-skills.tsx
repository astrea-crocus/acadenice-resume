import type { SoftSkill } from "@reactive-resume/schema";

import { useArtboardStore } from "@/preview/store/artboard";

import type { SectionClassNames } from "./components";
import { Section } from "./components";

export const SoftSkills = () => {
  const section = useArtboardStore((state) => state.resume.sections.softSkills);

  const classNames: SectionClassNames = {
    items: `gap-x-1 gap-y-1`,
    item: `rounded-lg border tracking-[-0.075rem] py-1 px-0.5 last:px-4`,
  };

  return (
    <Section<SoftSkill> section={section} classNames={classNames}>
      {(item) => <div className="text-center">{item.name}</div>}
    </Section>
  );
};
