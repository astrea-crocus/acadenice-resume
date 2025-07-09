import { z } from "zod";

import { defaultUrl, urlSchema } from "../shared";
import { customFieldSchema } from "./custom";

function getDefaultBirthday() {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 14);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const defaultBirthday = getDefaultBirthday();

// Schema
export const basicsSchema = z.object({
  name: z.string(),
  headline: z.string(),
  email: z.literal("").or(z.string().email()),
  phone: z.string(),
  location: z.string(),
  portfolio: urlSchema,
  customFields: z.array(customFieldSchema),
  picture: z.object({
    url: z.string(),
    size: z.number().default(64),
    aspectRatio: z.number().default(1),
    borderRadius: z.number().default(0),
    effects: z.object({
      hidden: z.boolean().default(false),
      border: z.boolean().default(false),
      grayscale: z.boolean().default(false),
    }),
  }),
  birthday: z.string().optional(),
});

// Type
export type Basics = z.infer<typeof basicsSchema>;

// Defaults
export const defaultBasics: Basics = {
  name: "",
  headline: "",
  email: "",
  phone: "",
  location: "",
  portfolio: defaultUrl,
  customFields: [],
  picture: {
    url: "",
    size: 64,
    aspectRatio: 1,
    borderRadius: 0,
    effects: {
      hidden: false,
      border: false,
      grayscale: false,
    },
  },
  birthday: defaultBirthday,
};

export * from "./custom";
