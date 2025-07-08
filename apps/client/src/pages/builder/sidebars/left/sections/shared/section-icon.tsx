import { t } from "@lingui/macro";
import type { IconProps } from "@phosphor-icons/react";
import {
  Article,
  Books,
  Briefcase,
  Certificate,
  GameController,
  Gear,
  GraduationCap,
  HandHeart,
  Handshake,
  Medal,
  PuzzlePiece,
  ShareNetwork,
  Translate,
  User,
  Users,
} from "@phosphor-icons/react";
import type { SectionKey, SectionWithItem } from "@reactive-resume/schema";
import { defaultSection } from "@reactive-resume/schema";
import type { ButtonProps } from "@reactive-resume/ui";
import { Button, Tooltip } from "@reactive-resume/ui";
import get from "lodash.get";

import { useResumeStore } from "@/client/stores/resume";

const getSectionIcon = (id: SectionKey, props: IconProps = {}) => {
  switch (id) {
    // Left Sidebar
    case "basics": {
      return <User size={18} {...props} />;
    }
    case "summary": {
      return <Article size={18} {...props} />;
    }
    case "awards": {
      return <Medal size={18} {...props} />;
    }
    case "socials": {
      return <ShareNetwork size={18} {...props} />;
    }
    case "experience": {
      return <Briefcase size={18} {...props} />;
    }
    case "education": {
      return <GraduationCap size={18} {...props} />;
    }
    case "certifications": {
      return <Certificate size={18} {...props} />;
    }
    case "interests": {
      return <GameController size={18} {...props} />;
    }
    case "languages": {
      return <Translate size={18} {...props} />;
    }
    case "volunteer": {
      return <HandHeart size={18} {...props} />;
    }
    case "projects": {
      return <PuzzlePiece size={18} {...props} />;
    }
    case "publications": {
      return <Books size={18} {...props} />;
    }
    case "hardSkills": {
      return <Gear size={18} {...props} />;
    }
    case "softSkills": {
      return <Handshake size={18} {...props} />;
    }
    case "references": {
      return <Users size={18} {...props} />;
    }

    default: {
      return null;
    }
  }
};

const getAriaLabel = (id: SectionKey): string => {
  switch (id) {
    case "basics": {
      return t`Informations personnelles`;
    }
    case "summary": {
      return t`Résumé`;
    }
    case "awards": {
      return t`Distinctions`;
    }
    case "socials": {
      return t`Profils`;
    }
    case "experience": {
      return t`Expérience professionnelle`;
    }
    case "education": {
      return t`Formation`;
    }
    case "certifications": {
      return t`Certifications`;
    }
    case "interests": {
      return t`Centres d'intérêt`;
    }
    case "languages": {
      return t`Langues`;
    }
    case "volunteer": {
      return t`Bénévolat`;
    }
    case "projects": {
      return t`Projets`;
    }
    case "publications": {
      return t`Publications`;
    }
    case "hardSkills": {
      return t`Savoir-Faires`;
    }
    case "softSkills": {
      return t`Savoir-Être`;
    }
    case "references": {
      return t`Références`;
    }
    default: {
      return "";
    }
  }
};

type SectionIconProps = Omit<ButtonProps, "size"> & {
  id: SectionKey;
  name?: string;
  size?: number;
  icon?: React.ReactNode;
};

export const SectionIcon = ({ id, name, icon, size = 14, ...props }: SectionIconProps) => {
  const section = useResumeStore((state) =>
    get(state.resume.data.sections, id, defaultSection),
  ) as SectionWithItem;

  return (
    <Tooltip side="right" content={name ?? section.name}>
      <Button
        size="icon"
        variant="ghost"
        className="size-8 rounded-full"
        aria-label={getAriaLabel(id)}
        {...props}
      >
        {icon ?? getSectionIcon(id, { size })}
      </Button>
    </Tooltip>
  );
};
