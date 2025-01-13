import express from 'express';
import { cancelOrder, getOrderDetails, getUserOrders, getVendorOrders, placeOrder } from '../controller/order.controller.js';

const router = express.Router();

router.get('/vendor-orders', getVendorOrders);
router.get('/user-orders', getUserOrders);
router.get('/order-details/:orderId', getOrderDetails);
router.post('/place-order', placeOrder);
router.delete('/cancel-order/:orderId', cancelOrder);

export default router;
