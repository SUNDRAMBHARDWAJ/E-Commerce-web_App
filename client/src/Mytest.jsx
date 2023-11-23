import React, { createContext, useContext, useEffect } from 'react'
import axios from "axios"
import {Link, useNavigate} from 'react-router-dom'

function Mytest() {
//const history = useNavigate();

const myfun = ()=>{

    axios.post('http://localhost:3000/signin', {
            username: "kunal@123",
            password: "Kunal@321"
    },{
      withCredentials:true
    })
      .then(function (response) {
        console.log(response.data.token)
        Cntext.LoginHandler()
      })
      .catch(function (error) {
        console.log(error);
      });
}
  return (
    <>
    This is signin
    <button
    onClick={myfun}
    >Get the products</button>
     <Link to='/user'>User</Link>
    </>
  )
}

export default Mytest