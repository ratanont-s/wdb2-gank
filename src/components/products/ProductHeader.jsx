import React from "react";
import { useSearchParams } from "react-router-dom";

const ProductHeader = ({ sortOption, setSortOption }) => {
  const [searchParams] = useSearchParams();

  const categoriesParam = searchParams.get("categories");

  // Map the category to the display title
  const getCategoryTitle = () => {
    if (!categoriesParam) return "All Products";
    if (categoriesParam === "all-men") return "Men’s Clothing";
    if (categoriesParam === "all-ladies") return "Women’s Clothing";
    if (categoriesParam.includes("shoes")) return "Shoes";
    if (categoriesParam.includes("accessories")) return "Accessories";
    return "Products";
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };
  return (
    <div className="flex flex-col gap-6 mb-6 md:flex-row md:items-center">
      {/* Display dynamic title based on the selected category */}
      <h5>{getCategoryTitle()}</h5>

      <div className="ml-auto">
        <select
          className="w-auto"
          value={sortOption}
          onChange={handleSortChange}
        >
          <option value="default">Default</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>
    </div>
  );
};

export default ProductHeader;
