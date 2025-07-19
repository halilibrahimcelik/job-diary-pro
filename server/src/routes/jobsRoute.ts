import { Router } from 'express';
import {
  createJob,
  deletesingleJob,
  editSingleJob,
  getAllJobs,
  getAllJobsWithoutFilters,
  getSingleJob,
} from '../controllers/jobsController.js';
import {
  validateCreateJob,
  validateEditJob,
  validateIdParam,
} from '../middleware/validationMiddleware.js';
import { checkTesterRole } from '../middleware/authMiddleware.js';

const router = Router();

router.get('', getAllJobs);
router.get('/get-all', getAllJobsWithoutFilters);
router.post('', checkTesterRole, validateCreateJob, createJob);
router.get('/:jobId', validateIdParam, getSingleJob);
router.patch(
  '/:jobId',
  checkTesterRole,
  validateIdParam,
  validateEditJob,
  editSingleJob
);
router.delete('/:jobId', checkTesterRole, validateIdParam, deletesingleJob);
export default router;
