import React, { useState } from 'react';
import { api } from '../../axios';
import { jwtDecode } from 'jwt-decode';
const getUserIdFromToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.user_id;
  }
  return null;
};

const CreateVendor = () => {
  const [vendorData, setVendorData] = useState({
    userId: getUserIdFromToken(),
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
      const response = await api.post('/vendor/new-vendor', vendorData);
      setSuccess(response.data.message);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
      setSuccess('');
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 text-success">Start selling today...</h2>
      {error && <p className="alert alert-danger">{error}</p>}
      {success && <p className="alert alert-success">{success}</p>}

      <form onSubmit={handleSubmit} className="shadow-lg p-4 rounded bg-light">
        <input type="hidden" name="user_id" value={vendorData.userId} />

        <div className="form-group">
          <label htmlFor="businessName">Business Name:</label>
          <input
            type="text"
            id="businessName"
            name="businessName"
            value={vendorData.businessName}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="businessEmail">Business Email:</label>
          <input
            type="email"
            id="businessEmail"
            name="businessEmail"
            value={vendorData.businessEmail}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={vendorData.phoneNumber}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="businessAddress">Business Address:</label>
          <input
            type="text"
            id="businessAddress"
            name="businessAddress"
            value={vendorData.businessAddress}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="productCategories">Product Categories (comma separated):</label>
          <input
            type="text"
            id="productCategories"
            name="productCategories"
            value={vendorData.productCategories}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="shippingMethod">Shipping Method:</label>
          <input
            type="text"
            id="shippingMethod"
            name="shippingMethod"
            value={vendorData.shippingMethod}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn" style={{ backgroundColor: '#018749', color: '#fff', width: '100%' }}>
          Create Vendor
        </button>
      </form>
    </div>
  );
};

export default CreateVendor;
