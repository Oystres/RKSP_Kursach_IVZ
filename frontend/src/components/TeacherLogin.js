import React, { useState } from 'react';
import axios from 'axios';
import './TeacherLogin.css';

function TeacherLogin() {
  const [loginData, setLoginData] = useState({
    teacher_login: '',
    teacher_password: ''
  });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/teachers/login', loginData);
      if (response.data.redirect) {
        window.location = response.data.redirect;
      }
    } catch (error) {
      alert('Ошибка: ' + (error.response ? error.response.data : "Сетевая ошибка"));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Логин:
        <input type="text" name="teacher_login" value={loginData.teacher_login} onChange={handleChange} />
      </label>
      <label>
        Пароль:
        <input type="password" name="teacher_password" value={loginData.teacher_password} onChange={handleChange} />
      </label>
      <button type="submit">Войти</button>
    </form>
  );
}

export default TeacherLogin;
