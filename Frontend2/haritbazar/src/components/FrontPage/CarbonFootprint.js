import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap'; 
import { api } from '../../axios'; 

const LessCarbonFootPrintProduct = () => {
  const [products, setProducts] = useState([]);
  const [mostWanted, setMostWanted] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchProducts = async () => {
    try {
      const response = await api.get('/product/all-products');

      if (Array.isArray(response.data.products)) {
        const allProducts = response.data.products;


        setProducts(allProducts);


        const topProducts = [...allProducts]
          .filter((product) => product.carbonFootprint !== undefined) 
          .sort((a, b) => a.carbonFootprint - b.carbonFootprint) 
          .slice(0, 4); 

        setMostWanted(topProducts);
      } else {
        console.error('Invalid products format:', response.data.products);
        setProducts([]);
        setMostWanted([]);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Retry fetching products in case of an error
  const retryFetch = () => {
    setLoading(true);
    setError(null);
    fetchProducts();
  };

  if (loading)
    return (
      <div className="spinner-container">
        <Spinner animation="border" /> Loading most wanted products...
      </div>
    );

  if (error)
    return (
      <div className="text-center">
        <p>{error}</p>
        <button className="btn btn-primary" onClick={retryFetch}>
          Retry
        </button>
      </div>
    );

  return (
    <div className="most-wanted-products text-center p-5">
      <h2 className='text-success m-3'>Top Eco-Friendly Products (Low Carbon Footprint)</h2>
      <div className="d-flex justify-content-center flex-wrap">
        {mostWanted.length > 0 ? (
          mostWanted.map((product) => (
            <div key={product._id} className="card m-2" style={{ width: '18rem' }}>
              <img
                src={'https://themunim.com/wp-content/uploads/2022/02/Biodegradable-Products.png'}
                className="card-img-top"
                alt={product.name}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Rs. {product.price.toFixed(2)}</p>
                <p className="card-text">Carbon Footprint: {product.carbonFootprint} kg CO₂</p>
              </div>
            </div>
          ))
        ) : (
          <p>No eco-friendly products available.</p>
        )}
      </div>
    </div>
  );
};

export default LessCarbonFootPrintProduct;
