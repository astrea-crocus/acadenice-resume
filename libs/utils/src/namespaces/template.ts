export const templatesList = [
  "Ant Man",
  "Iron Man",
  "Hulk",
  "Captain America",
  "Thor",
  "azurill",
  "bronzor",
  "chikorita",
  "ditto",
  "gengar",
  "glalie",
  "kakuna",
  "leafish",
  "nosepass",
  "onyx",
  "pikachu",
  "rhyhorn",
] as const;

export type Template = (typeof templatesList)[number];

export const previewTemplatesList = ["Example", ...templatesList] as const;

export type Preview = (typeof previewTemplatesList)[number];
