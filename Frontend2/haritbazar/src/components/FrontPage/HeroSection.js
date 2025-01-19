import React from 'react';

const HeroSection = () => {
  return (
    <div className="hero-section text-center p-5 text-success" style={{ backgroundColor: '#f8f9fa' }}>
      <h1>Healthy Nature, Healthy Body</h1>
      <p>Explore our eco-friendly products</p>
      <a style={{display:'inline'}} className="nav-link btn bg-success px-3 py-2 text-white" href="/product/all-products">Products</a>

    </div>
  );
};

export default HeroSection;

