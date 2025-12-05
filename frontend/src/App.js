// app js
import React, { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { getUser } from './utils/auth';

function App() {
    const [user, setUser] = useState(getUser());

    return (
        <div>
            {!user ? <Login onLogin={() => setUser(getUser())} /> : <Dashboard onLogout={() => setUser(null)} />}
        </div>
    );
}

export default App;
