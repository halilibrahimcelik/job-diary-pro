import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  HomeLayout,
  Register,
  Login,
  Error,
  DashboardLayout,
  Landing,
  AddJob,
  Stats,
  AllJobs,
  Profile,
  Admin,
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
        children: [
          {
            index: true,
            element: <AddJob />,
          },
          {
            path: ROUTES_PATHS.ADD_JOB,
            element: <AddJob />,
          },
          {
            path: ROUTES_PATHS.STATS,
            element: <Stats />,
          },
          {
            path: ROUTES_PATHS.ALL_JOBS,
            element: <AllJobs />,
          },
          {
            path: ROUTES_PATHS.PROFILE,
            element: <Profile />,
          },
          {
            path: ROUTES_PATHS.ADMIN,
            element: <Admin />,
          },
        ],
      },
    ],
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
