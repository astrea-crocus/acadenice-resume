import { hexToRgb, isEmptyString, sanitize } from "@reactive-resume/utils";

import { colors } from "@/preview/constants";
import { useArtboardStore } from "@/preview/store/artboard";

export const Summary = () => {
  const section = useArtboardStore((state) => state.resume.sections.summary);

  if (!section.visible || isEmptyString(section.content)) return null;

  return (
    <section id={section.id}>
      <div
        dangerouslySetInnerHTML={{ __html: sanitize(section.content) }}
        style={{
          columns: section.columns,
          backgroundColor: hexToRgb(colors.primary, 0.2),
        }}
        className="wysiwyg px-1.5 py-2"
      />
    </section>
  );
};
