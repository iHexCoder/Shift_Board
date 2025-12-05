// login page
import React, { useState } from 'react';
import api from '../api/api';
import { saveAuth } from '../utils/auth';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/login', { email, password });
      saveAuth(data.token, data.user);
      onLogin && onLogin();
    } catch (err) {
      setErr(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: '40px auto' }}>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        {err && <div style={{ color: 'red' }}>{err}</div>}
        <button type="submit">Login</button>
      </form>
      <div style={{ marginTop: 16 }}>
        <b>Demo admin:</b> hire-me@anshumat.org / HireMe@2025!
      </div>
    </div>
  );
}
