import { z } from "zod";

import { defaultItem, defaultUrl, itemSchema, urlSchema } from "../shared";

// Schema
export const socialSchema = itemSchema.extend({
  network: z.string().min(1),
  username: z.string().min(1),
  icon: z
    .string()
    .describe(
      'Slug for the icon from https://simpleicons.org. For example, "github", "linkedin", etc.',
    ),
  url: urlSchema,
});

// Type
export type Social = z.infer<typeof socialSchema>;

// Defaults
export const defaultSocial: Social = {
  ...defaultItem,
  network: "",
  username: "",
  icon: "",
  url: defaultUrl,
};
