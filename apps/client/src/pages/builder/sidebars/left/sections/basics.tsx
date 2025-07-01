import { t } from "@lingui/macro";
import { basicsSchema } from "@reactive-resume/schema";
import { Input, Label } from "@reactive-resume/ui";

import { useResumeStore } from "@/client/stores/resume";

import { CustomFieldsSection } from "./custom/section";
import { PictureSection } from "./picture/section";
import { SectionIcon } from "./shared/section-icon";
import { URLInput } from "./shared/url-input";

export const BasicsSection = () => {
  const setValue = useResumeStore((state) => state.setValue);
  const basics = useResumeStore((state) => state.resume.data.basics);

  // Validation d’erreur pour email et name
  const hasNameError = !basicsSchema.pick({ name: true }).safeParse({ name: basics.name }).success;
  const hasEmailError = !basicsSchema.pick({ email: true }).safeParse({ email: basics.email })
    .success;

  return (
    <section id="basics" className="grid gap-y-6" aria-label={t`Section Informations de base`}>
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <SectionIcon
            id="basics"
            size={18}
            aria-label={t`Icône de la section Informations de base`}
          />
          <h2 className="line-clamp-1 text-2xl font-bold lg:text-3xl">{t`Informations de base`}</h2>
        </div>
      </header>

      <main className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <PictureSection />
        </div>

        <div className="space-y-4 sm:col-span-2">
          <Label htmlFor="basics.name">{t`Nom complet`}</Label>
          <Input
            id="basics.name"
            value={basics.name}
            aria-invalid={hasNameError}
            aria-describedby={hasNameError ? "basics.name.error" : undefined}
            onChange={(event) => {
              setValue("basics.name", event.target.value);
            }}
          />
          {hasNameError && (
            <p id="basics.name.error" className="text-sm text-red-600" role="alert">
              {t`Le nom complet est invalide.`}
            </p>
          )}
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="basics.headline">{t`Titre professionnel`}</Label>
          <Input
            id="basics.headline"
            value={basics.headline}
            aria-label={t`Titre professionnel`}
            onChange={(event) => {
              setValue("basics.headline", event.target.value);
            }}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="basics.email">{t`Email`}</Label>
          <Input
            id="basics.email"
            placeholder="john.doe@example.com"
            value={basics.email}
            aria-invalid={hasEmailError}
            aria-describedby={hasEmailError ? "basics.email.error" : undefined}
            onChange={(event) => {
              setValue("basics.email", event.target.value);
            }}
          />
          {hasEmailError && (
            <p id="basics.email.error" className="text-sm text-red-600" role="alert">
              {t`L'adresse email est invalide.`}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="basics.url">{t`Site web`}</Label>
          <URLInput
            id="basics.url"
            value={basics.url}
            placeholder="https://example.com"
            aria-label={t`URL du site web`}
            onChange={(value) => {
              setValue("basics.url", value);
            }}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="basics.phone">{t`Téléphone`}</Label>
          <Input
            id="basics.phone"
            placeholder="+1 (123) 4567 7890"
            value={basics.phone}
            aria-label={t`Numéro de téléphone`}
            onChange={(event) => {
              setValue("basics.phone", event.target.value);
            }}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="basics.location">{t`Localisation`}</Label>
          <Input
            id="basics.location"
            value={basics.location}
            aria-label={t`Localisation`}
            onChange={(event) => {
              setValue("basics.location", event.target.value);
            }}
          />
        </div>

        <CustomFieldsSection className="sm:col-span-2" />
      </main>
    </section>
  );
};
