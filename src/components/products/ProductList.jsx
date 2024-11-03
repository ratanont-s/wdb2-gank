import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ loading, products }) => {
  return (
    <>
      <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products?.map((product) => (
          <li key={product.id}>
            <ProductCard loading={loading} product={product} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProductList;
