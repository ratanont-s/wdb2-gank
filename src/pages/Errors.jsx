import React from "react";
import { Link } from "react-router-dom";

const Errors = () => {
  return (
    <div className="w-screen h-screen py-4 grid place-items-center text-secondary-500">
      <div className="container gap-10 grid">
        <img
          src="/404.gif"
          alt="404"
          loading="lazy"
          className="w-full max-w-[325px] mx-auto"
        />
        <p className="text-center">Sorry, an unexpected error has occurred.</p>
        <Link
          className="btn-secondary w-full max-w-[200px] mx-auto"
          to="/"
        >
          Home
        </Link>
      </div>
    </div>
  );
};

export default Errors;
