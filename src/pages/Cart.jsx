import { useEffect, useState, useContext } from "react";
import axios from "axios";
import EmptyCart from "../components/cart/EmptyCart";
import CartSummary from "../components/cart/CartSummary";
import CartList from "../components/cart/CartList";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartItemsData, setCartItemsData] = useState([]);

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
        console.log(cartData);
        setCartItemsData(cartData);
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
              <ul className="grid gap-6 divide-y divide-secondary-300">
                <li className="pt-6 md:grid md:grid-cols-[162px_1fr] md:grid-rows-[auto_1fr] md:gap-x-6">
                  <div className="mb-4 md:mb-0 md:row-span-2">
                    <div className="w-full aspect-square object-cover bg-secondary-100"></div>
                  </div>
                  <div className="flex justify-between gap-4 mb-5 md:mb-10">
                    <div className="w-full h-10 aspect-square object-cover bg-secondary-100"></div>
                    <div className="w-10 h-10 aspect-square object-cover bg-secondary-100"></div>
                  </div>
                  <div className="grid gap-6 md:grid-cols-[1fr_auto] md:gap-4">
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-2">
                      <div className="col-span-2 md:col-span-1">
                        <div className="bg-secondary-100 w-1/4 h-6 mb-2"></div>
                        <div className="bg-secondary-100 w-full h-[54px] "></div>
                      </div>
                      <div>
                        <div className="bg-secondary-100 w-1/4 h-6 mb-2"></div>
                        <div className="bg-secondary-100 w-full h-[54px] "></div>
                      </div>
                      <div>
                        <div className="bg-secondary-100 w-1/4 h-6 mb-2"></div>
                        <div className="bg-secondary-100 w-full h-[54px] "></div>
                      </div>
                    </div>
                    <div className="bg-secondary-100 w-1/3 h-8 ml-auto md:self-end md:w-[140px]"></div>
                  </div>
                </li>
              </ul>
            ) : (
              <>
                {cart && cart?.items?.length === 0 ? (
                  <EmptyCart />
                ) : (
                  <CartList
                    items={cart?.items}
                    cartItemsData={cartItemsData}
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
