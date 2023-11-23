import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmailVerification.css';

function EmailVerification() {
  const history = useNavigate()
  const [otp,setotp] = useState('')
  useEffect(()=>{
    const mail = localStorage.getItem('Vemail')
    axios.post('http://localhost:3000/verifyEmail',{
      email:mail
    }).then((response)=>{
      console.log(response)
    }).catch((err)=>{
      console.log('This are Error',err)
    })
  },[])
  return (
    <div className="email-verification-container">
      <p className="verification-message">Verify your email to continue</p>
        <div className="form-group">
          <label htmlFor="otp-input">Enter OTP:</label>
          <input type="text" id="otp-input" placeholder="Enter your OTP" 
          onChange={(event)=>{
            setotp(event.target.value)
          }} />
        </div>
        <button 
        onClick={()=>{
         console.log(otp)
         axios.post('http://localhost:3000/verifyEmail/check',{
           otp:otp,
           email:localStorage.getItem('Vemail')
         }).then((response)=>{
           console.log(response.data)
           if(response.data){
            history('/signin')
           }
         }).catch((err)=>{
           alert('Something went Wrong')
         })
        }}
         className="verification-button">Submit</button>
    </div>
  );
}
export default EmailVerification;
