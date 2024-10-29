import React from "react";
// import heroImage from "./public/hero-image.png";

export default function Hero() {
  return (
    <div className="flex flex-col items-center justify-center">
      <img src={heroImage} alt="hero-image" />
    </div>
  );
}
