import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../axios';
import { jwtDecode } from 'jwt-decode';
import Header from '../FrontPage/Header';

const getUserIdFromToken = () => {
  const token = localStorage.getItem("token"); 
  console.log(token);
  const headers = {
    Authorization: `Bearer ${token}`, 
  };

  return jwtDecode(token)._id;
};

const PlaceOrder = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [billingDetails, setBillingDetails] = useState({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    contactNumber: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const product = state?.product;
  const orderQuantity = state?.orderQuantity;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails({
      ...billingDetails,
      [name]: value,
    });
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const orderData = {
      user_id: getUserIdFromToken(),
      billingDetails,
      orderItems: [
        {
          product_id: product.id,
          quantity: orderQuantity,
        },
      ],
      totalAmount: product.price * orderQuantity,
      paymentInfo: {
        method: paymentMethod,
        status: paymentMethod === 'COD' ? 'Pending' : 'Paid',
      },
    };

    try {
      console.log(orderData);
      const token = localStorage.getItem("token"); 
  console.log(token);
  const headers = {
    Authorization: `Bearer ${token}`, 
  };
      const response = await api.post('/order/place-order', orderData, {headers});
      setLoading(false);
      alert('Order placed successfully!');
      navigate('/');
    } catch (err) {
      setLoading(false);
      setError('Error placing the order');
    }
  };

  return (
    <div className="container my-5">
      {/* <h2>Place Order</h2> */}
      {/* <Header/> */}
      {product && (
        <div className="row">
          <div className="col-md-6">
            <img
              src={
                'https://www.qalara.com/blog/wp-content/uploads/2023/02/Featured.jpg'
              }
              alt={product.name}
              className="img-fluid rounded"
              style={{ maxHeight: '400px', objectFit: 'cover' }}
            />
            <h4>{product.name}</h4>
            <p>Rs. {product.price}</p>
            <p>Quantity: {orderQuantity}</p>
            <p>Total: Rs. {product.price * orderQuantity}</p>
          </div>

          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <h4>Billing Details</h4>
              <div className="mb-3">
                <label htmlFor="fullName" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="fullName"
                  name="fullName"
                  value={billingDetails.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="addressLine1" className="form-label">
                  Address Line 1
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="addressLine1"
                  name="addressLine1"
                  value={billingDetails.addressLine1}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="addressLine2" className="form-label">
                  Address Line 2
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="addressLine2"
                  name="addressLine2"
                  value={billingDetails.addressLine2}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  value={billingDetails.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="state" className="form-label">
                  State
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="state"
                  name="state"
                  value={billingDetails.state}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="postalCode" className="form-label">
                  Postal Code
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="postalCode"
                  name="postalCode"
                  value={billingDetails.postalCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="country" className="form-label">
                  Country
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="country"
                  name="country"
                  value={billingDetails.country}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="contactNumber" className="form-label">
                  Contact Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="contactNumber"
                  name="contactNumber"
                  value={billingDetails.contactNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Payment Method */}
              <h4>Payment Method</h4>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  id="cod"
                  name="paymentMethod"
                  value="COD"
                  checked={paymentMethod === 'COD'}
                  onChange={handlePaymentMethodChange}
                />
                <label className="form-check-label" htmlFor="cod">
                  Cash on Delivery
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  className="form-check-input"
                  id="online"
                  name="paymentMethod"
                  value="Online"
                  checked={paymentMethod === 'Online'}
                  onChange={handlePaymentMethodChange}
                />
                <label className="form-check-label" htmlFor="online">
                  Online Payment
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-success mt-4"
                disabled={loading}
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceOrder;
