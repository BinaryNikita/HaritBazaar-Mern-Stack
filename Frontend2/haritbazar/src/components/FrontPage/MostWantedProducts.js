import React from 'react';

const MostWantedProducts = () => {
  const products = Array(4).fill({
    name: 'Product Name',
    price: '$10',
    image: 'https://via.placeholder.com/150',
  });

  return (
    <div className="most-wanted-products text-center p-5">
      <h2>Our Most Wanted Products</h2>
      <div className="d-flex justify-content-center flex-wrap">
        {products.map((product, index) => (
          <div key={index} className="card m-2" style={{ width: '18rem' }}>
            <img src={product.image} className="card-img-top" alt={product.name} />
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostWantedProducts;
