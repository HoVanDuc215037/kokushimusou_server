const express = require('express');
//const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const router = require('./routes/router.js');
const cors = require('cors');
const mongoose = require("mongoose");
const dotenv = require('dotenv')
//srequire('./passport-setup');

dotenv.config();
const queryString = process.env.MONGODB_URI;

app.set('views', path.join(__dirname, 'views')) 
app.set('view engine', 'ejs')

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cors())

app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.locals.currentUrl = req.originalUrl;
  next();
});
app.use('/public', express.static('public'));

// session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'A randomly generated confusing string',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));
//app.use(passport.initialize());
//app.use(passport.session());

// flash - notification
app.use(flash());
app.use((req, res, next) => {
  res.locals.username = req.session.username || 'ゲスト';
  res.locals.role = req.session.role || 'guest'; 
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

//sử dụng file router.js
app.use('/', router);

mongoose.connect(queryString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected!'))
  .catch(err => console.log('MongoDB connection error:', err.message));

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
})

module.exports = app
