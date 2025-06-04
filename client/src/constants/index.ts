export const ROUTES_PATHS = {
  HOME: '/',
  REGISTER: 'register',
  LOGIN: 'login',
  ERROR: '/error',
  DASHBOARD: 'dashboard',
  PROFILE: '/profile',
  STATS: '/stats',
  DELETE_JOBS: '/delete-jobs',
  ALL_JOBS: '/all-jobs',
  ADD_JOB: '/add-job',
  EDIT_JOB: '/edit-job/:id',
  ADMIN: '/admin',
};

export type RoutePaths = typeof ROUTES_PATHS;
