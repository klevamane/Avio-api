import { protect } from '../middleware/auth.middleware.js';
import express from 'express';
import { createProductReview } from '../controllers/review.controller.js';

const reviewRouter = express.Router();

reviewRouter.route('/:productId/create').post(protect, createProductReview);

export default reviewRouter;
