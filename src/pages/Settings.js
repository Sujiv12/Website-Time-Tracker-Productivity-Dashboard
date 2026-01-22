import React from 'react';
import axios from 'axios';

function Settings({ userId }) {
  async function exportData() {
    try {
      const startDate = new Date(Date.now() - 30*24*60*60*1000).toISOString().split('T')[0];
      const endDate = new Date().toISOString().split('T')[0];
      
      const response = await axios.get(`/api/reports/export/${userId}`, {
        params: { startDate, endDate, format: 'json' },
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'productivity-report.json');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  }

  async function exportCSV() {
    try {
      const startDate = new Date(Date.now() - 30*24*60*60*1000).toISOString().split('T')[0];
      const endDate = new Date().toISOString().split('T')[0];
      
      const response = await axios.get(`/api/reports/export/${userId}`, {
        params: { startDate, endDate, format: 'csv' },
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'productivity-report.csv');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  }

  return (
    <div className="settings-container">
      <h1>Settings</h1>

      <div className="settings-section">
        <h3>Export Data</h3>
        <p>Download your productivity data in JSON or CSV format</p>
        <div className="button-group">
          <button className="btn btn-primary" onClick={exportData}>Export as JSON</button>
          <button className="btn btn-secondary" onClick={exportCSV}>Export as CSV</button>
        </div>
      </div>

      <div className="settings-section">
        <h3>About</h3>
        <p>Time Tracker & Productivity Analytics v1.0.0</p>
        <p>Track your time and analyze your productivity with detailed reports.</p>
      </div>
    </div>
  );
}

export default Settings;
