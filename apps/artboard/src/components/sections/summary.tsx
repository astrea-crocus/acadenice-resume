import { isEmptyString, sanitize } from "@reactive-resume/utils";

import { useArtboardStore } from "@/artboard/store/artboard";

export const Summary = () => {
  const section = useArtboardStore((state) => state.resume.sections.summary);

  if (!section.visible || isEmptyString(section.content)) return null;

  return (
    <section id={section.id}>
      <h4 className="mb-2 border-b pb-0.5 text-sm font-bold">{section.name}</h4>

      <div
        dangerouslySetInnerHTML={{ __html: sanitize(section.content) }}
        style={{ columns: section.columns }}
        className="wysiwyg"
      />
    </section>
  );
};
