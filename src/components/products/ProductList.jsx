import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ loading, products }) => {
  return (
    <>
      <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading ? (
          <>
            {[...Array(8)].map((_, index) => (
              <li key={index}>
                <div className="animate-pulse">
                  <div className="bg-secondary-100 aspect-[343/370] mb-4 lg:aspect-square"></div>
                  <div className="grid gap-2">
                    <div className="bg-secondary-100 h-8 w-3/4"></div>
                    <div className="bg-secondary-100 h-6"></div>
                    <div className="flex gap-2">
                      <div className="bg-secondary-100 w-10 h-10"></div>
                      <div className="bg-secondary-100 w-10 h-10"></div>
                      <div className="bg-secondary-100 w-10 h-10"></div>
                      <div className="bg-secondary-100 w-10 h-10"></div>
                      <div className="bg-secondary-100 w-10 h-10"></div>
                    </div>
                    <div className="bg-secondary-100 h-8 w-1/2 ml-auto"></div>
                  </div>
                </div>
              </li>
            ))}
          </>
        ) : (
          <>
            {products?.map((product) => (
              <li key={product.id}>
                <ProductCard loading={loading} product={product} />
              </li>
            ))}
          </>
        )}
      </ul>
    </>
  );
};

export default ProductList;
