var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var reg = require('./routes/reg');
var login = require('./routes/login');
var lan = require('./routes/language');
var logout = require('./routes/logout');
var postBlog = require('./routes/post');

var app = express();

// 引入session
var session = require('express-session');
app.use(session({
  secret: 'recommend 128 bytes random string',
  cookie: {maxAge: 3600 * 1000}
}))

//多语言
var language = require('./models/language');    //多语言
var internation = new language();
internation.set(app);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//路由的处理
app.use('/login', checkNotLogin);
app.use('/reg', checkNotLogin);

//必须在已登录情况下才能访问
app.use('/logout', checkLogin);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/reg', reg);    //注册的，reg.js来处理
app.use('/login', login);  //登录的，login来处理
app.use('/language', lan);  //切换语言的
app.use('/logout', logout);  //登出
app.use('/post', postBlog);
app.use('/loadblog', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
function checkNotLogin(req, res, next) {
  if (req.session.user) {
    req.session.err = "已登录，请不要重复登录";
    return res.redirect('/');
  }
  next();
}
//已登录检测（未登录情况下执行）
function checkLogin(req, res, next) {
  if (!req.session.user) {
    req.session.err = "你还没有登录，请登录";
    return res.redirect('/login');
  }
  next();
}

app.listen(80);
module.exports = app;
