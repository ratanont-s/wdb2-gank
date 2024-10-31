import React from "react";
import { Icons } from "./Icons";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full h-auto flex flex-col justify-center content-center  bg-secondary text-white text-center md:text-start">
      <div className="size-full container py-[24px] flex flex-col items-center md:items-center gap-0 md:gap-4">
        <div className="flex flex-col gap-4 justify-between md:flex-row content-center ">
          <section className="size-full max-w-[503px] mb-[56px] md:mb-[16px]">
            <h5 className="mb-6">Featured product</h5>
            <ul className="SubHeadLing flex flex-col gap-[16px]">
              <li>
                <Link to="/products?categories=all-men">Men</Link>
              </li>
              <li>
                <Link to="/products?categories=all-ladies">Ladies</Link>
              </li>
              <li>
                <Link to="/products?categories=men-shoes&categories=ladies-shoes">
                  Shoes
                </Link>
              </li>
              <li>
                <Link to="/products?categories=men-accessories&categories=ladies-accessories">
                  Accessories
                </Link>
              </li>
            </ul>
          </section>
          <section className="size-full max-w-[503px] flex flex-col items-center md:items-start mb-[56px] md:mb-[16px]">
            <h5 className="mb-6">Register with us</h5>
            <p className="BodyText mb-[24px]">
              Sign up now and get 20% off your first purchase!
            </p>
            <div className="flex w-[166px] items-center bg-white text-secondary px-[10px] py-[17px] gap-[18px]">
              <button className="BodyText" type="submit">
                Sign up now
              </button>
              <Icons.iconNext />
            </div>
          </section>
          <section className="size-full max-w-[503px] flex flex-col gap-4 mb-[16px] md:mb-[16px]">
            <h5 className="mb-6">Customer services</h5>
            <p className="BodyText ">
              MBK Tower 20th Floor, 444, Phaya Thai Rd, Wang Mai, Pathum Wan,
              Bangkok 10330
            </p>
            <p className="BodyText">Email: jane.doe@realmail.com</p>
            <form className="flex flex-col gap-[24px]">
              <input
                className="w-full py-[16px] px-[10px] text-secondary"
                type="email"
                placeholder="Enter your email"
              />
              <div>
                <button
                  className="bg-primary-700 text-secondary px-[10px] py-[17px]"
                  type="submit"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </section>
        </div>
        <div className="w-full flex justify-between md:flex-row flex-col items-center gap-1">
          <p className="Caption text-[#9F9F9F]">
            Copyright © 2024 All rights reserved for all contents.
          </p>
          <div className="Caption flex gap-[10px]">
            <p className="text-[#9F9F9F]">Powered By</p>
            <div className="border-r border-white pr-[8px]">
              <img src="/Logo/Skooldio.svg"></img>
            </div>
            <img src="/Logo/WebDev.svg"></img>
          </div>
        </div>
      </div>
    </footer>
  );
}
