import asyncHandler from 'express-async-handler';

const getUserProfile = asyncHandler(async (req, res) => {
  res.json({ profile: req.user });
});

export { getUserProfile };
