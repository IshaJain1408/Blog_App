import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'


const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      if (response) {
        localStorage.setItem('userEmail', email)
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="auth-container">
    <div className="auth-form">
      <div className="auth-content">
        <h2 className="welcome-text">
          Welcome Back <span>👋</span>
        </h2>
        <p className="sub-text">
        Sign in to share your ideas and engage with readers.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="input-field"
            
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="input-field"
          />
          <Link to="#" className="forgot-password">
            Forgot Password?
          </Link>
          <button type="submit" className="login-button">
            Sign in
          </button>
        </form>

        <p className="signup-text">
          Don’t have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>

 
  </div>
  );
};

export default Login;