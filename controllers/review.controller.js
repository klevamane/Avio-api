/* eslint-disable no-underscore-dangle */
import asyncHandler from 'express-async-handler';
import Product from '../models/product.js';

const createProductReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.productId);
  if (!product) {
    res.status(400);
    throw new Error('Product not found');
  }
  const alreadyReview = await product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString(),
  );
  if (alreadyReview) {
    res.status(400);
    throw new Error('This product has already been reviewed by you');
  }
  const review = {
    name: req.user.name,
    rating: Number(req.body.rating),
    comment: req.body.comment,
    user: req.user._id,
  };
  product.reviews.push(review);
  product.numReviews = product.reviews.length;
  const startAt = 0;
  product.rating = req.body.rating;
  product.reviews.reduce(
    (acc, currentItem) => currentItem.rating + acc,
    startAt,
  ) / product.reviews.length;
  await product.save();
  res.status(201).json({ message: 'Review added' });
});

export { createProductReview };
