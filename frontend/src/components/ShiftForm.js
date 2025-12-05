// shift form
import React, { useState, useEffect } from 'react';
import api from '../api/api';

export default function ShiftForm({ onCreated }) {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ employee: '', date: '', startTime: '', endTime: ''});
  const [err, setErr] = useState('');

  useEffect(() => {
    api.get('/employees').then(r => setEmployees(r.data)).catch(() => {});
  }, []);

  async function submit(e) {
    e.preventDefault();
    setErr('');
    try {
      await api.post('/shifts', form);
      setForm({ employee:'', date:'', startTime:'', endTime:''});
      onCreated && onCreated();
    } catch (error) {
      setErr(error.response?.data?.message || 'Error');
    }
  }

  return (
    <div style={{ marginBottom: 20 }}>
      <h3>Create Shift (Admin)</h3>
      <form onSubmit={submit}>
        <div>
          <select value={form.employee} onChange={e => setForm({ ...form, employee: e.target.value })} required>
            <option value="">Select Employee</option>
            {employees.map(emp => <option key={emp._id} value={emp._id}>{emp.name} ({emp.employeeCode})</option>)}
          </select>
        </div>
        <div>
          <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />
        </div>
        <div>
          <input type="time" value={form.startTime} onChange={e => setForm({ ...form, startTime: e.target.value })} required />
        </div>
        <div>
          <input type="time" value={form.endTime} onChange={e => setForm({ ...form, endTime: e.target.value })} required />
        </div>
        {err && <div style={{ color: 'red' }}>{err}</div>}
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
