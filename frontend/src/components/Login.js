import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../utils/axiosConfig'; // Import your configured axios instance
import './Login.css'; // Import the CSS file for styling

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(''); // Clear any existing error message

        try {
            const response = await axiosInstance.post('/user/login', { email, password });
            localStorage.setItem('jwtToken', response.data.token);
            navigate('/dashboard');
        } catch (err) {
            console.error('Login error:', err);
            setError('Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <video autoPlay muted loop className="background-video">
                <source src="/video/tjagvid.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="login-overlay">
                <div className="login-card">
                    <div className="logo-placeholder">
                        <div className="curly-braces">{'{'}</div>
                        <div className="logo-text">YOUR LOGO HERE</div>
                        <div className="curly-braces">{'}'}</div>
                    </div>
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="input-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        <button type="submit" className="login-button" disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                    <p className="register-link">
                        Don't have an account? <Link to="/register">Register here</Link>
                    </p>
                    
                </div>
            </div>
            <p className="credits">By: tjag & friends</p> {/* Ensure this line is included */}
        </div>
    );
};

export default Login;
