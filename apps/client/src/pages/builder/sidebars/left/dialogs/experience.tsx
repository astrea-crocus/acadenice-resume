import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "@lingui/macro";
import { defaultExperience, experienceSchema } from "@reactive-resume/schema";
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

const formSchema = experienceSchema;

type FormValues = z.infer<typeof formSchema>;

export const ExperienceDialog = () => {
  const form = useForm<FormValues>({
    defaultValues: defaultExperience,
    resolver: zodResolver(formSchema),
  });

  return (
    <SectionDialog<FormValues> id="experience" form={form} defaultValues={defaultExperience}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          name="company"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t`Company`}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  aria-label={t({ message: "Nom de l'entreprise ou organisation" })}
                  aria-describedby="description-company"
                />
              </FormControl>
              <FormMessage id="description-company" />
            </FormItem>
          )}
        />

        <FormField
          name="position"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t({
                  message: "Position",
                  context: "Position held at a company, for example, Software Engineer",
                })}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  aria-label={t({ message: "Poste occupé dans l'entreprise" })}
                  aria-describedby="description-position"
                />
              </FormControl>
              <FormMessage id="description-position" />
            </FormItem>
          )}
        />

        <FormField
          name="date"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t`Date or Date Range`}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t`March 2023 - Present`}
                  aria-label={t({ message: "Date ou période d'emploi" })}
                  aria-describedby="description-date"
                />
              </FormControl>
              <FormMessage id="description-date" />
            </FormItem>
          )}
        />

        <FormField
          name="location"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t`Location`}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  aria-label={t({ message: "Lieu de travail ou localisation de l'emploi" })}
                  aria-describedby="description-location"
                />
              </FormControl>
              <FormMessage id="description-location" />
            </FormItem>
          )}
        />

        <FormField
          name="url"
          control={form.control}
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>{t`Website`}</FormLabel>
              <FormControl>
                <URLInput
                  {...field}
                  aria-label={t({ message: "Site web associé à l'emploi ou l'entreprise" })}
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
              <FormLabel>{t`Summary`}</FormLabel>
              <FormControl>
                <RichInput
                  {...field}
                  aria-label={t({ message: "Résumé ou description détaillée de l'expérience" })}
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
