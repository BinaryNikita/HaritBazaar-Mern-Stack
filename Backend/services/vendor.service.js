import { Vendor } from "../models/vendor.model.js";


class VendorService {
    static async createVendor(vendorData) {
        try {
            const newVendor = await Vendor.create(vendorData);
            return newVendor || null;
        } catch (error) {
            throw new Error('Error creating vendor: ' + error.message);
        }
    }
}

export default VendorService;
