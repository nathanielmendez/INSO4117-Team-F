import React, { useState } from 'react';
import './LoginPage.css';
import background from './background.png';
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [Rusername, setRUsername] = useState('');
  const [Rpassword, setRPassword] = useState('');

//HardCoded data
  var userW = "OneMedical"
  var passwW = "OneMed1234"
  var userP = "Mary64"
  var passwordP = "MaryEsCool2"

  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    console.log(username)
    console.log(password)
    if(username === userW && password === passwW){
        navigate("/calendar")

    }else if(username === userP && passwordP === password){
        //Client Calendar
    }else{
        alert("Incorrect username/password please try again.")
    }
  }

  const handleRegister = (event) => {
    event.preventDefault();
    //Register logic
  }

  return (
    
    <div className="login-page" style={{backgroundImage: `url(${background})`}}>
      <label className='docCal'>DocCalendar</label>
      <form onSubmit={handleLogin} className='form-login'>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <label className='password'>Forgot Password?</label>

        <button type="submit">Login</button>
      </form>
      <form onSubmit={handleRegister} className='form-register'>
        <h2 >Register</h2>
        <div className="form-group">
          <label htmlFor="username">Full Name:</label>
          <input type="text" id="username" value={Rusername} onChange={(e) => setRUsername(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={Rpassword} onChange={(e) => setRPassword(e.target.value)} required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default LoginPage;