var createError = require('http-errors');
var express = require('express');

//set up mongoose connection
const mongoose = require("mongoose");
mongoose.set('strictQuery',false);
const mongoDB = 'mongodb+srv://kyriakstrat:N1YdP7kj1G1wKKTC@cluster0.q9zbued.mongodb.net/HireHub?retryWrites=true&w=majority';
main().catch(err=>console.log(err));

async function main(){
  await mongoose.connect(mongoDB,{
    dbName: 'HireHub',
    useNewUrlParser: true,
    useUnifiedTopology: true
});
}

const hbs = require('hbs');
var path = require('path');
var logger = require('morgan');
const session = require('express-session');

var loginRouter = require('./routes/login');
var indexRouter = require('./routes/index');
const profileRouter = require('./routes/profile');

var app = express();
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
//init session options for the user 
app.use(session({
  secret:'secret-keyword',
  saveUninitialized:false,
  resave:false,
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', loginRouter);
app.use('/', indexRouter);
app.use('/profile',profileRouter);
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
