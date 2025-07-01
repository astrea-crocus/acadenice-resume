import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "@lingui/macro";
import { X } from "@phosphor-icons/react";
import { defaultProject, projectSchema } from "@reactive-resume/schema";
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
  RichInput,
} from "@reactive-resume/ui";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { AiActions } from "@/client/components/ai-actions";

import { SectionDialog } from "../sections/shared/section-dialog";
import { URLInput } from "../sections/shared/url-input";

const formSchema = projectSchema;

type FormValues = z.infer<typeof formSchema>;

const handleDragOver = (e: React.DragEvent) => {
  e.preventDefault();
};

export const ProjectsDialog = () => {
  const form = useForm<FormValues>({
    defaultValues: defaultProject,
    resolver: zodResolver(formSchema),
  });

  const [pendingKeyword, setPendingKeyword] = useState("");
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDrop = (
    e: React.DragEvent,
    dropIndex: number,
    field: { value: string[]; onChange: (value: string[]) => void },
  ) => {
    e.preventDefault();
    if (draggedIndex === null) return;

    const newKeywords = [...field.value];
    const [draggedItem] = newKeywords.splice(draggedIndex, 1);
    newKeywords.splice(dropIndex, 0, draggedItem);

    field.onChange(newKeywords);
    setDraggedIndex(null);
  };

  return (
    <SectionDialog<FormValues>
      id="projects"
      form={form}
      defaultValues={defaultProject}
      pendingKeyword={pendingKeyword}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="project-name">{t`Name`}</FormLabel>
              <FormControl>
                <Input {...field} id="project-name" aria-label={t`Nom du projet`} />
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
              <FormLabel htmlFor="project-description">{t`Description`}</FormLabel>
              <FormControl>
                <Input {...field} id="project-description" aria-label={t`Description du projet`} />
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
              <FormLabel htmlFor="project-date">{t`Date or Date Range`}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="project-date"
                  placeholder={t`March 2023 - Present`}
                  aria-label={t`Date ou période du projet`}
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
              <FormLabel htmlFor="project-url">{t`Website`}</FormLabel>
              <FormControl>
                <URLInput
                  {...field}
                  id="project-url"
                  placeholder="https://rxresu.me"
                  aria-label={t`URL du site web du projet`}
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
              <FormLabel htmlFor="project-summary">{t`Summary`}</FormLabel>
              <FormControl>
                <RichInput
                  {...field}
                  content={field.value}
                  id="project-summary"
                  aria-label={t`Résumé du projet`}
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

        <FormField
          name="keywords"
          control={form.control}
          render={({ field }) => (
            <div className="space-y-3 sm:col-span-2">
              <FormItem>
                <FormLabel htmlFor="project-keywords">{t`Keywords`}</FormLabel>
                <FormControl>
                  <BadgeInput
                    {...field}
                    id="project-keywords"
                    aria-label={t`Mots-clés du projet`}
                    setPendingKeyword={setPendingKeyword}
                  />
                </FormControl>
                <FormDescription>
                  {t`You can add multiple keywords by separating them with a comma or pressing enter.`}
                </FormDescription>
                <FormMessage />
              </FormItem>

              <div
                className="flex flex-wrap items-center gap-x-2 gap-y-3"
                aria-label={t`Liste des mots-clés`}
                role="list"
              >
                <AnimatePresence>
                  {field.value.map((item, index) => (
                    <motion.div
                      key={item}
                      layout
                      draggable
                      initial={{ opacity: 0, y: -50 }}
                      animate={{ opacity: 1, y: 0, transition: { delay: index * 0.1 } }}
                      exit={{ opacity: 0, x: -50 }}
                      role="listitem"
                      aria-grabbed={draggedIndex === index ? "true" : "false"}
                      onDragStart={() => {
                        setDraggedIndex(index);
                      }}
                      onDragOver={handleDragOver}
                      onDrop={(e) => {
                        handleDrop(e, index, field);
                      }}
                    >
                      <Badge className="cursor-move" aria-label={t`Mot-clé: ${item}`}>
                        <span className="mr-1">{item}</span>
                        <X
                          className="cursor-pointer"
                          size={12}
                          weight="bold"
                          role="button"
                          aria-label={t`Supprimer le mot-clé ${item}`}
                          tabIndex={0}
                          onClick={() => {
                            field.onChange(field.value.filter((v) => item !== v));
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              field.onChange(field.value.filter((v) => item !== v));
                            }
                          }}
                        />
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
