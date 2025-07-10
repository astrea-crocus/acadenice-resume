import { cn, isUrl } from "@reactive-resume/utils";

type TextProps = {
  className?: string;
  children: React.ReactNode;
};

export const Name: React.FC<TextProps> = ({ className, children }) => (
  <div className={cn("text-2xl font-bold", className)}>{children}</div>
);

export const Headline: React.FC<TextProps> = ({ className, children }) => (
  <div className={className}>{children}</div>
);

type InfoItemProps = {
  icon: string;
  children: React.ReactNode;
  className?: string;
};

export const InfoItem: React.FC<InfoItemProps> = ({ icon, children, className }) => (
  <div className={cn("flex items-center gap-x-1.5", className)}>
    <i aria-hidden className={cn(`ph ph-bold ph-${icon}`, "text-primary")} />
    {children}
  </div>
);

export const CustomFieldItem: React.FC<{
  icon: string;
  name?: string;
  value: string;
}> = ({ icon, name, value }) => (
  <InfoItem icon={icon}>
    {isUrl(value) ? (
      <a href={value} target="_blank" rel="noreferrer noopener nofollow">
        {name ?? value}
      </a>
    ) : (
      <span>{[name, value].filter(Boolean).join(": ")}</span>
    )}
  </InfoItem>
);
