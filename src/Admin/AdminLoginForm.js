import React, { useState } from 'react';
import '../css/admin.css'
import { LoginValidation } from './AdminValidation';
import { toast } from 'react-toastify';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';

const AdminLoginForm = () => {
  const navigate = useNavigate();
  const [adminLogin, setAdminLogin] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const { email, password } = adminLogin;

  const changeHandler = (e) => {
    setAdminLogin({ ...adminLogin, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const errordata = LoginValidation(adminLogin);
    if (Object.keys(errordata).length === 0) {
      try {
        const res = await axios.post('http://localhost:8000/api/admin-login', adminLogin);
        Cookies.set('adminToken', res.data.token, { expires: new Date(new Date().getTime() + 60 * 60 * 1000) });//after 1 hour token will expire
        toast.success('Admin Login successful!');
        setTimeout(() => {
          navigate('/admin/home');
        }, 1000);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Login failed');
      }
      setErrors({});
    } else {
      setErrors(errordata);
    }
  };

  return (
    <form onSubmit={submitHandler} id="admin-bg-form">
      <div className='admin-form'>
        <h2>Admin Login</h2>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" name="email" value={email} placeholder="Enter your email" onChange={changeHandler} />
          <span className="error-style">{errors.email}</span>
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" name="password" value={password} placeholder="Enter your password" onChange={changeHandler} />
          <span className="error-style">{errors.password}</span>
        </div>
        <div className="mb-3">
                      <button className='btn btn-success'>Login</button>
                      <p id='para'>You don't have Account <Link to='/adminregister' id="reg-here">Register</Link> here</p>
                    </div>
      </div>
    </form>
  );
};

export default AdminLoginForm;
