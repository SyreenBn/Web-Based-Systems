var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const session = require('express-session');
var logger = require('morgan');

var shoppingRouter = require('./routes/controller');
//var usersRouter = require('./routes/users');
//const helloCounterRouter = require('./routes/hello-counter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: "shh, don't tell",
                  cookie: { maxAge: 60*1000 },
		  resave: true,
		  saveUninitialized: false}));

app.use('/', shoppingRouter);
app.use('/end_login', shoppingRouter);
app.use('/add_to_cart', shoppingRouter);
app.use('/place_order', shoppingRouter);
app.use('/display_orders', shoppingRouter);


//app.use('/users', usersRouter);
//app.use('/hello-counter', helloCounterRouter);

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
