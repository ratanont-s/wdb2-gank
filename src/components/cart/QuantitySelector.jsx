import React from "react";

const QuantitySelector = () => {
  return (
    <div className="grid gap-2 ">
      <label className="text-secondary-700" htmlFor="QuantitySelector">
        Qty.
      </label>
      <select id="QuantitySelector">
        <option value="2">2</option>
      </select>
    </div>
  );
};

export default QuantitySelector;
