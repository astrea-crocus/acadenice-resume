import { t, Trans } from "@lingui/macro";
import { createId } from "@paralleldrive/cuid2";
import { DotsSixVertical, Envelope, Plus, X } from "@phosphor-icons/react";
import type { CustomField as ICustomField } from "@reactive-resume/schema";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { AnimatePresence, Reorder, useDragControls } from "framer-motion";

import { useResumeStore } from "@/client/stores/resume";

type CustomFieldProps = {
  field: ICustomField;
  onChange: (field: ICustomField) => void;
  onRemove: (id: string) => void;
};

export const CustomField = ({ field, onChange, onRemove }: CustomFieldProps) => {
  const controls = useDragControls();

  // Variable simple pour aria-label Lingui-friendly
  const fieldName = field.name || t`Nom`;
  const fieldValue = field.value || t`Valeur`;

  const handleChange = (key: "icon" | "name" | "value", value: string) => {
    onChange({ ...field, [key]: value });
  };

  return (
    <Reorder.Item
      value={field}
      dragListener={false}
      dragControls={controls}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
    >
      <div className="flex items-end justify-between">
        <Button
          size="icon"
          variant="ghost"
          className="shrink-0"
          aria-label={t`Déplacer le champ personnalisé`}
          onPointerDown={(event) => {
            controls.start(event);
          }}
        >
          <DotsSixVertical />
        </Button>

        <Popover>
          <Tooltip content={t`Icône`}>
            <PopoverTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="shrink-0"
                aria-label={t`Modifier l'icône du champ personnalisé`}
              >
                {field.icon ? <i className={cn(`ph ph-${field.icon}`)} /> : <Envelope />}
              </Button>
            </PopoverTrigger>
          </Tooltip>
          <PopoverContent side="bottom" align="start" className="flex flex-col gap-y-1.5 p-1.5">
            <Input
              value={field.icon}
              placeholder={t`Saisir le nom d'icône Phosphor`}
              aria-label={t`Champ de saisie pour modifier l'icône`}
              onChange={(event) => {
                onChange({ ...field, icon: event.target.value });
              }}
            />

            <p className="text-xs opacity-80">
              <Trans>
                Visitez{" "}
                <a
                  href="https://phosphoricons.com/"
                  target="_blank"
                  className="underline"
                  rel="noopener noreferrer nofollow"
                >
                  Phosphor Icons
                </a>{" "}
                pour voir la liste des icônes disponibles
              </Trans>
            </p>
          </PopoverContent>
        </Popover>

        <Input
          className="mx-2"
          placeholder={t`Nom`}
          value={field.name}
          aria-label={t`Champ de saisie pour le nom du champ personnalisé: ${fieldName}`}
          onChange={(event) => {
            handleChange("name", event.target.value);
          }}
        />

        <Input
          className="mx-2"
          placeholder={t`Valeur`}
          value={field.value}
          aria-label={t`Champ de saisie pour la valeur du champ personnalisé: ${fieldValue}`}
          onChange={(event) => {
            handleChange("value", event.target.value);
          }}
        />

        <Button
          size="icon"
          variant="ghost"
          className="shrink-0"
          aria-label={t`Supprimer le champ personnalisé nommé ${fieldName}`}
          onClick={() => {
            onRemove(field.id);
          }}
        >
          <X />
        </Button>
      </div>
    </Reorder.Item>
  );
};

type Props = {
  className?: string;
};

export const CustomFieldsSection = ({ className }: Props) => {
  const setValue = useResumeStore((state) => state.setValue);
  const customFields = useResumeStore((state) => state.resume.data.basics.customFields);

  const onAddCustomField = () => {
    setValue("basics.customFields", [
      ...customFields,
      { id: createId(), icon: "envelope", name: "", value: "" },
    ]);
  };

  const onChangeCustomField = (field: ICustomField) => {
    const index = customFields.findIndex((item) => item.id === field.id);
    const newCustomFields = JSON.parse(JSON.stringify(customFields));
    newCustomFields[index] = field;

    setValue("basics.customFields", newCustomFields);
  };

  const onReorderCustomFields = (values: ICustomField[]) => {
    setValue("basics.customFields", values);
  };

  const onRemoveCustomField = (id: string) => {
    setValue(
      "basics.customFields",
      customFields.filter((field) => field.id !== id),
    );
  };

  return (
    <div className={cn("space-y-4", className)}>
      <AnimatePresence>
        <Reorder.Group
          axis="y"
          className="space-y-4"
          values={customFields}
          aria-label={t`Liste des champs personnalisés`}
          onReorder={onReorderCustomFields}
        >
          {customFields.map((field) => (
            <CustomField
              key={field.id}
              field={field}
              onChange={onChangeCustomField}
              onRemove={onRemoveCustomField}
            />
          ))}
        </Reorder.Group>
      </AnimatePresence>

      <Button
        variant="link"
        aria-label={t`Ajouter un champ personnalisé`}
        onClick={onAddCustomField}
      >
        <Plus className="mr-2" />
        <span>{t`Add a custom field`}</span>
      </Button>
    </div>
  );
};
