import { z } from "zod";

import type { FilterKeys } from "../shared";
import { idSchema } from "../shared";
import { awardSchema } from "./award";
import { certificationSchema } from "./certification";
import { customSectionSchema } from "./custom-section";
import { educationSchema } from "./education";
import { experienceSchema } from "./experience";
import { interestSchema } from "./interest";
import { languageSchema } from "./language";
import { projectSchema } from "./project";
import { publicationSchema } from "./publication";
import { referenceSchema } from "./reference";
import { hardSkillSchema, softSkillSchema } from "./skill";
import { socialSchema } from "./social";
import { volunteerSchema } from "./volunteer";

// Schema
export const sectionSchema = z.object({
  name: z.string(),
  columns: z.number().min(1).max(5).default(1),
  separateLinks: z.boolean().default(true),
  visible: z.boolean().default(true),
});

// Schema
export const customSchema = sectionSchema.extend({
  id: idSchema,
  items: z.array(customSectionSchema),
});

export const sectionsSchema = z.object({
  summary: sectionSchema.extend({
    id: z.literal("summary"),
    content: z.string().default(""),
  }),
  awards: sectionSchema.extend({
    id: z.literal("awards"),
    items: z.array(awardSchema),
  }),
  certifications: sectionSchema.extend({
    id: z.literal("certifications"),
    items: z.array(certificationSchema),
  }),
  education: sectionSchema.extend({
    id: z.literal("education"),
    items: z.array(educationSchema),
  }),
  experience: sectionSchema.extend({
    id: z.literal("experience"),
    items: z.array(experienceSchema),
  }),
  volunteer: sectionSchema.extend({
    id: z.literal("volunteer"),
    items: z.array(volunteerSchema),
  }),
  interests: sectionSchema.extend({
    id: z.literal("interests"),
    items: z.array(interestSchema),
  }),
  languages: sectionSchema.extend({
    id: z.literal("languages"),
    items: z.array(languageSchema),
  }),
  socials: sectionSchema.extend({
    id: z.literal("socials"),
    items: z.array(socialSchema),
  }),
  projects: sectionSchema.extend({
    id: z.literal("projects"),
    items: z.array(projectSchema),
  }),
  publications: sectionSchema.extend({
    id: z.literal("publications"),
    items: z.array(publicationSchema),
  }),
  references: sectionSchema.extend({
    id: z.literal("references"),
    items: z.array(referenceSchema),
  }),
  softSkills: sectionSchema.extend({
    id: z.literal("softSkills"),
    items: z.array(softSkillSchema),
  }),
  hardSkills: sectionSchema.extend({
    id: z.literal("hardSkills"),
    items: z.array(hardSkillSchema),
  }),
  custom: z.record(z.string(), customSchema),
});

// Detailed Types
export type Section = z.infer<typeof sectionSchema>;
export type Sections = z.infer<typeof sectionsSchema>;

export type SectionKey = "basics" | keyof Sections | `custom.${string}`;
export type SectionWithItem<T = unknown> = Sections[FilterKeys<Sections, { items: T[] }>];
export type SectionItem = SectionWithItem["items"][number];
export type CustomSectionGroup = z.infer<typeof customSchema>;

// Defaults
export const defaultSection: Section = {
  name: "",
  columns: 1,
  separateLinks: true,
  visible: true,
};

export const defaultSections: Sections = {
  summary: { ...defaultSection, id: "summary", name: "Phrase d'Accroche", content: "" },
  awards: { ...defaultSection, id: "awards", name: "Récompenses", items: [] },
  certifications: { ...defaultSection, id: "certifications", name: "Certifications", items: [] },
  education: { ...defaultSection, id: "education", name: "Formations", items: [] },
  experience: {
    ...defaultSection,
    id: "experience",
    name: "Expériences Professionnelles",
    items: [],
  },
  volunteer: { ...defaultSection, id: "volunteer", name: "Bénévolat", items: [] },
  interests: { ...defaultSection, id: "interests", name: "Centres d'intérêt", items: [] },
  languages: { ...defaultSection, id: "languages", name: "Langues", items: [] },
  socials: { ...defaultSection, id: "socials", name: "Réseaux Sociaux", items: [] },
  projects: { ...defaultSection, id: "projects", name: "Projets", items: [] },
  publications: { ...defaultSection, id: "publications", name: "Publications", items: [] },
  references: { ...defaultSection, id: "references", name: "Références", items: [] },
  softSkills: { ...defaultSection, id: "softSkills", name: "Savoirs-Être", items: [] },
  hardSkills: { ...defaultSection, id: "hardSkills", name: "Savoirs-Faire", items: [] },

  custom: {},
};

export * from "./award";
export * from "./certification";
export * from "./custom-section";
export * from "./education";
export * from "./experience";
export * from "./interest";
export * from "./language";
export * from "./project";
export * from "./publication";
export * from "./reference";
export * from "./skill";
export * from "./social";
export * from "./volunteer";
