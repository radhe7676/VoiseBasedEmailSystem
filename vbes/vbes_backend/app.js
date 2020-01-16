const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const app = express();

const Users = require('./routes/users');
const Email = require('./routes/email');

var port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

//DB config
const db = require('./config/keys').mongoURI;

//Connect to MongoDb
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

app.use('/users', Users);
app.use('/email', Email);

app.listen(port, function() {
  console.log('Server is running on port: ' + port);
});
