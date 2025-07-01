import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "@lingui/macro";
import { awardSchema, defaultAward } from "@reactive-resume/schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  RichInput,
} from "@reactive-resume/ui";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { AiActions } from "@/client/components/ai-actions";

import { SectionDialog } from "../sections/shared/section-dialog";
import { URLInput } from "../sections/shared/url-input";

const formSchema = awardSchema;
type FormValues = z.infer<typeof formSchema>;

export const AwardsDialog = () => {
  const form = useForm<FormValues>({
    defaultValues: defaultAward,
    resolver: zodResolver(formSchema),
  });

  // Idéalement, pour accessibilité : associer chaque champ à son label + ajouter aria-label explicites si besoin

  return (
    <SectionDialog<FormValues> id="awards" form={form} defaultValues={defaultAward}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t({ message: "Titre", context: "Nom de la récompense" })}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  aria-label={t`Titre de la récompense`}
                  aria-describedby="description-title"
                />
              </FormControl>
              <FormMessage id="description-title" />
            </FormItem>
          )}
        />

        <FormField
          name="awarder"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t`Décerné par`}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  aria-label={t`Nom de l'organisme ou personne ayant décerné la récompense`}
                  aria-describedby="description-awarder"
                />
              </FormControl>
              <FormMessage id="description-awarder" />
            </FormItem>
          )}
        />

        <FormField
          name="date"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t`Date`}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t({
                    message: "Mars 2023",
                    comment: "Le mois et l'année doivent être uniformes dans toutes les langues.",
                  })}
                  aria-label={t`Date à laquelle la récompense a été obtenue`}
                  aria-describedby="description-date"
                />
              </FormControl>
              <FormMessage id="description-date" />
            </FormItem>
          )}
        />

        <FormField
          name="url"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t`Site web`}</FormLabel>
              <FormControl>
                <URLInput
                  {...field}
                  aria-label={t`Lien vers le site web relatif à la récompense`}
                  aria-describedby="description-url"
                />
              </FormControl>
              <FormMessage id="description-url" />
            </FormItem>
          )}
        />

        <FormField
          name="summary"
          control={form.control}
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>{t`Résumé`}</FormLabel>
              <FormControl>
                <RichInput
                  {...field}
                  aria-label={t`Résumé ou description détaillée de la récompense`}
                  aria-describedby="description-summary"
                  content={field.value}
                  footer={(editor) => (
                    <AiActions
                      value={editor.getText()}
                      onChange={(value) => {
                        editor.commands.setContent(value, true);
                        field.onChange(value);
                      }}
                    />
                  )}
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage id="description-summary" />
            </FormItem>
          )}
        />
      </div>
    </SectionDialog>
  );
};
