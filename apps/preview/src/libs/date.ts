import dayjs from "dayjs";

/**
 * Calcule l'âge à partir d'une date de naissance (au format ISO ou "YYYY-MM-DD").
 * @param birthday - date de naissance sous forme de chaîne (ex: "2000-01-01")
 * @returns l'âge en années ou null si non défini ou invalide
 */
export function calculateAge(birthday?: string): number | null {
  if (!birthday) return null;

  const parsed = dayjs(birthday, "YYYY-MM-DD", true);
  if (!parsed.isValid()) return null;

  return dayjs().diff(parsed, "year");
}
