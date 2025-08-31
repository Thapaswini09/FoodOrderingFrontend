// src/Admin/AdminProtectedRoute.js

import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AdminProtectedRoute = ({ children }) => {
  const token = Cookies.get('adminToken');
  return token ? children : <Navigate to="/adminlogin" replace />;
};

export default AdminProtectedRoute;
