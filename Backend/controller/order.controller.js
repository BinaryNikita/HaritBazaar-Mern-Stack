import { OrderServices } from '../services/order.service.js';
import { sendOrderEmail } from '../services/smtp.services.js';

export const placeOrder = async (request, response, next) => {
  try {
    console.log(request.body);
    const order = await OrderServices.placeOrder(request.body);
    if (order){
      const userEmail = request.user.email; 
      order.userEmail = userEmail;  
console.log(order);
      await sendOrderEmail(order);
    response.status(200).json({message: 'Order placed succesfully'});
    }
    else response.send('error while placing order');
  } catch (err) {
    console.log(err);
  }
};

export const getVendorOrders = async (request, response, next) => {
  try {
    const userId = request.user.id;
    const orders = await OrderServices.getOrdersforVendor(userId);
    if (orders) response.json({ order: orders });
    else response.send('error while fetching orders');
  } catch (err) {
    console.log(err);
  }
};

export const getUserOrders = async (request, response, next) => {
  try {
    const userId = request.user.id;
    const orders = await OrderServices.getOrdersOfUser(userId);
    if (orders) response.json({ order: orders });
    else response.send('error while fetching orders');
  } catch (err) {
    console.log(err);
  }
};
export const getOrderDetails = async (request, response, next) => {
  try {
    const orderId = request.params.orderId;
    const details = await OrderServices.orderDetails(orderId);
    if (details) response.json({ detail: details });
    else response.send('error while fetching order details');
  } catch (err) {
    console.log(err);
  }
};
export const cancelOrder = async (request, response, next) => {
  try {
    const orderId = request.params.orderId;
    const isCancelled = await OrderServices.cancelOrder(orderId);
    if (isCancelled) {
      const userEmail = request.user.email;  
      isCancelled.userEmail = userEmail;  
      isCancelled.status = 'Cancelled';  

      await sendOrderEmail(isCancelled);      response.send('Order cancelled sucessfully');
    }
    else response.send('error while cancelling the order');
  } catch (err) {
    console.log(err);
  }
};

export const bulkOrder = async (request, response, next) => {
  try {
    const orders = cartServices.getCart(user_id);
    const isPlaced = await OrderServices.bulkOrder(orders);
    if (isPlaced) {
      response.send('order placed succesfully');
    } else {
      response.send('error while placing the order');
    }
  } catch (err) {
    console.log(err);
  }
};
