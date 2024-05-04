import React, { useState } from 'react';
import axios from 'axios';
import './DeleteStudent.css';

function DeleteStudent() {
  const [studentCode, setStudentCode] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/deleteStudent', { student_code: studentCode });
      alert(response.data);
    } catch (error) {
      alert(error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Код студента:
        <input type="text" value={studentCode} onChange={(e) => setStudentCode(e.target.value)} />
      </label>
      <button type="submit">Удалить</button>
    </form>
  );
}

export default DeleteStudent;
