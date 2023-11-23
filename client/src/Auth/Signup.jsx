import React, { useState } from 'react';
import "./Login.css";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
function Signup() {
    const history = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        email: '',
        telephone: '',
      });
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
            axios.post('http://localhost:3000/signup',{
                formData:formData
            },).then((response)=>{
                console.log(response)
                localStorage.setItem('Vemail',formData.email)
                history('/verifyEmail')

            }).catch((err)=>{
                alert('Something went Wrong')
            })
      };
    
      return (
        <div className="signup-container">
          <div className="signup-form">
            <h2>Sign Up</h2>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="telephone">Telephone:</label>
              <input
                type="tel"
                name="telephone"
                id="telephone"
                value={formData.telephone}
                onChange={handleChange}
                required
              />
            </div>
            <button className='buttonx'
                onClick={handleSubmit}
            >Sign Up</button>
            <h6>Already have an account?<Link to='/signin' style={{color:'red'}}>signin</Link></h6>
          </div>
        </div>
      );
    }


export default Signup