var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    user: function () { //user将读取session的属性，然后给予不同的返回值
      if (req.session.user)
        return req.session.user;
      else
        return null;
    }
  });
});
router.get('/home', function(req, res, next) {
  res.render('home', { title: 'home' });
});
module.exports = router;
