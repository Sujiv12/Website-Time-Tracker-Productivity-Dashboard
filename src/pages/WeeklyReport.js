import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

function WeeklyReport({ userId }) {
  const [weekData, setWeekData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeeklyData();
  }, [userId]);

  async function fetchWeeklyData() {
    try {
      const response = await axios.get(`/api/reports/weekly/${userId}`);
      setWeekData(response.data);
    } catch (error) {
      console.error('Error fetching weekly data:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div className="loading">Loading...</div>;
  if (!weekData) return <div className="error">No data available</div>;

  const { summary, dailyBreakdown } = weekData;

  const formatTime = (seconds) => {
    if (!seconds) return '0m';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  return (
    <div className="report-container">
      <h1>Weekly Report</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Week Total</h3>
          <div className="stat-value">{formatTime(summary.total_time)}</div>
        </div>
        <div className="stat-card productive">
          <h3>Productive</h3>
          <div className="stat-value">{formatTime(summary.productive_time)}</div>
        </div>
        <div className="stat-card unproductive">
          <h3>Unproductive</h3>
          <div className="stat-value">{formatTime(summary.unproductive_time)}</div>
        </div>
        <div className="stat-card">
          <h3>Productivity Score</h3>
          <div className="stat-value">{summary.productivity_score}%</div>
        </div>
      </div>

      <div className="chart-container">
        <h3>Daily Usage This Week</h3>
        <Line
          data={{
            labels: dailyBreakdown.map(d => new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' })),
            datasets: [
              {
                label: 'Total Time',
                data: dailyBreakdown.map(d => d.total_time / 3600),
                borderColor: '#4f46e5',
                backgroundColor: 'rgba(79, 70, 229, 0.1)'
              },
              {
                label: 'Productive',
                data: dailyBreakdown.map(d => d.productive_time / 3600),
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)'
              }
            ]
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { position: 'bottom' }
            },
            scales: {
              y: {
                title: { display: true, text: 'Hours' }
              }
            }
          }}
        />
      </div>
    </div>
  );
}

export default WeeklyReport;
