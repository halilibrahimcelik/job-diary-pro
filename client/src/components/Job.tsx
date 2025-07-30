import Wrapper from './wrappers/Job';
import JobInfo from './wrappers/JobInfo';
import { format } from 'date-fns';

import type { IJob } from '../types';
import {
  IoLocationOutline,
  IoCalendarOutline,
  IoPodiumOutline,
} from 'react-icons/io5';
import { CgWorkAlt } from 'react-icons/cg';
import { Link, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import Modal from './ui/Modal';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { apiService } from '../api/actions';
import { FiExternalLink } from 'react-icons/fi';
import { queryClient } from '../utils/queryClient';

type Props = {
  job: IJob;
};
const Job: React.FC<Props> = ({ job }) => {
  const formattedDate = format(new Date(job.createdAt), 'MMM do, yyyy');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [params, setParams] = useSearchParams();
  const openModal = () => {
    const newParams = new URLSearchParams(params);
    newParams.delete('jobDeleted');
    setParams(newParams);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);
  const handleDelete = async () => {
    try {
      const response = await apiService.delete<{ message: string }>(
        '/jobs/' + job._id.toString()
      );
      if (response.status === 200) {
        queryClient.invalidateQueries({ queryKey: ['jobs'] });

        toast.success(response.data.message);
        setParams({
          jobDeleted: 'true',
        });
        setIsModalOpen(false);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }
  };
  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{job.position.split('')[0]}</div>
        <div className='info'>
          <h5>{job.position} </h5>
          <p>
            <Link target='_blank' to={job?.company?.fullUrl}>
              {' '}
              {job?.company?.name} <FiExternalLink />
            </Link>{' '}
          </p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <JobInfo>
            <span className='job-icon'>
              <IoLocationOutline />
            </span>
            <span className='job-text'> {job.jobLocation}</span>
          </JobInfo>
          <JobInfo>
            <span className='job-icon'>
              <IoCalendarOutline />
            </span>
            <span className='job-text'>{formattedDate}</span>
          </JobInfo>
          <JobInfo>
            <span className='job-icon'>
              <IoPodiumOutline />
            </span>
            <span className='job-text'>{job.jobType}</span>
          </JobInfo>
          <JobInfo>
            <span className='job-icon'>
              <CgWorkAlt />
            </span>
            <span className='job-text'>{job.workModel}</span>
          </JobInfo>
          <div className={`status ${job.jobStatus}`}>{job.jobStatus}</div>
        </div>
        <div className='actions'>
          <button className='btn'>
            <Link to={job._id.toString()}>Edit</Link>
          </button>
          <button className='btn btn-outline' onClick={openModal}>
            Delete
          </button>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title='Are you Sure ?'
        showCloseButton={true}
        closeOnOverlayClick={true}
        closeOnEscape={true}
      >
        <p>Once deleted, this job cannot be recovered.</p>
        <div className='btn-wrapper'>
          <button className='btn btn-outline' onClick={closeModal}>
            No
          </button>
          <button className='btn' onClick={handleDelete}>
            Yes
          </button>
        </div>
      </Modal>
    </Wrapper>
  );
};
export default Job;
