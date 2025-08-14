import { useBreakpoint } from "@reactive-resume/hooks";
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  VisuallyHidden,
} from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { Outlet } from "react-router";

import { useBuilderStore } from "@/client/stores/builder";

import { BuilderHeader } from "./_components/header";
import { BuilderToolbar } from "./_components/toolbar";
import { Sidebar } from "./sidebar";

const onOpenAutoFocus = (event: Event) => {
  event.preventDefault();
};

const OutletSlot = () => (
  <>
    <BuilderHeader />

    <div className="size-full min-h-screen">
      <Outlet />
      <BuilderToolbar />
    </div>
  </>
);

export const BuilderLayout = () => {
  const { isDesktop } = useBreakpoint();

  const sheet = useBuilderStore((state) => state.sheet);

  const leftSetSize = useBuilderStore((state) => state.panel.left.setSize);
  const leftHandle = useBuilderStore((state) => state.panel.left.handle);

  if (isDesktop) {
    return (
      <div className="relative size-full max-h-screen overflow-hidden">
        <PanelGroup direction="horizontal">
          <Panel
            minSize={25}
            maxSize={45}
            defaultSize={35}
            className={cn("z-10 bg-background", !leftHandle.isDragging && "transition-[flex]")}
            onResize={leftSetSize}
          >
            <Sidebar />
          </Panel>

          <PanelResizeHandle
            isDragging={leftHandle.isDragging}
            onDragging={leftHandle.setDragging}
          />

          <Panel
            className="bg-background bg-repeat"
            style={{ backgroundImage: `url('/backgrounds/background.svg')` }}
          >
            <OutletSlot />
          </Panel>
        </PanelGroup>
      </div>
    );
  }

  return (
    <div
      className="max-h-screen bg-background bg-repeat"
      style={{ backgroundImage: `url('/backgrounds/background.svg')` }}
    >
      <Sheet open={sheet.left.open} onOpenChange={sheet.left.setOpen}>
        <VisuallyHidden>
          <SheetHeader>
            <SheetTitle />
            <SheetDescription />
          </SheetHeader>
        </VisuallyHidden>

        <SheetContent
          side="left"
          showClose={false}
          className="p-0 sm:max-w-xl"
          onOpenAutoFocus={onOpenAutoFocus}
        >
          <Sidebar />
        </SheetContent>
      </Sheet>

      <OutletSlot />
    </div>
  );
};
