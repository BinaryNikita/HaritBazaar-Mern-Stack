import React from "react";
import "../Cart/cartsummaryCSS.css";

const CartSummary = ({ items }) => {
  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="cart-summary text-center mt-4">
      <h4>Total: ${calculateTotal().toFixed(2)}</h4>
      <button className="btn btn-success btn-lg mt-3">Checkout</button>
    </div>
  );
};

export default CartSummary;
