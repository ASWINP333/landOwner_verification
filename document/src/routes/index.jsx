import { DesktopLayout } from '../layouts';
import { Certificate, Document, Verify } from '../pages';

const routes = [
  {
    path: '/',
    element: <DesktopLayout />,
    index: true,
    children: [
      { path: '/', element: <Verify /> },
      { path: '/certificate', element: <Certificate /> },
      { path: '/document', element: <Document /> },
    ],
  },
];

export { routes };
