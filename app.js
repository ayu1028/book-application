//Start Application : DEBUG=book-application:* npm run devstart
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const session = require('express-session');

//var indexRouter = require('./routes/index');
const topRouter = require('./routes/top');
const postRouter = require('./routes/post');
const impRouter = require('./routes/impression');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const logoutRouter = require('./routes/logout');
const usersRouter = require('./routes/users');
const updateRouter = require('./routes/update');
const deleteRouter = require('./routes/delete');

const setUser = require('./setUser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 60 * 60 * 1000 }
}));

//Routers
app.use('/', setUser, topRouter);
app.use('/post', setUser, postRouter);
app.use('/impression', setUser, impRouter);
app.use('/users', setUser, usersRouter);
app.use('/update', setUser, updateRouter);
app.use('/delete', setUser, deleteRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/logout', logoutRouter);

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

module.exports = app;
