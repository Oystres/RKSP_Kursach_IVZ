const streams = require('../models/streams');
const diciplines = require('../models/diciplines');
const teachers = require('../models/teachers');


exports.addStream = async (req, res) => {
  const { stud_group, discipline_name, teacher_login } = req.body;

  if (!stud_group || !discipline_name || !teacher_login) {
    return res.status(400).send("Заполните все поля");
  }

  try {
    const teacherResult = await pool.query('SELECT teacher_id FROM teachers WHERE teacher_login = $1', [teacher_login]);
    if (teacherResult.rowCount === 0) {
      return res.status(404).send("Преподаватель не найден");
    }
    const teacher_id = teacherResult.rows[0].teacher_id;

    const disciplineResult = await pool.query('SELECT discipline_id FROM disciplines WHERE discipline_name = $1', [discipline_name]);
    if (disciplineResult.rowCount === 0) {
      return res.status(404).send("Дисциплина не найдена");
    }
    const discipline_id = disciplineResult.rows[0].discipline_id;

    const insertResult = await pool.query('INSERT INTO streams (stud_group, discipline_id, teacher_id) VALUES ($1, $2, $3)', [stud_group, discipline_id, teacher_id]);
    if (insertResult.rowCount > 0) {
      res.send("Успешно добавлено");
    } else {
      res.status(500).send("Ошибка при добавлении записи");
    }
  } catch (err) {
    res.status(500).send("Ошибка сервера: " + err.message);
  }
};

exports.deleteStream = async (req, res) => {
  const { stud_group, discipline_name, teacher_login } = req.body;

  if (!stud_group || !discipline_name || !teacher_login) {
    return res.status(400).send("Заполните все поля");
  }

  try {
    const teacherResult = await pool.query('SELECT teacher_id FROM teachers WHERE teacher_login = $1', [teacher_login]);
    if (teacherResult.rowCount === 0) {
      return res.status(404).send("Преподаватель не найден");
    }
    const teacher_id = teacherResult.rows[0].teacher_id;

    const disciplineResult = await pool.query('SELECT discipline_id FROM disciplines WHERE discipline_name = $1', [discipline_name]);
    if (disciplineResult.rowCount === 0) {
      return res.status(404).send("Дисциплина не найдена");
    }
    const discipline_id = disciplineResult.rows[0].discipline_id;

    const streamResult = await pool.query('SELECT stream_id FROM streams WHERE stud_group = $1 AND discipline_id = $2 AND teacher_id = $3', [stud_group, discipline_id, teacher_id]);
    if (streamResult.rowCount === 0) {
      return res.status(404).send("Поток не найден");
    }
    const stream_id = streamResult.rows[0].stream_id;

    const deleteResult = await pool.query('DELETE FROM streams WHERE stream_id = $1', [stream_id]);
    if (deleteResult.rowCount > 0) {
      res.send("Поток успешно удален");
    } else {
      res.status(500).send("Не удалось удалить поток");
    }
  } catch (err) {
    res.status(500).send("Ошибка сервера: " + err.message);
  }
};


module.exports = streamController;
