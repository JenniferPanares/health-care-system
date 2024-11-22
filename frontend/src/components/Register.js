import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Ensure Link is imported
import axiosInstance from '../utils/axiosConfig'; // Import the configured axios instance
import './Register.css'; // Import the CSS file for styling

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(''); // Clear any existing error messages

        try {
            // Ensure that the URL matches your backend route structure
            const response = await axiosInstance.post('/user/register', { 
                username, 
                email, 
                password 
            });
            
            if (response.status === 200 || response.status === 201) {
                navigate('/login'); // Redirect to login after successful registration
            } else {
                throw new Error('Unexpected response');
            }
        } catch (err) {
            console.error('Registration error:', err.response ? err.response.data : err.message);
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2 className="register-title">Register</h2>
                <form onSubmit={handleSubmit} className="register-form">
                    <div className="input-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
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
                    <button type="submit" className="register-button" disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
                {/* Navigation to the login page */}
                <p className="login-link">
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
