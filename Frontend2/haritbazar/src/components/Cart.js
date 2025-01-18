import React, { useEffect, useState } from "react";
import { api } from "../axios";
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await api.get("/cart/get-cart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, 
        },
      });
      const { data } = response;
      if (data.data.cartItems) 
        {
          console.log(data.data)
        setCartItems(data.data.cartItems);
        setTotalAmount(data.data.totalAmount);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Failed to load cart items");
    }
  };


  const removeFromCart = async (productId) => {
    try {
      await api.delete(`/cart/delete-cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchCart(); 
    } catch (err) {
      setError("Failed to remove item from cart");
    }
  };


  const updateQuantity = async (productId, quantity) => {
    try {
      await api.post(
        "/api/cart/update-cart",
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchCart(); 
    } catch (err) {
      setError("Failed to update item quantity");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.product_id._id}>
                <div>
                  <img
                    src={'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSR_1sL9iTj9cp-tJ_0a8JOVVcToVXMh6zpl5fES42Fprlmz0kuezwLCtHHE4WV6ZzqmltldUuj3E1oxC_65AsLv2C9UT7ktd2Z0Z9cz2sP-iI5RDPK8jU_&usqp=CAE'} // Assuming there's an image URL in the product
                    alt={item.product_id.name}
                    width="50"
                  />
                  <h3>{item.product_id.name}</h3>
                  <p>{item.product_id.description}</p>
                  <p>Price: ${item.product_id.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <button onClick={() => removeFromCart(item.product_id._id)}>
                    Remove from Cart
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="total-amount">
            <h3>Total: ${totalAmount}</h3>
            <button onClick={() => alert("Proceed to Checkout")}>Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
