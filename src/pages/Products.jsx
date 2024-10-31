import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import ProductList from "../components/products/ProductList";

const API_URL = "https://api.storefront.wdb.skooldio.dev";

const Products = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("default");

  const categoryParam = searchParams.get("categories");
  const categoryParamAll = searchParams.getAll("categories");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/products${
            categoryParamAll ? `?categories=${categoryParamAll.join()}` : ""
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

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "priceLowToHigh") {
      return a.price - b.price;
    } else if (sortOption === "priceHighToLow") {
      return b.price - a.price;
    } else if (sortOption === "bestSeller") {
      return b.ratings - a.ratings;
    } else {
      return 0;
    }
  });

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const getCategoryName = (categoryParamAll) => {
    const category = categoryParamAll.join();
    switch (category) {
      case "all-men":
        return "Men's Clothes";
      case "all-ladies":
        return "Women's Clothes";
      case "men-shoes,ladies-shoes":
        return "Shoes";
      case "men-accessories,ladies-accessories":
        return "Accessories";
      default:
        return "";
    }
  };

  return (
    <main className="p-[24px_0px_60px] lg:p-[64px_0px_95px]">
      <div className="container">
        <div className="grid gap-10 mb-10 lg:grid-cols-[1fr_3fr] lg:items-start">
          <div>Filters</div>
          <div>
            <div className="flex items-end justify-between gap-4 mb-6 lg:mb-[42px]">
              <h5 className="w-full">{getCategoryName(categoryParamAll)}</h5>
              <select
                className="w-auto"
                value={sortOption}
                onChange={handleSortChange}
              >
                <option value="default">Sort by</option>
                <option value="priceLowToHigh">Price - Low to High</option>
                <option value="priceHighToLow">Price - High to Low</option>
                <option value="bestSeller">Ratings</option>
              </select>
            </div>
            {loading ? (
              <div className="grid place-items-center">
                <img src="/loading.gif" alt="Loading..." loading="lazy" />
              </div>
            ) : (
              <ProductList products={sortedProducts} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Products;
