import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { Logo } from '../components';
import FormRow from '../components/FormRow';
const Register = () => {
  return (
    <Wrapper>
      <form className='form'>
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
          <Link to='/login' className='member-btn'>
            Login
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};
export default Register;
