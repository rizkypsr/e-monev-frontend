import { Navigate, useLocation } from "react-router-dom";
import AccessDenied from "./AccessDenied";

function PrivateRoute({ children, roles }) {
  let location = useLocation();
  const isAuthenticated = true;
  const user = {
    username: "admin_username",
    role: "admin",
  };

  const userHasRequiredRole = user && roles.includes(user.role) ? true : false;

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/admin/login"
        state={{ from: location }}
      />
    );
  }

  if (isAuthenticated && !userHasRequiredRole) {
    return <AccessDenied />;
  }

  return children;
}

export default PrivateRoute;
