import { Router } from 'express';
import { loginUser, registerUser } from '../controllers/userController.js';
import {
  validateUserLogin,
  validateUserRegistration,
} from '../middleware/validationMiddleware.js';

const router = Router();

router.post('', validateUserRegistration, registerUser);
router.post('/login', validateUserLogin, loginUser);

export default router;
