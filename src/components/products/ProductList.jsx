import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Icons } from "../Icons";

const ProductList = ({ products }) => {
  return (
    <>
      {products?.length === 0 ? (
        <p>Not found product</p>
      ) : (
        <ul className="grid gap-10 sm:grid-cols-2 xl:grid-cols-3">
          {products?.map((product) => (
            <li key={product.id}>
              <Link to={`/products/${product.permalink}`}>
                <img
                  className="mb-4 w-full h-[370px] object-cover"
                  src={`${product.imageUrls[0]}`}
                  alt={product.name}
                  loading="lazy"
                />
                <div className="grid gap-2">
                  <h6 className="truncate">{product.name}</h6>
                  <p className="truncate text-secondary-700">
                    {product.description}
                  </p>
                  <div className="flex">
                    {Array.from({ length: 5 }, (_, index) => (
                      <Fragment key={index}>
                        {index < product.ratings ? (
                          <Icons.review />
                        ) : (
                          <Icons.review2 />
                        )}
                      </Fragment>
                    ))}
                  </div>
                  <p>THB {product.price}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ProductList;
