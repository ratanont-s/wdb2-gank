import React from "react";

export default function Hero() {
  return (
    <div className="relative w-screen -mx-[50vw] left-[50%] right-[50%] h-[166px] md:h-[420px]">
      <img
        src='/hero-image.png'
        alt="hero-image"
        className="w-full h-full object-cover"
      />
    </div>
  );
}
