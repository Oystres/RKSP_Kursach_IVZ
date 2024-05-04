app.post('/login', async (req, res) => {
  const { student_login, password } = req.body;
  if (!student_login || !password) {
    return res.status(400).json({ message: 'Заполните все поля' });
  }

  try {
    const query = 'SELECT * FROM students WHERE student_login = $1 AND password = $2';
    const result = await pool.query(query, [student_login, password]);
    if (result.rows.length > 0) {
      req.session.student_login = student_login; 
      res.redirect('/student_profile'); 
    } else {
      res.status(404).json({ message: 'Нет такого пользователя' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});
