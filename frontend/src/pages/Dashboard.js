import React, { useState } from 'react';
import FiltersForm from '../components/FiltersForm';
import MetricsTable from '../components/MetricsTable';
import Chart from '../components/Chart';
import { calculateMetrics } from '../services/metricsService';
import '../assets/Dashboard.css'; // Import the CSS file
import { logout } from '../services/logoutService'; // Adjust the import path as needed

const handleLogout = async () => {
    try {
        await logout(); // Call the logout service function
        console.log('Logged out successfully');
    } catch (error) {
        console.error('Logout failed:', error);
    }
};
const Dashboard = () => {
  const [metrics, setMetrics] = useState([]);

  const handleFiltersSubmit = async (filters) => {
    const data = await calculateMetrics(filters);
    setMetrics(data);
  };


  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <h1>Quietlab-Dashboard</h1>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </nav>
      <div className="content">
        <div className="filters-form">
          <FiltersForm onSubmit={handleFiltersSubmit} />
        </div>
        <div className="metrics-table">
          {metrics.length > 0 && (
            <>
            
              <MetricsTable data={metrics} />
              {<Chart data={metrics} /> }
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
