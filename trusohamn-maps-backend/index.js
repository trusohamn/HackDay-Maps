const port = process.env.PORT || 8000;
require('dotenv').config();

const express = require('express');
const app = express();
const fs = require('fs');

const { generateUniqueId } = require('./dataHandling');
const { insert } = require('./db/addNewLocation');
const { getAll } = require('./db/getAllLocations');

app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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

    insert(point)
        .then(res => console.log(res));


    // const reviews = require('./reviews.json');
    // reviews[point._id] = {
    //     rev: []
    // }
    // fs.writeFile('./reviews.json', JSON.stringify(reviews), () => {
    //     res.status(201).end();
    // });
});

app.get('/api/points', (req, res) => {
    console.log('get request');
    // const points = require('./points.json');
    // const reviews = require('./reviews.json');
    // points.points = points.points.map(point => {
    //     const pointReviews = reviews[point.id].rev;
    //     const sum = pointReviews.reduce((acc, el) => {
    //         return acc + parseInt(el.rating)
    //     }, 0);
    //     point.rating = (sum / pointReviews.length).toFixed(1);
    //     return point;

    // })
    getAll()
        .then(data => {
            console.log(data);
            res.send(JSON.stringify(data));
        })

});

app.get('/api/points/:id', (req, res) => {

    console.log('get request');
    console.log(req.params.id);

    const reviews = require('./reviews.json');

    res.send(reviews[req.params.id]);
});

app.post('/api/points/:id', (req, res) => {

    console.log('post request');
    console.log(req.params.id);
    console.log(req.body);
    //save the reference
    const reviews = require('./reviews.json');
    console.log(reviews[req.params.id].rev);
    reviews[req.params.id].rev.push({
        title: req.body.title,
        description: req.body.description,
        rating: parseInt(req.body.rating)
    })

    fs.writeFile('./reviews.json', JSON.stringify(reviews), () => {
        res.status(201).end();
    });
    res.end();
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
