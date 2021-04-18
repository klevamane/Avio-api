import { addOrderItems } from '../controllers/order.controller.js';
import express from 'express';
import { protect } from '../middleware/auth.middleware.js';

const orderRouter = express.Router();

orderRouter.route('/').post(protect, addOrderItems);

export default orderRouter;
