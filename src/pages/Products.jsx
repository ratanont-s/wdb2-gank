import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import ProductList from "../components/products/ProductList";

const API_URL = "https://api.storefront.wdb.skooldio.dev";

const Products = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoryParam = searchParams.get("categories");
  const categoryParamAll = searchParams.getAll("categories");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${API_URL}/products${
            categoryParamAll ? `?categories=${categoryParamAll.join(",")}` : ""
          }`
        );
        const allProducts = response.data.data;
        setProducts(allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryParam]);

  return (
    <main className="p-[24px_0px_60px] lg:p-[64px_0px_95px]">
      <div className="container">
        <div className="grid gap-10 mb-10 lg:grid-cols-[1fr_3fr] lg:items-start">
          <div>Filters</div>
          <div>
            <div className="flex items-end justify-between gap-4 mb-6 lg:mb-[42px]">
              <h5 className="w-full">Product List</h5>
              <select className="w-auto">
                <option>Sort by</option>
                <option>Price - Low to high</option>
                <option>Price - High to low</option>
                <option>Best seller</option>
              </select>
            </div>
            {loading ? (
              <div className="grid place-items-center">
                <img src="/loading.gif" alt="Loading..." loading="lazy" />
              </div>
            ) : (
              <ProductList products={products} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Products;
