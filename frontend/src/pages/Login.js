import React, { useState } from 'react';
import { login } from '../services/authService.js';
import FormInput from '../components/FormInput.js';
import { useNavigate } from 'react-router-dom';
import '../assets/Login.css'; // Add this if you need specific styling for the login page

const Login = () => {   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login(email, password);
            console.log(response);
            if (response.data.access_token) {
                console.log(response.data);
                localStorage.setItem('user', JSON.stringify(response.data));
                navigate('/dashboard'); // Navigate to dashboard after successful login
            }
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="login-page">
            <h1>QuietLab Events Dashboard</h1>
        <div className="login-container">
            
            <h1 className="login-heading">Login</h1>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleLogin}>
                <FormInput
                    label="Email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <FormInput
                    label="Password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
        </div>
    );
};

export default Login;
