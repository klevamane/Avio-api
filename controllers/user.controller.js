import User from '../models/user.js';
import asyncHandler from 'express-async-handler';
import { generateToken } from '../utils/index.utils.js';

const getUserProfile = asyncHandler(async (req, res) => {
  res.json({ profile: req.user });
});

export { getUserProfile };
