import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import pages (to be created)
// import Login from './pages/Login';
// import Dashboard from './pages/Dashboard';
// import Scorecard from './pages/Scorecard';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <h1>Full Stack Cricket App</h1>
        {/* TODO: Add routing for Login, Dashboard, and Scorecard pages */}
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          {/* <Route path="/scorecard/:matchId" element={<Scorecard />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
