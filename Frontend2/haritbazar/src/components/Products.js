import React, { useEffect, useState } from 'react';
import { api } from '../axios'; // Import the axios instance
import './product.css'; // External CSS for custom styling
import AddToCartComponent from './AddToCart';
import Header from './FrontPage/Header';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState('name'); // Default sort by name

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/product/all-products');
        setProducts(response.data.product); // Assuming response.data.product contains product array
      } catch (err) {
        setError('Error fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const sortProducts = (products, option) => {
    switch (option) {
      case 'price':
        return [...products].sort((a, b) => a.price - b.price);
      case 'name':
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return products;
    }
  };

  const sortedProducts = sortProducts(products, sortOption);

  if (loading)
    return <div className="text-center my-5">Loading products...</div>;
  if (error) return <div className="text-center my-5 text-danger">{error}</div>;

  return (
    <>
      <div className="container-fluid">
        <Header />
      </div>
      <div className="container my-5">
        <h1 className="text-center mb-4">Our Eco-Friendly Products</h1>

        {/* Sorting Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <label htmlFor="sort" className="form-label">
            Sort By:{' '}
          </label>
          <select
            id="sort"
            className="form-select w-auto"
            onChange={handleSortChange}
            value={sortOption}
          >
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
        </div>

        {/* Product List */}
        <div className="row g-4">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product) => (
              <div key={product._id} className="col-lg-4 col-md-6 col-sm-12">
                <div className="card shadow-sm border-0 rounded">
                  <img
                    src="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSR_1sL9iTj9cp-tJ_0a8JOVVcToVXMh6zpl5fES42Fprlmz0kuezwLCtHHE4WV6ZzqmltldUuj3E1oxC_65AsLv2C9UT7ktd2Z0Z9cz2sP-iI5RDPK8jU_&usqp=CAE"
                    alt={product.name}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    {/* <p className="card-text">{product.description}</p> */}
                    <p className="card-text">
                      <strong>Price: </strong>Rs. {product.price}
                    </p>
                    <p className="card-text">
                      <strong>Stock: </strong>
                      {product.quantity}
                    </p>
                    <AddToCartComponent productId={product._id} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
