import VendorService from '../services/vendor.service.js';

export const createVendor = async (request, response) => {
  try {
    const vendorData = request.body;

    let newVendor = await VendorService.createVendor(vendorData);
    if (newVendor) {
      return response.status(201).json({ message: 'Vendor created successfully' });
    } else {
      return response.status(400).json({ message: 'Unable to create vendor' });
    }
  } catch (err) {
    console.error(err);
    return response.status(500).json({ message: 'Internal Server Error' });
  }
};
