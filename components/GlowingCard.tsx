"use client";

import Image from "next/image";
import { GlowingEffect } from "./ui/glowing-effect";

const GlowingCard = ({
  img,
  alt = "Image",
  h1,
  h2,
  p,
  className,
}: {
  img?: string;
  alt?: string;
  h1?: string;
  h2?: string;
  p?: string;
  className?: string;
}) => {
  return (
    <div className={`glowing-card-container ${className || ""}`}>
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
      />

      <div className="inner-glowing-card-container">
        {img && <Image src={img} alt={alt} width={100} height={100} />}
        {h1 && <h1>{h1}</h1>}
        {h2 && <h2 className="!font-bold">{h2}</h2>}
        {p && <p className="font-thin">{p}</p>}
      </div>
    </div>
  );
};

export default GlowingCard;
