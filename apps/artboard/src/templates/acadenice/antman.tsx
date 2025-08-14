import { cn } from "@reactive-resume/utils";
import { Fragment } from "react/jsx-runtime";

import { ContactATS, Group, Header, mapSectionToComponent, SealWhite } from "@/artboard/components";
import type { TemplateProps } from "@/artboard/types/template";

export const AntMan = ({ columns, isFirstPage = false }: TemplateProps) => {
  const [main, sidebar] = columns;

  return (
    <div className="grid min-h-[inherit] grid-cols-3">
      <div
        className={cn(
          "main p-custom group space-y-6",
          sidebar.length > 0 ? "col-span-2" : "col-span-3",
        )}
      >
        {isFirstPage && <Header />}

        {main.map((section) => (
          <Fragment key={section}>{mapSectionToComponent(section)}</Fragment>
        ))}
      </div>

      <div
        className={cn(
          "sidebar p-custom bg-primary text-background",
          sidebar.length === 0 && "hidden",
        )}
      >
        <Group>
          <div className="group h-full space-y-6">
            {sidebar.map((section) => (
              <Fragment key={section}>{mapSectionToComponent(section)}</Fragment>
            ))}
          </div>

          <SealWhite />
        </Group>
      </div>

      <ContactATS />
    </div>
  );
};
