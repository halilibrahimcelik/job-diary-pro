import { Outlet, redirect, useNavigation } from 'react-router-dom';
import Wrapper from '../components/wrappers/Dashboard';
import { BigSideBar, Navbar, SmallSideBar } from '../components';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import DashboardProvider from '../providers/DashboardContextProvider';
import LoadingSpinner from '../components/ui/Loading';
import { queryClient } from '../utils/queryClient';
import { profileQuery } from '../api/queries';
import { useQuery } from '@tanstack/react-query';

//loader fun allows you get the data before even page loaded.
export const DashboardLoader = async () => {
  try {
    const response = await queryClient.ensureQueryData(profileQuery);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
    return redirect('/');
  }
};
const DashboardLayout = () => {
  const { data: user } = useQuery(profileQuery);
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  return (
    <DashboardProvider>
      <Wrapper>
        <main className='dashboard'>
          <SmallSideBar />
          <BigSideBar />
          <div className='main-content'>
            <Navbar />
            <div className='dashboard-page'>
              {isLoading ? <LoadingSpinner /> : <Outlet context={user} />}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardProvider>
  );
};
export default DashboardLayout;
