"use client";

import Image from "next/image";
import { motion } from "motion/react";
import AboutCardContainer from "./AboutCardContainer";
import MyStackContainer from "./MyStackContainer";
import CertificateContainer from "./CertificateContainer";

const About = () => {
  return (
    <div
      id="about"
      className="page-container p-10 border-b border-stone-400/40"
    >
      <motion.div
        className="flex justify-center items-center"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
      >
        <Image
          src="/dml.jpg"
          alt="Profile Image"
          width={150}
          height={150}
          className="mt-10 rounded-full object-cover aspect-square"
        />
      </motion.div>

      <AboutCardContainer />

      <h1 className="text-2xl md:!text-4xl">My Stack</h1>

      <MyStackContainer />

      <CertificateContainer />
    </div>
  );
};

export default About;
