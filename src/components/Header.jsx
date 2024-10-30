import React from "react";
import { Link } from "react-router-dom";
import logo from "../../public/favicon-32x32.png";
import { Icons } from "./Icons";

const MENUS_LEFT = [
  { name: "Men", route: "/products?categories=all-men" },
  { name: "Women", route: "/products?categories=all-ladies" },
  { name: "Kids", route: "/products?categories=all-kids" },
  {
    name: "Shoes",
    route: "/products?categories=men-shoes&categories=ladies-shoes",
  },
  {
    name: "Accessories",
    route: "/products?categories=men-accessories&categories=ladies-accessories",
  },
];

const Header = () => {
  return (
    <header className="bg-secondary text-white py-2">
      <div className="container">
        <div className="flex items-center gap-[40px]">
          <div className="flex items-center gap-[10px]">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
            <p className=".SubHeadling">WDB</p>
          </div>
          <ul className="flex gap-4">
            {MENUS_LEFT?.map((menu) => (
              <li key={menu.name}>
                <Link to={menu.route}>{menu.name}</Link>
              </li>
            ))}
          </ul>
          <ul>
            <li>
              <Icons.search />
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
