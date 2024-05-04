import React, { useState } from 'react';
import axios from 'axios';
import './DeleteTeacher.css';

function DeleteTeacher() {
  const [teacherLogin, setTeacherLogin] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.delete('/api/deleteTeacher', { data: { teacher_login: teacherLogin } });
      console.log(response.data);
    } catch (error) {
      console.error('Failed to delete teacher:', error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Логин преподавателя:
        <input
          type="text"
          value={teacherLogin}
          onChange={(e) => setTeacherLogin(e.target.value)}
        />
      </label>
      <button type="submit">Удалить</button>
    </form>
  );
}

export default DeleteTeacher;
