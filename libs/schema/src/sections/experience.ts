import { z } from "zod";

import { defaultItem, defaultUrl, itemSchema, urlSchema } from "../shared";

// Schema
export const experienceSchema = itemSchema.extend({
  company: z.string().min(1),
  position: z.string(),
  location: z.string(),
  date: z.string(),
  summary: z.string(),
  url: urlSchema,
});

// Type
export type Experience = z.infer<typeof experienceSchema>;

// Defaults
export const defaultExperience: Experience = {
  ...defaultItem,
  company: "",
  position: "",
  location: "",
  date: "",
  summary: "",
  url: defaultUrl,
};

// export const personalExperienceItemSchema = z.object({
//   id: z.string(),
//   title: z.string(), // Ex: "Bénévole développeur"
//   name: z.string(), // Ex: "Hackathon Nice 2025"
//   date: z.string().optional(),
//   location: z.string().optional(),
//   description: z.string().optional(),
//   url: z.string().optional(), // Ex: lien vers le projet perso, github, etc.
// });

// export const personalExperienceSectionSchema = z.object({
//   name: z.string(), // Ex: "Expérience personnelle"
//   type: z.literal("personal_experience"), // <- identifiant unique
//   items: z.array(personalExperienceItemSchema),
// });
