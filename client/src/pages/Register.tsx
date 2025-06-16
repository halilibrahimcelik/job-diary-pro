import { Link, Form, redirect, useNavigation } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { Logo } from '../components';
import FormRow from '../components/FormRow';
import { ROUTES_PATHS } from '../constants';
import type { ActionFunction } from 'react-router-dom';
// import apiClient from '../utils/apiClient.ts';
import { Axios, AxiosError } from 'axios';
import ApiService from '../utils/apiClient';
// eslint-disable-next-line react-refresh/only-export-components
const apiService = new ApiService('http://localhost:8080/api/v1');
export const registerAction: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const response = await apiService.post('/auth', data);
    console.log(response);
    return null;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    } else {
      return error;
    }
    console.log(error);
    return error;
  }
};
const Register = () => {
  return (
    <Wrapper>
      <Form method='POST' className='form'>
        <Logo />

        <h4>Register</h4>
        <FormRow
          type='text'
          label='name'
          name='name'
          id='name'
          required
          defaultValue='John'
        />
        <FormRow
          type='text'
          label='Last Name'
          id='lastName'
          name='lastName'
          required
          defaultValue='Doe'
        />
        <FormRow
          type='text'
          label='email'
          id='email'
          name='email'
          required
          defaultValue='john.doe@example.com'
        />

        <FormRow
          type='text'
          label='Location'
          name='location'
          id='location'
          required
          defaultValue='USA'
        />
        <FormRow
          type='password'
          name='password'
          label='Password'
          id='password'
          required
          defaultValue='JohnDoe123!'
        />

        <button type='submit' className='btn btn-block'>
          Submit{' '}
        </button>
        <hr className='mt-2 mb-2' />
        <p>
          Already a member?{' '}
          <Link to={ROUTES_PATHS.LOGIN} className='member-btn'>
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Register;
