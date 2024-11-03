import { useState, useEffect } from "react";
import axios from "axios";
import { Icons } from "../Icons";
import { formatCurrency } from "../../utils/helpers";

const CartItem = ({ item, onRemove, onUpdate }) => {
  const [cartItem, setCartItem] = useState(null);

  useEffect(() => {
    const fetchCartItem = async () => {
      try {
        const response = await axios.get(
          `https://api.storefront.wdb.skooldio.dev/products/${item.productPermalink}`
        );
        setCartItem(response.data);
      } catch (error) {
        console.error("Error fetching cart item:", error);
      }
    };

    fetchCartItem();
  }, []);

  return (
    <li className="pt-6 md:grid md:grid-cols-[162px_1fr] md:grid-rows-[auto_1fr] md:gap-x-6">
      <div className="mb-4 md:mb-0 md:row-span-2">
        <img
          className="w-full aspect-square object-cover mx-auto"
          src={cartItem?.imageUrls[0]}
          alt={cartItem?.name}
          loading="lazy"
        />
      </div>
      <div className="flex justify-between gap-4 mb-5 md:mb-10">
        <h6>{cartItem?.name}</h6>
        <button onClick={() => onRemove(item.id)}>
          <Icons.delete />
        </button>
      </div>
      <div className="grid gap-6 md:grid-cols-[1fr_auto] md:gap-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-2">
          <div className="col-span-2 md:col-span-1">
            <label className="inline-block text-secondary-700 mb-2">
              Color
            </label>
            <select>
              <option value="">Color</option>
            </select>
          </div>
          <div>
            <label className="inline-block text-secondary-700 mb-2">Size</label>
            <select>
              <option value="">Size</option>
            </select>
          </div>
          <div>
            <label className="inline-block text-secondary-700 mb-2">Qty.</label>
            <select>
              <option value={item.quantity}>{item.quantity}</option>
            </select>
          </div>
        </div>
        <h6 className="text-right md:self-end md:text-subheading md:min-w-[140px]">
          {cartItem?.price > cartItem?.promotionalPrice ? (
            <span>{formatCurrency(cartItem?.promotionalPrice)}</span>
          ) : (
            <span>{formatCurrency(cartItem?.price)}</span>
          )}
        </h6>
      </div>
    </li>
  );
};

export default CartItem;
