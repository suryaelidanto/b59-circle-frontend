import AboutPage from '@/routes/about';
import HomePage from '@/routes/home';
import { createBrowserRouter } from 'react-router-dom';
import NotFoundPage from './404';
import LoginPage from './login';
import RegisterPage from './register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default router;
