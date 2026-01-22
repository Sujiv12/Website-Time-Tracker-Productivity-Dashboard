import React, { useState } from 'react';
import axios from 'axios';

function Analytics({ userId }) {
  const [startDate, setStartDate] = useState(new Date(Date.now() - 30*24*60*60*1000).toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchAnalytics() {
    setLoading(true);
    try {
      const response = await axios.get(`/api/analytics/sites/${userId}`, {
        params: { startDate, endDate }
      });
      setSites(response.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  }

  const formatTime = (seconds) => {
    if (!seconds) return '0m';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  return (
    <div className="analytics-container">
      <h1>Analytics</h1>

      <div className="date-filter">
        <label>
          Start Date:
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </label>
        <label>
          End Date:
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </label>
        <button onClick={fetchAnalytics} disabled={loading}>
          {loading ? 'Loading...' : 'Load Analytics'}
        </button>
      </div>

      {sites.length > 0 && (
        <table className="sites-table">
          <thead>
            <tr>
              <th>Domain</th>
              <th>Total Time</th>
              <th>Visits</th>
              <th>Category</th>
              <th>Last Visited</th>
            </tr>
          </thead>
          <tbody>
            {sites.map((site, idx) => (
              <tr key={idx}>
                <td>{site.domain}</td>
                <td>{formatTime(site.total_time)}</td>
                <td>{site.visits}</td>
                <td><span className={`badge ${site.category}`}>{site.category}</span></td>
                <td>{new Date(site.last_visited).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Analytics;
