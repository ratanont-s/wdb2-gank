import React from "react";
import CartItem from "./CartItem";

const CartList = ({ items, onRemove, onUpdate }) => {
  return (
    <ul className="grid gap-6 divide-y divide-secondary-300">
      {items?.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onRemove={onRemove}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
};

export default CartList;
