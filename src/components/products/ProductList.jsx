import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products }) => {
  return (
    <>
      {products?.length === 0 ? (
        <p>Not found product</p>
      ) : (
        <ul className="grid gap-10 sm:grid-cols-2 xl:grid-cols-3">
          {products?.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ProductList;
