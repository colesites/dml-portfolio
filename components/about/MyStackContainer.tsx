import GlowingCard from "../GlowingCard";
import { motion } from "motion/react";

const MyStackContainer = () => {
  const stackDetails = [
    {
      img: "/js.png",
      p: "JavaScript",
    },
    {
      img: "/ts.png",
      p: "TypeScript",
    },
    {
      img: "/node.png",
      p: "Node.js",
    },
    {
      img: "/express-js.png",
      p: "Express.js",
    },
    {
      img: "/next.png",
      p: "Next.js",
    },
    {
      img: "/react.png",
      p: "React.js",
    },
    {
      img: "/tailwind.png",
      p: "TailwindCSS",
    },
    {
      img: "/postgres.png",
      p: "Postgres + Prisma",
    },
    {
      img: "/mongo.png",
      p: "MongoDB",
    },
    {
      img: "/react.png",
      p: "React Native",
    },
  ];

  return (
    <>
      <div className="grid-container">
        {stackDetails.map(({p, img}) => (
          <motion.div initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }} key={p} className="flex flex-col gap-4">
            <GlowingCard img={img} className="!w-40 h-40" />
            <p>{p}</p>
          </motion.div>
        ))}
      </div>

      <h2>And More...</h2>
    </>
  );
};

export default MyStackContainer;
