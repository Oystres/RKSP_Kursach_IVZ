import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TeachersList.css';

function TeachersList() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/teachers')
      .then(response => {
        setTeachers(response.data);
      })
      .catch(error => console.log('Error fetching data:', error));
  }, []);

  return (
    <div className="content">
      <div className="info-block">
        <h1>Преподаватели</h1>
        <table>
          <thead>
            <tr>
              <th>Фамилия</th>
              <th>Имя</th>
              <th>Отчество</th>
              <th>E-mail</th>
              <th>Кафедра</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher, index) => (
              <tr key={index}>
                <td>{teacher.teacher_surname}</td>
                <td>{teacher.teacher_name}</td>
                <td>{teacher.teacher_patronymic}</td>
                <td>{teacher.teacher_email}</td>
                <td>{teacher.teacher_department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TeachersList;
