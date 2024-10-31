import React from "react";
import { Icons } from "../Icons";
import { Link } from "react-router-dom";

const AddToCartModal = ({ product }) => {
  return (
    <div className="fixed inset-0 z-50 p-4 grid place-items-center bg-black/50">
      <div className="bg-white p-6 rounded-2xl w-full max-w-[900px]">
        <div className="flex items-center justify-between">
          <h6>Items added to your cart</h6>
          <button>
            <Icons.close />
          </button>
        </div>
        <div className="grid md:grid-cols-[auto_1fr]">
          <img src="" alt="" />
          <div>
            <div>
              <h6>Reyon Long Sleeve Shirt</h6>
              <p>QTY : 2</p>
            </div>
            <h6>THB 2,000.00</h6>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Link className="btn-primary" to="/cart">
            View cart
          </Link>
          <Link className="btn-secondary" to="/products">
            View cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddToCartModal;
