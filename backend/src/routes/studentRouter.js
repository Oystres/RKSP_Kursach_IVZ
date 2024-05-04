const express = require('express');
const { deleteStudent } = require('../controllers/studentController');
const router = express.Router();

router.post('/register', registerStudent);
router.delete('/deleteStudent', deleteStudent);
router.get('/debts', getStudentDebts);
router.get('/group', getStudentGroup);
router.get('/asessments', getStudentAsessments);
router.get('/info', getStudentInfo);
router.post('/logout', logoutStudent);

module.exports = studentRouter;

