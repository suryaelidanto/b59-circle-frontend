import AboutPage from '@/routes/about';
import DashboardPage from '@/routes/dashboard';
import { createBrowserRouter } from 'react-router-dom';
import NotFoundPage from './404';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardPage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default router;
