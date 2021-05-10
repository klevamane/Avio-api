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
    .status(400)
    .json({ message: 'You have entered an invalid email or password' });
});

const signup = asyncHandler(async (req, res) => {
  if (await User.findOne({ email: req.body.email })) {
    res.status(400);
    throw new Error('A user with the same email address already exists');
  }

  const newUser = await User.create(req.body);
  const token = generateToken(newUser._id);
  return res.status(200).json({ user: newUser, token });
});

export { login, signup };
