import React from 'react';
import { Navigate } from 'react-router-dom';

//hooks
import { useAuth } from "../hooks/useAuth";
import Loading from './Loading';

const ProtectedRoute = ({ children }) => {
  
  const { auth, loading } = useAuth();

  if (loading) {
    return <Loading/>;
  }

  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  return children;

};

export default ProtectedRoute;
