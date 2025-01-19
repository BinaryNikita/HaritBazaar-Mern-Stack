import React, { useEffect, useState } from 'react';
import { api } from '../../axios';
import './product.css';
import AddToCartComponent from '../Cart/AddToCart';
import Header from '../FrontPage/Header';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => (
  <div key={product._id} className="col-md-4">
    <div className="card mb-4">
      <img
        alt={product.name}
        src={
          'https://www.qalara.com/blog/wp-content/uploads/2023/02/Featured.jpg'
        }
        className="card-img-top"
      />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>

        <p className="card-text">
          <span>Rs. {product.price.toFixed(2)}</span> |
          <span className="discount"> {product.discount}% Off</span>
        </p>

        <div className="d-flex">
          <div className="container">
            <AddToCartComponent productId={product._id} />
          </div>

          <div className="container">
            <Link to={`/product/${product._id}`} className="btn btn-success">
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('price');

  const fetchProducts = async () => {
    try {
      const response = await api.get('/product/all-products');

      if (Array.isArray(response.data.products)) {
        setProducts(response.data.products);
      } else {
        console.error('Invalid products format:', response.data.products);
        setProducts([]);
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

  const handleSearch = (e) => setSearchQuery(e.target.value.toLowerCase());
  const handleSortChange = (e) => setSortOption(e.target.value);

  const filterAndSortProducts = () => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery)
    );

    return filtered.sort((a, b) => {
      switch (sortOption) {
        case 'price':
          return a.price - b.price;
        case 'discount':
          return b.discount - a.discount;
        case 'isOrganic':
          return a.isOrganic === b.isOrganic ? 0 : a.isOrganic ? -1 : 1;
        case 'isRecycled':
          return a.isRecycled === b.isRecycled ? 0 : a.isRecycled ? -1 : 1;
        default:
          return a.name.localeCompare(b.name);
      }
    });
  };

  const retryFetch = () => {
    setLoading(true);
    setError(null);
    fetchProducts();
  };

  if (loading)
    return (
      <div className="spinner-container">
        <Spinner animation="border" /> Loading...
      </div>
    );

  if (error)
    return (
      <div>
        <div>{error}</div>
        <button onClick={retryFetch}>Retry</button>
      </div>
    );

  const sortedAndFilteredProducts = filterAndSortProducts();

  return (
    <>
      <Header />
      <div className="container  p-5">
        {/* <h1 className="text-center text-success mt-3">Step towards a sustainable environment</h1> */}
        <div className="d-flex justify-content-between bg-light p-3 rounded my-3">
          <input
            type="text"
            className="form-control w-50"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <select
            className="form-select w-auto"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="price">Sort by Price</option>
            <option value="discount">Sort by Discount</option>
            <option value="isOrganic">Sort by Organic</option>
            <option value="isRecycled">Sort by Recycled</option>
          </select>
        </div>
        <div className="row">
          {sortedAndFilteredProducts.length > 0 ? (
            sortedAndFilteredProducts.map((product) => (
              <ProductCard product={product} />
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
