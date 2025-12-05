// dashboard
import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { logout, getUser } from '../utils/auth';
import ShiftForm from '../components/ShiftForm';
import ShiftTable from '../components/ShiftTable';

export default function Dashboard({ onLogout }) {
  const user = getUser();
  const [shifts, setShifts] = useState([]);
  const [dateFilter, setDateFilter] = useState('');
  const [err, setErr] = useState('');

  const fetch = async () => {
    try {
      setErr('');
      const params = {};
      if (dateFilter) params.date = dateFilter;
      const res = await api.get('/shifts', { params });
      setShifts(res.data);
    } catch (e) {
      setErr(e.response?.data?.message || 'Failed to fetch shifts');
    }
  };

  useEffect(() => { fetch(); }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete('/shifts/' + id);
      fetch();
    } catch (e) {
      alert(e.response?.data?.message || 'Failed to delete');
    }
  };

  const handleLogout = () => {
    logout();
    onLogout && onLogout();
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Shift Board</h2>
        <div>
          <span>{user.email} ({user.role})</span>
          <button onClick={handleLogout} style={{ marginLeft: 12 }}>Logout</button>
        </div>
      </div>

      {user.role === 'admin' && <ShiftForm onCreated={fetch} />}

      <div style={{ marginTop: 16 }}>
        <label>Filter by date: </label>
        <input type="date" value={dateFilter} onChange={e => setDateFilter(e.target.value)} />
        <button onClick={fetch}>Apply</button>
      </div>

      {err && <div style={{ color: 'red' }}>{err}</div>}
      <ShiftTable shifts={shifts} onDelete={handleDelete} />
    </div>
  );
}
