import React from "react";
import { Link } from "react-router-dom";

const SizeSelector = ({
  variants,
  selectedColor,
  selectedSize,
  onSizeChange,
}) => {
  // Define the custom order for named sizes
  const sizeOrder = ["XS", "S", "M", "L", "XL", "XXL"];

  // Get available sizes for the selected color
  const availableSizes = variants
    .filter((variant) => variant.color === selectedColor)
    .map((variant) => variant.size);

  // Sort sizes by custom order for named sizes and ascending order for numeric sizes
  availableSizes.sort((a, b) => {
    const isANumeric = !isNaN(a);
    const isBNumeric = !isNaN(b);

    if (isANumeric && isBNumeric) {
      // Both are numbers, sort in ascending order
      return parseInt(a) - parseInt(b);
    } else if (!isANumeric && !isBNumeric) {
      // Both are named sizes, sort by predefined order
      return sizeOrder.indexOf(a) - sizeOrder.indexOf(b);
    } else {
      // One is a number and the other is a named size; keep named sizes before numbers
      return isANumeric ? 1 : -1;
    }
  });

  return (
    <div className="mb-4">
      <label className="inline-block text-secondary-700 mb-2 flex items-center justify-between">
        Size{" "}
        <Link className="text-info text-xs" to="/size-guide">
          What’s my size?
        </Link>
      </label>
      <ul className="flex flex-wrap gap-2">
        {availableSizes.map((size, index) => (
          <li key={index}>
            <button
              className={`btn-secondary w-[62px] ${
                selectedSize === size ? "border-primary" : ""
              }`}
              onClick={() => onSizeChange(size)}
            >
              {size}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SizeSelector;
