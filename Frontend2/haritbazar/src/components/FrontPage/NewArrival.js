import React from 'react';

const NewArrival = () => {
  const products = Array(5).fill({
    name: 'New Arrival',
    price: '$15',
    image: 'https://via.placeholder.com/150',
});

  return (
    <div className="new-arrival text-center p-5">
      <h2>New Arrival</h2>
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
      <button className="btn btn-success mt-3">See More</button>
    </div>
  );
};

export default NewArrival;
