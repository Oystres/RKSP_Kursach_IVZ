const teachers = require('../models/teachers');
const students = require('../models/students');

exports.registerTeacher = async (req, res) => {
  const { teacher_login, teacher_password, teacher_email, teacher_name, teacher_patronymic, teacher_surname, teacher_department } = req.body;
  
  if (!teacher_login || !teacher_password || !teacher_email || !teacher_name || !teacher_patronymic || !teacher_surname || !teacher_department) {
    return res.status(400).send("Заполните все поля");
  }

  try {
    const result = await pool.query(
      'INSERT INTO teachers (teacher_login, teacher_password, teacher_email, teacher_name, teacher_patronymic, teacher_surname, teacher_department) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [teacher_login, teacher_password, teacher_email, teacher_name, teacher_patronymic, teacher_surname, teacher_department]
    );

    if (result.rowCount > 0) {
      res.send("Успешная регистрация");
    } else {
      res.status(500).send("Ошибка при регистрации");
    }
  } catch (err) {
    res.status(500).send("Ошибка сервера: " + err.message);
  }
};

exports.loginTeacher = async (req, res) => {
    const { teacher_login, teacher_password } = req.body;
  
    if (!teacher_login || !teacher_password) {
      return res.status(400).send("Заполните все поля");
    }
  
    try {
      const result = await pool.query(
        'SELECT * FROM teachers WHERE teacher_login = $1 AND teacher_password = $2',
        [teacher_login, teacher_password]
      );
  
      if (result.rows.length > 0) {
        req.session.teacher_login = teacher_login;
        res.redirect('/teacher_profile');  // Может быть изменено на отправку JSON с информацией для навигации на клиенте
      } else {
        res.status(404).send("Нет такого пользователя");
      }
    } catch (err) {
      res.status(500).send("Ошибка сервера: " + err.message);
    }
  };


  exports.checkSession = (req, res, next) => {
    if (!req.session.student_login) {
      return res.status(401).send('Not authenticated');
    }
    next();
  };
  
  exports.getAllTeachers = async (req, res) => {
    try {
      const result = await pool.query('SELECT teacher_surname, teacher_name, teacher_patronymic, teacher_email, teacher_department FROM teachers');
      res.json(result.rows);
    } catch (err) {
      res.status(500).send("Server error: " + err.message);
    }
  };

  exports.getTeacherInfo = async (req, res) => {
    if (!req.session.teacher_login) {
      return res.status(401).send('Authentication required');
    }
  
    try {
      const result = await pool.query(
        'SELECT teacher_surname, teacher_name, teacher_patronymic, teacher_email, teacher_login, teacher_department FROM teachers WHERE teacher_login = $1',
        [req.session.teacher_login]
      );
  
      if (result.rowCount > 0) {
        res.json(result.rows[0]);
      } else {
        res.status(404).send("Teacher not found");
      }
    } catch (err) {
      res.status(500).send("Server error: " + err.message);
    }
  };

  
exports.deleteTeacher = async (req, res) => {
    const { teacher_login } = req.body;
    if (!teacher_login) {
      return res.status(400).send("Заполните все поля");
    }
    
    try {
      const result = await pool.query(
        'DELETE FROM teachers WHERE teacher_login = $1',
        [teacher_login]
      );
  
      if (result.rowCount > 0) {
        res.send("Успешное удаление");
      } else {
        res.status(404).send("Преподаватель не найден");
      }
    } catch (err) {
      res.status(500).send("Ошибка сервера: " + err.message);
    }
  };

  exports.submitAssessment = async (req, res) => {
    if (!req.session.teacher_login) {
      return res.status(401).send('Необходима авторизация');
    }
  
    const { student_code, discipline_name, assessment_name } = req.body;
  
    try {
      const result = await pool.query(
        'INSERT INTO assessments (student_code, discipline_name, assessment_name) VALUES ($1, $2, $3)',
        [student_code, discipline_name, assessment_name]
      );
      res.send('Оценка успешно поставлена');
    } catch (err) {
      res.status(500).send("Ошибка сервера: " + err.message);
    }
  };

  exports.addDebt = async (req, res) => {
    if (!req.session.teacher_login) {
      return res.status(401).send('Необходима авторизация');
    }
  
    const { student_code, discipline_name } = req.body;
  
    try {
      const result = await pool.query(
        'INSERT INTO debts (student_code, discipline_name) VALUES ($1, $2)',
        [student_code, discipline_name]
      );
      res.send('Долг успешно проставлен');
    } catch (err) {
      res.status(500).send("Ошибка сервера: " + err.message);
    }
  };

  exports.getTeacherGroups = async (req, res) => {
    if (!req.session.teacher_login) {
      return res.status(401).send('Authentication required');
    }
  
    try {
      const teacherResult = await pool.query(
        'SELECT teacher_id FROM teachers WHERE teacher_login = $1',
        [req.session.teacher_login]
      );
      if (teacherResult.rowCount === 0) {
        return res.status(404).send("Teacher not found");
      }
      const teacher_id = teacherResult.rows[0].teacher_id;
  
      const groupsResult = await pool.query(
        'SELECT DISTINCT s.stud_group, d.discipline_name FROM streams s JOIN disciplines d ON s.discipline_id = d.discipline_id WHERE s.teacher_id = $1',
        [teacher_id]
      );
      res.json(groupsResult.rows);
    } catch (err) {
      res.status(500).send("Server error: " + err.message);
    }
  };
  
  exports.logoutTeacher = (req, res) => {
    req.session.destroy();
    res.send('Вы вышли из системы');
  };

  module.exports = teacher_Controller;