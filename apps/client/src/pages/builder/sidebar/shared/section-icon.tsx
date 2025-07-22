import { t } from "@lingui/macro";
import type { IconProps } from "@phosphor-icons/react";
import {
  Code,
  DiamondsFour,
  DownloadSimple,
  Info,
  Layout,
  Note,
  Palette,
  ReadCvLogo,
  ShareFat,
  TextT,
  Translate,
  TrendUp,
} from "@phosphor-icons/react";
import type { ButtonProps } from "@reactive-resume/ui";
import { Button, Tooltip } from "@reactive-resume/ui";

type MetadataKey =
  | "template"
  | "layout"
  | "typography"
  | "theme"
  | "css"
  | "page"
  | "locale"
  | "sharing"
  | "statistics"
  | "export"
  | "notes"
  | "information"
  | "resume-sections";

const getSectionIcon = (id: MetadataKey, size: number, props: IconProps = {}) => {
  switch (id) {
    case "notes": {
      return <Note size={size} {...props} />;
    }
    case "template": {
      return <DiamondsFour size={size} {...props} />;
    }
    case "layout": {
      return <Layout size={size} {...props} />;
    }
    case "typography": {
      return <TextT size={size} {...props} />;
    }
    case "theme": {
      return <Palette size={size} {...props} />;
    }
    case "css": {
      return <Code size={size} {...props} />;
    }
    case "page": {
      return <ReadCvLogo size={size} {...props} />;
    }
    case "locale": {
      return <Translate size={size} {...props} />;
    }
    case "sharing": {
      return <ShareFat size={size} {...props} />;
    }
    case "statistics": {
      return <TrendUp size={size} {...props} />;
    }
    case "export": {
      return <DownloadSimple size={size} {...props} />;
    }
    case "information": {
      return <Info size={size} {...props} />;
    }
    case "resume-sections": {
      return <ReadCvLogo size={size} {...props} />;
    }

    default: {
      return null;
    }
  }
};

const getAriaLabel = (id: MetadataKey): string => {
  switch (id) {
    case "notes": {
      return t`Notes`;
    }
    case "template": {
      return t`Modèle de CV`;
    }
    case "layout": {
      return t`Disposition`;
    }
    case "typography": {
      return t`Typographie`;
    }
    case "theme": {
      return t`Thème de couleurs`;
    }
    case "css": {
      return t`CSS personnalisé`;
    }
    case "page": {
      return t`Page`;
    }
    case "locale": {
      return t`Langue`;
    }
    case "sharing": {
      return t`Partage`;
    }
    case "statistics": {
      return t`Statistiques`;
    }
    case "export": {
      return t`Exporter le CV`;
    }
    case "information": {
      return t`Informations`;
    }
    case "resume-sections": {
      return t`Sections`;
    }
    default: {
      return "";
    }
  }
};

type SectionIconProps = Omit<ButtonProps, "size"> & {
  id: MetadataKey;
  name: string;
  size: number;
  icon?: React.ReactNode;
};

export const SectionIcon = ({ id, name, icon, size, ...props }: SectionIconProps) => (
  <Tooltip side="left" content={name}>
    <Button
      size="icon"
      variant="ghost"
      className="size-8 rounded-full"
      aria-label={getAriaLabel(id)}
      {...props}
    >
      {icon ?? getSectionIcon(id, size)}
    </Button>
  </Tooltip>
);
