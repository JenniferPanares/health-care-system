import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login'
import Register from './components/Register';
import Dashboard from './components/Dashboard';


const backendUrl = process.env.REACT_APP_BACKEND_URL;
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                {/* Add a default route to help catch unmatched paths */}
                <Route path="*" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;
