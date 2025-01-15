import React, { useState } from 'react';
import TermsPage from './Terms';
import CreateVendor from './CreateVendor';

const VendorPage = () => {
  const [hasAgreed, setHasAgreed] = useState(false);  // Track whether the user has agreed

  const handleAgree = () => {
    setHasAgreed(true);  // Set to true when user clicks Agree and Continue
  };

  return (
    <div className="container py-5">
      {!hasAgreed ? (
        <TermsPage onAgree={handleAgree} />  // Show TermsPage until user agrees
      ) : (
        <CreateVendor />  // Show CreateVendor after user agrees
      )}
    </div>
  );
};

export default VendorPage;
