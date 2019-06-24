const port = process.env.PORT || 8000;

const path = require('path');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send('Home page');
});

app.get('/api/points', (req, res) => {
    const points = require('./points.json');
    res.send(points);
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
