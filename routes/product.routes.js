import express from 'express';
import { admin, protect } from '../middleware/auth.middleware.js';
import {
  createProduct,
  deleteProductById,
  getProductById,
  getProducts,
  updateProduct,
  getTopRatedProducts,
} from '../controllers/product.controller.js';

const router = express.Router();

router.route('/').get(getProducts);
router.route('/:id').get(getProductById);
router.get('/rated/top-rated', getTopRatedProducts);
// Admin only
router.route('/admin/delete/:id').delete(protect, admin, deleteProductById);
router.route('/admin/update/:id').patch(protect, admin, updateProduct);
router.route('/admin/create').post(protect, admin, createProduct);

export default router;
