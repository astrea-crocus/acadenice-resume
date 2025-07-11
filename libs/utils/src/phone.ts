import type { CountryCode } from "libphonenumber-js";
import { parsePhoneNumberFromString } from "libphonenumber-js";

/**
 * Convertit un numéro national en format international (ex: +33605040302).
 * @param phone Numéro à transformer (ex: "06 05 04 03 02")
 * @param country Code pays ISO 3166-1 alpha-2 (ex: "FR")
 * @returns Numéro au format international ou null si invalide
 */
export function toInternationalFormat(phone: string, country: CountryCode): string | null {
  const phoneNumber = parsePhoneNumberFromString(phone, country);
  return phoneNumber?.isValid() ? phoneNumber.number : null;
}
