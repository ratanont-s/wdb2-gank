import React from "react";
import { Icons } from "../Icons";
import ColorSelector from "./ColorSelector";
import SizeSelector from "./SizeSelector";
import QuantitySelector from "./QuantitySelector";

const CartItem = () => {
  return (
    <li>
      <div className="mb-4">
        <img
          className="block mx-auto"
          src="https://placehold.co/209x209"
          alt=""
        />
      </div>
      <div className="flex justify-between gap-4 mb-5">
        <h6>Reyon Long Sleeve Shirt</h6>
        <button>
          <Icons.delete />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <ColorSelector />
        <SizeSelector />
        <QuantitySelector />
      </div>
      <h6 className="text-right">THB 2,000.00</h6>
    </li>
  );
};

export default CartItem;
