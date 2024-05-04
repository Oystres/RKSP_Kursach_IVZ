import React, { useState } from 'react';
import axios from 'axios';
import './StreamDeletionForm.css';

function StreamDeletionForm() {
  const [formData, setFormData] = useState({
    stud_group: '',
    discipline_name: '',
    teacher_login: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/streams/delete', formData);
      alert(response.data);
    } catch (error) {
      alert('Ошибка: ' + error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Группа:
        <input type="text" name="stud_group" value={formData.stud_group} onChange={handleChange} />
      </label>
      <label>Название дисциплины:
        <input type="text" name="discipline_name" value={formData.discipline_name} onChange={handleChange} />
      </label>
      <label>Логин преподавателя:
        <input type="text" name="teacher_login" value={formData.teacher_login} onChange={handleChange} />
      </label>
      <button type="submit">Удалить поток</button>
    </form>
  );
}

export default StreamDeletionForm;
