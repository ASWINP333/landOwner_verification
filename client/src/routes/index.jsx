import { RequireAuth } from '../contexts/authContext';
import { AuthenticationLayout, DesktopLayout } from '../layouts';
import {
  BranchList,
  CreateBranch,
  CreateDocument,
  CreatePlot,
  CreateUser,
  Dashboard,
  DocumentList,
  ForgotPassword,
  Login,
  PlotList,
  Register,
  Report,
  Settings,
  UsersList,
  ViewDocument,
} from '../pages';

const routes = [
  {
    path: '/',
    element: <AuthenticationLayout />,
    index: true,
    children: [
      { path: '', element: <Login /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/forgot', element: <ForgotPassword /> },
    ],
  },
  {
    path: 'user',
    element: (
      <RequireAuth>
        <DesktopLayout />
      </RequireAuth>
    ),
    index: true,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'branches', element: <BranchList /> },
      { path: 'branches/create', element: <CreateBranch /> },
      { path: 'users', element: <UsersList /> },
      { path: 'users/create', element: <CreateUser /> },
      { path: 'settings', element: <Settings /> },
      { path: 'documents', element: <DocumentList /> },
      { path: 'documents/create/:plotId', element: <CreateDocument /> },
      { path: 'report', element: <Report /> },
      { path: 'plots', element: <PlotList /> },
      { path: 'plots/create', element: <CreatePlot /> },
    ],
  },
  { path: 'document', element: <ViewDocument /> },
];

export { routes };
