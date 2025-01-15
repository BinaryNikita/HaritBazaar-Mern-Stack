import React from "react";
import WishlistItem from "../WishList/wishlistitem.js";
import "../WishList/wishlistCSS.css";

const Wishlist = ({ items, onMoveToCart, onRemove }) => {
  return (
    <div className="wishlist container mt-5">
      <h2 className="text-center mb-4">Your Wishlist</h2>
      {items.length > 0 ? (
        <div className="wishlist-items">
          {items.map((item) => (
            <WishlistItem
              key={item.id}
              item={item}
              onMoveToCart={onMoveToCart}
              onRemove={onRemove}
            />
          ))}
        </div>
      ) : (
        <p className="text-center">Your wishlist is empty!</p>
      )}
    </div>
  );
};

export default Wishlist;
