import type { CustomSectionGroup, SectionWithItem, URL } from "@reactive-resume/schema";
import { cn, isEmptyString, sanitize } from "@reactive-resume/utils";
import get from "lodash.get";

import { Link, Rating } from "./shared";

export type SectionClassNames = {
  section?: string;
  header?: string;
  items?: string;
  item?: string;
  itemChild?: string;
  itemSummary?: string;
  itemKeywords?: string;
};

type SectionProps<T> = {
  section: SectionWithItem<T> | CustomSectionGroup;
  children?: (item: T) => React.ReactNode;
  className?: string;
  classNames?: SectionClassNames;
  urlKey?: keyof T;
  levelKey?: keyof T;
  summaryKey?: keyof T;
  keywordsKey?: keyof T;
};

export const Section = <T,>({
  section,
  children,
  className,
  classNames = {},
  urlKey,
  levelKey,
  summaryKey,
  keywordsKey,
}: SectionProps<T>) => {
  if (!section.visible || section.items.length === 0) return null;

  const totalItems = section.items.length;
  const columns = section.columns;
  const remainder = totalItems % columns;

  return (
    <section id={section.id} className={cn("grid", classNames.section)}>
      <h4
        className={cn("mb-2 border-b pb-0.5 text-xl font-bold", classNames.header)}
        id={`${section.id}-title`}
      >
        {section.name}
      </h4>

      <div
        className={cn("grid gap-x-6 gap-y-2", classNames.items)}
        style={{
          gridTemplateColumns: `repeat(${columns}, 1.1fr)`,
        }}
        id={`${section.id}-items`}
      >
        {section.items
          .filter((item) => item.visible)
          .map((item, index) => {
            const isLastItem = index === totalItems - 1;
            const colSpanClass =
              remainder !== 0 && isLastItem
                ? `col-span-${columns - remainder + 1} w-fit mx-auto`
                : "";

            const url = (urlKey && get(item, urlKey)) as URL | undefined;
            const level = (levelKey && get(item, levelKey, 0)) as number | undefined;
            const summary = (summaryKey && get(item, summaryKey, "")) as string | undefined;
            const keywords = (keywordsKey && get(item, keywordsKey, [])) as string[] | undefined;

            return (
              <div
                key={item.id}
                className={cn("space-y-0.5", className, classNames.item, colSpanClass)}
                id={`${section.id}-item`}
              >
                <div id={`${section.id}-item-child`} className={classNames.itemChild}>
                  {children?.(item as T)}
                  {url !== undefined && section.separateLinks && <Link url={url} />}
                </div>

                {summary !== undefined && !isEmptyString(summary) && (
                  <div
                    dangerouslySetInnerHTML={{ __html: sanitize(summary) }}
                    className={cn("wysiwyg group-[.sidebar]:prose-invert", classNames.itemSummary)}
                    id={`${section.id}-item-summary`}
                  />
                )}

                {level !== undefined && level > 0 && <Rating level={level} />}

                {keywords !== undefined && keywords.length > 0 && (
                  <p
                    className={cn("m-[unset!important] text-sm", classNames.itemKeywords)}
                    id={`${section.id}-item-keywords`}
                  >
                    {keywords.join(", ")}
                  </p>
                )}
              </div>
            );
          })}
      </div>
    </section>
  );
};
