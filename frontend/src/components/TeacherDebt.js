import React, { useState } from 'react';
import axios from 'axios';
import './TeacherDebt.css';

function DebtForm() {
  const [formData, setFormData] = useState({
    student_code: '',
    discipline_name: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/teacher/debt', formData);
      alert('Долг успешно проставлен');
    } catch (error) {
      alert('Ошибка при отправке данных: ' + error.response.data);
    }
  };

  return (
    <div className="content">
      <div className="info-block">
        <h1>Проставление долга</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Код студента:
            <input type="text" name="student_code" value={formData.student_code} onChange={handleChange} />
          </label>
          <label>
            Дисциплина:
            <input type="text" name="discipline_name" value={formData.discipline_name} onChange={handleChange} />
          </label>
          <button type="submit">Поставить</button>
        </form>
      </div>
    </div>
  );
}

export default DebtForm;
