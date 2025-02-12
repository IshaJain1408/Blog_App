import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'


const Register: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/register', { email, password,name });
      if (response.data.success) {
        alert("User successfully Registerd")
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
      <div className="login-container">
        <div className="login-form">
          <div className="login-content">
            <h2 className="welcome-text">
            Create an Account <span>🚀</span>
            </h2>
            <p className="sub-text">
            Join us to share your ideas and connect with readers.
            </p>
            <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name"    className="input-field"
 required />
         
         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"   className="input-field"
 required />
         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"   className="input-field"
 required />
           <button type="submit" className="login-button">
             Sign up
           </button>
         </form>
 
            <p className="signup-text">
              Don’t have an account? <Link to="/login">Sign in</Link>
            </p>
          </div>
        </div>
    
     
      </div>
  
  
  );
};  

export default Register; 