import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StudentDebts.css';

function Debts() {
  const [debts, setDebts] = useState([]);

  useEffect(() => {
    axios.get('/api/debts')
      .then(response => setDebts(response.data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="content">
      <div className="info-block">
        <h1>Задолженности</h1>
        <table>
          <thead>
            <tr>
              <th>Дисциплина</th>
              <th>Форма оценивания</th>
              <th>Семестр</th>
            </tr>
          </thead>
          <tbody>
            {debts.map((debt, index) => (
              <tr key={index}>
                <td>{debt.discipline_name}</td>
                <td>{debt.asessment_form}</td>
                <td>{debt.semester}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Debts;
