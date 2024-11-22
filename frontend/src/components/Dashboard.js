import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosConfig';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [analytics, setAnalytics] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                console.log('Fetching appointments...');
                // Updated route to match your .NET backend structure
                const response = await axiosInstance.get('/appointments');
                setAppointments(response.data);
            } catch (err) {
                console.error('Error fetching appointments:', err);
                setError('Failed to load appointments');
            }
        };
    
        const fetchInventory = async () => {
            try {
                console.log('Fetching inventory...');
                // Updated route for inventory
                const response = await axiosInstance.get('/inventory');
                setInventory(response.data);
            } catch (err) {
                console.error('Error fetching inventory:', err);
                setError('Failed to load inventory');
            }
        };
    
        const fetchNotifications = async () => {
            try {
                console.log('Fetching notifications...');
                // Use the full URL for the Node.js backend route
                const response = await axios.get('http://localhost:5000/api/notifications');
                setNotifications(response.data);
            } catch (err) {
                console.error('Error fetching notifications:', err);
                setError('Failed to load notifications');
            }
        };
    
        const fetchAnalytics = async () => {
            try {
                console.log('Fetching analytics...');
                // Use the full URL for the Node.js backend route
                const response = await axios.get('http://localhost:5000/api/analytics/overview');
                setAnalytics(response.data);
            } catch (err) {
                console.error('Error fetching analytics:', err);
                setError('Failed to load analytics');
            }
        };
    
        // Trigger all data fetching functions
        fetchAppointments();
        fetchInventory();
        fetchNotifications();
        fetchAnalytics();
    }, []);
    

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-title">Dashboard</h2>

            {/* Analytics Section */}
            <div className="dashboard-section">
                <h3>Analytics Overview</h3>
                {analytics ? (
                    <div className="analytics-cards">
                        <div className="card">
                            <p>Total Users</p>
                            <h4>{analytics.totalUsers}</h4>
                        </div>
                        <div className="card">
                            <p>Total Appointments</p>
                            <h4>{analytics.totalAppointments}</h4>
                        </div>
                        <div className="card">
                            <p>Total Inventory Items</p>
                            <h4>{analytics.totalInventoryItems}</h4>
                        </div>
                    </div>
                ) : (
                    <p className="no-data-message">Failed to load analytics</p>
                )}
            </div>

            {/* Appointments Section */}
            <div className="dashboard-section">
                <h3>Appointments</h3>
                {appointments.length > 0 ? (
                    <ul className="data-list">
                        {appointments.map((appointment, index) => (
                            <li key={index}>
                                <strong>{appointment.patientName}</strong> - {appointment.date} at {appointment.time}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-data-message">Failed to load appointments</p>
                )}
            </div>

            {/* Inventory Section */}
            <div className="dashboard-section">
                <h3>Inventory</h3>
                {inventory.length > 0 ? (
                    <ul className="data-list">
                        {inventory.map((item, index) => (
                            <li key={index}>
                                <strong>{item.itemName}</strong> - Quantity: {item.quantity}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-data-message">Failed to load inventory</p>
                )}
            </div>

            {/* Notifications Section */}
            <div className="dashboard-section">
                <h3>Notifications</h3>
                {notifications.length > 0 ? (
                    <ul className="data-list">
                        {notifications.map((notification, index) => (
                            <li key={index}>{notification.message}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-data-message">Failed to load notifications</p>
                )}
            </div>

            {/* Placeholder for Future Sections */}
            <div className="dashboard-section">
                <h3>Upcoming Features</h3>
                <p>Additional data and reports will be added here in the future.</p>
            </div>
        </div>
    );
};

export default Dashboard;
