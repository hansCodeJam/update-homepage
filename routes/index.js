var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('main/home');
});

router.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  return res.redirect('/')
});

module.exports = router;
