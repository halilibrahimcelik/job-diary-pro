import { Link, useRouteError } from 'react-router-dom';

type ErrorType = {
  data: string;
  status: number;
  statusText: string;
};
const Error = () => {
  const error = useRouteError() as ErrorType;
  console.log(error.status);
  return (
    <div>
      <h1> {error.statusText ? error.statusText : 'Not Found'} </h1>
      <h2>Error Status : {error.status}</h2>
      <Link to={'/'}>Go to Home</Link>
    </div>
  );
};
export default Error;
