import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('EccomTokenByPrabhat')) {
      setIsAuthenticated(true);
    }
  }, [localStorage.getItem('EccomTokenByPrabhat')]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
