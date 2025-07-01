import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "@lingui/macro";
import { defaultEducation, educationSchema } from "@reactive-resume/schema";
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

const formSchema = educationSchema;

type FormValues = z.infer<typeof formSchema>;

export const EducationDialog = () => {
  const form = useForm<FormValues>({
    defaultValues: defaultEducation,
    resolver: zodResolver(formSchema),
  });

  return (
    <SectionDialog<FormValues> id="education" form={form} defaultValues={defaultEducation}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          name="institution"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t`Institution`}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  aria-label={t({ message: "Nom de l'établissement d'enseignement" })}
                  aria-describedby="description-institution"
                />
              </FormControl>
              <FormMessage id="description-institution" />
            </FormItem>
          )}
        />

        <FormField
          name="studyType"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t({
                  message: "Type of Study",
                  comment: "For example, Bachelor's Degree or Master's Degree",
                })}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  aria-label={t({
                    message: "Type de diplôme ou formation (exemple : Licence, Master)",
                  })}
                  aria-describedby="description-studyType"
                />
              </FormControl>
              <FormMessage id="description-studyType" />
            </FormItem>
          )}
        />

        <FormField
          name="area"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t({
                  message: "Area of Study",
                  comment: "For example, Computer Science or Business Administration",
                })}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  aria-label={t({ message: "Domaine ou spécialité d'étude" })}
                  aria-describedby="description-area"
                />
              </FormControl>
              <FormMessage id="description-area" />
            </FormItem>
          )}
        />

        <FormField
          name="score"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t({
                  message: "Score",
                  comment: "Score or honors for the degree, for example, CGPA or magna cum laude",
                })}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="9.2 GPA"
                  aria-label={t({ message: "Note, mention ou moyenne obtenue" })}
                  aria-describedby="description-score"
                />
              </FormControl>
              <FormMessage id="description-score" />
            </FormItem>
          )}
        />

        <FormField
          name="date"
          control={form.control}
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>{t`Date or Date Range`}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t`March 2023 - Present`}
                  aria-label={t({ message: "Date ou période d'études" })}
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
            <FormItem className="sm:col-span-2">
              <FormLabel>{t`Website`}</FormLabel>
              <FormControl>
                <URLInput
                  {...field}
                  aria-label={t({ message: "Site web associé à cet établissement ou formation" })}
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
                  aria-label={t({ message: "Résumé ou description détaillée des études" })}
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
