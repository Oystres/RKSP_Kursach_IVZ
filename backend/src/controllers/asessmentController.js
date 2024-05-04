const asessments = require('../models/asessments');

exports.updateAssessment = async (req, res) => {
  const { student_login, discipline_name, asessment_name } = req.body;

  try {
      const student = await pool.query('SELECT student_id FROM students WHERE student_login = $1', [student_login]);
      if (student.rows.length === 0) return res.status(404).send('No matching student found');

      const discipline = await pool.query('SELECT discipline_id FROM disciplines WHERE discipline_name = $1', [discipline_name]);
      if (discipline.rows.length === 0) return res.status(404).send('No matching discipline found');

      const assessment = await pool.query('SELECT asessment_id FROM asessments WHERE student_id = $1 AND discipline_id = $2', [student.rows[0].student_id, discipline.rows[0].discipline_id]);
      if (assessment.rows.length === 0) return res.status(404).send('No matching assessment found');

      if (!asessment_name) {
          return res.status(400).send('Please fill all required fields');
      }

      await pool.query('UPDATE asessments SET asessment_name = $1 WHERE asessment_id = $2', [asessment_name, assessment.rows[0].asessment_id]);
      res.send('Assessment updated successfully');
  } catch (err) {
      res.status(500).send(err.message);
  }
};


exports.addAssessment = async (req, res) => {
  if (!req.session.teacher_login) {
    return res.status(403).send("Требуется авторизация");
  }

  const { student_code, discipline_name, asessment_name } = req.body;
  try {
    const teacherResult = await pool.query('SELECT teacher_id FROM teachers WHERE teacher_login = $1', [req.session.teacher_login]);
    if (teacherResult.rowCount === 0) {
      return res.status(404).send("Преподаватель не найден");
    }
    const teacher_id = teacherResult.rows[0].teacher_id;

    const studentResult = await pool.query('SELECT student_id FROM students WHERE student_code = $1', [student_code]);
    if (studentResult.rowCount === 0) {
      return res.status(404).send("Студент не найден");
    }
    const student_id = studentResult.rows[0].student_id;

    const disciplineResult = await pool.query('SELECT discipline_id FROM disciplines WHERE discipline_name = $1', [discipline_name]);
    if (disciplineResult.rowCount === 0) {
      return res.status(404).send("Дисциплина не найдена");
    }
    const discipline_id = disciplineResult.rows[0].discipline_id;

    const insertResult = await pool.query('INSERT INTO assessments (student_id, discipline_id, asessment_name) VALUES ($1, $2, $3)', [student_id, discipline_id, asessment_name]);
    if (insertResult.rowCount === 1) {
      res.send("Оценка проставлена");
    } else {
      res.status(500).send("Ошибка при проставлении оценки");
    }
  } catch (err) {
    res.status(500).send("Ошибка сервера: " + err.message);
  }
};

module.exports = asessmentController;