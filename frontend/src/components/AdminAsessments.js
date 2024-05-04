import React, { useState } from 'react';
import axios from 'axios';
import './AdminAsessments.css';

function AdminAssessments() {
  const [formData, setFormData] = useState({
    student_code: '',
    discipline_name: '',
    asessment_name: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/assessments', formData);
      alert(response.data);
    } catch (error) {
      alert(error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Код студента:
        <input type="text" name="student_code" value={formData.student_code} onChange={handleChange} />
      </label>
      <label>
        Название дисциплины:
        <input type="text" name="discipline_name" value={formData.discipline_name} onChange={handleChange} />
      </label>
      <label>
        Оценка:
        <input type="text" name="asessment_name" value={formData.asessment_name} onChange={handleChange} />
      </label>
      <button type="submit">Проставить оценку</button>
    </form>
  );
}

export default AdminAsessments;
