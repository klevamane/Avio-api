import express from 'express';
import { getUserProfile } from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const userRouter = express.Router();

userRouter.route('/profile').get(protect, getUserProfile);

export default userRouter;
