import { Form, Link, useNavigation } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { Logo } from '../components';
import FormRow from '../components/FormRow';
import { ROUTES_PATHS } from '../constants';

const Login = () => {
  const { state } = useNavigation();

  return (
    <Wrapper>
      <Form method='POST' className='form'>
        <Logo />
        <h4>Login</h4>
        <FormRow
          type='email'
          name='email'
          id='email'
          label='Email'
          defaultValue='john.doe@example.com'
        />
        <FormRow
          type='password'
          name='password'
          id='password'
          label='Password'
          defaultValue='JohnDoe123!'
        />
        <button
          type='submit'
          disabled={state === 'submitting'}
          className='btn btn-block'
        >
          {state === 'submitting' ? 'Logging..' : 'Login'}
        </button>
        <button type='button' className='btn btn-block'>
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
