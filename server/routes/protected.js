const express = require("express");
const router = express.Router();
const User = require("mongoose").model("User");
const { generateUniqueId, getAverageRating } = require("../dataHandling");
const {
  addLocation,
  getReviews,
  addReview,
  updateLocationWithRating,
  getAllLocations
} = require("../db");
const { verifyToken } = require("../auth/token.utils");

const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});
const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "tently",
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 400, height: 400, crop: "limit" }]
});
const parser = multer({ storage: storage });

router.use(function(req, res, next) {
  console.log("protected");
  if (!req.headers.authorization) {
    return res.status(403).json({ error: "No credentials sent!" });
  }
  verifyToken(req, res, next);
});

router.get("/profiles", (req, res) => {
  console.log("profile get");
  const userId = req.jwToken.id;
  const response = {};
  User.findUserById(userId, (err, user) => {
    response.user = user;
    getAllLocations({ person_id: userId }).then(locations => {
      response.locations = locations;
      res.send(response);
    });
  });
});

router.post("/profiles/favourites", (req, res, next) => {
  const userId = req.jwToken.id;
  const locationId = req.body.locationId;
  User.pushFavourite(userId, locationId, (err, data) => {
    if (err) return next(error.message);
    res.send(data);
  });
});

// add a new review
router.post("/points/:id", parser.single("image_0"), (req, res) => {
  const userId = req.jwToken.id;
  User.findUserById(userId, (err, user) => {
    if (err)
      return res.status(400).send({ error: "problem with finding user" });

    // get all reviews for this location
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
          rating: parseInt(req.body.rating),
          images: []
        };
        req.file && newReview.images.push(req.file.url);
        addReview(req.params.id, newReview).then(res.json({ newRating }));
      });
  });
});

// create a new location
router.post("/points", parser.single("image_0"), (req, res) => {
  console.log(req.jwToken);
  console.log(req.body);
  User.findUserById(req.jwToken.id, (err, user) => {
    if (err)
      return res.status(400).send({ error: "problem with finding user" });
    const userId = req.jwToken.id;

    const point = {
      _id: generateUniqueId(req.body.name),
      localisation: [parseFloat(req.body.lon), parseFloat(req.body.lat)],
      name: req.body.name,
      description: req.body.description,
      type: req.body.type,
      person_id: userId,
      profilePicture: user.photoUrl,
      images: []
    };

    req.file && point.images.push(req.file.url);

    addLocation(point)
      .then(() => {
        res.status(201).end();
      })
      .catch(err => console.log(err));
  });
});

module.exports = router;
