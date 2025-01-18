import express from 'express';
import { addProduct, bulkAdd, deleteProduct, getAllProduct, getAllProductOfVendor, getProductByID, productRecommendation, searchProduct, updateProduct } from '../controller/product.controller.js';

const router = express.Router();

router.post('/bulk-add', bulkAdd);
router.get('/all-products', getAllProduct);
router.get('/vendor-products', getAllProductOfVendor);
router.post('/add-product', addProduct);
router.delete('/:productId', deleteProduct);
router.put('/:productId', updateProduct);
router.get('/recommendation/:productId', productRecommendation);
router.get('/search-product', searchProduct);
router.get('/:productId', getProductByID)

export default router;