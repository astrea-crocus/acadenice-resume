import { AnimatePresence, motion } from "framer-motion";

import type { MetadataKey } from "../shared";
import { Appearence } from "./appearence";
import { Basics } from "./basics";
import { Publish } from "./publish";
import { ResumeSections } from "./resume-sections";
import { Templates } from "./templates";

type SectionsProps = {
  currentSection: MetadataKey;
};

const sectionsMap: Record<MetadataKey, React.ReactNode> = {
  templates: <Templates />,
  basics: <Basics />,
  appearence: <Appearence />,
  publish: <Publish />,
  "resume-sections": <ResumeSections />,
};

export const Sections = ({ currentSection }: SectionsProps) => {
  return (
    <div className="grid gap-y-6 @container/right">
      <AnimatePresence mode="wait">
        <motion.section
          key={currentSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {sectionsMap[currentSection]}
        </motion.section>
      </AnimatePresence>
    </div>
  );
};
