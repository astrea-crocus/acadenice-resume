import type { CustomSectionGroup, SectionWithItem, URL } from "@reactive-resume/schema";
import { cn, isEmptyString, sanitize } from "@reactive-resume/utils";
import get from "lodash.get";

import { Link } from "./shared/links";
import { Rating } from "./shared/ratings";

type SectionTitleProps = {
  className?: string;
  children: React.ReactNode;
};

export const SectionTitle: React.FC<SectionTitleProps> = ({ className, children }) => (
  <h4 className={cn("mb-2 border-b pb-0.5 text-sm font-bold", className)}>{children}</h4>
);

type SectionContentProps = {
  className?: string;
  columns?: number;
  children: React.ReactNode;
};

export const SectionContent: React.FC<SectionContentProps> = ({ className, columns, children }) => (
  <div
    className={cn("grid gap-x-6 gap-y-3", className)}
    style={{ gridTemplateColumns: columns ? `repeat(${columns}, 1fr)` : undefined }}
  >
    {children}
  </div>
);

type SectionProps<T> = {
  section: SectionWithItem<T> | CustomSectionGroup;
  children?: (item: T) => React.ReactNode;
  className?: string;
  urlKey?: keyof T;
  levelKey?: keyof T;
  summaryKey?: keyof T;
  keywordsKey?: keyof T;
};

export const Section = <T,>({
  section,
  children,
  className,
  urlKey,
  levelKey,
  summaryKey,
  keywordsKey,
}: SectionProps<T>) => {
  if (!section.visible || section.items.length === 0) return null;

  return (
    <section id={section.id}>
      <SectionTitle>{section.name}</SectionTitle>

      <SectionContent columns={section.columns}>
        {section.items
          .filter((item) => item.visible)
          .map((item) => {
            const url = (urlKey && get(item, urlKey)) as URL | undefined;
            const level = (levelKey && get(item, levelKey, 0)) as number | undefined;
            const summary = (summaryKey && get(item, summaryKey, "")) as string | undefined;
            const keywords = (keywordsKey && get(item, keywordsKey, [])) as string[] | undefined;

            return (
              <div key={item.id} className={cn("space-y-2", className)}>
                <div>
                  {children?.(item as T)}
                  {url && section.separateLinks && <Link url={url} />}
                </div>

                {summary && !isEmptyString(summary) && (
                  <div
                    dangerouslySetInnerHTML={{ __html: sanitize(summary) }}
                    className="wysiwyg group-[.sidebar]:prose-invert"
                  />
                )}

                {level !== undefined && level > 0 && <Rating level={level} />}

                {keywords && keywords.length > 0 && (
                  <p className="text-sm">{keywords.join(", ")}</p>
                )}
              </div>
            );
          })}
      </SectionContent>
    </section>
  );
};
