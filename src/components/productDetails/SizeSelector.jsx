import React from "react";

const SizeSelector = ({ sizes }) => {
  return (
    <div>
      {sizes.map((size) => (
        <p>size.size</p>
      ))}
    </div>
  );
};

export default SizeSelector;
