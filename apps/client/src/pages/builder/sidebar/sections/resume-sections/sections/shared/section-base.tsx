import type { DragEndEvent } from "@dnd-kit/core";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { t } from "@lingui/macro";
import { Plus } from "@phosphor-icons/react";
import type { SectionItem, SectionKey, SectionWithItem } from "@reactive-resume/schema";
import { Button } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { AnimatePresence, motion } from "framer-motion";
import get from "lodash.get";

import { useDialog } from "@/client/stores/dialog";
import { useResumeStore } from "@/client/stores/resume";

import { SectionIcon } from "./section-icon";
import { SectionListItem } from "./section-list-item";
import { SectionOptions } from "./section-options";

type Props<T extends SectionItem> = {
  id: SectionKey;
  title: (item: T) => string;
  description?: (item: T) => string | undefined;
};

export const SectionBase = <T extends SectionItem>({ id, title, description }: Props<T>) => {
  const { open } = useDialog(id);

  const setValue = useResumeStore((state) => state.setValue);
  const section = useResumeStore((state) =>
    get(state.resume.data.sections, id),
  ) as SectionWithItem<T>;

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!section) return null;

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = section.items.findIndex((item) => item.id === active.id);
      const newIndex = section.items.findIndex((item) => item.id === over.id);

      const sortedList = arrayMove(section.items as T[], oldIndex, newIndex);
      setValue(`sections.${id}.items`, sortedList);
    }
  };

  const onCreate = () => {
    open("create", { id });
  };

  const onUpdate = (item: T) => {
    open("update", { id, item });
  };

  const onDuplicate = (item: T) => {
    open("duplicate", { id, item });
  };

  const onDelete = (item: T) => {
    open("delete", { id, item });
  };

  const onToggleVisibility = (index: number) => {
    const visible = get(section, `items[${index}].visible`, true);
    setValue(`sections.${id}.items[${index}].visible`, !visible);
  };

  // Variables intermédiaires pour lingui et eslint
  const sectionName = section.name;
  const addNewItemLabel = t({
    message: "Add a new item",
    context: "For example, add a new work experience, or add a new profile.",
  });

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="grid gap-y-6"
    >
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <SectionIcon id={id} size={18} />
          <h3 className="line-clamp-1 text-xl font-bold lg:text-xl/loose">{sectionName}</h3>
        </div>

        <div className="flex items-center gap-x-2">
          <SectionOptions id={id} />
        </div>
      </header>

      <main className={cn("grid transition-opacity", !section.visible && "opacity-50")}>
        {section.items.length === 0 && (
          <Button
            variant="outline"
            className="gap-x-2 border-dashed bg-background py-6 leading-relaxed text-foreground hover:bg-primary hover:text-white"
            aria-label={addNewItemLabel}
            onClick={onCreate}
          >
            <Plus size={14} />
            <span className="font-medium">{addNewItemLabel}</span>
          </Button>
        )}

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          modifiers={[restrictToParentElement]}
          onDragEnd={onDragEnd}
        >
          <SortableContext items={section.items} strategy={verticalListSortingStrategy}>
            <AnimatePresence>
              {section.items.map((item, index) => {
                const itemTitle = title(item as T);
                const itemDescription = description?.(item as T);
                const toggleVisibilityLabel = t`Basculer la visibilité de l'élément : ${itemTitle}`;

                return (
                  <SectionListItem
                    key={item.id}
                    id={item.id}
                    visible={item.visible}
                    title={itemTitle}
                    description={itemDescription}
                    aria-label={toggleVisibilityLabel}
                    onUpdate={() => {
                      onUpdate(item as T);
                    }}
                    onDelete={() => {
                      onDelete(item as T);
                    }}
                    onDuplicate={() => {
                      onDuplicate(item as T);
                    }}
                    onToggleVisibility={() => {
                      onToggleVisibility(index);
                    }}
                  />
                );
              })}
            </AnimatePresence>
          </SortableContext>
        </DndContext>
      </main>

      {section.items.length > 0 && (
        <footer className="flex items-center justify-end">
          <Button
            variant="outline"
            className="ml-auto gap-x-2 bg-background text-xs text-foreground hover:bg-primary hover:text-white lg:text-sm"
            aria-label={addNewItemLabel}
            onClick={onCreate}
          >
            <Plus />
            <span>{addNewItemLabel}</span>
          </Button>
        </footer>
      )}
    </motion.section>
  );
};
