import { ProductServices } from './product.service.js';
import { Order } from '../models/order.model.js';
import { Product } from '../models/product.model.js';

export class OrderServices {
  static async getOrdersforVendor(userId) {
    try {
      const vendor = await Vendor.findOne({ user_id: userId });
      if (!vendor) {
        return false;
      }

      const orders = await Order.find().populate('orderItems.product_id');
      const vendorOrders = [];

      for (let order of orders) {
        if (order.orderItems.length > 0) {
          for (let item of order.orderItems) {
            const product = await Product.findById(item.product_id);
            if (product && product.vendor_id.equals(vendor._id)) {
              vendorOrders.push(order);
              break;
            }
          }
        }
      }

      return vendorOrders;
    } catch (err) {
      console.error(err);
    }
  }

  static async getOrdersOfUser(userId) {
    try {
      const orders = await Order.find({ user_id: userId }).populate('orderItems.product_id');
      if (orders) return orders;
      else false;
    } catch (err) {
      console.log(err);
    }
  }

  static async getAllOrders() {
    try {
      const orders = await Order.find().populate('orderItems.product_id');
      if (orders) return orders;
      else false;
    } catch (err) {
      console.log(err);
    }
  }

  static async orderDetails(orderId) {
    try {
      const order = await Order.findById(orderId).populate('orderItems.product_id');
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
      console.log('Order Details:', orderDetails);

      let totalAmount = await this.countTotalAmount(orderDetails);
      const order = await Order.create(orderDetails);
      
      if (order) {

        return { orderDetails: order, total: totalAmount};
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
        console.error('Expected orderDetails to be an array');
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
        console.log('Total Amount:', bulkAmount);

        return bulkAmount;
      }
    } catch (err) {
      console.log(err);
    }
  }
}
