import React, { useEffect, useState } from 'react';
import { api, setAuthToken } from '../../axios'; 
const CartComponent = () => {
  const [cart, setCart] = useState({ items: [], totalAmount: 0 });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);

  const token = localStorage.getItem('authToken'); 
  if (token) setAuthToken(token);

  const fetchCart = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem("token"); 
  console.log(token);
  const headers = {
    Authorization: `Bearer ${token}`, 
  };
      const response = await api.get('cart/get-cart', { headers });
      console.log(response.data);
      setCart(response.data.data);
    } catch (err) {
      setError('Failed to load cart items. Please try again.');
    } finally {
      setLoading(false);
    }
  };

 
  const handleRemoveFromCart = async (productId) => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem("token"); 
      console.log(token);
      const headers = {
        Authorization: `Bearer ${token}`, 
      };

      
      const response = await api.delete(`cart/productId/${productId}`, { headers });
      alert(response.data.message);
      fetchCart();
    } catch (err) {
      setError('Failed to remove item from cart. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="cart-component">
      <h1>Shopping Cart</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <label htmlFor="quantity">Quantity:</label>
        <input
          id="quantity"
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </div>

      <div className="cart-items">
        {cart.items.length > 0 ? (
          cart.items.map((item) => (
            <div key={item.product_id._id} className="cart-item">
              <p><strong>Product:</strong> {item.product_id.name}</p>
              <p><strong>Price:</strong> ${item.product_id.price}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
              <button onClick={() => handleRemoveFromCart(item.product_id._id)}>
                Remove
              </button>
            </div>
          ))
        ) : (
          <p>No items in the cart.</p>
        )}
      </div>

      <h2>Total Amount: ${cart.totalAmount.toFixed(2)}</h2>

    </div>
  );
};

export default CartComponent;
