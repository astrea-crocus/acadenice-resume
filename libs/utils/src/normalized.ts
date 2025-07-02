export const normalizeToFileName = (name: string) => {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036F]/g, "")
    .replace(/[\s_-]/g, "");
};

export const normalizeTemplateName = (name: string) => {
  return name.normalize("NFD").replace(/[\u0300-\u036F]/g, "");
};
