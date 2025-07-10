import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { apiService } from '../api/actions';
import CustomWrapper from '../assets/wrappers/StatsContainer';
import { redirect, useLoaderData } from 'react-router-dom';
import StatItem from '../assets/wrappers/StatItem';
import { FiUsers } from 'react-icons/fi';
import { PiSuitcase } from 'react-icons/pi';
import { useDashboard } from '../hooks/useDashboard';
import { COLORS } from '../constants';

type AdminStatType = {
  jobs: number;
  message: string;
  users: number;
};
export const AdminLoader = async () => {
  try {
    const response = await apiService.get<AdminStatType>(
      '/users/admin/app-stats'
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data.message);
      return redirect('/dashboard');
    }
  }
};
const Admin = () => {
  const data = useLoaderData<AdminStatType>();
  const { isDarkMode } = useDashboard();

  return (
    <CustomWrapper>
      <StatItem
        bcg={COLORS['green-400']}
        color={isDarkMode ? COLORS['green-100'] : COLORS['green-900']}
      >
        <header>
          <div className='count'>{data?.users}</div>

          <div className='icon'>
            <FiUsers />
          </div>
        </header>
        <h2> Users </h2>
      </StatItem>
      <StatItem
        bcg={COLORS['purple-400']}
        color={isDarkMode ? COLORS['purple-100'] : COLORS['purple-900']}
      >
        <header>
          <div>
            <div className='count'>{data?.jobs}</div>
          </div>
          <div className='icon'>
            <PiSuitcase />
          </div>
        </header>
        <h2> Applications </h2>
      </StatItem>
    </CustomWrapper>
  );
};
export default Admin;
