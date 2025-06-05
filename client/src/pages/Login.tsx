import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { Logo } from '../components';
import FormRow from '../components/FormRow';
import { ROUTES_PATHS } from '../constants';

const Login = () => {
  return (
    <Wrapper>
      <form className='form'>
        <Logo />
        <h4>Login</h4>
        <FormRow
          type='email'
          name='email'
          id='email'
          label='Email'
          defaultValue='john@test.com'
        />
        <FormRow
          type='password'
          name='password'
          id='password'
          label='Password'
          defaultValue='secret'
        />
        <button type='submit' className='btn btn-block'>
          Login
        </button>
        <button type='button' className='btn btn-block'>
          explore the app
        </button>
        <p>
          Already a member?{' '}
          <Link to={ROUTES_PATHS.REGISTER} className='member-btn'>
            Register
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};
export default Login;
