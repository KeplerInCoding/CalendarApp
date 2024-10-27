// src/App.js
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CalendarView from './components/CalendarView';
import Login from './pages/Login';
import Home from './pages/Home';

const App = () => {
  const { isAuthenticated , user} = useAuth0();
  console.log("User:", user);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/calendar"
            element={isAuthenticated ? <CalendarView /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>

    </div>
    
  );
};

export default App;
