import { Router } from 'express';
import { registerUser } from '../controllers/userController.js';
import { validateUserRegistration } from '../middleware/validationMiddleware.js';

const router = Router();

router.post('', validateUserRegistration, registerUser);

export default router;
