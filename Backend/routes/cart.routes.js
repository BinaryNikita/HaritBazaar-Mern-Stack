import express from "express";
import {addToCart,getCartItem,deleteCart} from '../controller/cart.controller.js';
const router =express.Router();
router.post("/add/cart",addToCart);
router.get("/get/cart",getCartItem);
// router.put("/update/cart/:id",updateCart);
router.delete("/cart/productId",deleteCartItem)
export default router;