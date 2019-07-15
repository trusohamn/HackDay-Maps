const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
var User = require('mongoose').model('User');



router.use(function (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).json({ error: 'No credentials sent!' });
  }
  jwt.verify(req.headers.authorization.split(' ')[1], 'my-secret', function (err, decoded) {
    req.jwToken = decoded;
    next();
  });

});

router.get('/profiles', (req, res) => {
  const userId = req.jwToken.id;
  User.findUserById(userId, (err, user) => {
    console.log(user);
  })

  // get profile data from mongo connected to this id


  res.send({ jwToken: req.jwToken });
})

module.exports = router;