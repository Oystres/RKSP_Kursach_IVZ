const admins = require('../models/admins');
const admins = require('../models/students');
const admins = require('../models/teachers');
const admins = require('../models/asessments');

exports.login = async (req, res) => {
    const { admin_login, admin_password } = req.body;
  
    if (!admin_login || !admin_password) {
      return res.status(400).send("Заполните все поля");
    }
  
    try {
      const result = await pool.query(
        'SELECT * FROM admins WHERE admin_login = $1 AND admin_password = $2',
        [admin_login, admin_password]
      );
  
      if (result.rows.length > 0) {
        req.session.admin_login = admin_login;
        res.redirect('/StudentRegistrationForm.js');  
      } else {
        res.status(401).send("Нет такого пользователя");
      }
    } catch (err) {
      res.status(500).send("Ошибка сервера");
    }
  };

exports.registerStudent = async (req, res) => {
    res.send('Студент зарегистрирован');
  };
  
  exports.registerTeacher = async (req, res) => {
    res.send('Преподаватель зарегистрирован');
  };
  


exports.deleteStudent = async (req, res) => {
    const { student_code } = req.body;
    try {
      const result = await pool.query('DELETE FROM students WHERE student_code = $1', [student_code]);
      if (result.rowCount > 0) {
        res.send("Успешное удаление студента");
      } else {
        res.status(404).send("Студент не найден");
      }
    } catch (err) {
      res.status(500).send("Ошибка сервера: " + err.message);
    }
  };
  
  exports.streamAssignment = async (req, res) => {
    if (!req.session.admin_login) {
      return res.status(401).send('Необходима авторизация');
    }
  
    const { stud_group, discipline_name, teacher_login } = req.body;а
    res.send('Поток назначен');
  };
  
  exports.streamDeletion = async (req, res) => {
    if (!req.session.admin_login) {
      return res.status(401).send('Необходима авторизация');
    }
  
    const { stud_group, discipline_name, teacher_login } = req.body;
    const result = await pool.query('DELETE FROM streams WHERE student_code = $1', [student_code]);
    res.send('Поток удален');
  };

  exports.deleteTeacher = async (req, res) => {
    const { teacher_login } = req.body;
    try {
      const result = await pool.query('DELETE FROM teachers WHERE teacher_login = $1', [teacher_login]);
      if (result.rowCount > 0) {
        res.send("Успешное удаление преподавателя");
      } else {
        res.status(404).send("Преподаватель не найден");
      }
    } catch (err) {
      res.status(500).send("Ошибка сервера: " + err.message);
    }
  };
  
  exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
  };
  