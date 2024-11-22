import axios from 'axios';


// Retrieve the backend URL from environment variables or use a default
const baseURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5240/api';


const axiosInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Add this line if needed for CORS and authentication
});


// Add an interceptor to include JWT token in requests if available
axiosInstance.interceptors.request.use(
    (config) => {
        try {
            const token = localStorage.getItem('jwtToken'); // Retrieve JWT token from localStorage
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`; // Attach the token to the Authorization header
            }
        } catch (error) {
            console.error('Error accessing token:', error); // Log if there's an issue with the token retrieval
        }
        return config;
    },
    (error) => {
        console.error('Request error:', error); // Log if there's a request error
        return Promise.reject(error);
    }
);

// Add an interceptor to handle responses (optional)
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('Response error:', error.response ? error.response.data : error.message); // Log the response error
        // Optionally, handle specific status codes (e.g., refresh token logic or unauthorized access)
        return Promise.reject(error);
    }
);

export default axiosInstance;
