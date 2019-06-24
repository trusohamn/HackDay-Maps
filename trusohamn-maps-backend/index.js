const port = process.env.PORT || 8000;

const path = require('path');
const express = require('express');
const app = express();
const fs = require('fs');

const bodyParser = require('body-parser');
app.use(bodyParser.text());
app.use(express.json());
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
    const points = require('./points.json');
    console.log(req.body);
    console.log(req.headers['content-type']);
    points.points.push(JSON.parse(req.body));
    fs.writeFile('./points.json', JSON.stringify(points), () => {
        res.status(200).send(JSON.stringify({ answer: 'Success' }));
    });
});

app.get('/api/points', (req, res) => {
    const points = require('./points.json');
    res.send(JSON.stringify(points));
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
