const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Email = require('../models/Email');

router.get('/', (req, res) => {
  res.send('Hi');
});

router.get('/sentEmail', (req, res) => {
  Email.find({ _user: req.body._user })
    .sort({ date: -1 })
    .then(email => res.json(email))
    .catch(err => res.status(404).json({ noemailfound: 'No email found' }));
});

router.post('/send', async (req, res) => {
  //const { title, subject, body, recipient, sender } = req.body;

  //console.log(recipient);
  // console.log('Hello');
  //console.log(req.body);
  //console.log(req.user);
  const from = req.body.from;
  const email = new Email({
    from: from,
    to: req.body.to,
    subject: req.body.subject,
    body: req.body.body,
    _user: req.body._user
  });

  const mailer = new Mailer(email, surveyTemplate(email));

  try {
    const p = await mailer.send();
    // console.log(p);
    await email.save();
    // const sentEmail = ref.child('sent');
    // sentEmail.set(survey);
    res.send({ success: true });
  } catch (err) {
    res.status(422).send(err);
  }
});

module.exports = router;
