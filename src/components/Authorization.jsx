import { useAuthUser, useIsAuthenticated } from 'react-auth-kit';
import { Navigate, useLocation } from 'react-router-dom';
import Unauthorized from '../views/Unauthorized';

const Authorization = ({ children, roles }) => {
  const authUser = useAuthUser();
  const isAuthenticated = useIsAuthenticated();
  const location = useLocation();

  const userHasRequiredRole = !!(
    authUser() && roles.includes(authUser().role.name)
  );

  if (isAuthenticated()) {
    if (!userHasRequiredRole) {
      return <Unauthorized />;
    }

    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default Authorization;
