import React, { useState } from 'react'
import '../css/userlogin.css'
import { LoginValidation } from './Validations';
import {toast} from 'react-toastify'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const LoginForm = () => {
  const navigate = useNavigate();
  const [loginData,setLoginData]=useState({
    email:"",
    password:"",
  });
  const [errors,setErrors]=useState({})
  const {email,password}=loginData;
  const changerHandler=(e)=>{
    setLoginData({...loginData,[e.target.name]:e.target.value})
  }
  const submitHandler=async(e)=>{
    e.preventDefault();
   
    const errordata=LoginValidation(loginData);
    if (Object.keys(errordata).length === 0) {
      try {
        const res=await axios.post('http://localhost:8000/api/user-login',loginData);
        const inTenMinutes = new Date(new Date().getTime() + 60 * 60 * 1000);//after 1 hour token will expire
        Cookies.set('userToken', res.data.token, { expires: inTenMinutes });
        toast.success('User Login successfully!');
        setLoginData({
          email:"",
          password:""
        });
      setTimeout(() => {
        navigate('/user/dashboard');
      }, 1000);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Something went wrong!');
      }
      setErrors({})
    }else{
      setErrors(errordata)
    }
  }
  return (
    <>
      <form action="" onSubmit={submitHandler} id="user-login-form">
        <div className='form-container'>
          <div className="mb-3">
              <label htmlFor="formuseremail" className="form-label">Email</label>
              <input type="email" className="form-control" id="formuseremail" placeholder="Enter your email" name='email' value={email} onChange={changerHandler}/>
              <span className="error-style">{errors.email}</span>
            </div>
            <div className="mb-3">
              <label htmlFor="formuserpassword" className="form-label">Password</label>
              <input type="password" className="form-control" id="formuserpassword" placeholder="Enter your password" name='password' value={password} onChange={changerHandler}/>
              <span className="error-style">{errors.password}</span>
            </div>
            <div className="mb-3">
              <button className='btn btn-danger'>Login</button>
              <p id='para'>You don't have Account <Link to='/userregister' id="reg-here">Register</Link> here</p>
            </div>
          </div>
      </form>
    </>
  )
}

export default LoginForm
