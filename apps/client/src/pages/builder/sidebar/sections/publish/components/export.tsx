import { t } from "@lingui/macro";
import { CircleNotch, FileJs, FilePdf } from "@phosphor-icons/react";
import { Card, CardContent, CardDescription, CardTitle } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { saveAs } from "file-saver";

import { usePrintResume } from "@/client/services/resume/print";
import { useResumeStore } from "@/client/stores/resume";

import { SectionIcon } from "../../../shared";

const onJsonExport = () => {
  const { resume } = useResumeStore.getState();
  const filename = `reactive_resume-${resume.id}.json`;
  const resumeJSON = JSON.stringify(resume.data, null, 2);

  saveAs(new Blob([resumeJSON], { type: "application/json" }), filename);
};

const openInNewTab = (url: string) => {
  const win = window.open(url, "_blank");
  if (win) win.focus();
};

export const ExportSection = () => {
  const { printResume, loading } = usePrintResume();

  const onPdfExport = async () => {
    const { resume } = useResumeStore.getState();
    const { url } = await printResume({ id: resume.id });

    openInNewTab(url);
  };

  return (
    <section id="export" className="flex h-fit flex-col">
      <header className="flex h-fit items-center justify-between">
        <div className="flex items-center gap-x-4">
          <SectionIcon id="export" size={18} name={t`Export`} />
          <h2 className="line-clamp-1 text-xl font-bold lg:text-xl/loose">{t`Export`}</h2>
        </div>
      </header>

      <main className="grid h-full gap-y-4">
        <Card
          className={cn(
            "h-auto cursor-pointer flex-row items-center gap-x-5 bg-background px-4 pb-3 pt-1 text-foreground",
            "hover:bg-gradient-to-t hover:from-acade-secondary-200/20 hover:to-acade-secondary-200/20",
            "dark:hover:from-acade-secondary-800/20 dark:hover:to-acade-secondary-800/20",
            "border-acade-secondary-200/50 dark:border-acade-secondary-800/50",
          )}
          onClick={onJsonExport}
        >
          <FileJs size={22} />
          <CardContent className="flex-1">
            <CardTitle className="text-sm">{t`JSON`}</CardTitle>
            <CardDescription className="font-normal">
              {t`Download a JSON snapshot of your resume. This file can be used to import your resume in the future, or can even be shared with others to collaborate.`}
            </CardDescription>
          </CardContent>
        </Card>

        <Card
          className={cn(
            "h-auto flex-row items-center gap-x-5 bg-background px-4 pb-3 pt-1 text-foreground",
            "hover:bg-gradient-to-t hover:from-acade-secondary-200/20 hover:to-acade-secondary-200/20",
            "dark:hover:from-acade-secondary-800/20 dark:hover:to-acade-secondary-800/20",
            "border-acade-secondary-200/50 dark:border-acade-secondary-800/50",
            !loading && "cursor-pointer",
            loading && "pointer-events-none cursor-progress opacity-75",
          )}
          onClick={onPdfExport}
        >
          {loading ? <CircleNotch size={22} className="animate-spin" /> : <FilePdf size={22} />}

          <CardContent className="flex-1">
            <CardTitle className="text-sm">{t`PDF`}</CardTitle>
            <CardDescription className="font-normal">
              {t`Download a PDF of your resume. This file can be used to print your resume, send it to recruiters, or upload on job portals.`}
            </CardDescription>
          </CardContent>
        </Card>
      </main>
    </section>
  );
};
