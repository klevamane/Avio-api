import User from '../models/user.js';
import asyncHandler from 'express-async-handler';
import { generateToken } from '../utils/index.utils.js';

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const existinUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    };
    return res.json({ user: existinUser });
  }
  return res
    .status(404)
    .json({ message: 'You have entered an invalid email or password' });
});

export { login };
