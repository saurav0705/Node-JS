var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');


const url = "mongodb+srv://root:root@cluster0-6jtqj.mongodb.net/test?retryWrites=true&w=majority";
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log("connected to the server........................................");  
},(err) => { console.log("error while connecting to server :: ",err); });


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leaderRouter');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('1234567890'));
var auth = function(req,res,next){
  var authHeader = req.headers.authorization;
  if(!req.signedCookies.user)
  {
    if(!authHeader){
      res.statusCode = 401;
      res.setHeader('WWW-Authenticate','Basic');
      var err = new Error("You are not authenticated");
      next(err);
      return;
    }
    console.log(authHeader,'base64');
    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];
      if (user == 'admin' && pass == 'password') {
        res.cookie('user','admin',{signed:true});
          next(); // authorized
      } else {
          var err = new Error('You are not authenticated!');
          res.setHeader('WWW-Authenticate', 'Basic');      
          res.statusCode = 401;
          next(err);
    }
  }
  else{
    if (req.signedCookies.user === 'admin') {
      next();
  }
  else {
      var err = new Error('You are not authenticated!');
      err.status = 401;
      next(err);
  }
  }
}


app.use(auth);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dishes',dishRouter);
app.use('/promo',promoRouter);
app.use('/leader',leaderRouter);

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
