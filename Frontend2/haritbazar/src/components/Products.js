import React, { useEffect, useState } from 'react';
import { api } from '../axios'; // Import the axios instance

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/product/all-products');
        console.log(response.data); // Check the structure of the response
        setProducts(response.data.product); // Assuming the response contains a 'product' array
      } catch (err) {
        console.log(err); // Log the error for debugging
        setError('Error fetching products');
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, []);
  

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>All Products</h2>
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="product-card">
              <img src={product.image || 'default-image.jpg'} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Quantity: {product.quantity}</p>
              {/* <p>Category: {product.category_id.name}</p> Assuming category_id has 'name' */}
              <button onClick={() => handleAddToCart(product._id)}>Add to Cart</button>

            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
