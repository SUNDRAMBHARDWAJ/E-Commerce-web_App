import axios from 'axios'
import React from 'react'
import {Link} from "react-router-dom"
function NavbarUser() {
  return (
    <>
        <>
  {/* Hello world */}
  <div style={{ height: 50 }} className="topmost" />
  <nav
    style={{ background: "linear-gradient(to right, #FF6B6B, #556270)" }}
    className="navbar navbar-expand-lg navbar-dark text-light fixed-top"
  >
    <div className="container-fluid">
      <b>Welcome {localStorage.getItem('Name')}</b>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <Link to='/user' className="nav-link active" aria-current="page">  
            Home
            </Link>
          <Link to='/user/change-password' className="nav-link text-light" > 
            Change Password
            </Link>
          <Link to='/user/cart' className="nav-link text-light" > 
            My Cart
            </Link>
          <Link to='/user/myorders' className="nav-link text-light" > 
            My Orders
            </Link>
          <Link className="nav-link text-light"
          onClick={()=>{
            axios.get('http://localhost:3000/logout',{
              withCredentials:true
            }).then((response)=>{
              if(response.status === 400){
                
              }
            }).catch(()=>{
              console.log('logged out')
              localStorage.removeItem('Name')
              window.location.href='/signin'
            })

          }}
          > 
            Logout
            </Link>
        </div>
      </div>
    </div>
  </nav>
</>
    </>
  )
}

export default NavbarUser