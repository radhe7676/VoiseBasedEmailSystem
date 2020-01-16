// Firebase Setup
const firebase = require('firebase-admin');

const serviceAccount = require('./serviceAccountKey.json');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://vbes-f4d00.firebaseio.com'
});

module.exports = firebase;
