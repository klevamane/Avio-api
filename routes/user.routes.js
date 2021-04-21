import { admin, protect } from '../middleware/auth.middleware.js';
import {
  getUserProfile,
  getUsers,
  updateUserProfile,
} from '../controllers/user.controller.js';

import express from 'express';

const userRouter = express.Router();

userRouter.route('/profile').get(protect, getUserProfile);
userRouter.route('/profile').put(protect, updateUserProfile);
userRouter.route('/').get(protect, admin, getUsers);

export default userRouter;
