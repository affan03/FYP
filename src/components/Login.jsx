
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import bg from '../images/bgderma.jpg';
import TextField from '@mui/material/TextField';
import { useAuth } from './AuthContext';
const backendUrl = import.meta.env.VITE_BACKEND_URL
console.log('Backend URL:', backendUrl);


const Login = () => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL
  console.log('Backend URL:', backendUrl);
  const [loginClicked, setLoginClicked] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');  
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleLoginClick = (event) => {
    event.preventDefault();
    setLoginClicked(true);
  };

  const handleSignUpClick = (event) => {
    event.preventDefault();
    setLoginClicked(false);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/user/login/`, {
        email,
        password,
      });
      console.log('Login Success:', response.data);

      localStorage.setItem('authToken', response.data.token.access);
      localStorage.setItem('userName', response.data.user.name);
      login(response.data.user.name);
      navigate('/profile');  // Redirect to profile page
    } catch (error) {
      setError('Invalid email or password');
      console.error('Login Error:', error.response ? error.response.data : error.message);
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/user/register/`, {
        name: username,
        email,
        password,
        password2,
        tc: true  
      });
      console.log('Signup Success:', response.data);
      navigate('/login');  
    } catch (error) {
      setError('Failed to create account');
      console.error('Signup Error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="relative w-full h-[100vh]">
      <img src={bg} alt="" className="w-full h-full object-cover" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white w-1/3 h-[500px] rounded-lg shadow-lg p-6">
          <form className="w-full" onSubmit={loginClicked ? handleLogin : handleSignUp}>
            <h1 className="text-3xl font-bold mt-3 text-center">{loginClicked ? 'Welcome Back!' : 'Create an Account'}</h1>
            <div className="flex flex-row justify-evenly mt-4 gap-8">
              <button className={`px-8 py-2 rounded-lg ${loginClicked ? 'bg-blue-800 text-white' : 'bg-white text-black hover:bg-blue-800 hover:text-white'}`} onClick={handleLoginClick}>
                Log In
              </button>
              <button className={`px-8 py-2 rounded-lg ${!loginClicked ? 'bg-blue-800 text-white' : 'bg-white text-black hover:bg-blue-800 hover:text-white'}`} onClick={handleSignUpClick}>
                Sign Up
              </button>
            </div>
            {error && <div className="text-red-500 text-center mt-4">{error}</div>}
            <div className="w-full flex flex-col gap-4 mt-8">
              {!loginClicked && <TextField id="signup-username" label="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} variant="standard" fullWidth />}
              <TextField id="login-email" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} variant="standard" fullWidth />
              <TextField id="login-password" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} variant="standard" fullWidth />
              {!loginClicked && <TextField id="signup-password2" label="Confirm Password" type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} variant="standard" fullWidth />}
              <button type="submit" className="w-full py-2 mt-7 font-semibold text-white bg-blue-800 rounded-lg">
                {loginClicked ? 'Log In' : 'Create Account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
