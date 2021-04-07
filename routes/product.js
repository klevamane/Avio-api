import express from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/product.js';

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const products = await Product.find({});
    res.json({ products });
  }),
);

router.get(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      return res.json(product);
    }
    res.status(404);
    throw new Error('Product not found');
  }),
);

export default router;
