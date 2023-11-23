import React from 'react'
import {Link, useNavigate} from "react-router-dom"
import axios from 'axios'
function Navbar() {
  const history  = useNavigate()
  const logoutSeller =()=>{
    axios.get('http://localhost:3000/logout',{
      withCredentials:true
    }).then((response)=>{
     console.log('hello')
    }).catch(()=>{
      console.log('logged out')
      localStorage.removeItem('Name')
      window.location.href='/user'
    })
  }
  return (
    <nav
  className="navbar navbar-expand-lg navbar-dark bg-warning text-dark fixed-top"
  style={{ zIndex: 1 }}
>
  <div className="container-fluid">
    <a className="navbar-brand text-dark">Welcome {localStorage.getItem('Name')}</a>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li>
          <Link
          to='/'
            className="nav-link text-dark"
          >
            Add Product
          </Link>
        </li>
        <li>
          <Link to='/ProductDescription' className="nav-link text-dark">
            Product Management
          </Link>
        </li>
        <li>
          <Link to='/seller/orders' className="nav-link text-dark">
            My Orders
          </Link>
        </li>
        <li>
        <a className="nav-link text-dark"
          onClick={logoutSeller}
          > 
            Logout
            </a>
        </li>
      </ul>
    </div>
  </div>
</nav>
  )
}

export default Navbar