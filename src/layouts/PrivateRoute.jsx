import PropTypes from 'prop-types';
import React from 'react';
import { useIsAuthenticated } from 'react-auth-kit';
import { Navigate, useLocation } from 'react-router-dom';

function PrivateRoute({ children }) {
  const isAuthenticated = useIsAuthenticated();
  const location = useLocation();

  if (isAuthenticated()) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
