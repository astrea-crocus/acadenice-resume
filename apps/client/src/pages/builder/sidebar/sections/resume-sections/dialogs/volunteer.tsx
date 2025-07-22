import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "@lingui/macro";
import { defaultVolunteer, volunteerSchema } from "@reactive-resume/schema";
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

const formSchema = volunteerSchema;

type FormValues = z.infer<typeof formSchema>;

export const VolunteerDialog = () => {
  const form = useForm<FormValues>({
    defaultValues: defaultVolunteer,
    resolver: zodResolver(formSchema),
  });

  return (
    <SectionDialog<FormValues> id="volunteer" form={form} defaultValues={defaultVolunteer}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          name="organization"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="volunteer-organization">{t`Organization`}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="volunteer-organization"
                  aria-label={t`Organisation bénévole`}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="position"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="volunteer-position">{t`Position`}</FormLabel>
              <FormControl>
                <Input {...field} id="volunteer-position" aria-label={t`Poste bénévole`} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="date"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="volunteer-date">{t`Date or Date Range`}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="volunteer-date"
                  placeholder={t`March 2023 - Present`}
                  aria-label={t`Date ou période bénévole`}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="location"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="volunteer-location">{t`Location`}</FormLabel>
              <FormControl>
                <Input {...field} id="volunteer-location" aria-label={t`Lieu du bénévolat`} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="url"
          control={form.control}
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel htmlFor="volunteer-url">{t`Website`}</FormLabel>
              <FormControl>
                <URLInput
                  {...field}
                  id="volunteer-url"
                  aria-label={t`Site web associé au bénévolat`}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="summary"
          control={form.control}
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel htmlFor="volunteer-summary">{t`Summary`}</FormLabel>
              <FormControl>
                <RichInput
                  {...field}
                  id="volunteer-summary"
                  content={field.value}
                  aria-label={t`Résumé ou détails du bénévolat`}
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
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </SectionDialog>
  );
};
