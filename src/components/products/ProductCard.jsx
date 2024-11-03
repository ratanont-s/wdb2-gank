import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Icons } from "../Icons";
import { formatCurrency } from "../../utils/helpers";

const ProductCard = ({ loading, product }) => {
  return (
    <>
      {loading ? (
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
      ) : (
        <Link to={`/products/${product.permalink}`} className="product-card">
          <div className="mb-4 relative">
            <img
              className="product-card-bg"
              src={`${product.imageUrls[0]}`}
              alt={product.name}
              loading="lazy"
            />
            <img
              className="w-full object-cover aspect-[343/370] lg:aspect-square absolute top-0 left-1/2 -translate-x-1/2"
              src={`${product.imageUrls[0]}`}
              alt={product.name}
              loading="lazy"
            />
            {product.price > product.promotionalPrice && (
              <span className="absolute top-6 right-0 bg-danger text-white py-1 px-[10px]">
                -{" "}
                {Math.round(
                  ((product.price - product.promotionalPrice) / product.price) *
                    100
                )}
                %
              </span>
            )}
          </div>
          <div className="grid gap-2">
            <h6 className="truncate">{product.name}</h6>
            <p className="truncate text-secondary-700">{product.description}</p>
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
            <h6 className="flex items-center justify-end gap-4">
              {product.price > product.promotionalPrice ? (
                <>
                  <del className="text-sm font-normal">
                    {formatCurrency(product.price)}
                  </del>
                  <span className="text-danger">
                    {formatCurrency(product.price)}
                  </span>
                </>
              ) : (
                <>{formatCurrency(product.price)}</>
              )}
            </h6>
          </div>
        </Link>
      )}
    </>
  );
};

export default ProductCard;
