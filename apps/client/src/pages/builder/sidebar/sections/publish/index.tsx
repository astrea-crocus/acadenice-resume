import { t } from "@lingui/macro";
import { Separator } from "@reactive-resume/ui";

import { SectionIcon } from "../../shared";
import { ExportSection } from "./components/export";
import { SharingSection } from "./components/sharing";

export const Publish = () => {
  return (
    <section id="publish" className="flex h-screen flex-col">
      <header className="flex items-center justify-between py-2">
        <div className="mx-auto flex items-center gap-x-4">
          <SectionIcon id="publish" size={18} aria-label={t`Icône de la section Publication`} />
          <h2 className="line-clamp-1 text-2xl font-bold lg:text-3xl/loose">{t`Diffusion du CV`}</h2>
        </div>
      </header>

      <div className="flex-1 overflow-hidden">
        <div className="flex h-full">
          <div className="h-full flex-1 px-6 py-2">
            <div className="grid gap-x-5 gap-y-10 @container/left">
              <ExportSection />
              <Separator />
              <SharingSection />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
