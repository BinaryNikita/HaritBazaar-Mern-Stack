import { createVendor } from "../controller/vendor.controller.js";
import { authenticateToken } from "../middleware/isAuthenticate.js";
import express from 'express';

const router = express.Router();
router.post('/new-vendor', authenticateToken,  createVendor);

export default router;