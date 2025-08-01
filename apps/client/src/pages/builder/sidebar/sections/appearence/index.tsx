import { t } from "@lingui/macro";
import { ScrollArea, Separator } from "@reactive-resume/ui";
import { useRef } from "react";

import { SectionIcon } from "../../shared";
import {
  CssSection,
  LayoutSection,
  PageSection,
  ThemeSection,
  TypographySection,
} from "./components";

export const Appearence = () => {
  const containterRef = useRef<HTMLDivElement | null>(null);

  const scrollIntoView = (selector: string) => {
    const section = containterRef.current?.querySelector(selector);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  const size = 16;

  return (
    <section id="appearence" className="flex h-screen flex-col">
      <header className="flex items-center justify-between py-2">
        <div className="mx-auto flex items-center gap-x-4">
          <SectionIcon id="appearence" size={18} aria-label={t`Icône de la section Apparence`} />
          <h2 className="line-clamp-1 text-2xl font-bold lg:text-3xl/loose">{t`Apparence`}</h2>
        </div>
      </header>

      <div className="flex-1 overflow-hidden">
        <div className="flex h-full">
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
              <SectionIcon
                id="css"
                name={t`CSS Personnalisé`}
                size={size}
                onClick={() => {
                  scrollIntoView("#css");
                }}
              />
            </div>

            <div />
          </div>

          <ScrollArea orientation="vertical" className="h-full flex-1 px-6 py-2">
            <div ref={containterRef} className="grid gap-x-5 gap-y-10 @container/left">
              <LayoutSection />
              <Separator />
              <TypographySection />
              <Separator />
              <ThemeSection />
              <Separator />
              <PageSection />
              <Separator />
              <CssSection />
            </div>
          </ScrollArea>
        </div>
      </div>
    </section>
  );
};
