import { HouseLine } from "@phosphor-icons/react/dist/ssr";
import {
  cn,
  normalizeToFileName,
  normalizeToUrlPath,
  previewTemplatesList,
} from "@reactive-resume/utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { BASE_URL } from "@/preview/constants";
import { useArtboardStore } from "@/preview/store/artboard";
import { useUIStore } from "@/preview/store/ui";

export const NavButton = () => {
  const setMetadata = useArtboardStore((state) => state.setMetadata);
  const setResume = useArtboardStore((state) => state.setResume);

  const navigate = useNavigate();

  const [activeTemplate, setActiveTemplate] = useState<string | null>(null);

  useEffect(() => {
    if (!activeTemplate) return;

    const file = normalizeToFileName(activeTemplate);
    const slug = normalizeToUrlPath(activeTemplate);

    void fetch(`${BASE_URL}templates/json/${file}.json`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Échec du chargement: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        setResume(data);
        setMetadata({
          ...data.metadata,
          template: activeTemplate,
        });
        void navigate(slug);
      });
  }, [activeTemplate, setResume, setMetadata, navigate]);

  const handleClick = (tpl: string) => {
    setActiveTemplate(tpl);
  };

  return (
    <>
      {previewTemplatesList.map((tpl) => (
        <button
          key={tpl}
          className={cn(
            `mx-1 my-auto h-fit rounded-lg border p-2 capitalize`,
            `border-zinc-900/50 bg-zinc-500 text-zinc-100`,
            `bg-gradient-to-t from-black/50 via-[#808080]/50 to-white/50 bg-blend-soft-light`,
            `hover:border-amber-500/50 hover:bg-amber-100 hover:text-amber-600`,
            `disabled:cursor-not-allowed disabled:border-amber-900/50 disabled:bg-amber-500 disabled:text-black`,
          )}
          disabled={activeTemplate === tpl}
          onClick={() => {
            handleClick(tpl);
          }}
        >
          {tpl}
        </button>
      ))}
    </>
  );
};

type HomeButtonProps = {
  className?: string;
};

export const HomeButton = ({ className }: HomeButtonProps) => {
  const navigate = useNavigate();
  const setActiveTemplate = useUIStore((state) => state.setActiveTemplate);

  return (
    <button
      className={cn(
        className,
        `border-amber-900/50 bg-amber-600 text-amber-100`,
        `bg-gradient-to-t from-black/50 via-[#808080]/50 to-white/50 bg-blend-soft-light`,
        `hover:border-amber-500/50 hover:bg-amber-100 hover:text-amber-600`,
        `m-2 h-fit rounded-lg border p-2 capitalize`,
      )}
      onClick={() => {
        setActiveTemplate(null);
        void navigate(BASE_URL);
      }}
    >
      <HouseLine size={32} />
    </button>
  );
};
