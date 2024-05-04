import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StudentGroup.css';

function StudentGroup() {
  const [group, setGroup] = useState([]);

  useEffect(() => {
    axios.get('/api/students/group')
      .then(response => setGroup(response.data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="content">
      <div className="info-block">
        <h1>Моя группа</h1>
        <table>
          <thead>
            <tr>
              <th>Фамилия</th>
              <th>Имя</th>
              <th>Отчество</th>
              <th>E-mail</th>
              <th>Группа</th>
              <th>Состояние</th>
            </tr>
          </thead>
          <tbody>
            {group.map((student, index) => (
              <tr key={index}>
                <td>{student.surname}</td>
                <td>{student.name}</td>
                <td>{student.patronymic}</td>
                <td>{student.e_mail}</td>
                <td>{student.stud_group}</td>
                <td>{student.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentGroup;
