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

/**
 * @desc Get a list of all users
 * @route GET /api/users
 * @access Admin Only (Private)
 * @param  {object} req  The request object.
 * @param  {object} res  The response object
 * @return {array}
 */
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json({ users });
});

/**
 * @desc Deletes a user
 * @route DELETE /api/users/<user._id>
 * @access Admin Only (Private)
 * @param  {object} req  The request object.
 * @param  {object} res  The response object
 * @return {object}
 */
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findOneAndDelete({ _id: req.params.id });
  if (user) {
    return res.json({ message: 'User removed' });
  }

  res.status(404);
  throw new Error('User not found');
});

const getUserById = asyncHandler(async (req, res) => {
  console.log('THE PARAMS OH ', req.params.id);
  const user = await User.findById(req.params.id).select('-password');
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res.json({ user });
});

/**
 * @desc Update the user's progile
 * @route PUT /api/users/id
 * @access Private (Admin)
 * @param  {object} req  The request object.
 * @param  {object} res  The response object
 * @return {object}
 */
const updateAnyUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.isAdmin = req.body.isAdmin || user.isAdmin;
  const updatedUser = await user.save();

  res.json({
    profile: {
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      createdAt: updatedUser.createdAt,
      isAdmin: updatedUser.isAdmin,
    },
  });
});

export {
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateAnyUser,
};
