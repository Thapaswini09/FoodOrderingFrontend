import React, { useState } from 'react';
import RegistrationForm from './User/RegistrationForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './User/LoginForm';
import Dashboard from './User/Dashboard';
import ProtectedRoute from './User/ProtectedRoute';
import AdminRegistrationForm from './Admin/AdminRegistrationForm';
import AdminLoginForm from './Admin/AdminLoginForm';
import AdminProtectedRoute from './Admin/AdminProtectedRoute';
import AddItems from './Admin/AddItems';
import AdminLayout from './Admin/AdminLayout';
import Home from './Admin/Home';
import Orders from './Admin/Orders';
import UserOrders from './User/UserOrders';
import ListItems from './Admin/ListItems';
import UserLayout from './User/UserLayout';
import Cart from './User/Cart';

function App() {
  

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/adminregister" element={<AdminRegistrationForm />} />
          <Route path="/adminlogin" element={<AdminLoginForm />} />
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminLayout />
              </AdminProtectedRoute>
            }
          >
            <Route path="home" element={<Home />} />
            <Route path="additems" element={<AddItems
             />} />
            <Route path="orders" element={<Orders />} />
            <Route path="listitems" element={<ListItems  />} />
          </Route>

          {/* Users Data */}
          <Route path="/userregister" element={<RegistrationForm />} />
          <Route path="/userlogin" element={<LoginForm />} />
          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <UserLayout/>
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path='cart' element={<Cart/>} />
            <Route path="orders" element={<UserOrders />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
