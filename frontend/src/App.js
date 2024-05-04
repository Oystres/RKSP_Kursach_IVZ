
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import StudentInfo from './components/StudentInfo';
import TeacherInfo from './components/TeacherInfo';
import AdminPanel from './components/AdminPanel';
import AdminLogin from './components/AdminLogin';
import StudentLogin from './components/StudentLogin';
import TeacherLogin from './components/TeacherLogin';

function App() {
  return (
    <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route path="/StudentInfi" element={<StudentInfo />} />
            <Route path="/" element={<Home />} />
            <Route path="/TeacherInfo" element={<TeacherInfo />} />
            <Route path="/AdminPanel" element={<AdminPanel />} />
            <Route path="/AdminLogin" element={<AdminLogin />} />
            <Route path="/StudentLogin" element={<StudentLogin />} />
            <Route path="/TeacherLogin" element={<TeacherLogin />} />
          </Routes>
        </Router>
    </div>
  );
}
