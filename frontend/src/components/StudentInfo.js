import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StudentInfo.css';

function StudentInfo() {
  const [studentInfo, setStudentInfo] = useState({});

  useEffect(() => {
    axios.get('/api/students/info')
      .then(response => {
        setStudentInfo(response.data);
      })
      .catch(error => {
        console.log('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="content">
      <div className="info-block">
        <h1>Информация</h1>
        <table>
          <tbody>
            <tr>
              <th>Фамилия</th>
              <th>Имя</th>
              <th>Отчество</th>
              <th>E-mail</th>
              <th>Логин</th>
              <th>Группа</th>
              <th>Личный номер</th>
              <th>Состояние</th>
            </tr>
            <tr>
              <td>{studentInfo.surname}</td>
              <td>{studentInfo.name}</td>
              <td>{studentInfo.patronymic}</td>
              <td>{studentInfo.e_mail}</td>
              <td>{studentInfo.student_login}</td>
              <td>{studentInfo.stud_group}</td>
              <td>{studentInfo.student_code}</td>
              <td>{studentInfo.status}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentInfo;
