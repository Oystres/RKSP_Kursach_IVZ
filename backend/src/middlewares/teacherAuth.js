module.exports = (req, res, next) => {
    if (!req.session.teacher_login) {
      return res.redirect('/login');
    }
    next();
  };