import React from 'react'
import UserNavbar from '../Layout/UserNavbar.js';
import { Outlet } from 'react-router-dom';
const UserLayout = () => {
  return (
    <>
        <UserNavbar/>
        <Outlet />
    </>
  )
}

export default UserLayout