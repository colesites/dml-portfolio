"use client";

import Image from "next/image";
import { LinkPreview } from "../ui/link-preview";
import { motion } from "motion/react";

const ProjectCards = ({
  h2,
  p,
  src,
  img,
}: {
  h2: string;
  p: string;
  src: string;
  img: string;
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-10 md:gap-0 w-full justify-around my-20">
      <div className="h-[200px] w-[300px] md:h-[350px] md:w-[600px] mx-auto md:mx-0 relative">
        <Image
          src={img}
          alt="project-image"
          layout="fill"
          objectFit="cover"
          className="rounded-xl absolute"
        />
      </div>

      <motion.div
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
      >
        <div className="max-w-80 mx-auto md:mx-0">
          <h2 className="!text-xl md:!text-2xl !text-left !font-normal mb-5 md:mb-10">{h2}</h2>
          <p className="!text-white/60 !text-left">{p}</p>
        </div>
        <div className="max-md:flex max-md:justify-center max-md:items-center">
        <button className="!mt-10">
          <LinkPreview url={src} className="text-white/60">
            View Live
          </LinkPreview>
        </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectCards;
