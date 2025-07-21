import { AxiosError } from 'axios';
import { redirect, type ActionFunction } from 'react-router-dom';
import ApiService from '../../utils/apiClient';
import { ROUTES_PATHS } from '../../constants';
export const apiService = new ApiService('http://localhost:8080/api/v1');
import { toast } from 'sonner';
import type {
  ICreateJobResponse,
  JobSingleResponse,
  UserResponse,
} from '../../types';
import type { CompanyInfo } from '../../hooks/useCompanyInfo';

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
    const company: CompanyInfo = {
      domain: data.companyDomain as string,
      fullUrl: data.companyUrl as string,
      logo: data.companyLogo as string,
      name: data.companyName as string,
    };

    delete data.companyDomain;
    delete data.companyName;
    delete data.companyLogo;
    delete data.companyUrl;

    const newData = { ...data, company };
    console.log(newData);
    const response = await apiService.post<ICreateJobResponse>(
      '/jobs',
      newData
    );

    if (response.status === 201) {
      toast.success(
        <span>
          {response.data.data.position} position at{' '}
          {response.data.data.company.name} <br />
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
          {response.data.data.position} position at{' '}
          {response.data.data.company.name} has been updated successfully!
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
  try {
    const data = await request.formData();
    const formData = Object.fromEntries(data);
    const imageFile = data.get('image') as File;
    let imageUrl = '';

    if (imageFile && imageFile.size > 0) {
      // First, upload the image to S3
      const imageFormData = new FormData();
      imageFormData.append('image', imageFile);
      if (imageFile.size > 500000) {
        toast.warning('Image size is too large!');
        return null;
      }
      const imageUploadResponse = await apiService.post(
        '/users/upload-image',
        imageFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (imageUploadResponse.status === 201) {
        const data = imageUploadResponse.data as {
          message: string;
          imageUrl: string;
        };
        imageUrl = data.imageUrl;
      }
    }
    const newData = { ...formData };
    delete newData.image;
    if (imageUrl) {
      newData.image = imageUrl;
    }
    const response = await apiService.patch<UserResponse>(
      '/users/update-user',
      newData
    );

    if (response.status === 200) {
      toast.success('Your profile succesfully updated!!🎉🎉🎉🎉');
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
