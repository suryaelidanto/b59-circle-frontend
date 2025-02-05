import AppLayout from '@/components/layouts/app-layout';
import AuthLayout from '@/components/layouts/auth-layout';
import HomePage from '@/routes/home';
import { createBrowserRouter } from 'react-router-dom';
import NotFoundPage from './404';
import FollowsPage from './follows';
import ForgotPasswordPage from './forgot-password';
import LoginPage from './login';
import ProfilePage from './profile';
import RegisterPage from './register';
import ResetPasswordPage from './reset-password';
import SearchPage from './search';
import ThreadDetailPage from './thread-detail';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/search',
        element: <SearchPage />,
      },
      {
        path: '/follows',
        element: <FollowsPage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '/detail/:id',
        element: <ThreadDetailPage />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
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
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default router;
