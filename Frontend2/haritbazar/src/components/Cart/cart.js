import React from "react";
import CartItem from "../Cart/cartitem.js"
import CartSummary from "../Cart/cartsummary.js";
import "../Cart/cartCSS.css";

const Cart = ({ items, onUpdateQuantity, onRemove }) => {
  return (
    <div className="cart container mt-5">
      <h2 className="text-center mb-4">Your Cart</h2>
      <div className="cart-items">
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onUpdateQuantity={onUpdateQuantity}
            onRemove={onRemove}
          />
        ))}
      </div>
      <CartSummary items={items} />
    </div>
  );
};

export default Cart;
