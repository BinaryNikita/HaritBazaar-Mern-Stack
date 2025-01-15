import React from "react";
import "../Cart/cartitemCSS.css";

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="cart-item d-flex align-items-center mb-3">
      <img
        src={item.image}
        alt={item.name}
        className="cart-item-image me-3"
      />
      <div className="cart-item-details flex-grow-1">
        <h5 className="cart-item-name">{item.name}</h5>
        <p className="cart-item-price">${item.price}</p>
        <div className="cart-item-actions">
          <button
            className="btn btn-sm btn-outline-success me-2"
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          >
            +
          </button>
          <span>{item.quantity}</span>
          <button
            className="btn btn-sm btn-outline-danger ms-2"
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          >
            -
          </button>
        </div>
      </div>
      <button
        className="btn btn-sm btn-danger"
        onClick={() => onRemove(item.id)}
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
