import { AxiosError } from 'axios';
import { redirect, type ActionFunction } from 'react-router-dom';
import ApiService from '../../utils/apiClient';
import { ROUTES_PATHS } from '../../constants';
export const apiService = new ApiService('http://localhost:8080/api/v1');
import { toast } from 'sonner';

export const registerAction: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const response = await apiService.post('/auth', data);
    if (response.status === 201) {
      toast.success(
        <span>
          {' '}
          Congratulations 🎉🎉🎉🎉 <br /> You have succesfully registered !
        </span>
      );
      return redirect('/' + ROUTES_PATHS.LOGIN);
    }
    return null;
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      toast.error(error.response?.data.message);
      return error.response?.data;
    } else {
      return error;
    }
  }
};

export const loginAction: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const response = await apiService.post('/auth/login', data);
    console.log(response);
    if (response.status === 200) {
      toast.success(<span> Welcome Back ✨✨✨✨</span>);
      return redirect('/' + ROUTES_PATHS.DASHBOARD);
    }
    return null;
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      toast.error(error.response?.data.message);
      return error.response?.data;
    } else {
      return error;
    }
  }
};

export const createJobAction: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const response = await apiService.post('/jobs', data);
    console.log(response);
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data.message);
      return error.response?.data;
    } else {
      return error;
    }
  }
};
