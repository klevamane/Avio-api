import User from '../models/user.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // We destruct the array and take only the second value from the splitted array
      [, token] = req.headers.authorization.split(' ');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Permission denied token not found or it's invalid");
  }
});

const admin = (req, res, next) => {
  if (req.user && !req.user.isAdmin) {
    res.status(401);
    throw new Error('Not Authorized, admin only');
  }
  next();
};

export { protect, admin };
