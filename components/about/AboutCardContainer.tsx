"use client";

import GlowingCard from "../GlowingCard";
import { motion } from "motion/react";

const AboutCardContainer = () => {
  const aboutCardDetails = [
    {
      h1: "5+",
      h2: "Years of Experience",
      p: "Passionate Full-Stack Developer crafting dynamic, user-friendly web apps.",
    },
    {
      h1: "20+",
      h2: "Projects Completed",
      p: "From small web apps to complex platforms, delivering quality solutions.",
    },
    {
      h1: "15+",
      h2: "Technologies Mastered",
      p: "Skilled in JS, TS, Next.js, React, Node.js, Tailwind CSS, and Python.",
    },
  ];

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="card-containers"
    >
      {aboutCardDetails.map(({ h1, h2, p }) => (
        <GlowingCard
          key={h1}
          h1={h1}
          h2={h2}
          p={p}
        />
      ))}
    </motion.div>
  );
};

export default AboutCardContainer;
