import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "@lingui/macro";
import { defaultReference, referenceSchema } from "@reactive-resume/schema";
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

const formSchema = referenceSchema;

type FormValues = z.infer<typeof formSchema>;

export const ReferencesDialog = () => {
  const form = useForm<FormValues>({
    defaultValues: defaultReference,
    resolver: zodResolver(formSchema),
  });

  return (
    <SectionDialog<FormValues> id="references" form={form} defaultValues={defaultReference}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="reference-name">{t`Name`}</FormLabel>
              <FormControl>
                <Input {...field} id="reference-name" aria-label={t`Nom de la référence`} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="reference-description">{t`Description`}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="reference-description"
                  aria-label={t`Description de la référence`}
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
            <FormItem className="sm:col-span-2">
              <FormLabel htmlFor="reference-url">{t`Website`}</FormLabel>
              <FormControl>
                <URLInput
                  {...field}
                  id="reference-url"
                  aria-label={t`URL du site web de la référence`}
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
              <FormLabel htmlFor="reference-summary">{t`Summary`}</FormLabel>
              <FormControl>
                <RichInput
                  {...field}
                  id="reference-summary"
                  content={field.value}
                  aria-label={t`Résumé ou notes concernant la référence`}
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
