import { Link, Form, useNavigation } from 'react-router-dom';
import Wrapper from '../components/wrappers/RegisterAndLoginPage';
import { Logo } from '../components';
import FormRow from '../components/FormRow';
import { ROUTES_PATHS } from '../constants';

const Register = () => {
  const { state } = useNavigation();
  return (
    <Wrapper>
      <Form method='POST' className='form'>
        <Logo />

        <h4>Register</h4>
        <FormRow type='text' label='name' name='name' id='name' required />
        <FormRow
          type='text'
          label='Last Name'
          id='lastName'
          name='lastName'
          required
        />
        <FormRow type='text' label='email' id='email' name='email' required />

        <FormRow
          type='text'
          label='Location'
          name='location'
          id='location'
          required
          defaultValue='UK'
        />
        <FormRow
          type='password'
          name='password'
          label='Password'
          id='password'
          required
        />

        <button
          type='submit'
          disabled={state === 'submitting'}
          className='btn btn-block'
        >
          {state === 'submitting' ? 'Submitting' : 'Submit'}
        </button>
        <hr className='mt-2 mb-2' />
        <p>
          Already a member?{' '}
          <Link to={'/' + ROUTES_PATHS.LOGIN} className='member-btn'>
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Register;
