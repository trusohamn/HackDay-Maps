/* introducing facebook oauth based on https://medium.com/@alexanderleon/implement-social-authentication-with-react-restful-api-9b44f4714fa
larged amounts of auth codes copied from the tutorial */
const port = process.env.PORT || 8000;
require('dotenv').config();

const express = require('express');
const app = express();

const { getAllLocations, getReviews } = require('./db');


// const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
const whitelist = ['https://127.0.0.1:3000', 'https://trusohamn.github.io']
const cors = require('cors');
const corsOption = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  // origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};

app.use(cors(corsOption));

app.use(express.urlencoded({ extended: true }));

const authRouter = require('./routes/auth');
app.use('/api/auth/', authRouter);

app.get('/', (req, res) => {
  res.send('One day here will come the description of the api');
});

app.get('/api/points', (req, res) => {
  console.log('get api points');
  getAllLocations()
    .then(data => {
      res.send(JSON.stringify(data));
    })
    .catch(err => console.log(err))
});

app.get('/api/points/:id', (req, res) => {
  getReviews(req.params.id)
    .then(data => res.send(data));
});


const protectedRouter = require('./routes/protected');
app.use('/api/', protectedRouter);

app.use((req, res, next) => {
  const err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).send('Something broke! ' + err.message);
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
