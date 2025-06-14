import { Router } from 'express';
import {
  loginUser,
  logoutUser,
  registerUser,
} from '../controllers/authController.js';
import {
  validateUserLogin,
  validateUserRegistration,
} from '../middleware/validationMiddleware.js';

const router = Router();

router.post('', validateUserRegistration, registerUser);
router.post('/login', validateUserLogin, loginUser);
router.get('/logout', logoutUser);

export default router;
