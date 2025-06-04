import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  HomeLayout,
  Register,
  Login,
  Error,
  DashboardLayout,
  Landing,
} from './pages';
import { ROUTES_PATHS } from './constants';
const router = createBrowserRouter([
  {
    element: <HomeLayout />,
    path: ROUTES_PATHS.HOME,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: ROUTES_PATHS.REGISTER,
        element: <Register />,
      },
      {
        path: ROUTES_PATHS.LOGIN,
        element: <Login />,
      },
      {
        path: ROUTES_PATHS.DASHBOARD,
        element: <DashboardLayout />,
      },
    ],
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
