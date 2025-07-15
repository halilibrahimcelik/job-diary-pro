import { Router } from 'express';
import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
  uploadUserImage,
} from '../controllers/userController.js';
import { validateUpdateUser } from '../middleware/validationMiddleware.js';
import { authorizedPermissions } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/multerMiddleware.js';

const router = Router();

router.get('/current-user', getCurrentUser);
router.get('/admin/app-stats', [
  authorizedPermissions('admin'),
  getApplicationStats,
]);
router.post('/upload-image', upload.single('image'), uploadUserImage);
router.patch('/update-user', validateUpdateUser, updateUser);

export default router;
