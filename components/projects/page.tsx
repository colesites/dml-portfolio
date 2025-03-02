"use client";

import ProjectCards from "./ProjectCards";
import { ColourfulText } from "../ui/colourful-text";
import { motion } from "motion/react";

const Projects = () => {
  const projectDetails = [
    {
      h2: "Ekiti Innovation Summit Pitch",
      p: "The Ekiti Innovation Summit website, built with Next.js, React, and Tailwind CSS, streamlines startup registration and pitching. It integrates Sentry for monitoring and Sanity for content management, ensuring a seamless experience for startups, organizers, and attendees.",
      src: "https://ek-innovation-summit-pitch.vercel.app",
      img: "/ek.png",
    },
    {
      h2: "C Technology",
      p: "C Tech is a forward-thinking tech company focused on building innovative solutions that promote positive social interactions. From social media platforms to SaaS products, we create technology that enhances user experiences while fostering a safe and engaging digital space.",
      src: "https://c-technology.vercel.app",
      img: "/c-tech.png",
    },
    {
      h2: "See Moviesss",
      p: "See Moviesss is a sleek movie discovery platform built with React and Tailwind CSS, designed to help users find movies they'll enjoy without the hassle.",
      src: "https://see-moviesss.vercel.app",
      img: "/moviesss.png",
    },
    {
      h2: "Fizzi Gutsy",
      p: "Fizzi Gutsy is an interactive Next.js project powered by GSAP and Three.js, delivering dynamic animations and immersive 3D experiences for a visually captivating user journey.",
      src: "https://fizzi-gutsy.vercel.app",
      img: "/fizzi.png",
    },
  ];

  return (
    <div
      id="projects"
      className="page-container p-10 border-b border-stone-400/40"
    >
      <div className="mt-20">
        <motion.h2
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="!text-2xl md:!text-5xl !font-normal"
        >
          Some Of My <ColourfulText text="Projects" />
        </motion.h2>
      </div>

      {projectDetails.map(({ h2, p, img, src }) => (
        <ProjectCards key={h2} h2={h2} p={p} img={img} src={src} />
      ))}
    </div>
  );
};

export default Projects;
