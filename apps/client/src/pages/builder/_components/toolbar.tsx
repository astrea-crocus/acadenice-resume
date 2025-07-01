import { t } from "@lingui/macro";
import {
  ArrowClockwise,
  ArrowCounterClockwise,
  ArrowsOutCardinal,
  CircleNotch,
  ClockClockwise,
  CubeFocus,
  FilePdf,
  Hash,
  LineSegment,
  LinkSimple,
  MagnifyingGlass,
  MagnifyingGlassMinus,
  MagnifyingGlassPlus,
} from "@phosphor-icons/react";
import { Button, Separator, Toggle, Tooltip } from "@reactive-resume/ui";
import { motion } from "framer-motion";
import { useState } from "react";

import { useToast } from "@/client/hooks/use-toast";
import { usePrintResume } from "@/client/services/resume";
import { useBuilderStore } from "@/client/stores/builder";
import { useResumeStore, useTemporalResumeStore } from "@/client/stores/resume";

const openInNewTab = (url: string) => {
  const win = window.open(url, "_blank");
  if (win) win.focus();
};

export const BuilderToolbar = () => {
  const { toast } = useToast();

  const [panMode, setPanMode] = useState<boolean>(true);

  const setValue = useResumeStore((state) => state.setValue);
  const undo = useTemporalResumeStore((state) => state.undo);
  const redo = useTemporalResumeStore((state) => state.redo);
  const frameRef = useBuilderStore((state) => state.frame.ref);

  const id = useResumeStore((state) => state.resume.id);
  const isPublic = useResumeStore((state) => state.resume.visibility === "public");
  const pageOptions = useResumeStore((state) => state.resume.data.metadata.page.options);

  const { printResume, loading } = usePrintResume();

  const onPrint = async () => {
    const { url } = await printResume({ id });
    openInNewTab(url);
  };

  const onCopy = async () => {
    const { url } = await printResume({ id });
    await navigator.clipboard.writeText(url);
    toast({
      variant: "success",
      title: t`A link has been copied to your clipboard.`,
      description: t`Anyone with this link can view and download the resume. Share it on your profile or with recruiters.`,
    });
  };

  const onZoomIn = () => frameRef?.contentWindow?.postMessage({ type: "ZOOM_IN" }, "*");
  const onZoomOut = () => frameRef?.contentWindow?.postMessage({ type: "ZOOM_OUT" }, "*");
  const onResetView = () => frameRef?.contentWindow?.postMessage({ type: "RESET_VIEW" }, "*");
  const onCenterView = () => frameRef?.contentWindow?.postMessage({ type: "CENTER_VIEW" }, "*");
  const onTogglePanMode = () => {
    setPanMode(!panMode);
    frameRef?.contentWindow?.postMessage({ type: "TOGGLE_PAN_MODE", panMode: !panMode }, "*");
  };

  return (
    <motion.div
      className="fixed inset-x-0 bottom-0 mx-auto hidden py-6 text-center md:block"
      role="toolbar"
      aria-label={t`Resume builder toolbar`}
    >
      <div className="inline-flex items-center justify-center rounded-full bg-background px-4 shadow-xl">
        <Tooltip content={t`Undo`}>
          <Button
            size="icon"
            variant="ghost"
            className="rounded-none"
            aria-label={t`Undo`}
            onClick={() => {
              undo();
            }}
          >
            <ArrowCounterClockwise aria-hidden="true" />
          </Button>
        </Tooltip>

        <Tooltip content={t`Redo`}>
          <Button
            size="icon"
            variant="ghost"
            className="rounded-none"
            aria-label={t`Redo`}
            onClick={() => {
              redo();
            }}
          >
            <ArrowClockwise aria-hidden="true" />
          </Button>
        </Tooltip>

        <Separator orientation="vertical" className="h-9" aria-hidden="true" />

        <Tooltip content={panMode ? t`Scroll to Pan` : t`Scroll to Zoom`}>
          <Toggle
            className="rounded-none"
            pressed={panMode}
            aria-label={panMode ? t`Switch to scroll to pan` : t`Switch to scroll to zoom`}
            onPressedChange={onTogglePanMode}
          >
            {panMode ? (
              <ArrowsOutCardinal aria-hidden="true" />
            ) : (
              <MagnifyingGlass aria-hidden="true" />
            )}
          </Toggle>
        </Tooltip>

        <Separator orientation="vertical" className="h-9" aria-hidden="true" />

        <Tooltip content={t`Zoom In`}>
          <Button
            size="icon"
            variant="ghost"
            className="rounded-none"
            aria-label={t`Zoom in`}
            onClick={onZoomIn}
          >
            <MagnifyingGlassPlus aria-hidden="true" />
          </Button>
        </Tooltip>

        <Tooltip content={t`Zoom Out`}>
          <Button
            size="icon"
            variant="ghost"
            className="rounded-none"
            aria-label={t`Zoom out`}
            onClick={onZoomOut}
          >
            <MagnifyingGlassMinus aria-hidden="true" />
          </Button>
        </Tooltip>

        <Tooltip content={t`Reset Zoom`}>
          <Button
            size="icon"
            variant="ghost"
            className="rounded-none"
            aria-label={t`Reset zoom`}
            onClick={onResetView}
          >
            <ClockClockwise aria-hidden="true" />
          </Button>
        </Tooltip>

        <Tooltip content={t`Center Artboard`}>
          <Button
            size="icon"
            variant="ghost"
            className="rounded-none"
            aria-label={t`Center artboard`}
            onClick={onCenterView}
          >
            <CubeFocus aria-hidden="true" />
          </Button>
        </Tooltip>

        <Separator orientation="vertical" className="h-9" aria-hidden="true" />

        <Tooltip content={t`Toggle Page Break Line`}>
          <Toggle
            className="rounded-none"
            pressed={pageOptions.breakLine}
            aria-label={t`Toggle page break line`}
            onPressedChange={(pressed) => {
              setValue("metadata.page.options.breakLine", pressed);
            }}
          >
            <LineSegment aria-hidden="true" />
          </Toggle>
        </Tooltip>

        <Tooltip content={t`Toggle Page Numbers`}>
          <Toggle
            className="rounded-none"
            pressed={pageOptions.pageNumbers}
            aria-label={t`Toggle page numbers`}
            onPressedChange={(pressed) => {
              setValue("metadata.page.options.pageNumbers", pressed);
            }}
          >
            <Hash aria-hidden="true" />
          </Toggle>
        </Tooltip>

        <Separator orientation="vertical" className="h-9" aria-hidden="true" />

        <Tooltip content={t`Copy Link to Resume`}>
          <Button
            size="icon"
            variant="ghost"
            className="rounded-none"
            disabled={!isPublic}
            aria-label={t`Copy public link to resume`}
            onClick={onCopy}
          >
            <LinkSimple aria-hidden="true" />
          </Button>
        </Tooltip>

        <Tooltip content={t`Download PDF`}>
          <Button
            size="icon"
            variant="ghost"
            disabled={loading}
            className="rounded-none"
            aria-label={t`Download resume as PDF`}
            onClick={onPrint}
          >
            {loading ? (
              <CircleNotch className="animate-spin" aria-hidden="true" />
            ) : (
              <FilePdf aria-hidden="true" />
            )}
          </Button>
        </Tooltip>
      </div>
    </motion.div>
  );
};
