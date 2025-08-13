import type { Interest } from "@reactive-resume/schema";

import { useArtboardStore } from "@/preview/store/artboard";

import { Section } from "./components";

export const Interests = () => {
  const section = useArtboardStore((state) => state.resume.sections.interests);

  return (
    <Section<Interest> section={section} keywordsKey="keywords" className="space-y-0.5">
      {(item) => <div className="font-bold">{item.name}</div>}
    </Section>
  );
};
