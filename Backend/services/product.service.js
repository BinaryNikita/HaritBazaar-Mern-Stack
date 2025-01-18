import { Product } from '../models/product.model.js';

export class ProductServices {
  static async createBulk(data) {
    try {
      let status = await Product.insertMany(data);
      if (status) {
        console.log(status);
        return 'Products created succesfully';
      } else {
        return 'some error ocurred while inserting the products';
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async getAllProductsOfVendor(vendorId) {
    try {
      const products = await Product.find({ vendor_id: vendorId }).populate(
        'category_id'
      );
      if (products) return products;
      else return false;
    } catch (err) {
      console.log(err);
    }
  }

  static async getAllProducts(page = 1, limit = 10, filter = {}) {
    try {
      const skip = (page - 1) * limit;
  
      const products = await Product.find(filter)
        .skip(skip)
        .limit(limit)
        .populate("category_id");
  
      const total = await Product.countDocuments(filter);
  
      return { products, total };
    } catch (err) {
      console.error(err);
      throw new Error("Error while fetching products");
    }
  }
  
  
  static async addProduct(data) {
    try {
      const newProduct = await Product.create(data);
      if (newProduct) return true;
      else return false;
    } catch (err) {
      console.log(err);
    }
  }

  static async getProductById(productId) {
    try {
      const product = await Product.findOne({ _id: productId }).populate(
        'category_id'
      );
      if (product) return product;
      else return false;
    } catch (err) {
      console.log(err);
    }
  }

  static async updateProduct(productId, data) {
    try {
      const isExist = await this.getProductById(productId);

      if (isExist) {
        const isUpdate = await Product.updateOne({ _id: productId }, data);
        if (isUpdate) return true;
        else false;
      } else {
        console.log('Product does not exist');
        return false;
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async deleteProduct(productId) {
    try {
      const isExist = await this.getProductById(productId);
      if (isExist) {
        const product = Product.updateOne(
          { _id: productId },
          { isAtive: false }
        );
        if (product) return true;
        else return false;
      } else {
        console.log('Product does not exist');
        return false;
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async searchProduct(query) {
    try {
      const products = await Product.find({
        isActive: true,
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } },
        ],
      }).populate('category_id');

      if (products) return products;
      else return false;
    } catch (err) {
      console.log(err);
    }
  }

  static async updateStock(productId, quantity) {
    try {
      const product = await Product.findById(productId);
      if (product) {
        product.quantity -= quantity;
        await product.save();
      } else {
        console.log('Unable to update category');
        return false;
      }
    } catch (err) {}
  }


  static async getProductRecommendation(productId){
     try{
        const product = await Product.findById(productId);
        if (!product) return false;
    
        const recommendations = await Product.find({
          _id: { $ne: productId }, 
          category_id: product.category_id,
          isActive: true
        }).limit(5); 
     
        return recommendations;
     }catch(err){
        console.log(err);
     }
  }


}


