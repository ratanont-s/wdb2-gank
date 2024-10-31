import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProductCarousel from "../components/products/ProductCarousel";
import { Icons } from "../components/Icons";
import AddToCartModal from "../components/products/AddToCartModal";
import ColorSelector from "../components/productDetails/ColorSelector";
import SizeSelector from "../components/productDetails/SizeSelector";
import QuantitySelector from "../components/productDetails/QuantitySelector";

const API_URL = "https://api.storefront.wdb.skooldio.dev";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [cartMessage, setCartMessage] = useState("");

  const { productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API_URL}/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.log("🚀 ~ fetchProduct ~ error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  // Update the selected variant when color or size changes
  useEffect(() => {
    if (selectedColor && selectedSize && product) {
      const variant = product.variants.find(
        (v) => v.color === selectedColor && v.size === selectedSize
      );
      setSelectedVariant(variant);
    }
  }, [selectedColor, selectedSize, product]);

  const addToCart = async () => {
    if (selectedVariant) {
      try {
        const response = await axios.post(
          "https://api.storefront.wdb.skooldio.dev/carts",
          {
            items: [{ skuCode: selectedVariant.skuCode, quantity: 1 }],
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        setCartMessage("Item added to cart successfully!");
      } catch (error) {
        setCartMessage("Failed to add item to cart. Please try again.");
      }
    } else {
      setCartMessage("Please select color and size.");
    }
  };

  // Get unique colors and sizes from the variants for dropdowns
  const uniqueColors = [
    ...new Set(product?.variants?.map((variant) => variant.color)),
  ];
  const uniqueSizes = [
    ...new Set(product?.variants?.map((variant) => variant.size)),
  ];

  return (
    <>
      <main className="p-[24px_0px_60px] lg:p-[64px_0px_95px]">
        <div className="container">
          {loading ? (
            <div className="grid place-items-center">
              <img src="/loading.gif" alt="Loading..." loading="lazy" />
            </div>
          ) : (
            <div className="grid w-full overflow-hidden gap-10 md:grid-cols-[50%_1fr] xl:gap-[50px]">
              <ProductCarousel imageUrls={product.imageUrls} />
              <div className="flex flex-col">
                <div className="flex items-center justify-between gap-4 mb-1">
                  <p className="text-[18px] font-semibold lg:text-[24px]">
                    ID: {product.skuCode}
                  </p>
                  <button>
                    <Icons.heart />
                  </button>
                </div>
                <h5 className="mb-1">{product.name}</h5>
                <p className="text-secondary-700 text-[18px] font-semibold mb-6 lg:text-[24px]">
                  {product.description}
                </p>
                <div className="grid gap-2 mb-6">
                  {product.price > product.promotionalPrice ? (
                    <>
                      <p className="text-[32px] font-bold">
                        <span className="bg-danger text-white inline-block p-[8px_10px]">
                          THB {product.promotionalPrice}
                        </span>
                      </p>
                      <p className="text-[18px] font-semibold">
                        From <del>THB {product.price}</del>
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-[32px] font-bold">
                        THB {product.price}
                      </p>
                      <p className="text-danger text-[18px] font-semibold">
                        Out of stock
                      </p>
                    </>
                  )}
                </div>
                <div className="flex mb-6">
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
                <div className="mb-6">
                  <p className="text-secondary-700 mb-2">Color</p>
                  <ul className="flex flex-wrap gap-2">
                    {uniqueColors.map((color) => (
                      <li
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className="w-[100px] flex flex-col items-center gap-1"
                      >
                        <span
                          className={`block w-[54px] h-[54px] ${
                            selectedColor === color
                              ? "border border-primary"
                              : ""
                          }`}
                          style={{
                            backgroundColor: product.variants.find(
                              (variant) => variant.color === color
                            )?.colorCode,
                          }}
                        ></span>
                        <p>
                          {
                            product.variants.find(
                              (variant) => variant.color === color
                            )?.color
                          }
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <p className="text-secondary-700 mb-2">Size</p>
                  <ul className="flex flex-wrap gap-2">
                    {uniqueSizes.map((size) => (
                      <li key={size}>
                        <button
                          onClick={() => setSelectedSize(size)}
                          className={`border w-[100px] h-[54px] text-secondary ${
                            selectedSize === size ? " border-primary" : ""
                          }`}
                        >
                          {size}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <button className="btn-primary" onClick={addToCart}>
                  Add to cart
                </button>
                {cartMessage && (
                  <p className="mt-4 text-center text-green-500">
                    {cartMessage}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default ProductDetails;
