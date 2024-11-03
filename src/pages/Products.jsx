import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import ProductList from "../components/products/ProductList";
import ProductHeader from "../components/products/ProductHeader";

const Products = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("default");

  const categoriesParam = searchParams.get("categories");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://api.storefront.wdb.skooldio.dev/products"
        );
        const allProducts = response.data.data;

        // Filter products based on categories in query parameter
        const filteredProducts = categoriesParam
          ? allProducts.filter((product) =>
              categoriesParam
                .split(",")
                .some((category) => product.categories.includes(category))
            )
          : allProducts;

        setProducts(filteredProducts);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoriesParam]);

  // Sorting logic
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "price-low-high") {
      return (a.promotionalPrice || a.price) - (b.promotionalPrice || b.price);
    }
    if (sortOption === "price-high-low") {
      return (b.promotionalPrice || b.price) - (a.promotionalPrice || a.price);
    }
    if (sortOption === "rating") {
      return b.ratings - a.ratings;
    }
    return 0; // default order if no sorting selected
  });

  return (
    <main className="min-h-svh">
      <div className="container pt-6 pb-20 lg:py-16">
        <ProductHeader sortOption={sortOption} setSortOption={setSortOption} />
        <ProductList loading={loading} products={sortedProducts} />
      </div>
    </main>
  );
};

export default Products;
