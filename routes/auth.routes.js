import {
  login as Login,
  signup as SignUp,
} from '../controllers/auth.controller.js';

import express from 'express';

const router = express.Router();

router.route('/login').post(Login);
router.route('/signup').post(SignUp);

export default router;
