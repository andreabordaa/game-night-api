import express from 'express';
import { loginHandler, signUpHandler } from '../controllers/authController.js';
import {
  validateUserRegister,
  validateUserLogin,
} from '../middleware/userValidators.js';
import logInLimiter from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/signup', validateUserRegister, signUpHandler);
router.post('/login', logInLimiter, validateUserLogin, loginHandler);

export default router;
