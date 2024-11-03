import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCarousel from "../components/productDetails/ProductCarousel"; // Import the ProductCarousel component
import ColorSelector from "../components/productDetails/ColorSelector";
import SizeSelector from "../components/productDetails/SizeSelector";
import QuantitySelector from "../components/productDetails/QuantitySelector";
import AddCartModal from "../components/productDetails/AddCartModal";
import { Icons } from "../components/Icons";
import { formatCurrency } from "../utils/helpers";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  // State for selectors
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.storefront.wdb.skooldio.dev/products/${id}`
        );
        setProduct(response.data);

        if (response.data.variants.length > 0) {
          setSelectedColor(response.data.variants[0].color);
          setSelectedSize(response.data.variants[0].size);
        }
      } catch (err) {
        setError("Product not found or failed to load.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Ensure product and variants are loaded before accessing
  const selectedVariant =
    product && product.variants
      ? product.variants.find(
          (variant) =>
            variant.color === selectedColor && variant.size === selectedSize
        )
      : null;
  const maxQuantity = selectedVariant ? selectedVariant.remains : 0;

  // Check if there are any sizes available in the variants
  const hasSizes = product?.variants?.some((variant) => variant.size);

  // Add to Cart function
  const addToCart = async () => {
    setIsProcessing(true);
    try {
      const cartId = localStorage.getItem("cartId");
      const payload = {
        skuCode: selectedVariant.skuCode,
        quantity: quantity,
        productPermalink: product.permalink,
      };

      let response;
      if (!cartId) {
        response = await axios.post(
          "https://api.storefront.wdb.skooldio.dev/carts",
          {
            items: [payload],
          }
        );
        localStorage.setItem("cartId", response.data.id); // Save cartId to local storage
      } else {
        response = await axios.post(
          `https://api.storefront.wdb.skooldio.dev/carts/${cartId}/items`,
          {
            items: [payload],
          }
        );
      }

      setShowModal(true); // Show modal on success
    } catch (error) {
      setShowModal(true); // Show modal on failure
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-svh">
      <div className="container pt-6 pb-20 lg:py-16">
        <div className="grid md:grid-cols-2 md:gap-10">
          <div className="mb-10 w-full overflow-hidden relative">
            <ProductCarousel images={product?.imageUrls} />
            {product?.price > product?.promotionalPrice && (
              <span className="absolute top-6 right-1 bg-danger text-white py-1 px-[10px] lg:top-[83px] lg:text-2xl">
                -{" "}
                {Math.round(
                  ((product?.price - product?.promotionalPrice) /
                    product?.price) *
                    100
                )}
                %
              </span>
            )}
          </div>
          <div>
            <div className="flex items-center justify-between gap-4 mb-1">
              <p className="text-subheading">ID: {selectedVariant?.skuCode}</p>
              <button>
                <Icons.heart />
              </button>
            </div>
            <h4 className="mb-1">{product?.name}</h4>
            <p className="text-secondary-700 text-subheading mb-6">
              {product?.description}
            </p>
            <div className="flex flex-col gap-2 mb-6">
              {product?.price > product?.promotionalPrice ? (
                <>
                  <h5 className="bg-danger text-white py-2 px-[10px] w-fit">
                    {formatCurrency(product?.promotionalPrice)}
                  </h5>
                  <p className="text-subheading">
                    From <del>{formatCurrency(product?.price)}</del>
                  </p>
                </>
              ) : (
                <h5>{formatCurrency(product?.price)}</h5>
              )}
            </div>
            <ul className="flex mb-10">
              {Array.from({ length: 5 }, (_, index) => (
                <li key={index}>
                  {index < product?.ratings ? (
                    <Icons.review />
                  ) : (
                    <Icons.review2 />
                  )}
                </li>
              ))}
            </ul>

            {product && product?.variants && (
              <>
                <ColorSelector
                  variants={product?.variants}
                  selectedColor={selectedColor}
                  onColorChange={setSelectedColor}
                />

                {/* Conditionally render SizeSelector if sizes are available */}
                {hasSizes && (
                  <SizeSelector
                    variants={product.variants}
                    selectedColor={selectedColor}
                    selectedSize={selectedSize}
                    onSizeChange={setSelectedSize}
                  />
                )}
                <QuantitySelector
                  quantity={quantity}
                  onQuantityChange={setQuantity}
                  maxQuantity={maxQuantity}
                />
              </>
            )}

            <button
              className="btn-primary w-full mt-6 flex justify-center items-center"
              onClick={addToCart}
              disabled={maxQuantity === 0 || isProcessing}
            >
              {isProcessing ? <Icons.loading /> : ""}
              Add to Cart
            </button>
          </div>
        </div>

        {/* Show Modal if item is added to cart successfully */}
        {showModal && (
          <AddCartModal
            imageUrl={product?.imageUrls[0]}
            productName={product?.name}
            quantity={quantity}
            price={formatCurrency(product?.price)}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </main>
  );
};

export default ProductDetails;
