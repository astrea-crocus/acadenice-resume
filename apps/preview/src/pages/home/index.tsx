import { motion } from "framer-motion";

import { BASE_URL } from "@/preview/constants";

import { ArtboardPage } from "../artboard";
import { HomeButton } from "./components/buttons";
import { Sidebar } from "./components/sidebar";

export const HomePage = () => {
  return (
    <main
      className="grid size-full grid-cols-12 bg-zinc-900 bg-blend-soft-light"
      style={{ backgroundImage: `url(${BASE_URL}background.svg)` }}
    >
      <Sidebar />

      <section className="col-span-11 h-screen justify-center overflow-y-scroll p-2">
        <div className="h-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="m-auto flex size-fit flex-col space-x-2"
          >
            <ArtboardPage />
          </motion.div>
        </div>
      </section>

      <HomeButton className="absolute right-4 top-0" />
    </main>
  );
};
