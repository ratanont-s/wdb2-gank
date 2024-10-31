import React from "react";

const ColorSelector = ({ colors }) => {
  return (
    <div>
      <label>Color</label>
      <ul className="flex flex-wrap gap-4">
        {colors?.map((color) => (
          <li className="flex flex-col items-center">
            <span
              className="block w-[54px] h-[54px]"
              style={{ backgroundColor: color.colorCode }}
            ></span>
            <p>{color.color}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ColorSelector;
