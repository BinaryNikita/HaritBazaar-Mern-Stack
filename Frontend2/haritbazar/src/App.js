import React from 'react';
// import ProductsPage from './components/Products';
// import CreateVendor from './components/CreateVendor';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/Sign-up';  // Adjust based on your file structure
import SignIn from './components/Sign-in'; 
import ResetPassword from './components/ResetPassword';  // Import ResetPassword component
import ForgotPassword from './components/ForgotPassword';

const App = () => {
  return (
    // <ProductsPage/>
    // <CreateVendor />

    <Router>  
      <div className="App">
        <Routes>
          {/* <Route path="/" element={<SignIn />} />  Sign In Page */}
          <Route path="/" element={<SignUp />} />  Sign In Page
          {/* <Route path="/reset-password" element={<ResetPassword />} />  {/* Reset Password Page */}
          {/* <Route path="/forgot-password" element={<ForgotPassword />} />  Reset Password Page */} */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
