import React from "react";

const QuantitySelector = ({ quantity, onQuantityChange, maxQuantity }) => {
  // Generate options for the dropdown from 1 up to maxQuantity
  const options = Array.from({ length: maxQuantity }, (_, i) => i + 1);

  return (
    <div className="mb-6 md:max-w-[224px]">
      <label className="inline-block text-secondary-700 mb-2">Qty.</label>
      <select
        value={quantity}
        onChange={(e) => onQuantityChange(Number(e.target.value))}
        className=""
      >
        {options.map((qty) => (
          <option key={qty} value={qty}>
            {qty}
          </option>
        ))}
      </select>
    </div>
  );
};

export default QuantitySelector;
