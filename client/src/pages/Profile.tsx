import { Form, useLoaderData, useNavigation } from 'react-router-dom';
import { FormRow } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { apiService } from '../api/actions';
import type { IUser, UserResponse } from '../types';

export const ProfileLoader = async () => {
  try {
    const response = await apiService.get<UserResponse>('/users/current-user');
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data.message);
      return error;
    }
  }
};
const Profile = () => {
  const { state } = useNavigation();
  const data = useLoaderData<IUser>();

  return (
    <Wrapper>
      <h2> Your Profile</h2>
      <Form method='POST' className='form-component'>
        <FormRow
          label='Image'
          name='image'
          accept='image/*'
          type='file'
          id='file'
        />
        <FormRow
          label='Name'
          defaultValue={data.name}
          name='name'
          type='text'
          id='name'
          required
        />
        <FormRow
          defaultValue={data.lastName}
          label='Last Name'
          name='lastName'
          type='text'
          id='lastName'
          required
        />
        <FormRow
          label='Email'
          defaultValue={data.email}
          name='email'
          type='email'
          id='email'
          required
        />
        <FormRow
          defaultValue={data.location}
          label='Location'
          name='location'
          type='text'
          id='location'
          required
        />

        <button
          disabled={state === 'submitting'}
          className='btn btn-block'
          type='submit'
        >
          {' '}
          {state === 'submitting' ? 'Editing...' : 'Edit'}
        </button>
      </Form>
    </Wrapper>
  );
};
export default Profile;
