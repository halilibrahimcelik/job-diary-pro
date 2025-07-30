import { AxiosError } from 'axios';
import { toast } from 'sonner';
import CustomWrapper from '../components/wrappers/StatsContainer';
import { redirect } from 'react-router-dom';
import StatItem from '../components/wrappers/StatItem';
import { FiUsers } from 'react-icons/fi';
import { PiSuitcase } from 'react-icons/pi';
import { useDashboard } from '../hooks/useDashboard';
import { COLORS } from '../constants';
import { queryClient } from '../utils/queryClient';
import { adminStatsQuery } from '../api/queries';
import { useQuery } from '@tanstack/react-query';

export const AdminLoader = async () => {
  try {
    const response = await queryClient.ensureQueryData(adminStatsQuery);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data.message);
      return redirect('/dashboard');
    }
  }
};
const Admin = () => {
  const { data } = useQuery(adminStatsQuery);
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
