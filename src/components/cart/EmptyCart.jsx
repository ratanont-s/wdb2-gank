import React from "react";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center gap-6">
      <img
        className="w-full max-w-[260px] mx-auto"
        src="/empty-cart.svg"
        alt="Empty cart"
      />
      <div className="text-center grid gap-2">
        <h4>Your cart is empty</h4>
        <p>
          Looks like you have not added anything to your cart.
          <br />
          Go ahead & explore top categories.
        </p>
      </div>
      <Link className="btn-primary" to="/products">
        Continue shopping
      </Link>
    </div>
  );
};

export default EmptyCart;
