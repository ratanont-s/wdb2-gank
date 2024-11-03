import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { CartProvider } from "../context/CartContext";

const Layout = () => {
  return (
    <CartProvider>
      <Header />
      <Outlet />
      <Footer />
    </CartProvider>
  );
};

export default Layout;
