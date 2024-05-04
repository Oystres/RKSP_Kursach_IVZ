const express = require('express');
const router = express.Router();
const { registerStudent, registerTeacher, deleteStudent, deleteTeacher, logout } = require('../controllers/adminController');
const checkAuth = require('../middlewares/checkAuth');
const adminRoutes = require('./routes/adminRoutes');

app.use('/admin', adminRoutes);

router.post('/registerStudent', checkAuth, registerStudent);
router.post('/registerTeacher', checkAuth, registerTeacher);
router.post('/logout', checkAuth, logout);
router.post('/login', adminController.login);
router.post('/assignStream', streamAssignment);
router.post('/deleteStream', streamDeletion);
router.post('/deleteStudent', checkAdminSession, deleteStudent);
router.post('/deleteTeacher', checkAdminSession, deleteTeacher);

module.exports = router;


