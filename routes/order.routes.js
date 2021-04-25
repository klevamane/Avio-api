import {
  addOrderItems,
  getAllOrders,
  getOrderById,
  getUserOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
} from '../controllers/order.controller.js';
import { admin, protect } from '../middleware/auth.middleware.js';

import express from 'express';

const orderRouter = express.Router();

orderRouter.route('/').post(protect, addOrderItems);
orderRouter.route('/:id').get(protect, getOrderById);
orderRouter.route('/:id/pay').put(protect, updateOrderToPaid);
orderRouter.route('/user/all').get(protect, getUserOrders);
orderRouter.route('/').get(protect, admin, getAllOrders);
orderRouter.route('/:id/deliver').patch(protect, admin, updateOrderToDelivered);

export default orderRouter;
