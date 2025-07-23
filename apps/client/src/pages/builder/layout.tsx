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

    <div className="size-full bg-background">
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
      <div className="relative size-full overflow-hidden">
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

          <Panel>
            <OutletSlot />
          </Panel>
        </PanelGroup>
      </div>
    );
  }

  return (
    <div className="relative">
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
          className="top-16 p-0 sm:max-w-xl"
          onOpenAutoFocus={onOpenAutoFocus}
        >
          <Sidebar />
        </SheetContent>
      </Sheet>

      <OutletSlot />

      <div />
    </div>
  );
};
