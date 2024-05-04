import React, { useState } from 'react';
import axios from 'axios';
import './AdminLogin.css';

function AdminLogin() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { admin_login: login, admin_password: password });
      console.log('Logged in:', response.data);
    } catch (error) {
      console.error('Error logging in:', error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Логин:
        <input type="text" value={login} onChange={e => setLogin(e.target.value)} />
      </label>
      <label>
        Пароль:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <button type="submit">Войти</button>
    </form>
  );
}

export default AdminLogin;
