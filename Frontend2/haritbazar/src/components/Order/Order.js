import React, { useState, useEffect } from 'react';
import { api } from '../../axios'; // Your API setup

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [placingOrder, setPlacingOrder] = useState(false);

  // Fetch orders when the component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/order/user-orders');
        setOrders(response.data.order); // Assuming API response has 'order' field
        setLoading(false);
      } catch (err) {
        setError('Error fetching orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Handle Cancel Order action
  const handleCancelOrder = async (orderId) => {
    try {
      await api.delete(`/order/cancel-order/${orderId}`);
      setOrders(orders.filter(order => order.id !== orderId)); // Remove cancelled order
    } catch (err) {
      setError('Error canceling the order');
    }
  };

  // Handle Place Order action
  const handlePlaceOrder = async () => {
    setPlacingOrder(true);
    try {
      // Assume the API expects order data in a certain format
      const orderData = {
        user_id: 1, // Replace with the actual user ID
        orderItems: orders.map(order => ({
          product_id: order.id,
          quantity: 1 
        })),
        totalAmount: orders.reduce((total, order) => total + order.totalAmount, 0),
      };


      const response = await api.post('/order/place-order', orderData);
      setOrders([]); 
      setPlacingOrder(false);
      alert('Order placed successfully!');
    } catch (err) {
      setPlacingOrder(false);
      setError('Error placing the order');
    }
  };


  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }


  if (error) {
    return (
      <div className="alert alert-danger text-center mt-5" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2>Your Orders</h2>

      {orders.length === 0 ? (
        <div className="alert alert-light" role="alert">
          You have no orders placed yet.
        </div>
      ) : (
        <div className="row">
          {orders.map(order => (
            <div key={order.id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Order ID: {order.id}</h5>
                  <p className="card-text">Status: <span className={`badge ${order.status === 'Shipped' ? 'bg-success' : 'bg-warning'}`}>{order.status}</span></p>
                  <p><strong>Total Amount:</strong> ${order.totalAmount}</p>
                  <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                  <h6>Items:</h6>
                  <ul>
                    {order.orderItems.map((item, idx) => (
                      <li key={idx}>
                        {item.product_name} - {item.quantity} x ${item.product_price}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleCancelOrder(order.id)}
                    className="btn btn-danger"
                    disabled={order.status === 'Cancelled' || order.status === 'Shipped'}
                  >
                    {order.status === 'Cancelled' ? 'Cancelled' : 'Cancel Order'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Place Order Button */}
      <div className="text-center mt-4">
        <button
          onClick={handlePlaceOrder}
          className="btn btn-success"
          disabled={placingOrder || orders.length === 0}
        >
          {placingOrder ? 'Placing Order...' : 'Place Order'}
        </button>
      </div>
    </div>
  );
};

export default OrderPage;
