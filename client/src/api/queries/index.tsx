import { AxiosError } from 'axios';
import type { IJob, JobResponse, UserResponse } from '../../types';
import { apiService } from '../actions';
import { toast } from 'sonner';
export const statsQuery = {
  queryKey: ['stats'],
  queryFn: async () => {
    try {
      const response = await apiService.get<JobResponse>('/jobs/get-all');

      return response.data.data as IJob[];
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }
  },
};

export const profileQuery = {
  queryKey: ['profile'],
  queryFn: async () => {
    try {
      const response = await apiService.get<UserResponse>(
        '/users/current-user'
      );
      if (response.status === 200) {
        return response.data.data;
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }
  },
};
