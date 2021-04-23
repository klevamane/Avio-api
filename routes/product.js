import { admin, protect } from '../middleware/auth.middleware.js';
import {
  deleteProductById,
  getProductById,
  getProducts,
} from '../controllers/product.controller.js';

import express from 'express';

const router = express.Router();

router.route('/').get(getProducts);
router.route('/:id').get(getProductById);
// Admin only
router.route('/admin/delete/:id').delete(protect, admin, deleteProductById);

export default router;
