import { t } from "@lingui/macro";
import { createId } from "@paralleldrive/cuid2";
import { CopySimple, PencilSimple, Plus } from "@phosphor-icons/react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import type { SectionItem, SectionWithItem } from "@reactive-resume/schema";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
  ScrollArea,
} from "@reactive-resume/ui";
import { produce } from "immer";
import get from "lodash.get";
import { useEffect } from "react";
import type { UseFormReturn } from "react-hook-form";

import type { DialogName } from "@/client/stores/dialog";
import { useDialog } from "@/client/stores/dialog";
import { useResumeStore } from "@/client/stores/resume";

type Props<T extends SectionItem> = {
  id: DialogName;
  form: UseFormReturn<T>;
  defaultValues: T;
  pendingKeyword?: string;
  children: React.ReactNode;
};

export const SectionDialog = <T extends SectionItem>({
  id,
  form,
  defaultValues,
  pendingKeyword,
  children,
}: Props<T>) => {
  const { isOpen, mode, close, payload } = useDialog<T>(id);

  const setValue = useResumeStore((state) => state.setValue);
  const section = useResumeStore((state) =>
    get(state.resume.data.sections, id),
  ) as SectionWithItem<T> | null;

  const isCreate = mode === "create";
  const isUpdate = mode === "update";
  const isDelete = mode === "delete";
  const isDuplicate = mode === "duplicate";

  useEffect(() => {
    if (isOpen) onReset();
  }, [isOpen, payload]);

  const onSubmit = (values: T) => {
    if (!section) return;

    if (isCreate || isDuplicate) {
      if (pendingKeyword && "keywords" in values) {
        values.keywords.push(pendingKeyword);
      }

      setValue(
        `sections.${id}.items`,
        produce(section.items, (draft: T[]): void => {
          draft.push({ ...values, id: createId() });
        }),
      );
    }

    if (isUpdate) {
      if (!payload.item?.id) return;

      if (pendingKeyword && "keywords" in values) {
        values.keywords.push(pendingKeyword);
      }

      setValue(
        `sections.${id}.items`,
        produce(section.items, (draft: T[]): void => {
          const index = draft.findIndex((item) => item.id === payload.item?.id);
          if (index === -1) return;
          draft[index] = values;
        }),
      );
    }

    if (isDelete) {
      if (!payload.item?.id) return;

      setValue(
        `sections.${id}.items`,
        produce(section.items, (draft: T[]): void => {
          const index = draft.findIndex((item) => item.id === payload.item?.id);
          if (index === -1) return;
          draft.splice(index, 1);
        }),
      );
    }

    close();
  };

  const onReset = () => {
    if (isCreate) form.reset({ ...defaultValues, id: createId() } as T);
    if (isUpdate) form.reset({ ...defaultValues, ...payload.item });
    if (isDuplicate) form.reset({ ...payload.item, id: createId() } as T);
    if (isDelete) form.reset({ ...defaultValues, ...payload.item });
  };

  let dialogAriaLabel: string | undefined;
  switch (true) {
    case isCreate: {
      dialogAriaLabel = t`Dialogue de création d'un nouvel élément`;
      break;
    }
    case isUpdate: {
      dialogAriaLabel = t`Dialogue de mise à jour d'un élément existant`;
      break;
    }
    case isDuplicate: {
      dialogAriaLabel = t`Dialogue de duplication d'un élément existant`;
      break;
    }
    default: {
      dialogAriaLabel = undefined;
    }
  }

  let buttonAriaLabel: string | undefined;
  switch (true) {
    case isCreate: {
      buttonAriaLabel = t`Bouton pour créer un nouvel élément`;
      break;
    }
    case isUpdate: {
      buttonAriaLabel = t`Bouton pour enregistrer les modifications`;
      break;
    }
    case isDuplicate: {
      buttonAriaLabel = t`Bouton pour dupliquer l'élément`;
      break;
    }
    default: {
      buttonAriaLabel = undefined;
    }
  }

  if (isDelete) {
    return (
      <AlertDialog
        open={isOpen}
        aria-label={t`Dialogue de confirmation de suppression`}
        onOpenChange={close}
      >
        <AlertDialogContent
          className="z-50"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="delete-dialog-title"
          aria-describedby="delete-dialog-description"
        >
          <Form {...form}>
            <form>
              <AlertDialogHeader>
                <AlertDialogTitle id="delete-dialog-title">{t`Êtes-vous sûr de vouloir supprimer cet élément ?`}</AlertDialogTitle>
                <AlertDialogDescription id="delete-dialog-description">
                  {t`Cette action peut être annulée en cliquant sur le bouton d'annulation dans la barre d'outils flottante.`}
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel
                  aria-label={t`Annuler la suppression`}
                >{t`Annuler`}</AlertDialogCancel>
                <AlertDialogAction
                  variant="error"
                  aria-label={t`Confirmer la suppression`}
                  onClick={form.handleSubmit(onSubmit)}
                >
                  {t`Supprimer`}
                </AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <Dialog open={isOpen} aria-label={dialogAriaLabel} onOpenChange={close}>
      <DialogContent
        className="z-50"
        role="dialog"
        aria-modal="true"
        aria-labelledby="section-dialog-title"
      >
        <Form {...form}>
          <ScrollArea>
            <form
              className="max-h-[60vh] space-y-6 lg:max-h-fit"
              aria-describedby="section-dialog-description"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <DialogHeader>
                <DialogTitle id="section-dialog-title">
                  <div className="flex items-center space-x-2.5">
                    {isCreate && <Plus aria-hidden="true" />}
                    {isUpdate && <PencilSimple aria-hidden="true" />}
                    {isDuplicate && <CopySimple aria-hidden="true" />}
                    <h2>
                      {isCreate && t`Créer un nouvel élément`}
                      {isUpdate && t`Mettre à jour un élément existant`}
                      {isDuplicate && t`Dupliquer un élément existant`}
                    </h2>
                  </div>
                </DialogTitle>

                {/* Description cachée pour les lecteurs d’écran */}
                <VisuallyHidden>
                  <DialogDescription id="section-dialog-description">
                    {isCreate &&
                      t`Remplissez le formulaire pour créer un nouvel élément dans cette section.`}
                    {isUpdate &&
                      t`Modifiez les champs pour mettre à jour cet élément dans la section.`}
                    {isDuplicate &&
                      t`Modifiez les champs si vous souhaitez dupliquer cet élément avec des modifications.`}
                  </DialogDescription>
                </VisuallyHidden>
              </DialogHeader>

              {children}

              <DialogFooter>
                <Button type="submit" aria-label={buttonAriaLabel}>
                  {isCreate && t`Créer`}
                  {isUpdate && t`Enregistrer`}
                  {isDuplicate && t`Dupliquer`}
                </Button>
              </DialogFooter>
            </form>
          </ScrollArea>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
