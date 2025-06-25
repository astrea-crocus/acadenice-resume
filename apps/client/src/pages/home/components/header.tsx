import { motion } from "framer-motion";

import { AnimatedLogo } from "./_animated-logo";
import { DonationBanner } from "./donation-banner";

export const Header = () => (
  <motion.header
    className="fixed inset-x-0 top-0 z-20"
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.3 } }}
  >
    <DonationBanner />

    <div className="bg-primary py-3 lg:bg-transparent lg:bg-gradient-to-b lg:from-primary lg:to-transparent lg:bg-blend-multiply lg:backdrop-blur-md xl:bg-gradient-to-b xl:from-background xl:to-transparent xl:backdrop-blur-none">
      <div className="container flex max-w-screen-2xl items-center justify-between">
        <AnimatedLogo />
        <div />
      </div>
    </div>
  </motion.header>
);
