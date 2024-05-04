
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import StudentInfo from './components/StudentInfo';
import TeacherInfo from './components/TeacherInfo';
import AdminPanel from './components/AdminPanel';
import AdminLogin from './components/AdminLogin';
import StudentLogin from './components/StudentLogin';
import TeacherLogin from './components/TeacherLogin';
import AdminAsessments from './components/AdminAsessments';
import DeleteStudent from './components/DeleteStudent';
import DeleteTeacher from './components/DeleteTeacher';
import StreamForm from './components/StreamForm';
import StudentAsessments from './components/StudentAsessments';
import StudentDebts from './components/StudentDebts';
import StudentGroup from './components/StudentGroup';
import TeacherAsessment from './components/TeacherAsessment';
import TeacherDebt from './components/TeacherDebt';
import TeacherGroups from './components/TeacherGroups';
import TeachersList from './components/TeachersList';

function App() {
  return (
    <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route path="/StudentInfo" element={<StudentInfo />} />
            <Route path="/" element={<Home />} />
            <Route path="/TeacherInfo" element={<TeacherInfo />} />
            <Route path="/AdminPanel" element={<AdminPanel />} />
            <Route path="/AdminLogin" element={<AdminLogin />} />
            <Route path="/StudentLogin" element={<StudentLogin />} />
            <Route path="/TeacherLogin" element={<TeacherLogin />} />
            <Route path="/AdminAsessments" element={<AdminAsessments />} />
            <Route path="/DeleteStudent" element={<DeleteStudent />} />
            <Route path="/DeleteTeacher" element={<DeleteTeacher />} />
            <Route path="/StreamForm" element={<StreamForm />} />
            <Route path="/StudentAsessments" element={<StudentAsessments />} />
            <Route path="/StudentDebts" element={<StudentDebts />} />
            <Route path="/StudentGroup" element={<StudentGroup />} />
            <Route path="/TeacherAsessment" element={<TeacherAsessment />} />
            <Route path="/TeacherDebt" element={<TeacherDebt />} />
            <Route path="/TeacherGroups" element={<TeacherGroups />} />
            <Route path="/TeachersList" element={<TeachersList />} />
          </Routes>
        </Router>
    </div>
  );
}
