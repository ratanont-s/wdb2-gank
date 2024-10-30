import React, { useState } from "react";
import EmptyCart from "../components/cart/EmptyCart";
import CartSummary from "../components/cart/CartSummary";
import CartList from "../components/cart/CartList";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  return (
    <main className="bg-secondary-50 p-[24px_0px_60px] lg:p-[64px_0px_95px]">
      <div className="container">
        <h5 className="mb-[34px]">My Cart</h5>
        <div className="grid gap-10 mb-10 lg:grid-cols-[3fr_2fr] lg:items-start">
          <div className="bg-white p-4 lg:p-6">
            <h6 className="mb-6">Items</h6>
            {cartItems?.length === 0 ? <EmptyCart /> : <CartList />}
          </div>
          <CartSummary />
        </div>
        <h5 className="mb-[34px]">People also like these</h5>
      </div>
    </main>
  );
};

export default Cart;
