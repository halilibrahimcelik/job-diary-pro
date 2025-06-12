import { Router } from 'express';
import {
  createJob,
  deletesingleJob,
  editSingleJob,
  getAllJobs,
  getSingleJob,
} from '../controllers/jobsController.js';

const router = Router();

router.get('', getAllJobs);
router.post('', createJob);
router.get('/:jobId', getSingleJob);
router.patch('/:jobId', editSingleJob);
router.delete('/:jobId', deletesingleJob);
export default router;
