import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "@lingui/macro";
import { defaultPublication, publicationSchema } from "@reactive-resume/schema";
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

const formSchema = publicationSchema;

type FormValues = z.infer<typeof formSchema>;

export const PublicationsDialog = () => {
  const form = useForm<FormValues>({
    defaultValues: defaultPublication,
    resolver: zodResolver(formSchema),
  });

  return (
    <SectionDialog<FormValues> id="publications" form={form} defaultValues={defaultPublication}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="publication-name">{t`Name`}</FormLabel>
              <FormControl>
                <Input {...field} id="publication-name" aria-label={t`Nom de la publication`} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="publisher"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="publication-publisher">{t`Publisher`}</FormLabel>
              <FormControl>
                <Input {...field} id="publication-publisher" aria-label={t`Éditeur ou organisme`} />
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
              <FormLabel htmlFor="publication-date">{t`Date`}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="publication-date"
                  placeholder={t`March 2023`}
                  aria-label={t`Date de publication`}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="url"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="publication-url">{t`Website`}</FormLabel>
              <FormControl>
                <URLInput
                  {...field}
                  id="publication-url"
                  aria-label={t`URL du site web de la publication`}
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
              <FormLabel htmlFor="publication-summary">{t`Summary`}</FormLabel>
              <FormControl>
                <RichInput
                  {...field}
                  id="publication-summary"
                  content={field.value}
                  aria-label={t`Résumé ou description`}
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
