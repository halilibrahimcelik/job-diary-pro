import Wrapper from '../assets/wrappers/LandingPage';
import mainSvg from '../assets/images/main.svg';
import logoSvg from '../assets/images/logo.svg';
import { Link } from 'react-router-dom';
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <img src={logoSvg} alt='Jobify' className='logo' />
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>
            Job <span>Tracking</span> App
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro sequi
            culpa nobis unde et omnis beatae quod error, saepe deserunt quam ea
            magnam, est odio vitae? Repellat, atque obcaecati! Consequuntur
            perspiciatis molestias, magnam voluptates quasi illo doloribus
            neque. Provident consectetur harum odit nesciunt impedit est enim
            incidunt fugit quaerat sunt!
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
