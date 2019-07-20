const express = require('express');
const router = express.Router();
const { generateToken, sendToken } = require('../utils/token.utils');
const passport = require('passport');
require('../passport')();

router.route(
  '/facebook')
  .post(
    passport.authenticate('facebook-token', { session: false }),
    (req, res, next) => {
      console.log('authenticatiion', req.user);
      if (!req.user) {
        return res.send(401).send('User Not Authenticated');
      }
      req.auth = {
        id: req.user.id
      };
      next();
    },
    generateToken,
    sendToken);
module.exports = router;