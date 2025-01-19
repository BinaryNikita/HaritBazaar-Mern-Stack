import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductsPage from './components/Product/Products';
import SignUp from './components/Sign-Up/Sign-up'; 
import SignIn from './components/Sign-In/Sign-in';
import ResetPassword from './components/Sign-In/ResetPassword'; 
import ForgotPassword from './components/Sign-In/ForgotPassword';
import HomePage from './components/FrontPage/HomePage';
import Cart from './components/Cart/Cart';
import VendorPage from './components/Vendor/VendorPage';
import BlogManager from './components/Blog/Blog';
import ProductDetail from './components/Product/ProductDetails';
import PlaceOrder from './components/Order/PlaceOrder';
import AboutUsPage from './components/FrontPage/AboutUs';

const App = () => {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/vendor/new-vendor" element={<CreateVendor />} />   */}
            <Route path="/product/all-products" element={<ProductsPage />} />
            <Route path="/user/sign-in" element={<SignIn />} />
            <Route path="/user/sign-up" element={<SignUp />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/cart/get-cart" element={<Cart />} />
            <Route path="/vendor/new-vendor" element={<VendorPage />} />
            <Route path="/blogs/all-blogs" element={<BlogManager />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/place-order/:productId" element={<PlaceOrder />} />
            <Route path="/about-us" element={<AboutUsPage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
