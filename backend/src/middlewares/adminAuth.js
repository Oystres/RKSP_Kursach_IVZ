module.exports = (req, res, next) => {
    if (!req.session.admin_login) {
      return res.redirect('/login');
    }
    next();
  };

  function checkAdminSession(req, res, next) {
    if (!req.session.admin_login) {
        res.redirect('/index');
    } else {
        next();
    }
}