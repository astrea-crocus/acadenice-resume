import type { SectionKey } from "@reactive-resume/schema";
import type { Preview } from "@reactive-resume/utils";
import { useMemo } from "react";

import { Page } from "@/preview/components/page";
import { useArtboardStore } from "@/preview/store/artboard";
import { getTemplate } from "@/preview/templates";

export const PreviewLayout = () => {
  const layout = useArtboardStore((state) => state.resume.metadata.layout);
  const template = useArtboardStore((state) => state.resume.metadata.template as Preview);

  const Preview = useMemo(() => getTemplate(template), [template]);

  return (
    <>
      {layout.map((columns, pageIndex) => (
        <Page key={pageIndex} mode="preview" pageNumber={pageIndex + 1}>
          <Preview isFirstPage={pageIndex === 0} columns={columns as SectionKey[][]} />
        </Page>
      ))}
    </>
  );
};
