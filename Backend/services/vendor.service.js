import { Vendor } from "../models/vendor.model.js";


class VendorService {
    static async createVendor(vendorData) {
        try {
          
          console.log("Creating vendor with data:", vendorData);  
          const newVendor = await Vendor.create(vendorData);
          console.log("Vendor created:", newVendor); 
          if (newVendor) {
            await User.updateOne({ _id: user._id }, { role: 'vendor' });
            return newVendor;
          }

          return null;
        } catch (error) {
          console.error("Error creating vendor:", error);  
          throw new Error('Error creating vendor: ' + error.message);
        }
      }
}

export default VendorService;
