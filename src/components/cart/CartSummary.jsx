import React from "react";
import { Link } from "react-router-dom";

const CartSummary = () => {
  return (
    <div className="bg-white p-4 lg:p-6">
      <h6 className="flex justify-between items-end mb-6">
        Summary
        <small className="text-secondary-700 text-[18px] font-semibold">
          3 items
        </small>
      </h6>
      <div className="mb-10">
        <ul className="flex flex-col gap-4">
          <li className="flex items-center justify-between">
            <span>No item</span>
            <span>0.00</span>
          </li>
        </ul>
        <hr className="my-6" />
        <ul className="flex flex-col gap-4">
          <li className="flex items-center justify-between">
            <span>Subtotal</span>
            <span>0.00</span>
          </li>
          <li className="flex items-center justify-between">
            <span>Shipping fee</span>
            <span>0.00</span>
          </li>
        </ul>
        <hr className="my-6" />
        <p className="flex items-center justify-between text-[18px] font-semibold">
          <span>Total</span>
          <span>0.00</span>
        </p>
      </div>
      <div className="grid gap-4">
        <button className="btn-primary">Check out</button>
        <Link className="btn-secondary" to="/products">
          Continue shopping
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;
