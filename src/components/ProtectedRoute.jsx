import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import ContextDashboard from '../Context/ContextDashboard';

const ProtectedRoute = ({ redirectTo, element }) => {
  const { eligibilityStatus } = useContext(ContextDashboard);
  const location = useLocation();
  if (eligibilityStatus === "ELIGIBLE") {
    return element;
  }
  return <Navigate to={redirectTo} state={{ from: location }} />;
};

export default ProtectedRoute;
