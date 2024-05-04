import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TeacherInfo.css';

function TeacherInfo() {
  const [teacherInfo, setTeacherInfo] = useState({});

  useEffect(() => {
    axios.get('/api/teachers/info')
      .then(response => {
        setTeacherInfo(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div className="content">
      <div className="info-block">
        <h1>Мой профиль</h1>
        <table>
          <tbody>
            <tr>
              <th>Фамилия</th>
              <th>Имя</th>
              <th>Отчество</th>
              <th>E-mail</th>
              <th>Логин</th>
              <th>Кафедра</th>
            </tr>
            <tr>
              <td>{teacherInfo.teacher_surname}</td>
              <td>{teacherInfo.teacher_name}</td>
              <td>{teacherInfo.teacher_patronymic}</td>
              <td>{teacherInfo.teacher_email}</td>
              <td>{teacherInfo.teacher_login}</td>
              <td>{teacherInfo.teacher_department}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TeacherInfo;
