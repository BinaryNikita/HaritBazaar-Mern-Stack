import { ProductServices } from './product.service.js';
import { Order } from '../models/order.model.js';

export class OrderServices {
  static async getOrdersforVendor(vendorId) {
    try {
      const user = await Vendor.findById(vendorId);
      if (user) {
        const userId = user.user_id;
        const orders = await Order.find({ user_id: userId });
        if (orders) return orders;
        else false;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async getOrdersOfUser(userId) {
    try {
      const orders = await Order.find({ user_id: userId });
      if (orders) return orders;
      else false;
    } catch (err) {
      console.log(err);
    }
  }

  static async getAllOrders() {
    try {
      const orders = await Order.find();
      if (orders) return orders;
      else false;
    } catch (err) {
      console.log(err);
    }
  }

  static async orderDetails(orderId) {
    try {
      const order = await Order.findById(orderId);
      if (order) return order;
      else false;
    } catch (err) {
      console.log(err);
    }
  }

  static async cancelOrder(orderId) {
    try {
      const order = await Order.findById(orderId);
      if (order) {
        order.orderStatus = 'Cancelled';
        order.save();
        return true;
      } else false;
    } catch (err) {
      console.log(err);
    }
  }

  static async placeOrder(orderDetails) {
    try {
      let totalAmount = await this.countTotalAmount(orderDetails);
      const order = await Order.create(orderDetails);
      if (order) {
        return { orderDetails: order, total: totalAmount }; 
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async bulkOrder(orderDetails) {
    try {
      let allPlaced = true;
      for (let order of orderDetails) {
        let result = await this.placeOrder(order);
        if (!result) {
          allPlaced = false;
          break;
        }
      }

      return allPlaced;
    } catch (err) {
      console.log(err);
    }
  }

  static async countTotalAmount(orderDetails) {
    try {

      if (!Array.isArray(orderDetails)) {
        console.error("Expected orderDetails to be an array");
        return 0;
      }
      
      let bulkAmount = 0;
     
        for (let i = 0; i < orderDetails.length; i++) {
          const orderItems = orderDetails[i].orderItems; 
          for (let item of orderItems) {
            let product = await ProductServices.getProductById(item.product_id);
            let quantity = item.quantity;
            bulkAmount += product.price * quantity;
          }
        
        }
        return bulkAmount;
    } catch (err) {
      console.log(err);
    }
  }
}
