const express = require('express');
const router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const passport = require('passport');
//const firebase = require('../initFirebase');

const keys = require('../config/keys');
const User = require('../models/User');
router.use(cors());

process.env.SECRET_KEY = 'secret';

//const db = firebase.database().ref();

router.post('/register', (req, res) => {
  const today = new Date();

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (!user) {
        //Password Encryption
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;

            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      } else {
        errors.email = 'Email already exists';
        return res.status(400).json(errors);
      }
    })
    .catch(err => {
      res.send('error: ' + err);
    });
});

// @route   Post api/users/login
// @desc    User login / Returning JWT(Json web token) Token
// @access  Public
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    .then(user => {
      //Check for user
      if (!user) {
        return res.status(404).json({ errors: 'User not found' });
      }

      //Check for password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          //User matched
          const payload = { id: user._id, name: user.name, email: user.email }; //Create JWT Payload

          //Sign Token
          console.log(payload);
          jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
            res.json({
              success: true,
              token: token
            });
          });
        } else {
          console.log('err');
          return res.status(400).json({ errors: 'Email or password incorrect' });
        }
      });
    })
    .catch(err => res.status(400));
});

router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
});

module.exports = router;
