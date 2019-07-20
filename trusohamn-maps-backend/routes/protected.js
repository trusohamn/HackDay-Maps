const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
var User = require('mongoose').model('User');
const { generateUniqueId, getAverageRating } = require('../dataHandling');
const { addLocation, getReviews, addReview, updateLocationWithRating } = require('../db');

router.use(function (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).json({ error: 'No credentials sent!' });
  }
  jwt.verify(req.headers.authorization.split(' ')[1], process.env.TOKEN_SECRET,
    (err, decoded) => {
      req.jwToken = decoded;
      console.log(decoded);
      next();
    });

});

router.get('/profiles', (req, res) => {
  const userId = req.jwToken.id;
  User.findUserById(userId, (err, user) => {
    res.send({ jwToken: req.jwToken, user: user });
  })
})

router.post('/points/:id', (req, res) => {
  // get all reviews for this location
  const userId = req.jwToken.id;
  User.findUserById(userId, (err, user) => {
    if (err) return res.status(400).send({ error: 'problem with finding user' })

    let newRating;
    getReviews(req.params.id)
      .then(data => {
        newRating = getAverageRating(data, parseInt(req.body.rating));
        // update main db for location with new rating
        updateLocationWithRating(req.params.id, newRating);
      })
      .then(() => {
        const newReview = {
          title: req.body.title,
          description: req.body.description,
          person_id: userId,
          profilePicture: user.photoUrl,
          rating: parseInt(req.body.rating)
        }
        addReview(req.params.id, newReview)
          .then(res.json({ newRating }));
      });
  })
});

router.post('/points', (req, res) => {
  const point = {
    _id: generateUniqueId(req.body.name),
    localisation: [parseFloat(req.body.lon), parseFloat(req.body.lat)],
    name: req.body.name,
    description: req.body.description,
    type: req.body.type
  }

  addLocation(point)
    .then(() => {
      res.status(201).end();
    })
    .catch(err => console.log(err));
});

module.exports = router;