import React, { useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const getUserIdFromToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = jwt_decode(token);
    return decodedToken.user_id;  
  }
  return null;
};

const CreateVendor = ({ userId }) => {
  const [vendorData, setVendorData] = useState({
    userId : getUserIdFromToken() , // Setting user_id from the prop
    businessName: '',
    businessEmail: '',
    phoneNumber: '',
    businessAddress: '',
    productCategories: '',
    shippingMethod: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendorData({
      ...vendorData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/vendor/new-vendor', vendorData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setSuccess(response.data.message);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
      setSuccess('');
    }
  };

  return (
    <div>
      <h2>Create New Vendor</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        {/* Hidden input for user_id */}
        <input
          type="hidden"
          name="user_id"
          value={vendorData.user_id}
        />

        <div>
          <label>Business Name:</label>
          <input
            type="text"
            name="businessName"
            value={vendorData.businessName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Business Email:</label>
          <input
            type="email"
            name="businessEmail"
            value={vendorData.businessEmail}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={vendorData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Business Address:</label>
          <input
            type="text"
            name="businessAddress"
            value={vendorData.businessAddress}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Product Categories (comma separated):</label>
          <input
            type="text"
            name="productCategories"
            value={vendorData.productCategories}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Shipping Method:</label>
          <input
            type="text"
            name="shippingMethod"
            value={vendorData.shippingMethod}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create Vendor</button>
      </form>
    </div>
  );
};

export default CreateVendor;
