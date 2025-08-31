import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './AdminNavbar.css';
import Cookies from 'js-cookie';

const AdminNavbar = () => {
    const navigate=useNavigate();
    const navItems=[
        {
            id:1,
            name:"Home",
            path:"home"
        },
        {
            id:2,
            name:"Add Items",
            path:"additems"
        },
        {
            id:3,
            name:"List Items",
            path:"listitems"
        },
        {
            id:4,
            name:"Orders",
            path:"orders"
        },
    ]
  return (
    <>
      <nav className="navbar navbar-expand-lg custom-navbar fixed-top">
        <div className="container-fluid">
             <Link to="/" className="navbar-brand restaurant-logo">
             🍽️ Foodie's Hub
             </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">Home</a>
                </li>
            </ul> */}
            {
                navItems.map((ele)=>{
                    return <ul key={ele.id} className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item"><Link to={ele.path} className="nav-link">{ele.name}</Link></li>
                    </ul>
                })
            }
            <div className="d-flex" role="search">
                <button className='btn btn-danger mx-2' onClick={() => { Cookies.remove('adminToken'); navigate('/adminlogin'); }}>Logout</button>
            </div>
            {/* <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form> */}
            </div>
        </div>
    </nav>
    </>
  )
}

export default AdminNavbar
