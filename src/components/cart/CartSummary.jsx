import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/helpers";

const CartSummary = ({ itemsCount, cartItems }) => {
  const shippingFee = 0;

  // Calculate subtotal
  const subtotal = cartItems?.reduce(
    (total, item) => total + item?.price * item?.quantity,
    0
  );

  return (
    <div className="bg-white p-4 lg:p-6">
      <h6 className="flex justify-between items-end mb-6">
        Summary
        <small className="text-secondary-700 text-[18px] font-semibold">
          {itemsCount || 0} items
        </small>
      </h6>
      <div className="mb-10">
        <ul className="flex flex-col gap-4">
          {itemsCount === 0 ? (
            <>
              <li className="flex items-center justify-between">
                <span>No item</span>
                <span>0.00</span>
              </li>
            </>
          ) : (
            <>
              {cartItems?.map((item) => (
                <li
                  key={item?.id}
                  className="flex items-center justify-between"
                >
                  <span>{item?.name}</span>
                  <span>{formatCurrency(item?.price * item?.quantity)}</span>
                </li>
              ))}
            </>
          )}
        </ul>
        <hr className="my-6" />
        <ul className="flex flex-col gap-4">
          <li className="flex items-center justify-between">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </li>
          <li className="flex items-center justify-between">
            <span>Shipping fee</span>
            <span>{formatCurrency(shippingFee)}</span>
          </li>
        </ul>
        <hr className="my-6" />
        <p className="flex items-center justify-between text-[18px] font-semibold">
          <span>Total</span>
          <span>{formatCurrency(subtotal + shippingFee)}</span>
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
        <button className="btn-primary" disabled={itemsCount === 0}>
          Check out
        </button>
        <Link className="btn-secondary" to="/products">
          Continue shopping
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;
