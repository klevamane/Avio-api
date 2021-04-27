import asyncHandler from 'express-async-handler';
import Product from '../models/product.js';
import Review from '../models/review.js';

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
    res.status(404);
    throw new Error('The product has already been reviewed by you');
  }
  const review = {
    name: req.user.name,
    value: Number(req.body.value),
    comment: req.body.comment,
    user: req.user,
  };

  product.reviews.push(review);
  product.numReviews = product.reviews.length;
  const startAt = 0;
  product.rating =
    product.reviews.reduce(
      (acc, currentItem) => currentItem.rating + acc,
      startAt,
    ) / product.reviews.length;
  await product.save();
  res.status(201).json({ message: 'Review added' });
});

export { createProductReview };
