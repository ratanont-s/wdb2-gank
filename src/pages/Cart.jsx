import { useEffect, useState, useContext } from "react";
import axios from "axios";
import EmptyCart from "../components/cart/EmptyCart";
import CartSummary from "../components/cart/CartSummary";
import CartList from "../components/cart/CartList";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get the cart ID from local storage
    const cartId = localStorage.getItem("cartId");

    // If no cart ID is found, set an error message
    if (!cartId) {
      setLoading(false);
      return;
    }

    const fetchCart = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.storefront.wdb.skooldio.dev/carts/${cartId}`
        );
        const cartData = response.data;

        // Fetch product details for each item in the cart
        const itemsWithDetails = await Promise.all(
          cartData.items.map(async (item) => {
            const productResponse = await axios.get(
              `https://api.storefront.wdb.skooldio.dev/products/${item.productPermalink}`
            );
            const productData = productResponse.data;

            return {
              ...item,
              name: productData.name,
              price: productData.price,
              promotionalPrice: productData.promotionalPrice,
            };
          })
        );

        setCart({ ...cartData, items: itemsWithDetails });
      } catch (err) {
        setError("Failed to load cart. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // Function to remove an item from the cart
  const removeItem = async (itemId) => {
    const cartId = localStorage.getItem("cartId");
    if (!cartId) return;

    try {
      await axios.delete(
        `https://api.storefront.wdb.skooldio.dev/carts/${cartId}/items/${itemId}`
      );
      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.filter((item) => item.id !== itemId),
      }));
    } catch (err) {
      setError("Failed to remove item from cart. Please try again.");
    }
  };

  // Function to update item details in the cart
  const updateItem = async (itemId, skuCode, quantity) => {
    const cartId = localStorage.getItem("cartId");
    if (!cartId) return;

    try {
      const response = await axios.patch(
        `https://api.storefront.wdb.skooldio.dev/carts/${cartId}/items/${itemId}`,
        {
          skuCode,
          quantity,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // Update the cart state with the updated items from the response
      setCart(response.data);
    } catch (err) {
      setError("Failed to update item. Please try again.");
    }
  };

  const itemsCount = cart?.items?.length || 0;
  const cartItems = cart?.items || [];

  localStorage.setItem("cartItemsCount", itemsCount);

  return (
    <main className="bg-secondary-50 p-[24px_0px_60px] lg:p-[64px_0px_95px]">
      <div className="container">
        <h5 className="mb-[34px]">My Cart</h5>
        <div className="grid gap-10 mb-10 xl:grid-cols-[1fr_440px] xl:items-start">
          <div className="bg-white p-4 lg:p-6">
            <h6>Items</h6>
            {loading ? (
              <div className="grid place-items-center">
                <img src="/loading.gif" alt="Loading..." loading="lazy" />
              </div>
            ) : (
              <>
                {cart && cart?.items?.length === 0 ? (
                  <EmptyCart />
                ) : (
                  <CartList
                    items={cart?.items}
                    onRemove={removeItem}
                    onUpdate={updateItem}
                  />
                )}
              </>
            )}
          </div>
          <CartSummary itemsCount={itemsCount} cartItems={cartItems} />
        </div>
      </div>
    </main>
  );
};

export default Cart;
