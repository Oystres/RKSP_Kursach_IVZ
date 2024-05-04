const express = require('express');
const { deleteTeacher } = require('../controllers/teacherController');
const router = express.Router();

router.post('/register', registerTeacher);
router.delete('/deleteTeacher', deleteTeacher);
router.post('/login', loginTeacher);
router.get('/info', getTeacherInfo);
router.get('/teachers', checkSession, getAllTeachers);s
router.post('/submitAssessment', submitAssessment);
router.post('/debt', addDebt);
router.get('/groups', getTeacherGroups);
router.post('/logout', logoutTeacher);

module.exports = teacherRouter;

