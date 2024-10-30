import React from "react";
import { Link } from "react-router-dom";
import { Icons } from "./Icons";
import { useState } from "react";

const MENUS_LEFT = [
  { name: "Men", route: "/products" },
  { name: "Women", route: "/products" },
  { name: "Shoes", route: "/products" },
  { name: "Accessories", route: "/products" },
];

export default function Header() {
  return (
    <header className="bg-secondary text-white py-2">
      <div className="container">
        <div className="flex items-center">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-[40px]">
              <div className="flex items-center gap-[10px]">
                <div className="md:hidden">
                  <Icons.iconHamburger />
                </div>
                <Link to="/">
                  <Icons.iconHeader />
                </Link>
                <p className="SubHeadLing">WDB</p>
              </div>
              <ul className="hidden md:flex gap-4">
                {MENUS_LEFT?.map((menu) => (
                  <li key={menu.name}>
                    <Link to={menu.route}>{menu.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <ul className="flex gap-1">
              <li>
                <Icons.search />
              </li>
              <li>
                <Icons.iconFavorite />
              </li>
              <li>
                <Icons.iconAccount />
              </li>
              <li>
                <Icons.iconCart />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
