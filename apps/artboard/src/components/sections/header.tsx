import { cn, isUrl } from "@reactive-resume/utils";

import { calculateAge } from "@/artboard/libs/date";
import { useArtboardStore } from "@/artboard/store/artboard";

import { Picture } from "./components";
import { Link } from "./components/shared";

export const Header = () => {
  const basics = useArtboardStore((state) => state.resume.basics);
  const age = calculateAge(basics.birthday);

  return (
    <div className="flex items-center space-x-4">
      <Picture />

      <div className="space-y-2">
        <div>
          <div className="text-2xl font-bold">{basics.name}</div>
          <div className="text-base">{basics.headline}</div>
        </div>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm">
          {basics.location && (
            <div className="flex items-center gap-x-1.5">
              <i aria-hidden className="ph ph-bold ph-map-pin text-primary" />
              <div>{basics.location}</div>
            </div>
          )}
          {basics.birthday && (
            <div className="flex items-center gap-x-1.5">
              <i aria-hidden className="ph ph-bold ph-cake text-primary" />
              <div>{age} ans</div>
            </div>
          )}
          {basics.phone && (
            <div className="flex items-center gap-x-1.5">
              <i aria-hidden className="ph ph-bold ph-phone text-primary" />
              <a href={`tel:${basics.phone}`} target="_blank" rel="noreferrer">
                {basics.phone}
              </a>
            </div>
          )}
          {basics.email && (
            <div className="flex items-center gap-x-1.5">
              <i aria-hidden className="ph ph-bold ph-at text-primary" />
              <a href={`mailto:${basics.email}`} target="_blank" rel="noreferrer">
                {basics.email}
              </a>
            </div>
          )}
          <Link url={basics.portfolio} />
          {basics.customFields.map((item) => (
            <div key={item.id} className="flex items-center gap-x-1.5">
              <i aria-hidden className={cn(`ph ph-bold ph-${item.icon}`, "text-primary")} />
              {isUrl(item.value) ? (
                <a href={item.value} target="_blank" rel="noreferrer noopener nofollow">
                  {item.name || item.value}
                </a>
              ) : (
                <span>{[item.name, item.value].filter(Boolean).join(": ")}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
