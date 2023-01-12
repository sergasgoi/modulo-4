var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var session = require('express-session');
const { read } = require('fs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'algunaclave',
  resave: false,
  saveUninitialized: true
}));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

var nm= 'gaston'; //aca recibe el nombre de usuario de la base de datos
var ps= 'goi' //aca recibe la contraseña de la base de datos

app.get('/', function(req,res){
  var conocido = Boolean(req.session.nombre && req.session.pass);
  res.render('index', {
    title: 'Sesion en Express',
    conocido: conocido,
    nombre: req.session.nombre,
    pass: req.session.pass
  });
});

app.get('/2', function(req,res){
  var conocido = Boolean(req.session.nombre && req.session.pass);
  res.render('index2', {
    title: 'Sesion en Express',
    conocido: conocido,
    nombre: req.session.nombre,
    pass: req.session.pass
  });
});

app.post('/ingresar', function (req, res) {
  if(req.body.nombre===nm && req.body.pass===ps){
    req.session.nombre = req.body.nombre;
    req.session.pass = req.body.pass;
  }
  else{
    res.redirect('/2')
  }
  res.redirect('/');
});

app.get('/salir', function (req, res) {
  req.session.destroy();
  res.redirect('/');
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
