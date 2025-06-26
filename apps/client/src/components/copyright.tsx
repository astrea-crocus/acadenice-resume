import { t } from "@lingui/macro";
import { cn } from "@reactive-resume/utils";

type Props = {
  className?: string;
};

export const Copyright = ({ className }: Props) => (
  <div
    className={cn(
      "prose prose-sm prose-zinc flex max-w-none flex-col gap-y-1 text-xs opacity-60 dark:prose-invert",
      className,
    )}
  >
    <span>
      {t`Sous licence`}{" "}
      <a
        target="_blank"
        rel="noopener noreferrer nofollow"
        href="https://github.com/AmruthPillai/Reactive-Resume/blob/main/LICENSE.md"
      >
        MIT
      </a>
    </span>
    <span>
      {t`Créer par`} <a href="https://www.amruthpillai.com/">{t`Amruth Pillai`}</a>,{" "}
      {t`mis à votre disposition par nous.`}
    </span>

    <span className="mt-4">
      {t`Reactive Resume`} {"v" + appVersion}
    </span>
  </div>
);
