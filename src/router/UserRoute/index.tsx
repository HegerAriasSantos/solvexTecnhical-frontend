import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '~/Context';

const useAuth = () => {
  return useSelector((state: RootState) => state.User.value?.name);
};

const AdminRoute = () => {
  const auth = useAuth();
  return auth ? <Outlet /> : <Navigate to='/login' />;
};

export default AdminRoute;
