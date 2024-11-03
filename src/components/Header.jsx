import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Icons } from "./Icons";
import { CartContext } from "../context/CartContext";

const MENUS = {
  left: [
    { name: "Home", route: "/" },
    { name: "Men", route: "/products?categories=all-men" },
    { name: "Women", route: "/products?categories=all-ladies" },
    { name: "Shoes", route: "/products?categories=men-shoes,ladies-shoes" },
    {
      name: "Accessories",
      route: "/products?categories=men-accessories,ladies-accessories",
    },
    { name: "All Products", route: "/products" },
  ],
  right: [
    { icon: <Icons.search fill="white" />, route: "/search" },
    { icon: <Icons.heart fill="white" />, route: "/favorite" },
    { icon: <Icons.profile fill="white" />, route: "/profile" },
  ],
};

const Header = () => {
  const { itemCount } = useContext(CartContext);
  console.log("🚀 ~ Header ~ itemCount:", itemCount);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle the menu's open/closed state
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-secondary text-white py-2 sticky top-0 z-30 lg:py-[10px]">
      <div className="container flex items-center gap-8">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <button className="lg:hidden" onClick={toggleMenu}>
              <Icons.menu fill="white" />
            </button>
            <Link to="/">
              <img src="/logo.svg" alt="WDB Logo" />
            </Link>
          </div>
          <nav
            className={`fixed inset-0 transition-all duration-300 ${
              isMenuOpen
                ? "translate-x-0 visible"
                : "-translate-x-full invisible"
            } lg:static lg:translate-x-0 lg:visible`}
          >
            <div
              className="bg-black/50 absolute inset-0 lg:hidden lg:invisible"
              onClick={() => setIsMenuOpen(false)}
            ></div>
            <ul className="bg-white text-secondary flex flex-col gap-6 max-w-[320px] h-full px-8 py-5 rounded-tr-2xl relative lg:flex-row lg:items-center lg:max-w-fit lg:bg-transparent lg:h-auto lg:p-0 lg:rounded-none lg:text-white">
              {MENUS?.left?.map((menu) => (
                <li key={menu.name}>
                  <Link
                    className="text-subheading  hover:text-primary lg:text-base lg:font-normal"
                    onClick={() => setIsMenuOpen(false)}
                    to={menu.route}
                  >
                    {menu.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="ml-auto">
          <ul className="flex items-center gap-1">
            {MENUS?.right?.map((menu) => (
              <li key={menu.route}>
                <Link to={menu.route}>{menu.icon}</Link>
              </li>
            ))}
            <li>
              <Link to={`/cart`}>
                {itemCount > 0 ? (
                  <Icons.basket03 fill="white" />
                ) : (
                  <Icons.basket02 fill="white" />
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
