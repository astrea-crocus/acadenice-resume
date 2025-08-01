import {
  AwardsDialog,
  CertificationsDialog,
  CustomSectionDialog,
  EducationDialog,
  ExperienceDialog,
  HardSkillsDialog,
  InterestsDialog,
  LanguagesDialog,
  ProjectsDialog,
  PublicationsDialog,
  ReferencesDialog,
  SocialsDialog,
  SoftSkillsDialog,
  VolunteerDialog,
} from "../pages/builder/sidebar/sections/resume-sections/dialogs";
import { ImportDialog } from "../pages/dashboard/resumes/_dialogs/import";
import { LockDialog } from "../pages/dashboard/resumes/_dialogs/lock";
import { ResumeDialog } from "../pages/dashboard/resumes/_dialogs/resume";
import { TwoFactorDialog } from "../pages/dashboard/settings/_dialogs/two-factor";
import { useResumeStore } from "../stores/resume";

type Props = {
  children: React.ReactNode;
};

export const DialogProvider = ({ children }: Props) => {
  const isResumeLoaded = useResumeStore((state) => Object.keys(state.resume).length > 0);

  return (
    <>
      {children}

      <div id="dialog-root">
        <ResumeDialog />
        <LockDialog />
        <ImportDialog />
        <TwoFactorDialog />

        {isResumeLoaded && (
          <>
            <SocialsDialog />
            <ExperienceDialog />
            <EducationDialog />
            <AwardsDialog />
            <CertificationsDialog />
            <InterestsDialog />
            <LanguagesDialog />
            <ProjectsDialog />
            <PublicationsDialog />
            <VolunteerDialog />
            <HardSkillsDialog />
            <SoftSkillsDialog />
            <ReferencesDialog />
            <CustomSectionDialog />
          </>
        )}
      </div>
    </>
  );
};
