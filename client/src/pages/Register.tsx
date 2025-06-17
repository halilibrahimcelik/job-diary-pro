import { Link, Form, useNavigation } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
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
