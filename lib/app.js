require('dotenv').config();
const express = require('express');
const toJson = express.json();
const app = express();
const cors = require('cors')({
  origin: true,
  configuration: true,
  credentials: true
});
const cookieParser = require('cookie-parser')();

//enable cors
app.use(cors);

//enable parsers
app.use(toJson);
app.use(cookieParser);

//api routes
app.use('/api/v1/playback', require('./routes/playback'));

//error handling
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
