const { Router } = require('express');
const streamer = require('../utils/streamer');

module.exports = Router()
  .get('/', (req, res, next) => {
    // use streamer
    // res.send from here or within streamer?
    
    // probably best to have streamer return a stream,
    // and send res from here
  });
