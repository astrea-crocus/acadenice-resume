import { t } from "@lingui/macro";
import { Separator } from "@reactive-resume/ui";

import { SectionIcon } from "../../shared";
import { ExportSection } from "./export";
import { SharingSection } from "./sharing";

export const Publish = () => {
  return (
    <section id="publish" className="grid gap-y-6 p-6" aria-label={t`Section Publication`}>
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <SectionIcon id="publish" size={18} aria-label={t`Icône de la section Publication`} />
          <h2 className="line-clamp-1 text-2xl font-bold lg:text-3xl/loose">{t`Diffusion du CV`}</h2>
        </div>
      </header>

      <div className="grid h-full items-center justify-between gap-y-2 p-4">
        <div />

        <div className="flex flex-col items-center justify-center gap-y-2">
          <ExportSection />
          <Separator />
          <SharingSection />
        </div>

        <div />
      </div>
    </section>
  );
};
