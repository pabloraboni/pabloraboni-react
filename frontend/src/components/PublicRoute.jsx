import React from 'react';
import { Navigate } from 'react-router-dom';

//hooks
import { useAuth } from "../hooks/useAuth";

const PublicRoute = ({ children }) => {

  const {auth} = useAuth();

  if (auth) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;