import Wrapper from '../assets/wrappers/Job';
import JobInfo from '../assets/wrappers/JobInfo';
import { format } from 'date-fns';

import type { IJob } from '../types';
import {
  IoLocationOutline,
  IoCalendarOutline,
  IoPodiumOutline,
} from 'react-icons/io5';
import { CgWorkAlt } from 'react-icons/cg';

type Props = {
  job: IJob;
};
const Job: React.FC<Props> = ({ job }) => {
  const formattedDate = format(new Date(job.createdAt), 'MMM do, yyyy');

  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{job.position.split('')[0]}</div>
        <div className='info'>
          <h5>{job.position} </h5>
          <p> {job.company} </p>
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
      </div>
    </Wrapper>
  );
};
export default Job;
