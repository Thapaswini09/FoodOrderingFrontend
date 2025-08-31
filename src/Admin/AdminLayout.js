import React from 'react'
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../Layout/AdminNavbar';
const AdminLayout = () => {
  return (
    <div>
      <AdminNavbar/>
      <Outlet/>
    </div>
  )
}

export default AdminLayout
