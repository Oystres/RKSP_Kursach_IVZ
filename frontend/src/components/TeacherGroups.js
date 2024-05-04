import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TeacherGroups.css';

function TeacherGroups() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    axios.get('/api/teacher/groups')
      .then(response => {
        setGroups(response.data);
      })
      .catch(error => {
        console.error('Error fetching groups:', error);
      });
  }, []);

  return (
    <div className="content">
      <div className="info-block">
        <h1>Мои группы</h1>
        <table>
          <thead>
            <tr>
              <th>Группа</th>
              <th>Дисциплина</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group, index) => (
              <tr key={index}>
                <td>{group.stud_group}</td>
                <td>{group.discipline_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TeacherGroups;
