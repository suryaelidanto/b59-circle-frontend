import HomePage from '@/routes/home';
import { createBrowserRouter } from 'react-router-dom';
import NotFoundPage from './404';
import LoginPage from './login';
import RegisterPage from './register';
import ForgotPasswordPage from './forgot-password';
import ResetPasswordPage from './reset-password';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
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
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
  },
  {
    path: '/reset-password',
    element: <ResetPasswordPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default router;
