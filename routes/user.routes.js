import { admin, protect } from '../middleware/auth.middleware.js';
import {
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  updateAnyUser,
  updateUserProfile,
} from '../controllers/user.controller.js';

import express from 'express';

const userRouter = express.Router();

userRouter.route('/profile').get(protect, getUserProfile);
userRouter.route('/profile').put(protect, updateUserProfile);
userRouter.route('/').get(protect, admin, getUsers);
userRouter.route('/:id').delete(protect, admin, deleteUser);
userRouter.route('/admin/single/:id').get(protect, admin, getUserById);
userRouter.route('/admin/update/:id').put(protect, admin, updateAnyUser);

export default userRouter;
