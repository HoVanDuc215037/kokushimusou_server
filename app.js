const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const router = require('./routes/router.js');
const cors = require('cors');
const mongoose = require("mongoose");
const dotenv = require('dotenv')
const User = require('./models/user');

dotenv.config();
const queryString = process.env.MONGODB_URI;

//app.use(express.json());
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views')) 
app.set('view engine', 'ejs')
//app.use(express.json())
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cors())

app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.locals.currentUrl = req.originalUrl;
  next();
});
app.use('/public', express.static('public'));

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
