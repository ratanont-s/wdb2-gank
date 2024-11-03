import { Link } from "react-router-dom";
import { Icons } from "../Icons";

const AddCartModal = ({ imageUrl, productName, quantity, price, onClose }) => {
  return (
    <div className="fixed inset-0 p-4 bg-black/50 z-50 grid place-items-center">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-[852px] grid gap-6">
        <div className="flex items-center justify-between">
          <p className="text-subheading">Items added to you cart</p>
          <button onClick={onClose}>
            <Icons.close />
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-[160px_1fr] md:gap-10 md:items-center">
          <img
            className="w-full aspect-square object-cover"
            src={imageUrl}
            alt={productName}
            loading="lazy"
          />
          <div className="grid gap-2 md:grid-cols-[1fr_auto] md:items-start">
            <div className="grid gap-2">
              <p className="text-subheading">{productName}</p>
              <p className="text-secondary-700">Qty: {quantity}</p>
            </div>
            <p className="text-subheading text-right">{price}</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Link to="/cart" className="btn-primary">
            View Cart
          </Link>
          <button className="btn-secondary" onClick={onClose}>
            Continue shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCartModal;
