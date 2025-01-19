import React, { useEffect, useState } from 'react';
import { api } from '../../axios';
import { Link } from 'react-router-dom';
import Header from '../FrontPage/Header';
import Footer from '../FrontPage/Footer';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/order/user-orders', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        console.log('Response:', response.data);

        if (response.data && response.data.order) {
          setOrders(response.data.order);
        } else {
          console.warn('No orders found in the response data.');
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to fetch orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const cancelOrder = async (orderId) => {
    try {
      await api.delete(`/order/cancel-order/${orderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setOrders(orders.filter((order) => order._id !== orderId));
    } catch (err) {
      console.error('Error cancelling order:', err);
      setError('Failed to cancel the order. Please try again.');
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading orders...</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center">{error}</div>;
  }

  return (
    <>
      <div className="container-fluid mt-4">
        <Header />
      </div>
      <div className="container mt-4 bg-success p-5">
        <h1 className="text-center mb-4 text-light pt-3 ">Order History</h1>
        {orders.length > 0 ? (
          <div className="row">
            {orders.map((order) => (
              <div key={order._id} className="col-md-6 mb-4">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">Order ID: {order._id}</h5>
                    <p className="card-text">
                      <strong>Status:</strong> {order.orderStatus}
                    </p>
                    <p className="card-text">
                      <strong>Total:</strong> ${order.total}
                    </p>
                    <p className="card-text">
                      <strong>Order Date:</strong>{' '}
                      {new Date(order.orderDate).toLocaleString()}
                    </p>

                    <h6 className="mt-3">Billing Details:</h6>
                    <ul className="list-unstyled">
                      <li>
                        <strong>Full Name:</strong>{' '}
                        {order.billingDetails.fullName}
                      </li>
                      <li>
                        <strong>Address:</strong>{' '}
                        {order.billingDetails.addressLine1},{' '}
                        {order.billingDetails.addressLine2}
                      </li>
                      <li>
                        <strong>City:</strong> {order.billingDetails.city},{' '}
                        {order.billingDetails.state}
                      </li>
                      <li>
                        <strong>Postal Code:</strong>{' '}
                        {order.billingDetails.postalCode}
                      </li>
                      <li>
                        <strong>Contact:</strong>{' '}
                        {order.billingDetails.contactNumber}
                      </li>
                    </ul>

                    <h6 className="mt-3">Order Items:</h6>
                    <ul>
                      {order.orderItems && order.orderItems.length > 0 ? (
                        order.orderItems.map((item, index) => (
                          <li key={index} style={{ listStyleType: 'none' }}>
                            <Link to={`/product/${item.product_id}`}>
                              ProductId {item.product_id}
                            </Link>
                            <strong>Quantity:</strong> {item.quantity}
                          </li>
                        ))
                      ) : (
                        <p>No items found in this order.</p>
                      )}
                    </ul>

                    {order.orderStatus === 'Pending' && (
                      <button
                        className="btn btn-danger btn-sm mt-3"
                        onClick={() => cancelOrder(order._id)}
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="alert alert-info text-center">No orders found.</div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Order;
