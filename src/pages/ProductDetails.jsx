import React from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { productId } = useParams();
  return <h1>ProductDetails {productId}</h1>;
};

export default ProductDetails;
