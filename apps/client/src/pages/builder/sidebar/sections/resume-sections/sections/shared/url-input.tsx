import { t } from "@lingui/macro";
import { Tag } from "@phosphor-icons/react";
import type { URL } from "@reactive-resume/schema";
import { urlSchema } from "@reactive-resume/schema";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from "@reactive-resume/ui";
import { forwardRef, useId, useMemo } from "react";

type Props = {
  id?: string;
  value: URL;
  placeholder?: string;
  onChange: (value: URL) => void;
};

export const URLInput = forwardRef<HTMLInputElement, Props>(
  ({ id, value, placeholder, onChange }, ref) => {
    // Générer un id unique pour le message d'erreur
    const errorId = useId();

    const hasError = useMemo(() => !urlSchema.safeParse(value).success, [value]);

    // Fonction pour aria-labels dynamiques en français avec switch si besoin (ici simple)
    const getUrlInputAriaLabel = () => {
      return t`Champ pour saisir l'URL`;
    };

    const getLabelInputAriaLabel = () => {
      return t`Champ pour saisir le libellé associé à l'URL`;
    };

    return (
      <>
        <div className="flex gap-x-1">
          <Input
            ref={ref}
            id={id}
            value={value.href}
            className="flex-1"
            hasError={hasError}
            placeholder={placeholder}
            aria-label={getUrlInputAriaLabel()}
            aria-describedby={hasError ? errorId : undefined}
            onChange={(event) => {
              onChange({ ...value, href: event.target.value });
            }}
          />

          <Popover>
            <Tooltip content={t`Label`}>
              <PopoverTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label={t`Ouvrir le champ pour modifier le libellé de l'URL`}
                >
                  <Tag />
                </Button>
              </PopoverTrigger>
            </Tooltip>
            <PopoverContent className="p-1.5">
              <Input
                value={value.label}
                placeholder={t`Label`}
                aria-label={getLabelInputAriaLabel()}
                onChange={(event) => {
                  onChange({ ...value, label: event.target.value });
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        {hasError && (
          <small id={errorId} className="opacity-75" role="alert">
            {t`URL must start with https://`}
          </small>
        )}
      </>
    );
  },
);
