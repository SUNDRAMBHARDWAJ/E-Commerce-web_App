import React, { useState } from 'react';
import "./Login.css";
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import App from "../App"
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();
  const handleSubmit = () => {
    console.log(`Username: ${username} Password: ${password}`);
    axios.post('http://localhost:3000/signin', {
        username:username,
        password:password
        },{
        withCredentials:true
        })
        .then(function (response) {
            if(response.data.type === 'Seller'){
              window.location.href = '/'
            }else{
              window.location.href = '/user'
            }
            console.log(response.data.type)
            localStorage.setItem('Name',String(response.data.foundUser.username))
            
        })
        .catch(function (error) {
            alert("Invalid credentials")
            console.log(error,"this are error");
        });
  }

  return (
    <div className="login-container">
      <div className="form-container" onSubmit={handleSubmit}>
        <div className="form-header">Login</div>
        <input type="text" className="form-input" placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)} />
        <input type="password" className="form-input" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <button
        onClick={handleSubmit}
         className="form-submit">Login</button>
        <div className="form-link">Don't have an account? <Link to="/signup">Sign up</Link></div>
      </div>
    </div>
  );
}

export default Login;
