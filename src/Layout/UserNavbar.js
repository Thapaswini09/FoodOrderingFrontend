
import { Link } from "react-router-dom"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom";
const UserNavbar = () => {
    const navigate=useNavigate();
    const navItems=[
        {
            id:1,
            name:"Dashboard",
            path:'dashboard'
        },
        {
            id:2,
            name:"Cart",
            path:'cart'
        },
        {
            id:3,
            name:"Orders",
            path:'orders'
        },
    ]
  return (
    <>
        <nav className="navbar navbar-expand-lg custom-navbar fixed-top">
        <div className="container-fluid">
             <Link to="/user/dashboard" className="navbar-brand restaurant-logo">
             🍽️ Foodie's
             </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {
                navItems.map((ele)=>{
                    return <ul key={ele.id} className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item"><Link to={ele.path} className="nav-link">{ele.name}</Link></li>
                    </ul>
                })
            }
            <div className="d-flex" role="search">
                <button className='btn btn-danger mx-2' onClick={()=>{Cookies.remove('userToken');navigate('/userlogin')}}>Logout</button>
            </div>
            </div>
        </div>
    </nav>
    </>
  )
}

export default UserNavbar