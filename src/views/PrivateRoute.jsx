import { useIsAuthenticated } from "react-auth-kit";
import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute({ children, loginPath }) {
  const isAuthenticated = useIsAuthenticated();
  const location = useLocation();

  if (isAuthenticated()) {
    return children;
  }

  return (
    <Navigate
      to={loginPath}
      state={{ from: location }}
      replace
    />
  );
}

export default PrivateRoute;
