const debts = require('../models/debts');
const asessments = require('../models/asessments');
const students = require('../models/students');
const diciplines = require('../models/diciplines');
const teachers = require('../models/teachers');

exports.addDebt = async (req, res) => {
  if (!req.session.teacher_login) {
    return res.status(403).send("Необходима авторизация");
  }

  const { student_code, discipline_name } = req.body;

  try {
    const teacherResult = await pool.query('SELECT teacher_id FROM teachers WHERE teacher_login = $1', [req.session.teacher_login]);
    if (teacherResult.rows.length === 0) {
      return res.status(404).send("Преподаватель не найден");
    }
    const teacher_id = teacherResult.rows[0].teacher_id;

    const studentResult = await pool.query('SELECT student_id FROM students WHERE student_code = $1', [student_code]);
    if (studentResult.rows.length === 0) {
      return res.status(404).send("Студент не найден");
    }
    const student_id = studentResult.rows[0].student_id;

    const disciplineResult = await pool.query('SELECT discipline_id FROM disciplines WHERE discipline_name = $1', [discipline_name]);
    if (disciplineResult.rows.length === 0) {
      return res.status(404).send("Дисциплина не найдена");
    }
    const discipline_id = disciplineResult.rows[0].discipline_id;

    const insertResult = await pool.query('INSERT INTO debts (student_id, discipline_id) VALUES ($1, $2)', [student_id, discipline_id]);
    if (insertResult.rowCount === 1) {
      res.send("Долг успешно проставлен");
    } else {
      res.status(500).send("Ошибка при проставлении долга");
    }
  } catch (err) {
    res.status(500).send("Ошибка сервера: " + err.message);
  }
};

module.exports = orderController;