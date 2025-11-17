"use client";

import { Spotlight } from "./ui/spotlight-new";
import { StarsBackground } from "./ui/stars-background";
import { motion } from "motion/react";

const Hero = () => {
  return (
    <div className="h-screen flex justify-center items-center relative overflow-hidden border-b border-stone-400/40">
      <Spotlight />

      <div>
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 10,
          }}
        >
          Damola <br /> Aderibigbe
        </motion.h1>
        <motion.h2 initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 0.5}}>Software Developer (Full Stack developer)</motion.h2>
      </div>

      <StarsBackground />
    </div>
  );
};

export default Hero;
