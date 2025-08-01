import { t } from "@lingui/macro";
import { basicsSchema } from "@reactive-resume/schema";
import { Input, Label, ScrollArea } from "@reactive-resume/ui";
import dayjs from "dayjs";

import { useResumeStore } from "@/client/stores/resume";

import { ResumeIcon, URLInput } from "../../shared";
import { CustomFieldsSection } from "../custom/section";
import { PictureSection } from "./picture/section";

export const Basics = () => {
  const setValue = useResumeStore((state) => state.setValue);
  const basics = useResumeStore((state) => state.resume.data.basics);

  const hasNameError = !basicsSchema.pick({ name: true }).safeParse({ name: basics.name }).success;
  const hasEmailError = !basicsSchema.pick({ email: true }).safeParse({ email: basics.email })
    .success;

  return (
    <section id="basics" className="flex h-screen flex-col">
      <header className="flex items-center justify-between py-2">
        <div className="mx-auto flex items-center gap-x-4">
          <ResumeIcon
            id="basics"
            size={18}
            aria-label={t`Icône de la section Informations de base`}
          />
          <h2 className="line-clamp-1 text-2xl font-bold lg:text-3xl/loose">{t`Informations de base`}</h2>
        </div>
      </header>

      <div className="flex-1 overflow-hidden">
        <div className="flex h-full">
          <ScrollArea orientation="vertical" className="h-full flex-1 px-6 py-2">
            <div className="grid gap-x-5 gap-y-10 @container/left">
              <div className="sm:col-span-2">
                <PictureSection />
              </div>

              <div className="space-y-4 sm:col-span-2">
                <Label className="font-bold" htmlFor="basics.name">{t`Nom complet`}</Label>
                <Input
                  id="basics.name"
                  placeholder="Jean Dupont"
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
                <Label
                  className="font-bold"
                  htmlFor="basics.headline"
                >{t`Titre professionnel`}</Label>
                <Input
                  id="basics.headline"
                  placeholder="Ex. : Développeur Web Créatif et Innovant"
                  value={basics.headline}
                  aria-label={t`Titre professionnel`}
                  onChange={(event) => {
                    setValue("basics.headline", event.target.value);
                  }}
                />
              </div>

              <div className="space-y-1.5">
                <Label className="font-bold" htmlFor="basics.email">{t`Email`}</Label>
                <Input
                  id="basics.email"
                  placeholder="jean.dupont@example.com"
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
                <Label className="font-bold" htmlFor="basics.portfolio">{t`Portfolio`}</Label>
                <URLInput
                  id="basics.portfolio"
                  value={basics.portfolio}
                  placeholder="Ex. : https://example.com"
                  aria-label={t`URL du portfolio`}
                  onChange={(value) => {
                    setValue("basics.portfolio", value);
                  }}
                />
              </div>

              <div className="space-y-1.5">
                <Label className="font-bold" htmlFor="basics.phone">{t`Téléphone`}</Label>
                <Input
                  id="basics.phone"
                  placeholder="06 05 04 03 02"
                  value={basics.phone}
                  aria-label={t`Numéro de téléphone`}
                  onChange={(event) => {
                    setValue("basics.phone", event.target.value);
                  }}
                />
              </div>

              <div className="space-y-1.5">
                <Label className="font-bold" htmlFor="basics.location">{t`Ville`}</Label>
                <Input
                  id="basics.location"
                  placeholder="Nice, 06000"
                  value={basics.location}
                  aria-label={t`Ville`}
                  onChange={(event) => {
                    setValue("basics.location", event.target.value);
                  }}
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  className="font-bold"
                  htmlFor="basics.birthday"
                >{t`Date de naissance`}</Label>
                <Input
                  id="basics.birthday"
                  type="date"
                  min={dayjs().subtract(100, "year").format("YYYY-MM-DD")}
                  max={dayjs().subtract(13, "year").format("YYYY-MM-DD")}
                  value={basics.birthday ? dayjs(basics.birthday).format("YYYY-MM-DD") : ""}
                  aria-label={t`Date de naissance`}
                  onChange={(event) => {
                    const inputValue = event.target.value;
                    const parsed = inputValue ? dayjs(inputValue, "YYYY-MM-DD", true) : null;
                    if (parsed?.isValid()) {
                      setValue("basics.birthday", parsed.toDate());
                    } else {
                      setValue("basics.birthday", undefined);
                    }
                  }}
                />
              </div>

              <CustomFieldsSection className="sm:col-span-2" />
            </div>
          </ScrollArea>
        </div>
      </div>
    </section>
  );
};
