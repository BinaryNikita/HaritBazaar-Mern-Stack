import express, { Router } from "express";
import {getWishlist,addToWishlist,removeWishlist} from "../controller/wishlist.controller.js";
const router =express.Router();
router.post("/api/add/wishlist",addToWishlist);
router.get("/api/get/wishlist",getWishlist);
router.delete("/api/delete/wishlist",removeWishlist)
export default router;