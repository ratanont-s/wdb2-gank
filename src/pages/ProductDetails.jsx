import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProductCarousel from "../components/products/ProductCarousel";
import { Icons } from "../components/Icons";

const API_URL = "https://api.storefront.wdb.skooldio.dev";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  const { productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API_URL}/products/${productId}`);
        const product = response.data;
        console.log("🚀 ~ fetchProduct ~ product:", product);
        setProduct(product);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, []);

  return (
    <main className="p-[24px_0px_60px] lg:p-[64px_0px_95px]">
      <div className="container">
        {loading ? (
          <div className="grid place-items-center">
            <img src="/loading.gif" alt="Loading..." loading="lazy" />
          </div>
        ) : (
          <div className="grid w-full overflow-hidden gap-10 md:grid-cols-[1fr_1fr] xl:gap-[50px]">
            <ProductCarousel imageUrls={product.imageUrls} />
            <div>
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
                    <p className="text-[32px] font-bold">THB {product.price}</p>
                    <p className="text-danger text-[18px] font-semibold">
                      Out of stock
                    </p>
                  </>
                )}
              </div>
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
            </div>
          </div>
        )}
        <h5 className="mt-[80px] text-center md:mt-[48px] md:text-left">
          People also like these
        </h5>
      </div>
    </main>
  );
};

export default ProductDetails;
