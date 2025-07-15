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

const router = Router();

router.get('', getAllJobs);
router.get('/get-all', getAllJobsWithoutFilters);
router.post('', validateCreateJob, createJob);
router.get('/:jobId', validateIdParam, getSingleJob);
router.patch('/:jobId', validateIdParam, validateEditJob, editSingleJob);
router.delete('/:jobId', validateIdParam, deletesingleJob);
export default router;
