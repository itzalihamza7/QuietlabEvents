import React, { useState } from 'react';
import FiltersForm from '../components/FiltersForm';
import MetricsTable from '../components/MetricsTable';
import Chart from '../components/Chart';
import CreateStoreForm from '../components/createStoreForm';
import '../assets/Dashboard.css';
import { calculateMetrics } from '../services/metricsService';
import { createStore } from '../services/storeService';
import { logout } from '../services/logoutService';

const Dashboard = () => {
  const [metrics, setMetrics] = useState([]);
  const [view, setView] = useState('events'); // Default to 'events' view

  const handleFiltersSubmit = async (filters) => {
    const data = await calculateMetrics(filters);
    setMetrics(data);
  };

  const handleCreateStore = async (storeData) => {
    try {
      await createStore(storeData);
      setView('events'); // Return to 'events' view after creating a store
      alert('Store created successfully!');
    } catch (error) {
      alert('Failed to create store.');
    }
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="navbar-buttons">
            <h1>QuietLab Dashboard </h1>
          <button className="events-button" onClick={() => setView('events')}>Events</button>
          <button className="create-store-button" onClick={() => setView('create-store')}>Create Store</button>
        </div>
        <button className="logout-button" onClick={logout}>Logout</button>
      </nav>
      <div className="content">
        {view === 'create-store' ? (
          <CreateStoreForm onCreate={handleCreateStore} />
        ) : (
          <>
            <FiltersForm onSubmit={handleFiltersSubmit} />
            {metrics.length > 0 && (
              <>
                <MetricsTable data={metrics} />
                <Chart data={metrics} />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
