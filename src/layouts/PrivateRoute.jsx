import { useIsAuthenticated, useAuthUser } from "react-auth-kit";
import { Navigate, useLocation } from "react-router-dom";
import AccessDenied from "../views/AccessDenied";

function PrivateRoute({ children, loginPath, role }) {
  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthUser();
  const location = useLocation();

  if (isAuthenticated()) {
    if (auth().admin_role_id === role) {
      return children;
    } else {
      return <AccessDenied />;
    }
  } else {
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }
}

export default PrivateRoute;
