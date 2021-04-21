import User from '../models/user.js';
import asyncHandler from 'express-async-handler';
import { generateToken } from '../utils/index.utils.js';

const getUserProfile = asyncHandler(async (req, res) => {
  res.json({ profile: req.user });
});

/**
 * @desc Update the user's progile
 * @route PUT /api/users/profile
 * @access Private
 * @param  {object} req  The request object.
 * @param  {object} res  The response object
 * @return {object}
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  if (req.body.password) {
    user.password = req.body.password;
  }
  const updatedUser = await user.save();

  res.json({
    profile: {
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      createdAt: updatedUser.createdAt,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    },
  });
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json({ users });
});
export { getUserProfile, updateUserProfile, getUsers };
