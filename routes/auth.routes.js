import { login as Login } from '../controllers/auth.controller.js';
import express from 'express';

const router = express.Router();

router.route('/signup').post(Login);

export default router;
