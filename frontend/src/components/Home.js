import React, { useState } from 'react';
import './Home.css';

const roles = ['student', 'teacher', 'admin'];

function Home() {
  const [visible, setVisible] = useState(false);
  const [currentForm, setCurrentForm] = useState('');

  const openLoginForm = (role) => {
    setCurrentForm(role);
    setVisible(true);
  };

  const closeForm = () => {
    setVisible(false);
    setCurrentForm('');
  };

  return (
    <div id="loginModal" style={{ display: visible ? 'flex' : 'none' }}>
      <div className="roleForm" style={{ display: !currentForm ? 'block' : 'none' }}>
        {roles.map(role => (
          <button key={role} onClick={() => openLoginForm(role)}>Login as {role}</button>
        ))}
        <span className="close-button" onClick={closeForm}>&times;</span>
      </div>
      {roles.map(role => (
        <form key={role} style={{ display: currentForm === role ? 'block' : 'none' }} onSubmit={(e) => { e.preventDefault();  }}>
          <span className="close-button" onClick={closeForm}>&times;</span>
          <label htmlFor="username">Логин:</label>
          <input type="text" placeholder={`${role}_login`} name="username" /><br />
          <label htmlFor="password">Пароль:</label>
          <input type="password" placeholder="password" name="password" /><br />
          <button type="submit">Войти</button>
        </form>
      ))}
    </div>
    
  );
}

export default Home;
