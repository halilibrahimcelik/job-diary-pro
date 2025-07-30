import Wrapper from '../components/wrappers/LandingPage';
import mainSvg from '../assets/images/main.svg';
import { Link } from 'react-router-dom';
import { Logo } from '../components';
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>
            Job <span>Dairy</span> Pro
          </h1>
          <p>
            Streamline your job search with our comprehensive tracking
            application. Keep track of applications, interviews, and follow-ups
            all in one place. Stay organized, monitor your progress, and land
            your dream job faster with powerful analytics and insights.
          </p>
          <Link to='/register' className='btn  register-link'>
            Register
          </Link>
          <Link to='/login' className='btn '>
            Login
          </Link>
        </div>
        <img src={mainSvg} alt='job hunt' className='img main-img' />
      </div>
    </Wrapper>
  );
};
export default Landing;
