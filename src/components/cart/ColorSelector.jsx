import React from "react";

const ColorSelector = () => {
  return (
    <div className="grid gap-2 ">
      <label className="text-secondary-700" htmlFor="ColorSelector">
        Color
      </label>
      <select id="ColorSelector">
        <option value="blue">Blue</option>
      </select>
    </div>
  );
};

export default ColorSelector;
