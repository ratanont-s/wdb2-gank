import React from "react";

const ColorSelector = ({ variants, selectedColor, onColorChange }) => {
  const uniqueColors = Array.from(
    new Set(variants.map((variant) => variant.color))
  );

  return (
    <div className="mb-6">
      <label className="inline-block text-secondary-700 mb-2">Color</label>
      <ul className="flex flex-wrap gap-2">
        {uniqueColors.map((color) => {
          const colorCode = variants.find(
            (variant) => variant.color === color
          ).colorCode;
          return (
            <li key={color} className="w-[100px]">
              <button
                className="grid gap-2 mx-auto"
                onClick={() => onColorChange(color)}
                aria-label={`Select ${color}`}
              >
                <span
                  className={`block w-[54px] h-[54px] border ${
                    selectedColor === color
                      ? "border-primary"
                      : "border-secondary-300"
                  }`}
                  style={{ backgroundColor: colorCode }}
                ></span>
                <span>{color}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ColorSelector;
