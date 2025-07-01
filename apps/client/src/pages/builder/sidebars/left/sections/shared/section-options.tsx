import { plural, t } from "@lingui/macro";
import {
  ArrowCounterClockwise,
  Broom,
  Columns,
  Eye,
  EyeSlash,
  List,
  PencilSimple,
  Plus,
  TrashSimple,
} from "@phosphor-icons/react";
import type { SectionKey, SectionWithItem } from "@reactive-resume/schema";
import { defaultSections } from "@reactive-resume/schema";
import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Input,
} from "@reactive-resume/ui";
import get from "lodash.get";
import { useMemo } from "react";

import { useDialog } from "@/client/stores/dialog";
import { useResumeStore } from "@/client/stores/resume";

type Props = { id: SectionKey };

export const SectionOptions = ({ id }: Props) => {
  const { open } = useDialog(id);

  const setValue = useResumeStore((state) => state.setValue);
  const removeSection = useResumeStore((state) => state.removeSection);

  const originalName = get(defaultSections, `${id}.name`, "") as SectionWithItem;
  const section = useResumeStore((state) => get(state.resume.data.sections, id)) as SectionWithItem;

  const hasItems = useMemo(() => "items" in section, [section]);
  const isCustomSection = useMemo(() => id.startsWith("custom"), [id]);

  const onCreate = () => {
    open("create", { id });
  };

  const toggleSeperateLinks = (checked: boolean) => {
    setValue(`sections.${id}.separateLinks`, checked);
  };

  const toggleVisibility = () => {
    setValue(`sections.${id}.visible`, !section.visible);
  };

  const onResetName = () => {
    setValue(`sections.${id}.name`, originalName);
  };

  const onChangeColumns = (value: string) => {
    setValue(`sections.${id}.columns`, Number(value));
  };

  const onResetItems = () => {
    setValue(`sections.${id}.items`, []);
  };

  const onRemove = () => {
    removeSection(id);
  };

  const sectionName = section.name || "";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild aria-label={t`Ouvrir les options de la section ${sectionName}`}>
        <Button variant="ghost" size="icon">
          <List weight="bold" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-4 w-48" aria-label={t`Menu des options de section`}>
        {hasItems && (
          <>
            <DropdownMenuItem aria-label={t`Ajouter un nouvel élément`} onClick={onCreate}>
              <Plus />
              <span className="ml-2">{t`Add a new item`}</span>
            </DropdownMenuItem>
            <DropdownMenuCheckboxItem
              checked={section.separateLinks}
              aria-label={
                section.separateLinks
                  ? t`Désactiver la séparation des liens`
                  : t`Activer la séparation des liens`
              }
              onCheckedChange={toggleSeperateLinks}
            >
              <span className="ml-0">{t`Separate Links`}</span>
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuGroup>
          <DropdownMenuItem
            aria-label={section.visible ? t`Masquer la section` : t`Afficher la section`}
            onClick={toggleVisibility}
          >
            {section.visible ? <Eye /> : <EyeSlash />}
            <span className="ml-2">{section.visible ? t`Hide` : t`Show`}</span>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger aria-label={t`Renommer la section`}>
              <PencilSimple />
              <span className="ml-2">{t`Rename`}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <div className="relative col-span-2">
                <Input
                  id={`sections.${id}.name`}
                  value={section.name}
                  aria-label={t`Champ de saisie pour renommer la section`}
                  onChange={(event) => {
                    setValue(`sections.${id}.name`, event.target.value);
                  }}
                />
                <Button
                  size="icon"
                  variant="link"
                  className="absolute inset-y-0 right-0"
                  aria-label={t`Réinitialiser le nom de la section`}
                  onClick={onResetName}
                >
                  <ArrowCounterClockwise />
                </Button>
              </div>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger aria-label={t`Choisir le nombre de colonnes`}>
              <Columns />
              <span className="ml-2">{t`Columns`}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup
                value={`${section.columns}`}
                aria-label={t`Nombre de colonnes dans la section`}
                onValueChange={onChangeColumns}
              >
                {Array.from({ length: 5 }, (_, i) => i + 1).map((value) => (
                  <DropdownMenuRadioItem key={value} value={`${value}`}>
                    {value} {plural(value, { one: "Column", other: "Columns" })}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={!hasItems}
          aria-label={t`Réinitialiser les éléments de la section`}
          onClick={onResetItems}
        >
          <Broom />
          <span className="ml-2">{t`Reset`}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-error"
          disabled={!isCustomSection}
          aria-label={t`Supprimer la section`}
          onClick={onRemove}
        >
          <TrashSimple />
          <span className="ml-2">{t`Remove`}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
