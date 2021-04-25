import { admin, protect } from '../middleware/auth.middleware.js';
import {
  createProduct,
  deleteProductById,
  getProductById,
  getProducts,
  updateProduct,
} from '../controllers/product.controller.js';

import express from 'express';

const router = express.Router();

router.route('/').get(getProducts);
router.route('/:id').get(getProductById);
// Admin only
router.route('/admin/delete/:id').delete(protect, admin, deleteProductById);
router.route('/admin/update/:id').patch(protect, admin, updateProduct);
router.route('/admin/create').post(protect, admin, createProduct);

export default router;
