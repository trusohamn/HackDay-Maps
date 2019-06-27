const port = process.env.PORT || 8000;

const express = require('express');
const app = express();
const fs = require('fs');

const {generateUniqueId} = require('./dataHandling');

app.use(express.urlencoded());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    res.send('Home page');
});

app.post('/api/points', (req, res) => {
    console.log('post request');
    const points = require('./points.json');
    const point = {
        id: generateUniqueId(req.body.name),
        localisation: [parseFloat(req.body.lon), parseFloat(req.body.lat)],
        name: req.body.name,
        description: req.body.description
    }
    console.log(point);
    points.points.push(point);
    fs.writeFile('./points.json', JSON.stringify(points), () => {
        res.status(201).end();
    });

    const reviews = require('./reviews.json');
    reviews[point.id] = {
        rev: []
    }
    fs.writeFile('./reviews.json', JSON.stringify(reviews), () => {
        res.status(201).end();
    });


});

app.get('/api/points', (req, res) => {
    console.log('get request');
    const points = require('./points.json');
    res.send(JSON.stringify(points));
});

app.get('/api/points/:id', (req, res) => {

    console.log('get request');
    console.log(req.params.id);

    // send out the reviews
    res.send({reviews: 'here come your reviews'});
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
