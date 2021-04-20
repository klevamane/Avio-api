import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
} from '../controllers/order.controller.js';

import express from 'express';
import { protect } from '../middleware/auth.middleware.js';

const orderRouter = express.Router();

orderRouter.route('/').post(protect, addOrderItems);
orderRouter.route('/:id').get(protect, getOrderById);
orderRouter.route('/:id/pay').put(protect, updateOrderToPaid);

export default orderRouter;