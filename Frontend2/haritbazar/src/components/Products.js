import React, { useEffect, useState } from 'react';
import { api } from '../axios';
import './product.css';
import AddToCartComponent from './AddToCart';
import Header from './FrontPage/Header';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => (
  <div key={product._id} className="col-md-4">
    <div className="card mb-3">
      <img
        src={'data:image/jpeg;base64,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'} 
        alt={product.name}
        className="card-img-top"
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text d-inline">Rs. {product.price.toFixed(2)} |  {product.discount}% Off</p>
     
       <div className=' d-flex '>  
        <div className='container'><AddToCartComponent product={product} /></div> 
        
        <div  className='container'><Link to={`/product/${product._id}`} className="btn btn-success btn-small">
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
      console.log('API Response:', response.data);

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
        case 'category':
          return a.category.localeCompare(b.category);
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
      <div className="container">
        <h1 className="text-center text-success mt-3">Step towards a sustainable environment</h1>
        <div className="d-flex justify-content-between my-3">
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
            <option value="category">Sort by Category</option>
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
