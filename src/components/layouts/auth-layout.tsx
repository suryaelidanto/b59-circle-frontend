import { isLogin } from '@/utils/fake-datas/session';
import { Navigate, Outlet } from 'react-router-dom';

export default function AuthLayout() {
  if (isLogin) return <Navigate to={'/'} />;

  return <Outlet />;
}
