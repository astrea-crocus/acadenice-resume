import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "@lingui/macro";
import { X } from "@phosphor-icons/react";
import { defaultInterest, interestSchema } from "@reactive-resume/schema";
import {
  Badge,
  BadgeInput,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@reactive-resume/ui";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { SectionDialog } from "../sections/shared/section-dialog";

const formSchema = interestSchema;

type FormValues = z.infer<typeof formSchema>;

export const InterestsDialog = () => {
  const form = useForm<FormValues>({
    defaultValues: defaultInterest,
    resolver: zodResolver(formSchema),
  });

  const [pendingKeyword, setPendingKeyword] = useState("");

  return (
    <SectionDialog<FormValues>
      id="interests"
      form={form}
      defaultValues={defaultInterest}
      pendingKeyword={pendingKeyword}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>{t`Name`}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  aria-label={t({ message: "Nom de l'intérêt" })}
                  aria-describedby="description-name"
                />
              </FormControl>
              <FormMessage id="description-name" />
            </FormItem>
          )}
        />

        <FormField
          name="keywords"
          control={form.control}
          render={({ field }) => (
            <div className="col-span-2 space-y-3">
              <FormItem>
                <FormLabel>{t`Keywords`}</FormLabel>
                <FormControl>
                  <BadgeInput
                    {...field}
                    setPendingKeyword={setPendingKeyword}
                    aria-label={t({
                      message:
                        "Mots-clés associés à l'intérêt, séparez-les par des virgules ou appuyez sur Entrée",
                    })}
                    aria-describedby="description-keywords"
                  />
                </FormControl>
                <FormDescription id="description-keywords">
                  {t`You can add multiple keywords by separating them with a comma or pressing enter.`}
                </FormDescription>
                <FormMessage />
              </FormItem>

              <div className="flex flex-wrap items-center gap-x-2 gap-y-3">
                <AnimatePresence>
                  {field.value.map((item, index) => (
                    <motion.div
                      key={item}
                      layout
                      initial={{ opacity: 0, y: -50 }}
                      animate={{ opacity: 1, y: 0, transition: { delay: index * 0.1 } }}
                      exit={{ opacity: 0, x: -50 }}
                    >
                      <Badge
                        className="cursor-pointer"
                        onClick={() => {
                          field.onChange(field.value.filter((v) => item !== v));
                        }}
                      >
                        <span className="mr-1">{item}</span>
                        <X size={12} weight="bold" />
                      </Badge>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}
        />
      </div>
    </SectionDialog>
  );
};
