import { Separator } from "@reactive-resume/ui";

import { ExportSection } from "./export";
import { SharingSection } from "./sharing";

export const Publish = () => {
  return (
    <div className="flex">
      <div className="h-screen flex-1 pb-16 lg:px-4 lg:py-2">
        <div className="grid h-full gap-y-6 @container/right">
          <div />

          <div className="grid gap-y-6 p-6">
            <ExportSection />
            <Separator />
            <SharingSection />
          </div>

          <div />
        </div>
      </div>
    </div>
  );
};
