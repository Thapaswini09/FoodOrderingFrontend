import React, { useState } from 'react';
import '../css/admin.css'
import { AdminValidation } from './AdminValidation';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const AdminRegister = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    password: "",
    resturentname: "",
    phonenumber: ""
  });

  const [errors, setErrors] = useState({});
  const { name, email, password, resturentname, phonenumber } = admin;

  const changeHandler = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const errordata = AdminValidation(admin);
    if (Object.keys(errordata).length === 0) {
      setErrors({});
      try {
        const response = await axios.post('http://localhost:8000/api/admin-register', admin, {
  headers: {
    'Content-Type': 'application/json',
  },
});
        toast.success('Admin registered successfully!');
        setAdmin({
          name: "",
          email: "",
          password: "",
          resturentname: "",
          phonenumber: ""
        });
        setTimeout(() => {
          navigate('/adminlogin');
        }, 500);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Something went wrong!');
      }
    } else {
      setErrors(errordata);
    }
  };

  return (
    <>
      <form onSubmit={submitHandler} id="admin-bg-form">
        <div className='admin-form'>
          <h2> Admin Registration </h2>
          <div className="mb-3">
            <label htmlFor="formusername" className="form-label">Name</label>
            <input type="text" className="form-control" id="formusername" placeholder="Enter your name" name='name' value={name} onChange={changeHandler} />
            <span className="error-style">{errors.name}</span>
          </div>
          <div className="mb-3">
            <label htmlFor="formuseremail" className="form-label">Email</label>
            <input type="email" className="form-control" id="formuseremail" placeholder="Enter your email" name='email' value={email} onChange={changeHandler} />
            <span className="error-style">{errors.email}</span>
          </div>
          <div className="mb-3">
            <label htmlFor="formuserpassword" className="form-label">Password</label>
            <input type="password" className="form-control" id="formuserpassword" placeholder="Enter your password" name='password' value={password} onChange={changeHandler} />
            <span className="error-style">{errors.password}</span>
          </div>
          <div className="mb-3">
            <label htmlFor="formrestaurantname" className="form-label">Restaurant Name</label>
            <input type="text" className="form-control" id="formrestaurantname" placeholder="Enter your restaurant name" name='resturentname' value={resturentname} onChange={changeHandler} />
            <span className="error-style">{errors.resturentname}</span>
          </div>
          <div className="mb-3">
            <label htmlFor="formuserphone" className="form-label">Phone Number</label>
            <input type="number" className="form-control" id="formuserphone" placeholder="Enter your phonenumber" name='phonenumber' value={phonenumber} onChange={changeHandler} />
            <span className="error-style">{errors.phonenumber}</span>
          </div>
          <div className="mb-3">
            <button className='btn btn-success'>Register</button><br /><br />
            <p id='para'>Already you have Account <Link to='/adminlogin' id="login-here">Login</Link> here</p>
          </div>
        </div>
      </form>
    </>
  );
};

export default AdminRegister;
