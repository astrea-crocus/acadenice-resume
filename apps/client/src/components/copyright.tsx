/* eslint-disable lingui/no-unlocalized-strings */
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
      Sous licence{" "}
      <a
        target="_blank"
        rel="noopener noreferrer nofollow"
        href="https://github.com/AmruthPillai/Reactive-Resume/blob/main/LICENSE.md"
      >
        MIT
      </a>
    </span>
    <span>
      Un projet passionné de <a href="https://www.amruthpillai.com/">Amruth Pillai</a>, modifier par
      nos soins.
    </span>

    <span className="mt-4">Reactive Resume {"v" + appVersion}</span>
  </div>
);
