import { t } from "@lingui/macro";

import { SectionIcon } from "../../shared";
import { ResumeSectionsOption } from "./sections";

export const ResumeSections = () => {
  return (
    <section id="resume-sections" className="flex h-screen flex-col">
      <header className="flex items-center justify-between py-2">
        <div className="mx-auto flex items-center gap-x-4">
          <SectionIcon
            id="resume-sections"
            size={18}
            aria-label={t`Icône de la section Sections du CV`}
          />
          <h2 className="line-clamp-1 text-2xl font-bold lg:text-3xl/loose">{t`Sections du CV`}</h2>
        </div>
      </header>

      <div className="flex-1 overflow-hidden" role="complementary">
        <div className="flex h-full">
          <ResumeSectionsOption />
        </div>
      </div>
    </section>
  );
};
