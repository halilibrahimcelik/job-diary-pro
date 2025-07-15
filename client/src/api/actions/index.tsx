import axios, { AxiosError } from 'axios';
import { redirect, type ActionFunction } from 'react-router-dom';
import ApiService from '../../utils/apiClient';
import { ROUTES_PATHS } from '../../constants';
export const apiService = new ApiService('http://localhost:8080/api/v1');
import { toast } from 'sonner';
import type { ICreateJobResponse, JobSingleResponse } from '../../types';

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
    const response = await apiService.post<ICreateJobResponse>('/jobs', data);

    if (response.status === 201) {
      toast.success(
        <span>
          {response.data.data.position} position at {response.data.data.company}{' '}
          <br />
          has been added to your Job List{' '}
        </span>
      );
      return redirect(
        '/' + ROUTES_PATHS.DASHBOARD + '/' + ROUTES_PATHS.ALL_JOBS
      );
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data.message);
      return error.response?.data;
    } else {
      return error;
    }
  }
};

export const editJobAction: ActionFunction = async ({ request, params }) => {
  const data = await request.formData();
  const formData = Object.fromEntries(data);
  try {
    const response = await apiService.patch<JobSingleResponse>(
      '/jobs/' + params.jobId,
      formData
    );
    if (response.status === 201) {
      toast.success(
        <span>
          {' '}
          {response.data.data.position} position at {response.data.data.company}{' '}
          has been updated successfully!
        </span>
      );
      return redirect(
        '/' + ROUTES_PATHS.DASHBOARD + '/' + ROUTES_PATHS.ALL_JOBS
      );
    }

    return null;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data.message);
      return error.response?.data;
    } else {
      return error;
    }
  }
};

export const updateUserAction: ActionFunction = async ({ request }) => {
  // const response=await apiService.patch("/users/update-user",formData,{
  //   headers: {
  //     'Content-Type': 'multipart/form-data'
  //   }})
  try {
    const data = await request.formData();
    //  const formData = Object.fromEntries(data);
    const imageFile = data.get('image') as File;
    let imageUrl = '';

    if (imageFile && imageFile.size > 0) {
      // First, upload the image to S3
      const imageFormData = new FormData();
      imageFormData.append('image', imageFile);

      const imageUploadResponse = await apiService.post(
        '/users/upload-image',
        imageFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(imageUploadResponse);
      if (imageUploadResponse.status === 200) {
        // imageUrl = imageUploadResponse.data.imageUrl;
        console.log(imageUploadResponse.data);
      }
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data.message);
      return error.response?.data;
    } else {
      return error;
    }
  }
};
