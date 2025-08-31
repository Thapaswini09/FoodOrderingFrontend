// src/User/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get('userToken');
  return token ? children : <Navigate to="/userlogin" replace />;
};

export default ProtectedRoute;
