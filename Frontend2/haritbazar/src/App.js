import React from 'react';
import ProductsPage from './components/Products';
// import CreateVendor from './components/CreateVendor';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/Sign-up';  // Adjust based on your file structure
import SignIn from './components/Sign-in'; 
import ResetPassword from './components/ResetPassword';  // Import ResetPassword component
import ForgotPassword from './components/ForgotPassword';
import HomePage from './components/FrontPage/HomePage';
import Cart from './components/Cart';
// import TermsPage from './components/Terms';
import VendorPage from './components/Vendor/VendorPage';
import BlogManager from './components/Blog';
import ProductDetail from './components/ProductDetails';

const App = () => {
  return (
    <>
    <Router>  
      <div className="App">
        <Routes>
          <Route path='/' element= {<HomePage />}/>
          {/* <Route path="/vendor/new-vendor" element={<CreateVendor />} />   */}
          <Route path="/product/all-products" element={<ProductsPage />} />  
          <Route path="/user/sign-in" element={<SignIn />} />  
          <Route path="/user/sign-up" element={<SignUp />} />  
          <Route path="/reset-password" element={<ResetPassword />} />  
          <Route path="/forgot-password" element={<ForgotPassword />} />  
          <Route path="/cart/get-cart" element={< Cart/>} />  
          <Route path="/vendor/new-vendor" element={< VendorPage/>} />  
          <Route path="/blogs/all-blogs" element={< BlogManager/>} />  
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;

