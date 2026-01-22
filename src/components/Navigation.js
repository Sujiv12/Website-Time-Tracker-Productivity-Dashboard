import React from 'react';
import '../App.css';

function Navigation({ currentPage, onPageChange, onLogout }) {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <h1>⏱️ Time Tracker</h1>
        </div>
        <ul className="nav-menu">
          <li>
            <button
              className={`nav-btn ${currentPage === 'dashboard' ? 'active' : ''}`}
              onClick={() => onPageChange('dashboard')}
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              className={`nav-btn ${currentPage === 'weekly' ? 'active' : ''}`}
              onClick={() => onPageChange('weekly')}
            >
              Weekly Report
            </button>
          </li>
          <li>
            <button
              className={`nav-btn ${currentPage === 'analytics' ? 'active' : ''}`}
              onClick={() => onPageChange('analytics')}
            >
              Analytics
            </button>
          </li>
          <li>
            <button
              className={`nav-btn ${currentPage === 'settings' ? 'active' : ''}`}
              onClick={() => onPageChange('settings')}
            >
              Settings
            </button>
          </li>
          <li>
            <button className="nav-btn logout" onClick={onLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
