/* eslint-disable lingui/no-unlocalized-strings */
import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "@lingui/macro";
import { defaultSocial, socialSchema } from "@reactive-resume/schema";
import {
  Avatar,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@reactive-resume/ui";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { BrandIcon } from "@/client/components/brand-icon";

import { SectionDialog } from "../sections/shared/section-dialog";
import { URLInput } from "../sections/shared/url-input";

const formSchema = socialSchema;

type FormValues = z.infer<typeof formSchema>;

export const SocialsDialog = () => {
  const form = useForm<FormValues>({
    defaultValues: defaultSocial,
    resolver: zodResolver(formSchema),
  });

  return (
    <SectionDialog<FormValues> id="socials" form={form} defaultValues={defaultSocial}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          name="network"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="profile-network">{t`Network`}</FormLabel>
              <FormControl>
                {/* eslint-disable-next-line lingui/no-unlocalized-strings */}
                <Input
                  {...field}
                  id="profile-network"
                  placeholder="GitHub"
                  aria-label={t`Nom du réseau social ou plateforme`}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="profile-username">{t`Username`}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="profile-username"
                  placeholder="john.doe"
                  aria-label={t`Nom d'utilisateur sur la plateforme`}
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
              <FormLabel htmlFor="profile-url">{t`Website`}</FormLabel>
              <FormControl>
                <URLInput
                  {...field}
                  id="profile-url"
                  placeholder="https://github.com/johndoe"
                  aria-label={t`URL du profil`}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="icon"
          control={form.control}
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel htmlFor="profile-icon">{t`Icon`}</FormLabel>
              <FormControl>
                <div className="flex items-center gap-x-2">
                  <Avatar className="size-8 bg-white p-1.5" aria-hidden="true">
                    <BrandIcon slug={field.value} />
                  </Avatar>
                  <Input
                    {...field}
                    id="profile-icon"
                    placeholder="Veuillez à mettre le nom de la plateform en minuscule. Ex. : github"
                    aria-label={t`Nom de l'icône de la plateforme`}
                    onChange={field.onChange}
                  />
                </div>
              </FormControl>
              <FormMessage />
              <FormDescription className="ml-10">
                Réalisé par{" "}
                <a
                  href="https://simpleicons.org/"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="font-bold text-acadeorange-600"
                >
                  Simple Icons
                </a>
                .
              </FormDescription>
            </FormItem>
          )}
        />
      </div>
    </SectionDialog>
  );
};
