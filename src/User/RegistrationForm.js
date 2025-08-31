import React, { useState,useEffect } from 'react'
import '../css/style.css'
import { Validation } from './Validations';
import {toast} from 'react-toastify'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [register,setRegister]=useState({
    name:"",
    email:"",
    password:"",
    age:0,
    gender:"",
    phonenumber:"",
    longitude:"",
    latitude:""
  });
  const [errors,setErrors]=useState({})
  const {name,email,password,age,gender,phonenumber,latitude,longitude}=register
  const changerHandler=(e)=>{
    setRegister({...register,[e.target.name]:e.target.value});
  }
  const submitHandler=async (e)=>{
    e.preventDefault();
    const errordata=Validation(register);
    if (Object.keys(errordata).length === 0) {
      
      setErrors({});
      try {
        const response = await axios.post('http://localhost:8000/api/users-register', register);
        toast.success('User registered successfully!');
        setRegister({
          name:"",
          email:"",
          password:"",
          age:0,
          gender:"",
          phonenumber:"",
          longitude:"",
          latitude:""
        });
        setTimeout(() => {
          navigate('/userlogin');
        }, 500);
      } catch (error) {
        console.error(error.response?.data || error.message);
        toast.error(error.response?.data?.message || 'Something went wrong!');
      }
    }else{
      setErrors(errordata);
    }
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setRegister(prev => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }));
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);
  
  return (
    <>
      <form action="" onSubmit={submitHandler} id="user-reg-form">
        <div className='form-container'>
       <h2> User Registration </h2>
        <div className="mb-3">
          <label htmlFor="formusername" className="form-label">Name</label>
          <input type="text" className="form-control" id="formusername" placeholder="Enter your name" name='name' value={name} onChange={changerHandler}/>
          <span className="error-style">{errors.name}</span>
        </div>
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
          <label htmlFor="formuserage" className="form-label">Age</label>
          <input type="number" className="form-control" id="formuserage" placeholder="Enter your age" name='age' value={age} onChange={changerHandler}/>
          <span className="error-style">{errors.age}</span>
        </div>
        <div className="mb-3">
          <input type="radio" id="formusergender" name='gender' value="male" onChange={changerHandler} checked={gender==='male'}/> <span className='form-gender'>Male</span>
          <input type="radio" id="formusergender" name='gender' value="female" onChange={changerHandler} checked={gender==='female'}/> <span className='form-gender'>FeMale</span>
          <input type="radio" id="formusergender" name='gender' value="other" onChange={changerHandler} checked={gender==='other'}/> <span className='form-gender'>Other</span><br />
          <span className="error-style">{errors.gender}</span>
        </div>
        <div className="mb-3">
          <label htmlFor="formuserphone" className="form-label">Phone</label>
          <input type="number" className="form-control" id="formuserphone" placeholder="Enter your phonenumber" name='phonenumber' value={phonenumber} onChange={changerHandler}/>
          <span className="error-style">{errors.phonenumber}</span>
        </div>
        <div className="mb-3">
          <button className='btn btn-success'>Register</button><br /><br />
          <p id='para'>Already you have Account <Link to='/userlogin' id="login-here">Login</Link> here</p>
        </div>
        </div>
      </form>
    </>
  )
}

export default RegistrationForm
