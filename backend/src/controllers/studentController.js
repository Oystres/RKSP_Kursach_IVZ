const students = require('../models/students');
const teachers = require('../models/teachers');

exports.registerStudent = async (req, res) => {
  const { student_code, student_login, e_mail, password, name, patronymic, surname, stud_group, status } = req.body;
  
  if (!student_code || !student_login || !e_mail || !password || !name || !patronymic || !surname || !stud_group || !status) {
    return res.status(400).send("Заполните все поля");
  }

  try {
    const result = await pool.query(
      'INSERT INTO students (student_code, student_login, e_mail, password, name, patronymic, surname, stud_group, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
      [student_code, student_login, e_mail, password, name, patronymic, surname, stud_group, status]
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

exports.deleteStudent = async (req, res) => {
  const { student_login } = req.body;
  if (!student_login) {
    return res.status(400).send("Заполните все поля");
  }
  
  try {
    const result = await pool.query(
      'DELETE FROM students WHERE student_login = $1',
      [student_login]
    );

    if (result.rowCount > 0) {
      res.send("Успешное удаление");
    } else {
      res.status(404).send("Студент не найден");
    }
  } catch (err) {
    res.status(500).send("Ошибка сервера: " + err.message);
  }
};

exports.getStudentDebts = async (req, res) => {
  if (!req.session.student_login) {
    return res.status(401).send('Необходима авторизация');
  }

  try {
    const studentResult = await pool.query(
      'SELECT student_id FROM students WHERE student_login = $1',
      [req.session.student_login]
    );

    if (studentResult.rowCount === 0) {
      return res.status(404).send("Студент не найден");
    }

    const student_id = studentResult.rows[0].student_id;
    const debtsResult = await pool.query(
      'SELECT d.discipline_name, d.asessment_form, d.semester FROM debts JOIN disciplines d ON d.discipline_id = debts.discipline_id WHERE debts.student_id = $1',
      [student_id]
    );

    res.json(debtsResult.rows);
  } catch (err) {
    res.status(500).send("Ошибка сервера: " + err.message);
  }
};

exports.getStudentGroup = async (req, res) => {
  if (!req.session.student_login) {
    return res.status(401).send('Необходима авторизация');
  }

  try {
    const studGroupResult = await pool.query(
      'SELECT stud_group FROM students WHERE student_login = $1',
      [req.session.student_login]
    );
    if (studGroupResult.rowCount === 0) {
      return res.status(404).send("Группа не найдена");
    }
    const stud_group = studGroupResult.rows[0].stud_group;

    const groupResult = await pool.query(
      'SELECT surname, name, patronymic, e_mail, stud_group, status FROM students WHERE stud_group = $1 ORDER BY surname ASC',
      [stud_group]
    );

    res.json(groupResult.rows);
  } catch (err) {
    res.status(500).send("Ошибка сервера: " + err.message);
  }
};

exports.getStudentAsessments = async (req, res) => {
  if (!req.session.student_login) {
    return res.status(401).send('Необходима авторизация');
  }

  try {
    const studentResult = await pool.query(
      'SELECT student_id FROM students WHERE student_login = $1',
      [req.session.student_login]
    );
    if (studentResult.rowCount === 0) {
      return res.status(404).send("Студент не найден");
    }

    const student_id = studentResult.rows[0].student_id;
    const assessmentsResult = await pool.query(
      `SELECT d.discipline_name, d.asessment_form, d.semester, a.asessment_name 
      FROM assessments a 
      JOIN disciplines d ON d.discipline_id = a.discipline_id 
      WHERE a.student_id = $1 
      ORDER BY d.semester ASC`, 
      [student_id]
    );

    res.json(assessmentsResult.rows);
  } catch (err) {
    res.status(500).send("Ошибка сервера: " + err.message);
  }
};

exports.getStudentInfo = async (req, res) => {
  if (!req.session.student_login) {
    return res.status(401).send('Необходима авторизация');
  }

  try {
    const result = await pool.query(
      'SELECT surname, name, patronymic, e_mail, student_login, stud_group, student_code, status FROM students WHERE student_login = $1',
      [req.session.student_login]
    );

    if (result.rowCount > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send("Студент не найден");
    }
  } catch (err) {
    res.status(500).send("Ошибка сервера: " + err.message);
  }
};

exports.logoutStudent = (req, res) => {
  req.session.destroy();
  res.send('Вы вышли из системы');
};

module.exports = student_Controller;