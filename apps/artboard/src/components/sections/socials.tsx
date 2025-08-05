import type { Social } from "@reactive-resume/schema";
import { isUrl } from "@reactive-resume/utils";

import { BrandIcon } from "@/artboard/components";
import { useArtboardStore } from "@/artboard/store/artboard";

import { Section } from "./components";
import { Link } from "./components/shared";

export const Socials = () => {
  const section = useArtboardStore((state) => state.resume.sections.socials);

  return (
    <Section<Social> section={section}>
      {(item) => (
        <div>
          {isUrl(item.url.href) ? (
            <Link url={item.url} label={item.username} icon={<BrandIcon slug={item.icon} />} />
          ) : (
            <p>{item.username}</p>
          )}
          {!item.icon && <p className="text-sm">{item.network}</p>}
        </div>
      )}
    </Section>
  );
};
