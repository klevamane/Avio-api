import {
  getUserProfile,
  updateUserProfile,
} from '../controllers/user.controller.js';

import express from 'express';
import { protect } from '../middleware/auth.middleware.js';

const userRouter = express.Router();

userRouter.route('/profile').get(protect, getUserProfile);
userRouter.route('/profile').put(protect, updateUserProfile);

export default userRouter;
