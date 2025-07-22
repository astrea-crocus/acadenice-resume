import { t } from "@lingui/macro";
import { ScrollArea, Separator } from "@reactive-resume/ui";
import { useRef } from "react";

import { SectionIcon } from "../../shared";
import { CssSection } from "./css";
import { LayoutSection } from "./layout";
import { PageSection } from "./page";
import { ThemeSection } from "./theme";
import { TypographySection } from "./typography";

export const Appearence = () => {
  const containterRef = useRef<HTMLDivElement | null>(null);

  const scrollIntoView = (selector: string) => {
    const section = containterRef.current?.querySelector(selector);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  const size = 16;

  return (
    <div className="flex">
      <div className="basis-12 flex-col items-center justify-between bg-primary-accent/[0.125] py-4 sm:flex">
        <div />

        <div className="flex flex-col items-center justify-center gap-y-2">
          <SectionIcon
            id="layout"
            name={t`Mise en Page`}
            size={size}
            onClick={() => {
              scrollIntoView("#layout");
            }}
          />
          <SectionIcon
            id="css"
            name={t`CSS Personnalisé`}
            size={size}
            onClick={() => {
              scrollIntoView("#css");
            }}
          />
          <SectionIcon
            id="typography"
            name={t`Typographie`}
            size={size}
            onClick={() => {
              scrollIntoView("#typography");
            }}
          />
          <SectionIcon
            id="theme"
            name={t`Thème`}
            size={size}
            onClick={() => {
              scrollIntoView("#theme");
            }}
          />
          <SectionIcon
            id="page"
            name={t`Page`}
            size={size}
            onClick={() => {
              scrollIntoView("#page");
            }}
          />
        </div>

        <div />
      </div>

      <ScrollArea orientation="vertical" className="h-screen flex-1 pb-16 lg:px-4 lg:py-2">
        <div ref={containterRef} className="grid gap-y-6 @container/right">
          <LayoutSection />
          <Separator />
          <CssSection />
          <Separator />
          <TypographySection />
          <Separator />
          <ThemeSection />
          <Separator />
          <PageSection />
        </div>
      </ScrollArea>
    </div>
  );
};
