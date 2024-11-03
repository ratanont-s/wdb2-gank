import React from "react";
import CartItem from "./CartItem";

const CartList = ({ cartItemsData, onRemove, onUpdate }) => {
  // console.log(cartItemsData);

  return (
    <ul className="grid gap-6 divide-y divide-secondary-300">
      {cartItemsData?.items?.map((item) => (
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
