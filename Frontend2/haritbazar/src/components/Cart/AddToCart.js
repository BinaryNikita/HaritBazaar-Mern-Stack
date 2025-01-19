import React, { useState, useEffect } from "react";
import { api } from "../../axios";
import { useNavigate } from "react-router-dom";

const AddToCartComponent = ({ productId }) => {
  const [quantity, setQuantity] = useState(1); 
  const [message, setMessage] = useState(""); 
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token"); 
      console.log(token);
      const headers = {
        Authorization: `Bearer ${token}`, 
      };


      const response = await api.post(
        "/cart/add-to-cart",
        { productId, quantity },
        { headers }
      );


      if(!token){
        navigate('/user/sign-in');
        setMessage(response.data.message || "You have to sign in first...");
        return;
      }

      setMessage(response.data.message || "Added to cart successfully!");
    } catch (err) {
      console.error("Error adding to cart:", err);
      setMessage("Failed to add item to cart. Please try again.");
    }
  };

  return (
    <div>
      <div>
        <label>
          Quantity:
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </label>
      </div>

      <div className="container">
      <button className="btn btn-success mt-3 btn-sm" onClick={handleAddToCart}> Add to Cart</button>
      {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default AddToCartComponent;
