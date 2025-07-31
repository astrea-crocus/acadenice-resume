import { t } from "@lingui/macro";
import {
  CopySimple,
  FolderOpen,
  Lock,
  LockOpen,
  PencilSimple,
  TrashSimple,
} from "@phosphor-icons/react";
import type { ResumeDto } from "@reactive-resume/dto";
import {
  DropdownMenuContextTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router";

import { ResumePreview } from "@/client/pages/dashboard/_components/resume-preview";
import { useDialog } from "@/client/stores/dialog";

import { BaseCard } from "./base-card";

type Props = {
  resume: ResumeDto;
};

export const ResumeCard = ({ resume }: Props) => {
  return (
    <DropdownMenuContextTrigger className="text-left" trigger={<TriggerContent resume={resume} />}>
      <DropdownMenuList resume={resume} />
    </DropdownMenuContextTrigger>
  );
};

const TriggerContent = ({ resume }: Props) => {
  const lastUpdated = dayjs().to(resume.updatedAt);

  return (
    <BaseCard className="space-y-0">
      <AnimatePresence>
        {resume.locked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-background/75 backdrop-blur-sm"
          >
            <Lock size={42} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className={cn("absolute inset-0 z-10 flex flex-col justify-end space-y-0.5")}>
        <div className="mt-auto bg-gradient-to-t from-background/80 to-transparent p-4 pt-12">
          <div className="-m-4 mt-auto border-t bg-secondary/25 p-4 backdrop-blur-sm">
            <h4 className="line-clamp-2 font-medium">{resume.title}</h4>
            <p className="line-clamp-1 text-xs opacity-75">{t`Last updated ${lastUpdated}`}</p>
          </div>
        </div>
      </div>

      <ResumePreview resumeData={resume.data} resumeId={resume.id} />
    </BaseCard>
  );
};

const DropdownMenuList = ({ resume }: Props) => {
  const navigate = useNavigate();
  const { open } = useDialog<ResumeDto>("resume");
  const { open: lockOpen } = useDialog<ResumeDto>("lock");

  const onOpen = () => {
    void navigate(`/builder/${resume.id}`);
  };

  const onUpdate = () => {
    open("update", { id: "resume", item: resume });
  };

  const onDuplicate = () => {
    open("duplicate", { id: "resume", item: resume });
  };

  const onLockChange = () => {
    lockOpen(resume.locked ? "update" : "create", { id: "lock", item: resume });
  };

  const onDelete = () => {
    open("delete", { id: "resume", item: resume });
  };

  return (
    <>
      <DropdownMenuItem onClick={onOpen}>
        <FolderOpen size={14} className="mr-2" />
        {t`Open`}
      </DropdownMenuItem>
      <DropdownMenuItem onClick={onUpdate}>
        <PencilSimple size={14} className="mr-2" />
        {t`Rename`}
      </DropdownMenuItem>
      <DropdownMenuItem onClick={onDuplicate}>
        <CopySimple size={14} className="mr-2" />
        {t`Duplicate`}
      </DropdownMenuItem>
      {resume.locked ? (
        <DropdownMenuItem onClick={onLockChange}>
          <LockOpen size={14} className="mr-2" />
          {t`Unlock`}
        </DropdownMenuItem>
      ) : (
        <DropdownMenuItem onClick={onLockChange}>
          <Lock size={14} className="mr-2" />
          {t`Lock`}
        </DropdownMenuItem>
      )}
      <DropdownMenuSeparator />
      <DropdownMenuItem className="text-error" onClick={onDelete}>
        <TrashSimple size={14} className="mr-2" />
        {t`Delete`}
      </DropdownMenuItem>
    </>
  );
};
