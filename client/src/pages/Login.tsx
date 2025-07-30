import { Form, Link, useNavigate, useNavigation } from 'react-router-dom';
import Wrapper from '../components/wrappers/RegisterAndLoginPage';
import { Logo } from '../components';
import FormRow from '../components/ui/FormRow';
import { ROUTES_PATHS } from '../constants';
import { apiService } from '../api/actions';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { queryClient } from '../utils/queryClient';

const Login = () => {
  const { state } = useNavigation();
  const navigate = useNavigate();
  const handleTestLogin = async () => {
    try {
      const data = {
        email: 'test@jobtracker.com',
        password: 'TesterJobTracker',
      };

      const response = await apiService.post<{ token: string }>(
        '/auth/login',
        data
      );
      if (response.status === 200) {
        queryClient.invalidateQueries();
        if (response.data?.token) {
          const expiresAt = new Date().getTime() + 24 * 60 * 60 * 1000;

          // Store both token and expiration
          localStorage.setItem('authToken', response.data.token);
          localStorage.setItem('authTokenExpires', expiresAt.toString());
          // Also set in client-side cookie (not HttpOnly)
        }
        toast.message(
          <span>
            🎉 Welcome to the Demo Account! Feel free to explore all Job Tracker
            features 🎉
          </span>,
          {
            duration: 6000,
          }
        );
        return navigate('/' + ROUTES_PATHS.DASHBOARD);
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
  return (
    <Wrapper>
      <Form method='POST' className='form'>
        <Logo />
        <h4>Login</h4>
        <FormRow type='email' name='email' id='email' label='Email' />
        <FormRow
          type='password'
          name='password'
          id='password'
          label='Password'
        />
        <button
          type='submit'
          disabled={state === 'submitting'}
          className='btn btn-block'
        >
          {state === 'submitting' ? 'Logging..' : 'Login'}
        </button>
        <button
          type='button'
          onClick={handleTestLogin}
          className='btn btn-block'
        >
          explore the app
        </button>
        <p>
          Already a member?{' '}
          <Link to={'/' + ROUTES_PATHS.REGISTER} className='member-btn'>
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Login;
