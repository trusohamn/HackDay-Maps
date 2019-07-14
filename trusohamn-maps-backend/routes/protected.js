const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');


router.use(function (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).json({ error: 'No credentials sent!' });
  }
  console.log('*********', req.headers.authorization, '*****************');
  jwt.verify(req.headers.authorization.split(' ')[1], 'my-secret', function (err, decoded) {
    console.log('err', err);
    console.log('deecoded', decoded);
    next();
  });

});

router.get('/profiles', (req, res) => {
  res.send({ message: 'you got to profile page' });
})

module.exports = router;