import { AxiosError } from 'axios';
import { redirect, useLoaderData } from 'react-router-dom';
import { toast } from 'sonner';
import { apiService } from '../api/actions';
import type { IJob, JobResponse } from '../types';
import Wrapper from '../assets/wrappers/StatsContainer';
import StatItem from '../assets/wrappers/StatItem';
import { PiReadCvLogo } from 'react-icons/pi';
import { MdPeopleOutline } from 'react-icons/md';
import { VscArchive } from 'react-icons/vsc';
import { useDashboard } from '../hooks/useDashboard';
import { COLORS } from '../constants';

export const StatsLoader = async () => {
  try {
    const response = await apiService.get<JobResponse>('/jobs');
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data.message);
      return redirect('/dashboard');
    }
  }
};
const Stats = () => {
  const data = useLoaderData<IJob[]>();
  const { isDarkMode } = useDashboard();
  const pendingJobs = data.filter((job) => job.jobStatus === 'pending');
  const declinedJobs = data.filter((job) => job.jobStatus === 'declined');
  const interviewedJobs = data.filter((job) => job.jobStatus === 'interview');
  return (
    <Wrapper>
      <StatItem
        bcg={COLORS['green-400']}
        color={isDarkMode ? COLORS['green-100'] : COLORS['green-900']}
      >
        <header>
          <div>
            <div className='count'>{pendingJobs.length}</div>
          </div>
          <div className='icon'>
            <PiReadCvLogo />
          </div>
        </header>
        <h2> Applied </h2>
      </StatItem>
      <StatItem
        bcg={COLORS['yellowGreen-400']}
        color={
          isDarkMode ? COLORS['yellowGreen-400'] : COLORS['yellewGreen-900']
        }
      >
        <header>
          <div>
            <div className='count'>{declinedJobs.length}</div>
          </div>
          <div className='icon'>
            <MdPeopleOutline />
          </div>
        </header>
        <h2> Interview </h2>
      </StatItem>
      <StatItem
        bcg={COLORS['purple-400']}
        color={isDarkMode ? COLORS['purple-100'] : COLORS['purple-900']}
      >
        <header>
          <div>
            <div className='count'>{interviewedJobs.length}</div>
          </div>
          <div className='icon'>
            <VscArchive />
          </div>
        </header>
        <h2> Declined </h2>
      </StatItem>
    </Wrapper>
  );
};
export default Stats;
