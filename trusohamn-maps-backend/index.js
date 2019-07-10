/* introducing facebook oauth based on https://medium.com/@alexanderleon/implement-social-authentication-with-react-restful-api-9b44f4714fa
larged amounts of auth codes copied from the tutorial */
const port = process.env.PORT || 8000;
require('dotenv').config();

const express = require('express');
const app = express();
const fs = require('fs');

const { generateUniqueId, getAverageRating } = require('./dataHandling');
const { addLocation, getAllLocations, getReviews, addReview, updateLocationWithRating } = require('./db');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const cors = require('cors');
const corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};

app.use(cors(corsOption));

app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const authRouter = require('./routes/auth');
app.use('/api/v1/', authRouter);

app.get('/', (req, res) => {
    res.send('One day here will come the description of the api');
});

app.post('/api/points', (req, res) => {
    console.log('post request');
    const point = {
        _id: generateUniqueId(req.body.name),
        localisation: [parseFloat(req.body.lon), parseFloat(req.body.lat)],
        name: req.body.name,
        description: req.body.description,
        type: req.body.type
    }
    console.log(point);

    addLocation(point)
        .then(data => {
            console.log(data);
            res.status(201).end();
        })
        .catch(err => console.log(err));
});

app.get('/api/points', (req, res) => {
    getAllLocations()
        .then(data => {
            res.send(JSON.stringify(data));
        })

});

app.get('/api/points/:id', (req, res) => {
    getReviews(req.params.id)
        .then(data => res.send(data));
});

app.post('/api/points/:id', (req, res) => {
    // get all reviews for this location
    let newRating;
    getReviews(req.params.id)
        .then(data => {
            newRating = getAverageRating(data, parseInt(req.body.rating));
            // update main db for location with new rating
            updateLocationWithRating(req.params.id, newRating);
        })
        .then(() => {
            //save the reference
            const newReview = {
                title: req.body.title,
                description: req.body.description,
                rating: parseInt(req.body.rating)
            }
            addReview(req.params.id, newReview)
                .then(res.json({ newRating }));
        });



});

app.use((req, res, next) => {
    const err = new Error('File Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res) {
    console.error(err.stack);
    res.status(500).send('Something broke! ' + err.message);
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
