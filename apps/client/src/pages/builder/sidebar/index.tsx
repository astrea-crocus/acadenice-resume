import { t } from "@lingui/macro";
import { Button, ScrollArea } from "@reactive-resume/ui";
import { useRef, useState } from "react";
import { Link } from "react-router";

import { Icon } from "@/client/components/icon";
import { UserAvatar } from "@/client/components/user-avatar";
import { UserOptions } from "@/client/components/user-options";

import { Sections } from "./sections";
import type { MetadataKey } from "./shared";
import { Buttons } from "./shared";

export const Sidebar = () => {
  const containterRef = useRef<HTMLDivElement | null>(null);

  const [activeSection, setActiveSection] = useState<MetadataKey>("templates");

  const size = 32; //px

  return (
    <div className="flex bg-secondary-accent/30">
      <div className="basis-16 flex-col items-center justify-between border-e bg-secondary/60 py-8 sm:flex">
        <Button
          asChild
          size="icon"
          variant="ghost"
          className="size-8 rounded-full"
          aria-label={t`Aller au tableau de bord`}
        >
          <Link to="/dashboard">
            <Icon size={size} />
          </Link>
        </Button>

        <Buttons iconSize={size} onSectionChange={setActiveSection} />

        <UserOptions>
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full"
            aria-label={t`Options utilisateur`}
          >
            <UserAvatar size={size} />
          </Button>
        </UserOptions>
      </div>

      <ScrollArea orientation="vertical" className="h-screen flex-1 pb-16 lg:pb-0">
        <div ref={containterRef} className="grid gap-y-6 @container/right">
          <Sections currentSection={activeSection} />
        </div>
      </ScrollArea>
    </div>
  );
};
