import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      const cartId = localStorage.getItem("cartId");
      if (cartId) {
        try {
          const response = await axios.get(
            `https://api.storefront.wdb.skooldio.dev/carts/${cartId}`
          );
          setCartItems(response.data.items);
        } catch (error) {
          console.error("Error fetching cart data:", error);
        }
      }
    };

    fetchCart();
  }, []);

  // Calculate item count whenever cartItems changes
  useEffect(() => {
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);
    setItemCount(count);
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, itemCount, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};
