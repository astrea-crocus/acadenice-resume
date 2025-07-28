/* eslint-disable lingui/no-unlocalized-strings */
import { useResizeObserver } from "@react-hookz/web";
import type { ResumeData } from "@reactive-resume/schema";
import { useCallback, useEffect, useRef, useState } from "react";

type CVPreviewProps = {
  resumeData: ResumeData;
  resumeId: string;
};

export const ResumePreview = ({ resumeData, resumeId }: CVPreviewProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const sendResumeToIframe = useCallback(() => {
    if (!iframeRef.current?.contentWindow) return;
    iframeRef.current.contentWindow.postMessage({ type: "SET_RESUME", payload: resumeData }, "*");
  }, [resumeData]);

  useResizeObserver(containerRef, (entry) => {
    const { width, height } = entry.contentRect;

    const contentWidth = 793.8;
    const contentHeight = 1122.66;

    const widthRatio = width / contentWidth;
    const heightRatio = height / contentHeight;
    const newScale = Math.min(widthRatio, heightRatio);
    setScale(newScale);
  });

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const onLoad = () => {
      sendResumeToIframe();
    };

    iframe.addEventListener("load", onLoad);
    return () => {
      iframe.removeEventListener("load", onLoad);
    };
  }, [sendResumeToIframe]);

  useEffect(() => {
    sendResumeToIframe();
  }, [sendResumeToIframe]);

  return (
    <div ref={containerRef} className="relative size-full select-none overflow-hidden">
      <div
        style={{
          transform: `scale(${scale})`,
          width: `${100 / scale}%`,
          height: `${100 / scale}%`,
          transformOrigin: "top left",
        }}
        className="pointer-events-none"
      >
        <iframe
          ref={iframeRef}
          title={`preview-${resumeId}`}
          src="/artboard/resume-preview"
          className="pointer-events-auto size-full select-none rounded-sm border-none opacity-80"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </div>
  );
};
