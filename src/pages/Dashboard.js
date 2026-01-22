import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement);

function Dashboard({ userId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, [userId]);

  async function fetchDashboardData() {
    try {
      const response = await axios.get(`/api/analytics/dashboard/${userId}`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div className="loading">Loading...</div>;
  if (!data) return <div className="error">No data available</div>;

  const { daily, topSites, categoryStats } = data;

  const formatTime = (seconds) => {
    if (!seconds) return '0m';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Time</h3>
          <div className="stat-value">{formatTime(daily.total_time)}</div>
        </div>
        <div className="stat-card productive">
          <h3>Productive</h3>
          <div className="stat-value">{formatTime(daily.productive_time)}</div>
        </div>
        <div className="stat-card unproductive">
          <h3>Unproductive</h3>
          <div className="stat-value">{formatTime(daily.unproductive_time)}</div>
        </div>
        <div className="stat-card neutral">
          <h3>Neutral</h3>
          <div className="stat-value">{formatTime(daily.neutral_time)}</div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="chart-container">
          <h3>Time by Category</h3>
          <Doughnut
            data={{
              labels: ['Productive', 'Unproductive', 'Neutral'],
              datasets: [{
                data: [
                  daily.productive_time,
                  daily.unproductive_time,
                  daily.neutral_time
                ],
                backgroundColor: ['#10b981', '#ef4444', '#f59e0b'],
                borderColor: '#fff',
                borderWidth: 2
              }]
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'bottom' }
              }
            }}
          />
        </div>

        <div className="chart-container">
          <h3>Top Sites</h3>
          <Bar
            data={{
              labels: topSites.map(s => s.domain),
              datasets: [{
                label: 'Time (minutes)',
                data: topSites.map(s => Math.round(s.total_time / 60)),
                backgroundColor: '#4f46e5'
              }]
            }}
            options={{
              indexAxis: 'y',
              responsive: true,
              plugins: {
                legend: { display: false }
              }
            }}
          />
        </div>
      </div>

      {/* Sites Table */}
      <div className="table-container">
        <h3>All Tracked Sites</h3>
        <table className="sites-table">
          <thead>
            <tr>
              <th>Domain</th>
              <th>Time</th>
              <th>Visits</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {topSites.map((site, idx) => (
              <tr key={idx}>
                <td>{site.domain}</td>
                <td>{formatTime(site.total_time)}</td>
                <td>{site.total_time}</td>
                <td><span className={`badge ${site.category}`}>{site.category}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
