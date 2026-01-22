import React, { useState, useEffect } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import WeeklyReport from './pages/WeeklyReport';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');
    
    if (token && storedUserId) {
      setIsAuthenticated(true);
      setUserId(storedUserId);
    }
    
    setLoading(false);
  }, []);

  const handleLogin = (token, userId) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    setIsAuthenticated(true);
    setUserId(userId);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
    setUserId(null);
    setCurrentPage('login');
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <>
        {currentPage === 'login' ? (
          <Login onLogin={handleLogin} onSwitchPage={() => setCurrentPage('register')} />
        ) : (
          <Register onRegister={handleLogin} onSwitchPage={() => setCurrentPage('login')} />
        )}
      </>
    );
  }

  return (
    <div className="app">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} onLogout={handleLogout} />
      <main className="main-content">
        {currentPage === 'dashboard' && <Dashboard userId={userId} />}
        {currentPage === 'weekly' && <WeeklyReport userId={userId} />}
        {currentPage === 'analytics' && <Analytics userId={userId} />}
        {currentPage === 'settings' && <Settings userId={userId} />}
      </main>
    </div>
  );
}

export default App;
