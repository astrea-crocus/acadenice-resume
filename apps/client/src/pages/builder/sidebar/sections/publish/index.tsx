import { Separator } from "@reactive-resume/ui";

import { ExportSection } from "./export";
import { SharingSection } from "./sharing";

export const Publish = () => {
  return (
    <div className="flex">
      <div className="h-screen flex-1 pb-16 lg:px-4 lg:py-2">
        <div className="flex h-full flex-col @container/right">
          <div className="h-1/3" />

          <div className="flex flex-col p-6">
            <ExportSection />
            <Separator />
            <SharingSection />
          </div>

          <div className="h-1/3" />
        </div>
      </div>
    </div>
  );
};
