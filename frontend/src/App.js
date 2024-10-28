// src/App.js
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CalendarView from './pages/CalendarView';
import Login from './pages/Login';
import Home from './pages/Home';
import Callback from './pages/Callback';

const App = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className='h-screen bg-gradient-to-tr from-pink-100 to-purple-100 flex items-center justify-center'>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? <Navigate to="/calendar" /> : <Home />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/callback" element={<Callback />} />
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
