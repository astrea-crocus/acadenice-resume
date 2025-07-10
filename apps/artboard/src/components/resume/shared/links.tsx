import type { URL } from "@reactive-resume/schema";
import { cn, isUrl } from "@reactive-resume/utils";

type LinkProps = {
  url: URL;
  icon?: React.ReactNode;
  iconOnRight?: boolean;
  label?: string;
  className?: string;
};

export const Link = ({ url, icon, iconOnRight, label, className }: LinkProps) => {
  if (!isUrl(url.href)) return null;

  return (
    <div className="flex items-center gap-x-1.5">
      {!iconOnRight &&
        (icon ?? (
          <i aria-hidden className="ph ph-bold ph-link text-primary group-[.sidebar]:text-white" />
        ))}
      <a
        href={url.href}
        target="_blank"
        rel="noreferrer noopener nofollow"
        className={cn("inline-block", className)}
      >
        {label ?? (url.label || url.href)}
      </a>
      {iconOnRight &&
        (icon ?? (
          <i aria-hidden className="ph ph-bold ph-link text-primary group-[.sidebar]:text-white" />
        ))}
    </div>
  );
};
