import React from "react";
import { Link } from "react-router-dom";

const MENUS_LEFT = [
  { name: "Men", route: "/products" },
  { name: "Women", route: "/products" },
  { name: "Kids", route: "/products" },
  { name: "Shoes", route: "/products" },
  { name: "Accessories", route: "/products" },
];

const Header = () => {
  return (
    <header className="bg-secondary text-white py-2">
      <div className="container">
        <div className="flex items-center">
          <Link to="/">Logo</Link>
          <ul className="flex gap-4">
            {MENUS_LEFT?.map((menu) => (
              <li key={menu.name}>
                <Link to={menu.route}>{menu.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
