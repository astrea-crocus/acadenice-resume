import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "@lingui/macro";
import { defaultSoftSkill, softSkillSchema } from "@reactive-resume/schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@reactive-resume/ui";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { SectionDialog } from "../sections/shared/section-dialog";

type FormValues = z.infer<typeof softSkillSchema>;

export const SoftSkillsDialog = () => {
  const form = useForm<FormValues>({
    defaultValues: defaultSoftSkill,
    resolver: zodResolver(softSkillSchema),
  });

  return (
    <SectionDialog<FormValues> id="softSkills" form={form} defaultValues={defaultSoftSkill}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t`Name`}</FormLabel>
              <FormControl>
                <Input {...field} aria-label={t`Nom du savoir-être`} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </SectionDialog>
  );
};
