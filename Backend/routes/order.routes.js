import express from 'express';
import { cancelOrder, getOrderDetails, getUserOrders, getVendorOrders, placeOrder } from '../controller/order.controller.js';
import { authenticateToken } from '../middleware/isAuthenticate.js';
const router = express.Router();

router.get('/vendor-orders', authenticateToken, getVendorOrders);
router.get('/user-orders', authenticateToken, getUserOrders);
router.get('/order-details/:orderId', authenticateToken, getOrderDetails);
router.post('/place-order', authenticateToken, placeOrder);
router.delete('/cancel-order/:orderId', authenticateToken, cancelOrder);

export default router;
