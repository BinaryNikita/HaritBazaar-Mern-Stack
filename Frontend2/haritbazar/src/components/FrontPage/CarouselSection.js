import React from 'react';

const CarouselSection = () => {
  return (
    <div id="ecoCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            className="d-block w-100"
            src="\images\ecofriendlyproductsimages.jpg"
            alt="Eco-Friendly Products"
          />
          <div className="carousel-caption d-none d-md-block">
            <h3>Eco-Friendly Products</h3>
            <p>Shop for a sustainable future</p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            className="d-block w-100"
            src="\images\ecofriendlyproductsimages(1).jpg"
            alt="Go Green"
          />
          <div className="carousel-caption d-none d-md-block">
            <h3>Go Green</h3>
            <p>Make a positive impact on the planet</p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            className="d-block w-100"
            src="\images\ecofriendlyproductsimages(2).jpg"
            alt="Sustainable Living"
          />
          <div className="carousel-caption d-none d-md-block">
            <h3>Sustainable Living</h3>
            <p>Join the eco-friendly movement</p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            className="d-block w-100"
            src="\images\ecofriendlyproductsimages(3).jpg"
            alt="Sustainable Living"
          />
          <div className="carousel-caption d-none d-md-block">
            <h3>Sustainable Living</h3>
            <p>Join the eco-friendly movement</p>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#ecoCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#ecoCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default CarouselSection;
