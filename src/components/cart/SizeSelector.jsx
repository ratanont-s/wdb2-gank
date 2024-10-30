import React from "react";

const SizeSelector = () => {
  return (
    <div className="grid gap-2 ">
      <label className="text-secondary-700" htmlFor="SizeSelector">
        Size
      </label>
      <select id="SizeSelector">
        <option value="m">M</option>
      </select>
    </div>
  );
};

export default SizeSelector;
