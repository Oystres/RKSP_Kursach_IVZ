import React, { useState } from 'react';
import axios from 'axios';
import './StudentRegistrationForm.css';

function StudentRegistrationForm() {
  const [formData, setFormData] = useState({
    student_code: '',
    student_login: '',
    e_mail: '',
    password: '',
    name: '',
    patronymic: '',
    surname: '',
    stud_group: '',
    status: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/students/register', formData);
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
            type={key === 'password' ? 'password' : 'text'}
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

export default StudentRegistrationForm;
