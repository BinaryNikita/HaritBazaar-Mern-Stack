import React from 'react';

const Header = () => {
  return (
    <header className="bg-light">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light">
          <a className="navbar-brand text-success" href="#">HaritBazaar🌱</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link text-success " href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-success" href="/product/all-products">Products</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-success" href="/user/sign-in">Sign-in</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-success" href="/user/sign-up">Sign-up</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-success" href="/vendor/new-vendor">Become a seller</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-success" href="/cart/get-cart">Cart</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-success" href="/blogs/all-blogs">Blog</a>
              </li>
             
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
