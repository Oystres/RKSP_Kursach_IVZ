import React from 'react';
import { useHistory } from 'react-router-dom';
import './AdminPanel.css';

function AdminPanel() {
    const history = useHistory();

    const logout = async () => {
        const response = await fetch('/api/logout', { method: 'POST' });
        if (response.ok) history.push('/login');
    };

    return (
        <div className="admin-panel">
            <header>
                <button onClick={() => history.push('/add_student')}>Регистрация</button>
                <button onClick={() => history.push('/delete_student')}>Удаление</button>
                <button onClick={() => history.push('/assign_stream')}>Назначение потока</button>
                <button onClick={() => history.push('/edit_assessment')}>Редактировать оценку</button>
                <button onClick={logout}>Выйти</button>
            </header>
        </div>
    );
}

export default AdminPanel;
