import { Link, useRouteError } from 'react-router-dom';
import Wrapper from '../assets/wrappers/ErrorPage';
import notFound from '../assets/images/not-found.svg';
import { ROUTES_PATHS } from '../constants';
type ErrorType = {
  data: string;
  status: number;
  statusText: string;
};
const Error = () => {
  const error = useRouteError() as ErrorType;
  console.log(error.status);
  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={notFound} alt='Not Found' />
          <h3>Page Not Found</h3>
          <Link to={ROUTES_PATHS.DASHBOARD}>Go to Home</Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div>
        <h3>Something went wrong</h3>
      </div>
    </Wrapper>
  );
};
export default Error;
