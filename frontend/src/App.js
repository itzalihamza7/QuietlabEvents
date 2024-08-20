import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute'; // Import the PrivateRoute


function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />} />
                  {/* Add more routes here */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
