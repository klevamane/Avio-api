import {
  getProductById,
  getProducts,
} from '../controllers/product.controller.js';

import express from 'express';

const router = express.Router();

router.route('/').get(getProducts);
router.route('/:id').get(getProductById);

export default router;
