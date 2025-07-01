import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "@lingui/macro";
import { certificationSchema, defaultCertification } from "@reactive-resume/schema";
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

const formSchema = certificationSchema;

type FormValues = z.infer<typeof formSchema>;

export const CertificationsDialog = () => {
  const form = useForm<FormValues>({
    defaultValues: defaultCertification,
    resolver: zodResolver(formSchema),
  });

  return (
    <SectionDialog<FormValues> id="certifications" form={form} defaultValues={defaultCertification}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t({ message: "Nom", context: "Nom de la certification" })}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  aria-label={t`Nom de la certification`}
                  aria-describedby="description-name"
                />
              </FormControl>
              <FormMessage id="description-name" />
            </FormItem>
          )}
        />

        <FormField
          name="issuer"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t`Organisme délivrant`}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  aria-label={t`Nom de l'organisme ayant délivré la certification`}
                  aria-describedby="description-issuer"
                />
              </FormControl>
              <FormMessage id="description-issuer" />
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
                  aria-label={t`Date d'obtention de la certification`}
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
                  placeholder="https://udemy.com/certificate/UC-..."
                  aria-label={t`Lien vers la certification en ligne`}
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
                  aria-label={t`Résumé ou détails supplémentaires sur la certification`}
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
