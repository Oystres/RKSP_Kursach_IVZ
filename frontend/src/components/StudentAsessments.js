import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StudentAsessments.css';

function Performance() {
  const [performance, setPerformance] = useState([]);

  useEffect(() => {
    axios.get('/api/performance')
      .then(response => setPerformance(response.data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="content">
      <div className="info-block">
        <h1>Успеваемость</h1>
        <table>
          <thead>
            <tr>
              <th>Дисциплина</th>
              <th>Форма оценивания</th>
              <th>Семестр</th>
              <th>Оценка</th>
            </tr>
          </thead>
          <tbody>
            {performance.map((item, index) => (
              <tr key={index}>
                <td>{item.discipline_name}</td>
                <td>{item.asessment_form}</td>
                <td>{item.semester}</td>
                <td>{item.asessment_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Performance;
