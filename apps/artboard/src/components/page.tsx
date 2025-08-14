import { useTheme } from "@reactive-resume/hooks";
import { cn, pageSizeMap } from "@reactive-resume/utils";

import { useArtboardStore } from "@/artboard/store/artboard";

type Props = {
  mode?: "preview" | "builder";
  pageNumber: number;
  children: React.ReactNode;
};

export const MM_TO_PX = 3.78;

export const Page = ({ mode = "preview", pageNumber, children }: Props) => {
  const { isDarkMode } = useTheme();

  const page = useArtboardStore((state) => state.resume.metadata.page);
  const fontFamily = useArtboardStore((state) => state.resume.metadata.typography.font.family);

  return (
    <div
      data-page={pageNumber}
      className={cn("relative bg-background text-foreground", mode === "builder" && "shadow-2xl")}
      style={{
        fontFamily,
        width: `${pageSizeMap[page.format].width * MM_TO_PX}px`,
        minHeight: `${pageSizeMap[page.format].height * MM_TO_PX}px`,
      }}
    >
      {mode === "builder" && page.options.pageNumbers && (
        <div className={cn("absolute -top-7 left-0 font-bold", isDarkMode && "text-white")}>
          Page {pageNumber}
        </div>
      )}

      {children}

      {mode === "builder" && page.options.breakLine && (
        <div
          className="absolute inset-x-0 border-b border-dashed"
          style={{
            top: `${pageSizeMap[page.format].height * MM_TO_PX}px`,
          }}
        >
          <span className="absolute bottom-[-1.125rem] left-[-12.5rem] inline-flex min-w-48 items-center justify-center rounded-md bg-acade-secondary-50 px-2 py-1 text-lg text-acade-secondary-600 ring-1 ring-inset ring-acade-secondary-500/10">
            Fin du format {page.format === "a4" ? "A4" : "Lettre"}
          </span>
        </div>
      )}
    </div>
  );
};
