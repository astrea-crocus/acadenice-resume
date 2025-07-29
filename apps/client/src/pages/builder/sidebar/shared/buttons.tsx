import { t } from "@lingui/macro";
import type { IconProps } from "@phosphor-icons/react";
import { Layout, ListBullets, PaintBrush, ReadCvLogo, Share } from "@phosphor-icons/react";
import type { ButtonProps } from "@reactive-resume/ui";
import { Button, Tooltip } from "@reactive-resume/ui";

export type MetadataKey = "basics" | "appearence" | "publish" | "resume-sections" | "templates";

const defaultIconSize = 28;

const getSectionButton = (id: MetadataKey, props: IconProps = {}) => {
  switch (id) {
    case "templates": {
      return <Layout {...props} />;
    }
    case "appearence": {
      return <PaintBrush {...props} />;
    }
    case "basics": {
      return <ListBullets {...props} />;
    }
    case "publish": {
      return <Share {...props} />;
    }
    case "resume-sections": {
      return <ReadCvLogo {...props} />;
    }
    default: {
      return null;
    }
  }
};

const getAriaLabel = (id: MetadataKey): string => {
  switch (id) {
    case "templates": {
      return t`Modèle de CV`;
    }
    case "appearence": {
      return t`Disposition`;
    }
    case "basics": {
      return t`Profil`;
    }
    case "publish": {
      return t`Diffusion`;
    }
    case "resume-sections": {
      return t`Contenu du CV`;
    }
    default: {
      return "";
    }
  }
};

type SectionButtonProps = Omit<ButtonProps, "size"> & {
  id: MetadataKey;
  name: string;
  size?: number;
  icon?: React.ReactNode;
};

export const SectionButton = ({
  id,
  name,
  icon,
  size = defaultIconSize,
  ...props
}: SectionButtonProps) => (
  <Tooltip side="left" content={name}>
    <Button
      size="icon"
      variant="ghost"
      className="size-20 flex-col rounded-2xl p-2 hover:bg-background/50 hover:text-primary"
      aria-label={getAriaLabel(id)}
      {...props}
    >
      {icon ?? getSectionButton(id, { size })}
      {name}
    </Button>
  </Tooltip>
);

type ButtonsProps = {
  onSectionChange: (section: MetadataKey) => void;
  iconSize?: number;
};

export const Buttons = ({ onSectionChange, iconSize }: ButtonsProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-6 p-2">
      <SectionButton
        id="templates"
        name={t`Modèles`}
        size={iconSize}
        onClick={() => {
          onSectionChange("templates");
        }}
      />
      <SectionButton
        id="basics"
        name={t`Profil`}
        size={iconSize}
        onClick={() => {
          onSectionChange("basics");
        }}
      />
      <SectionButton
        id="resume-sections"
        name={t`Rubriques du CV`}
        size={iconSize}
        onClick={() => {
          onSectionChange("resume-sections");
        }}
      />
      <SectionButton
        id="appearence"
        name={t`Apparence`}
        size={iconSize}
        onClick={() => {
          onSectionChange("appearence");
        }}
      />
      <SectionButton
        id="publish"
        name={t`Diffusion du CV`}
        size={iconSize}
        onClick={() => {
          onSectionChange("publish");
        }}
      />
    </div>
  );
};
