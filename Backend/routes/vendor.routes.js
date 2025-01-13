import { createVendor } from "../controller/vendor.controller.js";

import express from 'express';

const router = express.Router();
router.post('/new-vendor', createVendor);

export default router;