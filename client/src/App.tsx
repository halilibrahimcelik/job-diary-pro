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
  EditJob,
} from './pages';
import { ROUTES_PATHS } from './constants';
import {
  createJobAction,
  editJobAction,
  loginAction,
  registerAction,
} from './api/actions';
import { Toaster } from 'sonner';
import { useDashboard } from './hooks/useDashboard';
import { DashboardLoader } from './pages/DashboardLayout';
import { AllJobsLoader } from './pages/AllJobs';
import { EditJobsLoader } from './pages/EditJob';
import { AdminLoader } from './pages/Admin';

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
        action: registerAction,
      },
      {
        path: ROUTES_PATHS.LOGIN,
        element: <Login />,
        action: loginAction,
      },
      {
        path: ROUTES_PATHS.DASHBOARD,
        element: <DashboardLayout />,
        HydrateFallback: () => null,
        loader: DashboardLoader,
        children: [
          {
            index: true,
            element: <AddJob />,
            action: createJobAction,
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
            loader: AllJobsLoader,
          },
          {
            path: ROUTES_PATHS.ALL_JOBS + '/:jobId',
            element: <EditJob />,
            loader: EditJobsLoader,
            action: editJobAction,
          },
          {
            path: ROUTES_PATHS.PROFILE,
            element: <Profile />,
          },
          {
            path: ROUTES_PATHS.ADMIN,
            element: <Admin />,
            loader: AdminLoader,
          },
        ],
      },
    ],
  },
]);
const App = () => {
  const { isDarkMode } = useDashboard();
  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        closeButton
        visibleToasts={2}
        position='top-right'
        richColors
        theme={isDarkMode ? 'dark' : 'light'}
        swipeDirections={['bottom']}
        toastOptions={{
          duration: 3000,
          style: {},
        }}
      />
    </>
  );
};
export default App;
