import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Icons } from "../Icons";
import { formatCurrency } from "../../utils/helpers";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product.permalink}`}>
      <img
        className="mb-4 w-full h-[370px] object-cover"
        src={`${product.imageUrls[0]}`}
        alt={product.name}
        loading="lazy"
      />
      <div className="grid gap-2">
        <h6 className="truncate">{product.name}</h6>
        <p className="truncate text-secondary-700">{product.description}</p>
        <div className="flex">
          {Array.from({ length: 5 }, (_, index) => (
            <Fragment key={index}>
              {index < product.ratings ? <Icons.review /> : <Icons.review2 />}
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
  );
};

export default ProductCard;
