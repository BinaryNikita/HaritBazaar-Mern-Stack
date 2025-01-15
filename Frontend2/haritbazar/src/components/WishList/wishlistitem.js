import React from "react";
import "../WishList/wishlistitemCSS.css";

const WishlistItem = ({ item, onMoveToCart, onRemove }) => {
  return (
    <div className="wishlist-item d-flex align-items-center mb-3">
      <img
        src={item.image}
        alt={item.name}
        className="wishlist-item-image me-3"
      />
      <div className="wishlist-item-details flex-grow-1">
        <h5 className="wishlist-item-name">{item.name}</h5>
        <p className="wishlist-item-price">${item.price}</p>
      </div>
      <button
        className="btn btn-sm btn-success me-2"
        onClick={() => onMoveToCart(item.id)}
      >
        Move to Cart
      </button>
      <button
        className="btn btn-sm btn-danger"
        onClick={() => onRemove(item.id)}
      >
        Remove
      </button>
    </div>
  );
};

export default WishlistItem;
