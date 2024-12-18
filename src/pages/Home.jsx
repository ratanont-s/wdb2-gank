import React, { useEffect, useState, Fragment } from "react";
import Hero from "../components/home/Hero";
import axios from "axios";
import { Link } from "react-router-dom";
import { Icons } from "../components/Icons";
import ProductCard from "../components/products/ProductCard";

const BASE_URL = "https://api.storefront.wdb.skooldio.dev";

const Home = () => {
  const [collection, setCollection] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCollection = async () => {
    try {
      console.log("fetching collection");
      const response = await axios.get(`${BASE_URL}/collections`);
      if (response.status === 200) {
        setCollection(response.data);
      }
      console.log("collection fetched");
    } catch (error) {
      console.error("Error fetching collection:", error);
    }
  };

  const fetchFeaturedProducts = async () => {
    try {
      console.log("fetching featured products");
      const response = await axios.get(`${BASE_URL}/products`, {
        params: {
          limit: 4,
          sort: "ratings:desc",
        },
      });
      if (response.status === 200) {
        setFeaturedProducts(response.data.data);
      }
      console.log("featured products fetched");
    } catch (error) {
      console.error("Error fetching featured products:", error);
    }
  };

  useEffect(() => {
    Promise.all([fetchCollection(), fetchFeaturedProducts()]).finally(() => {
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Hero />
      <div className="container mt-[96px]">
        {loading ? (
          <LoadingView />
        ) : (
          <>
            <CollectionView collections={collection} />
            <FeaturedProductsView products={featuredProducts} />
          </>
        )}
      </div>
    </>
  );
};

const CollectionView = ({ collections }) => {
  const firstCollection = collections[0];

  return (
    <div className="grid grid-cols-1  lg:grid-cols-3 gap-4 xl:gap-8 pb-20">
      <div>
        <h1 className="text-7xl font-bold">2024</h1>
        <h3 className="text-4xl mb-6">Collection</h3>
        <p className="text-gray-600 leading-relaxed">
          Step into a world of winter elegance and style with our latest Winter
          Collection. As temperatures drop, our curated selection of clothing is
          designed to keep you fashionably warm. From luxurious knitwear to
          trend-setting outerwear, each piece in our collection is a celebration
          of seasonal sophistication. Explore the blend of comfort and fashion,
          as we present you with the must-have ensembles to make a statement in
          the chilly months ahead. Welcome to a winter wardrobe that seamlessly
          combines coziness with chic aesthetics.
        </p>
      </div>

      {firstCollection.items.map((item) => (
        <div
          key={item.title}
          className="relative group cursor-pointer text-center h-[500px] lg:h-[400px]"
        >
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex flex-col justify-end p-6 text-white">
            <h4 className="text-2xl font-semibold mb-2">{item.title}</h4>
            <p className="text-sm mb-4">{item.description}</p>
            <ViewMoreButton />
          </div>
        </div>
      ))}
    </div>
  );
};

const FeaturedProductsView = ({ products }) => {
  return (
    <div className="grid gap-10 mb-20">
      <h3 className="text-4xl mb-6 col-span-full text-center">
        Featured Products
      </h3>

      <div className="grid col-span-full gap-10 sm:grid-cols-2 xl:grid-cols-4">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

const LoadingView = () => {
  return (
    <div className="grid place-items-center">
      <img src="/loading.gif" alt="Loading..." loading="lazy" />
    </div>
  );
};

const ViewMoreButton = () => {
  return (
    <button className="text-white px-2.5 py-1.5 bg-[#222] max-w-[105px] mx-auto h-[54px]">
      View more
    </button>
  );
};

export default Home;
