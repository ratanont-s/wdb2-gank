import React from "react";
import heroImage from "../../public/hero-image.png";

export default function Hero() {
  return (
    <div className="relative w-screen -mx-[50vw] left-[50%] right-[50%] h-[166px] md:h-[420px]">
      <img
        src={heroImage}
        alt="hero-image"
        className="w-full h-full object-cover"
      />
    </div>
  );
}
