import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../axios';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [orderQuantity, setOrderQuantity] = useState(1); 

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await api.get(`/product/${productId}`);
        setProduct(response.data.product);
      } catch (err) {
        setError('Error fetching product details');
      }
    };

    fetchProductDetails();
    setLoading(false);
  }, [productId]);


  const handleQuantityChange = (e) => {
    const quantity = Math.min(e.target.value, product.quantity); 
    setOrderQuantity(quantity);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
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

  const handlePlaceOrder = () => {
    navigate(`/place-order/${productId}`, {
      state: { product, orderQuantity }, 
    });
  };

  return (
    <div className="container my-5">
      {product && (
        <>
          <div className="row">
            <div className="col-md-6">
              <img
                src={"https://www.qalara.com/blog/wp-content/uploads/2023/02/Featured.jpg"}
                alt={product.name}
                className="img-fluid rounded"
                style={{ maxHeight: '400px', objectFit: 'cover' }}
              />
            </div>
            <div className="col-md-6">
              <h2>{product.name}</h2>
              <p><strong>Description:</strong> {product.description}</p>
              <p>Rs. {product.price}</p>
              <p><strong>Category:</strong> {product.category_id?.categoryName || 'N/A'}</p>
              <p><strong>Type:</strong> {product.type || 'N/A'}</p>
              <p><strong>Available Quantity:</strong> {product.quantity}</p>
              
              <div className="mb-3">
                <label htmlFor="orderQuantity" className="form-label">Select Quantity:</label>
                <input
                  type="number"
                  id="orderQuantity"
                  className="form-control"
                  min="1"
                  max={product.quantity}
                  value={orderQuantity}
                  onChange={handleQuantityChange}
                />
              </div>

              <p><strong>Discount:</strong> {product.discount || 0}%</p>
              <p><strong>Carbon Footprint:</strong> {product.carbonFootprint || 0} kg</p>

              <div className="mt-4">
                <button
                  onClick={handlePlaceOrder}
                  className="btn btn-success"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetail;
