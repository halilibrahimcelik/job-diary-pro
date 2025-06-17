import { Outlet, redirect, useLoaderData } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Dashboard';
import { BigSideBar, Navbar, SmallSideBar } from '../components';
import { AxiosError } from 'axios';
import { apiService } from '../api/actions';
import type { UserResponse } from '../types';
import { toast } from 'sonner';
import DashboardProvider from '../providers/DashboardContextProvider';

//loader fun allows you get the data before even page loaded.
export const DashboardLoader = async () => {
  try {
    const response = await apiService.get<UserResponse>('/users/current-user');
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
    return redirect('/');
  }
};
const DashboardLayout = () => {
  const user = useLoaderData<UserResponse>();
  return (
    <DashboardProvider>
      <Wrapper>
        <main className='dashboard'>
          <SmallSideBar />
          <BigSideBar />
          <div>
            <Navbar />
            <div className='dashboard-page'>
              <Outlet context={user} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardProvider>
  );
};
export default DashboardLayout;
