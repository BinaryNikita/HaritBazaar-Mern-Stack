import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../axios';

const ProductDetail = () => {
  const { productId } = useParams(); 
  const [product, setProduct] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = api.get(`/product/${productId}`); 
        setProduct(response.data);
      } catch (err) {
        console.error(err);
        setError('Error fetching product details');
      }
    };

    const fetchRecommendations = async () => {
      try {
        const response =  api.get(`/product/recommendation/${productId}`);
        setRecommendations(response.data.products || []); 
      } catch (err) {
        console.error(err);
        setError('Error fetching product recommendations');
      }
    };

    fetchProductDetails();
    fetchRecommendations();
    setLoading(false);
  }, [productId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      {product && (
        <>
          <h2>{product.name}</h2>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '300px', height: '300px', objectFit: 'cover' }}
          />
          <p>
            <strong>Description:</strong> {product.description}
          </p>
          <p>
            <strong>Price:</strong> ${product.price}
          </p>
          <p>
            <strong>Category:</strong> {product.category_id?.name || 'N/A'}
          </p>
          <p>
            <strong>Type:</strong> {product.type || 'N/A'}
          </p>
          <p>
            <strong>Quantity:</strong> {product.quantity}
          </p>
          <p>
            <strong>Discount:</strong> {product.discount || 0}%
          </p>
          <p>
            <strong>Carbon Footprint:</strong> {product.carbonFootprint || 0} kg
          </p>
        </>
      )}

      <h3>Product Recommendations</h3>
      <div
        className="recommendations"
        style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}
      >
        {recommendations.length > 0 ? (
          recommendations.map((rec) => (
            <div
              key={rec.id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '10px',
                width: '150px',
                textAlign: 'center',
              }}
            >
              <img
                src={rec.image}
                alt={rec.name}
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
              <p>{rec.name}</p>
              <p>${rec.price}</p>
            </div>
          ))
        ) : (
          <p>No recommendations available</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
