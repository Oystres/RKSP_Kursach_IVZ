import React, { useState } from 'react';
import axios from 'axios';
import './TeacherRegistrationForm.css';

function TeacherRegistrationForm() {
  const [formData, setFormData] = useState({
    teacher_login: '',
    teacher_password: '',
    teacher_email: '',
    teacher_name: '',
    teacher_patronymic: '',
    teacher_surname: '',
    teacher_department: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/teachers/register', formData);
      alert(response.data);
    } catch (error) {
      alert(error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(formData).map((key) => (
        <div key={key}>
          <label>{key.replace(/_/g, ' ')}:</label>
          <input
            type={key.includes('password') ? 'password' : 'text'}
            name={key}
            value={formData[key]}
            onChange={handleChange}
          />
        </div>
      ))}
      <button type="submit">Зарегистрировать</button>
    </form>
  );
}

export default TeacherRegistrationForm;

